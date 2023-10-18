import logo from './logo.svg';
import './App.css';
import {useState,useEffect} from 'react';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import {Route,Routes,Navigate} from 'react-router-dom';

function App() {
	
	//RENDERING
	
	let message = <></>
	if(state.loading) {
		message = <h4>Loading...</h4>
	}
	if(state.error) {
		message = <h4>{state.error}</h4>
	}
	if(state.isLogged) {
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
