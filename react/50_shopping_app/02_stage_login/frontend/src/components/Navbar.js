import {Link} from 'react-router-dom'

const Navbar = (props) => {
	if(props.isLogged) {
		return(
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<p className="navbar-brand" style={{marginLeft:10}}>Shopping App</p>
				<ul className="navbar-nav">
					<li className="nav-item" style={{marginLeft:10}}>
						<Link className="nav-link" to="/">Shopping List</Link>
					</li>
					<li className="nav-item" style={{marginLeft:10}}>
						<Link className="nav-link" to="/form">Add new item</Link>
					</li>
					<li className="nav-item" style={{marginLeft:10}}>
						<p style={{color:"blue"}} className="nav-link">Logged in as {props.user}</p>
					</li>
					<li className="nav-item" style={{marginLeft:10}}>
						<Link className="nav-link" to="/" onClick={props.logout}>Logout</Link>
					</li>
				</ul>
			</nav>
		)
	} else {
		return(
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<p className="navbar-brand" style={{marginLeft:10}}>Shopping App</p>
			</nav>
		)
	}
}

export default Navbar;