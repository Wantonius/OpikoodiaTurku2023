import useGame from '../hooks/useGame';
import {useState} from 'react';

const StartPage = (props) => {
	
	const [state,setState] = useState({
		name:""
	})
	
	const {startGame,message} = useGame();
	
	const onChange = (event) => {
		setState({
			name:event.target.value
		})
	}
	
	const onSubmit = (event) => {
		event.preventDefault();
		startGame(state.name);
	}
	
	return(
		<div style={{margin:"auto"}}>
			<form onSubmit={onSubmit}>
				<label htmlFor="name">Player name</label>
				<input type="text"
						name="name"
						id="name"
						onChange={onChange}
						value={state.name}/>
				<br/>
				<input type="submit" value="Start"/>
			</form>
			<h3>{message}</h3>
		</div>
	)
}

export default StartPage;