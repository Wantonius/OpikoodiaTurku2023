import {useState} from 'react';

const ShoppingList = (props) => {
	
	const [state,setState] = useState({
		removeIndex:-1,
		editIndex:-1
	})
	
	const changeMode = (mode,index) => {
		if(mode === "remove") {
			setState({
				removeIndex:index,
				editIndex:-1
			})
		}
		if(mode === "edit") {
			setState({
				removeIndex:-1,
				editIndex:index
			})
		}
		if(mode === "cancel") {
			setState({
				removeIndex:-1,
				editIndex:-1
			})
		}
	}
	
	const removeItem = (id) => {
		props.removeItem(id);
		changeMode("cancel");
	}
	
	const editItem = (item) => {
		props.editItem(item);
		changeMode("cancel");
	}
	
	const items = props.list.map((item,index) => {
		
	})
}

export default ShoppingList;