import logo from './logo.svg';
import './App.css';
import {useState,useEffect} from 'react';

function App() {
	
	const [state,setState] = useState({
		list:[]
	})
	
	const [urlRequest,setUrlRequest] = useState({
		url:"",
		request:{},
		action:""
	})
	
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
						getList()
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
					default:
						return;
				}
			}
		}
		
		fetchData();
		
	},[urlRequest])
	
	//REST API
	
	const getList = () => {
		setUrlRequest({
			url:"/api/shopping",
			request:{
				method:"GET"
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
					"Content-type":"application/json"
				},
				body:JSON.stringify(item)
			},
			action:"additem"
		})
	}
	
	return (
		<div className="App">

		</div>
	);
}

export default App;
