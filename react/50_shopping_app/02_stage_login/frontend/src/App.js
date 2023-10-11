import logo from './logo.svg';
import './App.css';
import {useState,useEffect} from 'react';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import {Route,Routes,Navigate} from 'react-router-dom';

function App() {
	
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
			const response = await fetch(urlRequest.url,urlRequest.request)
			if(!response) {
				console.log("Server did not respond!");
				return;
			}
			if(response.ok) {
				switch(urlRequest.action) {
					case "getlist":
						const data = await response.json();
						if(!data) {
							console.log("Failed to parse shopping data");
							return;
						}
						setState({
							list:data
						})
						return;
					case "additem":
					case "removeitem":
					case "edititem":
						getList();
						return;
					default:
						return;
				}
			} else {
				switch(urlRequest.action) {
					case "getlist":
						console.log("Failed to fetch shopping list. Server responded with a status "+response.status+" "+response.statusText)
						return;
					case "additem":
						console.log("Failed to add new item. Server responded with a status "+response.status+" "+response.statusText)
						return;
					case "removeitem":
						console.log("Failed to remove item. Server responded with a status "+response.status+" "+response.statusText)
						return;
					case "edititem":
						console.log("Failed to edit item. Server responded with a status "+response.status+" "+response.statusText)
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
	
	return (
		<div className="App">
			<Navbar/>
			<Routes>
				<Route path="/" element={<ShoppingList list={state.list} removeItem={removeItem} editItem={editItem}/>}/>
				<Route path="/form" element={<ShoppingForm addItem={addItem}/>}/>
				<Route path="*" element={<Navigate to="/"/>}/>
			</Routes>
		</div>
	);
}

export default App;
