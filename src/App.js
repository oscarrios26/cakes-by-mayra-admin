import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./screens/Home/Home";
import Cakes from "./screens/Cakes/Cakes";
import Cookies from "./screens/Cookies/Cookies";
import LogIn from "./screens/LogIn/LogIn";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<LogIn />} />
				<Route path="/cakes" element={<Cakes />} />
				<Route path="/cookies" element={<Cookies />} />
				<Route path="/home" element={<Home />} />
			</Routes>
		</div>
	);
}

export default App;
