import ActionContext from '../context/ActionContext';
import {useState,useEffect,useContext} from 'react';
import * as actionConstants from '../context/actionConstants';
import useAppState from './useAppState';

const useAction = () => {
	
	const [state,setState] = useState({
		url:"",
		request:{},
		action:""
	})
	
	const {dispatch} = useContext(ActionContext);
	
	const {token} = useAppState();
	
	useEffect(() => {
		
		const fetchData = async () => {
			if(!state.url) {
				return;
			}
			dispatch({
				type:actionConstants.LOADING
			})
			const response = await fetch(state.url,state.request);
			dispatch({
				type:actionConstants.STOP_LOADING
			})
			if(!response) {
				dispatch({
					type:actionConstants.LOGOUT_FAILED,
					error:"Server never responded. Logging you out"
				})
				return
			}
			if(response.ok) {
				switch(state.action) {
					case "getlist":
						const list = await response.json();
						if(!list) {
							dispatch({
								type:actionConstants.FETCH_LIST_FAILED,
								error:"Failed to parse shopping information. Try again later."
							})
							return;
						}
						dispatch({
							type:actionConstants.FETCH_LIST_SUCCESS,
							list:list
						})
						return;
					case "additem":
						dispatch({
							type:actionConstants.ADD_ITEM_SUCCESS
						})
						getList();
						return;
					case "removeitem":
						dispatch({
							type:actionConstants.REMOVE_ITEM_SUCCESS
						})
						getList();
						return;
					case "edititem":
						dispatch({
							type:actionConstants.EDIT_ITEM_SUCCESS
						})
						getList();
						return;
					case "register":
						dispatch({
							type:actionConstants.REGISTER_SUCCESS
						})
						return;
					case "login":
						let data = await response.json();
						if(!data) {
							dispatch({
								type:actionConstants.LOGIN_FAILED,
								error:"Failed to parse login information. Try again later."
							})
							return;
						}
						dispatch({
							type:actionConstants.LOGIN_SUCCESS,
							token:data.token
						})
						return;
					case "logout":
						dispatch({
							type:actionConstants.LOGOUT_SUCCESS
						})
						return;
					default:
						return;
				}
			} else {
				if(response.status === 403) {
					dispatch({
						type:actionConstants.LOGOUT_FAILED,
						error:"Your session has expired. Logging you out."
					})
					return;
				}
				let errorMessage = " Server responded with a status "+response.status+" "+response.statusText
				switch(state.action) {
					case "getlist":
						dispatch({
							type:actionConstants.FETCH_LIST_FAILED,
							error:"Failed to fetch shopping information."+errorMessage
						})
						return;
					case "additem":
						dispatch({
							type:actionConstants.ADD_ITEM_FAILED,
							error:"Failed to add new item."+errorMessage
						})
						return;
					case "removeitem":
						dispatch({
							type:actionConstants.REMOVE_ITEM_FAILED,
							error:"Failed to remove item."+errorMessage
						})
						return;
					case "edititem":
						dispatch({
							type:actionConstants.EDIT_ITEM_FAILED,
							error:"Failed to edit item."+errorMessage
						})
						return;
					case "register":
						if(response.status === 409) {
							dispatch({
								type:actionConstants.REGISTER_FAILED,
								error:"Username already in use"
							})
						} else {
							dispatch({
								type:actionConstants.REGISTER_FAILED,
								error:"Register failed."+errorMessage
							})
						}
						return;
					case "login":
						dispatch({
							type:actionConstants.LOGIN_FAILED,
							error:"Login failed."+errorMessage
						})
						return;
					case "logout":
						dispatch({
							type:actionConstants.LOGOUT_FAILED,
							error:"Serve responded with an error. Logging you out."
						})
						return;
					default:
						return;
				}
			}
		}
		
		fetchData();
		
	},[state])

	const getList = () => {
		setState({
			url:"/api/shopping",
			request:{
				method:"GET",
				headers:{
					"token":token
				}
			},
			action:"getlist"
		})
	}
	
	const add = (item) => {
		setState({
			url:"/api/shopping",
			request:{
				method:"POST",
				headers:{
					"Content-type":"application/json",
					"token":token
				},
				body:JSON.stringify(item)
			},
			action:"additem"
		})
	}
	
	const remove = (id) => {
		setState({
			url:"/api/shopping/"+id,
			request:{
				method:"DELETE",
				headers:{
					"token":token
				}
			},
			action:"removeitem"
		})
	}
	
	const edit = (item) => {
		setState({
			url:"/api/shopping/"+item.id,
			request:{
				method:"PUT",
				headers:{
					"Content-type":"application/json",
					"token":token
				},
				body:JSON.stringify(item)
			},
			action:"edititem"
		})
	}
	
	//LOGIN API
	
	const register = (user) => {
		setState({
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
		dispatch({
			type:actionConstants.SET_USERNAME,
			user:user.username
		})
		setState({
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
		setState({
			url:"/logout",
			request:{
				method:"POST",
				headers:{
					"Content-type":"application/json",
					"token":token
				}
			},
			action:"logout"
		})
	}	
	
	const setError = (error) => {
		dispatch({
			type:actionConstants.REGISTER_FAILED,
			error:error
		})
	}
	
	return {register,login,logout,getList,add,remove,edit,setError}
}

export default useAction;