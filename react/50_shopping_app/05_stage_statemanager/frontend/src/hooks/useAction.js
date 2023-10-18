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
				
			} else {
				
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