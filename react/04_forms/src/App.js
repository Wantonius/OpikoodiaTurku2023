import {useState} from 'react';
import './App.css';
import NameForm from './NameForm';

function App() {
	
	const [state,setState] = useState({
		greeting:"No greeting yet"
	})
	
	const setGreeting = (name) => {
		setState({
			greeting:"Hello "+name
		})
	}
	
	return (
		<div className="App">
			<NameForm setGreeting={setGreeting}/>
			<h2>{state.greeting}</h2>
		</div>
	);
}

export default App;
