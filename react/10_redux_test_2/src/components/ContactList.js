import {useDispatch,useSelector} from 'react-redux';

const ContactList = (props) => {
	
	const listSelector = (state) => state.list
	const list = useSelector(listSelector);
	const dispatch = useDispatch();
	
	const contacts = list.map((contact) => {
		return (
			<tr key={contact.id}>
				<td>{contact.firstname}</td>
				<td>{contact.lastname}</td>
				<td>{contact.email}</td>
				<td>{contact.phone}</td>
				<td><button onClick={() => dispatch({
					type:"REMOVE_CONTACT",
					id:contact.id
				})}>Remove</button></td>
			</tr>
		)
	})
	return(
		<table>
			<thead>
				<tr>
					<th>First Name</th>
					<th>Last Name</th>
					<th>Email</th>
					<th>Phone</th>
					<th>Remove</th>
				</tr>
			</thead>
			<tbody>
			{contacts}
			</tbody>
		</table>
	)
}

export default ContactList;