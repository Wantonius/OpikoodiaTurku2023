import logo from './logo.svg';
import './App.css';
import {useSelector,useDispatch} from 'react-redux';

function App() {
	
	const dispatch = useDispatch();
	const countSelector = (state) => state.count;
	const count = useSelector(countSelector);
	
	const increment = () => {
		dispatch({
			type:"INCREMENT"
		})
	}
	
	const decrement = () => {
		dispatch({
			type:"DECREMENT"
		})
	}
	
	return (
		<div className="App">
			<h2>Current count:{count}</h2>
			<button onClick={increment}>+</button>
			<button onClick={decrement}>-</button>
		</div>
	);
}

export default App;
