import logo from './logo.svg';
import './App.css';
import {useState,useEffect} from 'react';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import {Route,Routes,Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

function App() {
	
	const appState = useSelector((state) => {
		let error = state.shopping.error;
		if(state.login.error) {
			error = state.login.error;
		}
		return {
			isLogged:state.login.isLogged,
			error:error,
			loading:state.login.loading
		}
	})
	
	//TODO: REMOVE
	const [state,setState] = useState({
		list:[],
		isLogged:false,
		loading:false,
		token:"",
		error:"",
		user:""
	})
	
	const [urlRequest,setUrlRequest] = useState({
		url:"",
		request:{},
		action:""
	})
	
	//HELPER FUNCTIONS
	
	const saveToStorage = (state) => {
		sessionStorage.setItem("state",JSON.stringify(state));
	}
	
	const setLoading = (loading) => {
		setState((state) => {
			return {
				...state,
				error:"",
				loading:loading
			}
		})
	}
	
	const setError = (error) => {
		setState((state) => {
			let tempState = {
				...state,
				error:error
			}
			saveToStorage(tempState);
			return tempState;
		})
	}
	
	const setUser = (user) => {
		setState((state) => {
			let tempState = {
				...state,
				user:user
			}
			saveToStorage(tempState);
			return tempState;
		})
	}
	
	const clearState = (error) => {
		let tempState = {
			list:[],
			isLogged:false,
			loading:false,
			token:"",
			user:"",
			error:error
		}
		saveToStorage(tempState);
		setState(tempState);
	}
	
	useEffect(() => {
		
		const fetchData = async () => {
			if(!urlRequest.url) {
				return;
			}
			setLoading(true);
			const response = await fetch(urlRequest.url,urlRequest.request)
			setLoading(false);
			if(!response) {
				setError("Server never responded. Try again later.");
				return;
			}
			if(response.ok) {
				switch(urlRequest.action) {
					case "getlist":
						const data = await response.json();
						if(!data) {
							setError("Failed to parse shopping data");
							return;
						}
						setState((state) => {
							let tempState = {
								...state,
								list:data
							}
							saveToStorage(tempState);
							return tempState;
						})
						return;
					case "additem":
					case "removeitem":
					case "edititem":
						getList();
						return;
					case "register":
						setError("Register success");
						return;
					case "login":
						const temp = await response.json();
						if(!temp) {
							setError("Failed to parse login information. Try again later.");
							return;
						}
						setState((state) => {
							let tempState = {
								...state,
								isLogged:true,
								token:temp.token
							}
							saveToStorage(tempState);
							return tempState;
						})
						getList(temp.token);
						return;
					case "logout":
						clearState("");
						return;
					default:
						return;
				}
			} else {
				if(response.status === 403) {
					clearState("Your session has expired. Logging you out.")
					return;
				}
				let errorMessage = " Server responded with a status "+response.status+" "+response.statusText
				switch(urlRequest.action) {
					case "getlist":
						setError("Failed to fetch shopping list. Server responded with a status "+response.status+" "+response.statusText)
						return;
					case "additem":
						setError("Failed to add new item. Server responded with a status "+response.status+" "+response.statusText)
						return;
					case "removeitem":
						setError("Failed to remove item. Server responded with a status "+response.status+" "+response.statusText)
						return;
					case "edititem":
						setError("Failed to edit item. Server responded with a status "+response.status+" "+response.statusText)
						return;
					case "register":
						if(response.status === 409) {
							setError("Username is already in use");
							return;
						}
						setError("Register failed."+errorMessage);
						return;
					case "login":
						setError("Login failed."+errorMessage);
						return;
					case "logout":
						clearState("Server responded with an error. Logging you out.");
						return;
					default:
						return;
				}
			}
		}
		
		fetchData();
		
	},[urlRequest])
	
	useEffect(() => {
		if(sessionStorage.getItem("state")) {
			let state = JSON.parse(sessionStorage.getItem("state"));
			setState(state);
			if(state.isLogged) {
				getList(state.token);
			}
		}
	},[])
	
	//REST API
	
	const getList = (token) => {
		let tempToken = state.token;
		if(token) {
			tempToken = token
		}
		setUrlRequest({
			url:"/api/shopping",
			request:{
				method:"GET",
				headers:{
					"token":tempToken
				}
			},
			action:"getlist"
		})
	}
	
	const addItem = (item) => {
		setUrlRequest({
			url:"/api/shopping",
			request:{
				method:"POST",
				headers:{
					"Content-type":"application/json",
					"token":state.token
				},
				body:JSON.stringify(item)
			},
			action:"additem"
		})
	}
	
	const removeItem = (id) => {
		setUrlRequest({
			url:"/api/shopping/"+id,
			request:{
				method:"DELETE",
				headers:{
					"token":state.token
				}
			},
			action:"removeitem"
		})
	}
	
	const editItem = (item) => {
		setUrlRequest({
			url:"/api/shopping/"+item.id,
			request:{
				method:"PUT",
				headers:{
					"Content-type":"application/json",
					"token":state.token
				},
				body:JSON.stringify(item)
			},
			action:"edititem"
		})
	}
	
	//LOGIN API
	
	const register = (user) => {
		setUrlRequest({
			url:"/register",
			request:{
				method:"POST",
				headers:{
					"Content-type":"application/json"
				},
				body:JSON.stringify(user)
			},
			action:"register"
		})
	}

	const login = (user) => {
		setUser(user.username);
		setUrlRequest({
			url:"/login",
			request:{
				method:"POST",
				headers:{
					"Content-type":"application/json"
				},
				body:JSON.stringify(user)
			},
			action:"login"
		})
	}

	const logout = () => {
		setUrlRequest({
			url:"/logout",
			request:{
				method:"POST",
				headers:{
					"Content-type":"application/json",
					"token":state.token
				}
			},
			action:"logout"
		})
	}
	
	//RENDERING
	
	let message = <></>
	if(appState.loading) {
		message = <h4>Loading...</h4>
	}
	if(appState.error) {
		message = <h4>{appState.error}</h4>
	}
	if(appState.isLogged) {
		return (
			<div className="App">
				<Navbar token={state.token} user={state.user} isLogged={state.isLogged} logout={logout}/>
				<div style={{height:35,textAlign:"center"}}>
					{message}
				</div>
				<Routes>
					<Route path="/" element={<ShoppingList list={state.list} removeItem={removeItem} editItem={editItem}/>}/>
					<Route path="/form" element={<ShoppingForm addItem={addItem}/>}/>
					<Route path="*" element={<Navigate to="/"/>}/>
				</Routes>
			</div>
		);
	} else {
		return (
			<div className="App">
				<Navbar token={state.token} user={state.user} isLogged={state.isLogged} logout={logout}/>
				<div style={{height:35,textAlign:"center"}}>
					{message}
				</div>
				<Routes>
					<Route path="/" element={<LoginPage register={register} login={login} setError={setError}/>}/>
					<Route path="*" element={<Navigate to="/"/>}/>
				</Routes>
			</div>
		);		
		
	}
}

export default App;
