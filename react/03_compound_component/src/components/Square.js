const Square = (props) => {

	let squareStyle = {
		backgroundColor:props.color,
		height:150
	}
	
	return (
		<div style={squareStyle}/>
	)
}

export default Square