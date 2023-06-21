import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext"

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<button className="btn btn-primary">Go back home</button>
				</Link>
				<div className="ml-auto">
					{!store.token ? (
						<div>
						<Link to="/signup">
						<button className="btn btn-primary mx-3">Signup</button>
						</Link>
						<Link to="/login">
							<button className="btn btn-primary">Log in</button>
						</Link>
						</div>
						):
						<button onClick={() => { actions.logout() }} className="btn btn-primary">Log out</button>
					}
				</div>
			</div>
		</nav>
	);
};