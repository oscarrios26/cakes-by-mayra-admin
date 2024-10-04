import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./screens/Home/Home";
import Cakes from "./screens/Cakes/Cakes";
import Cookies from "./screens/Cookies/Cookies";
import LogIn from "./screens/LogIn/LogIn";
import CakeDetails from "./screens/CakeDetails/CakeDetails";
import CookieDetails from "./screens/CookieDetails/CookieDetails";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<LogIn />} />
				<Route path="/cakes" element={<Cakes />} />
				<Route path="/cookies" element={<Cookies />} />
				<Route path="/home" element={<Home />} />
				<Route path="/cakes/:id" element={<CakeDetails />} />
				<Route path="/cookies/:id" element={<CookieDetails />} />
			</Routes>
		</div>
	);
}

export default App;
