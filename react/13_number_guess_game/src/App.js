import logo from './logo.svg';
import './App.css';
import StartPage from './components/StartPage';
import GamePage from './components/GamePage';
import {Routes,Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
		<Routes>
			<Route path="/" element={<StartPage/>}/>
			<Route path="/game" element={<GamePage/>}/>
		</Routes>
    </div>
  );
}

export default App;
