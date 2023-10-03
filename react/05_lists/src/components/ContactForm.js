import {useState} from 'react';

const ContactForm = (props) => {
	
	const [state,setState] = useState({
		firstname:"",
		lastname:"",
		email:"",
		phone:""
	})
	
	const onChange = (event) => {
		setState((state) => {
			return {
				...state,
				[event.target.name]:event.target.value
			}
		}
	}
	
	const onSubmit = (event) => {
		event.preventDefault();
		let contact = {
			...state
		}
		props.addContact(contact);
		setState({
			firstname:"",
			lastname:"",
			email:"",
			phone:""
		})
	}
}

export default ContactForm;