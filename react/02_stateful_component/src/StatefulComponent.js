import {useState,useEffect} from 'react';

const StatefulComponent = (props) => {
	
	const [state,setState] = useState({
		seconds:0
	})
	
	const tick = () => {
		setState((state) => {
			return {
				seconds:state.seconds+1
			}
		})
	}
	
	useEffect(() => {
		let interval = setInterval(tick,1000);
		
		return () => clearInterval(interval);
	},[]);
	
	return(
		<h2>{state.seconds} seconds since you entered the page</h2>
	)
	
}

export default StatefulComponent;