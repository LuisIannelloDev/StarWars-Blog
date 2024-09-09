import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css"

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<Link to="/">
				<img 
            src="https://img.icons8.com/?size=100&id=21576&format=png&color=000000" 
            alt="Logo" 
            className="navbar-brand mb-0 h1" 

            />
			</Link>
			<div className="ml-auto">
				<Link to="/demo">
					<button className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">Favorites</button>
				</Link>
			</div>
		</nav>
	);
};
