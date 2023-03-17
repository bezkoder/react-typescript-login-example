import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import IUser from "./types/user.type";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/UserBoard";
import BoardModerator from "./components/ModeratorBoard";
import BoardAdmin from "./components/AdminBoard";

import EventBus from "./common/EventBus";

type State = {
	showModeratorBoard: boolean;
	showAdminBoard: boolean;
	currentUser: IUser | undefined;
};

const App = () => {
	const [state, setState] = useState<State>({
		showModeratorBoard: false,
		showAdminBoard: false,
		currentUser: undefined,
	});

	useEffect(() => {
		const user = AuthService.getCurrentUser();
		if (user) {
			setState({
				currentUser: user,
				showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
				showAdminBoard: user.roles.includes("ROLE_ADMIN"),
			});
		}
		EventBus.on("logout", logOut);
		return () => {
			EventBus.remove("logout", logOut);
		};
	}, []);

	const logOut = () => {
		AuthService.logout();
		setState({
			showModeratorBoard: false,
			showAdminBoard: false,
			currentUser: undefined,
		});
	};

	const { currentUser, showModeratorBoard, showAdminBoard } = state;

	return (
		<div>
			<nav className="navbar navbar-expand navbar-dark bg-dark">
				<Link to={"/"} className="navbar-brand">
					bezKoder
				</Link>
				<div className="navbar-nav mr-auto">
					<li className="nav-item">
						<Link to={"/home"} className="nav-link">
							Home
						</Link>
					</li>

					{showModeratorBoard && (
						<li className="nav-item">
							<Link to={"/mod"} className="nav-link">
								Moderator Board
							</Link>
						</li>
					)}

					{showAdminBoard && (
						<li className="nav-item">
							<Link to={"/admin"} className="nav-link">
								Admin Board
							</Link>
						</li>
					)}

					{currentUser && (
						<li className="nav-item">
							<Link to={"/user"} className="nav-link">
								User
							</Link>
						</li>
					)}
				</div>

				{currentUser ? (
					<div className="navbar-nav ml-auto">
						<li className="nav-item">
							<Link to={"/profile"} className="nav-link">
								{currentUser.username}
							</Link>
						</li>
						<li className="nav-item">
							<a
								href="/login"
								className="nav-link"
								onClick={logOut}
							>
								LogOut
							</a>
						</li>
					</div>
				) : (
					<div className="navbar-nav ml-auto">
						<li className="nav-item">
							<Link to={"/login"} className="nav-link">
								Login
							</Link>
						</li>

						<li className="nav-item">
							<Link to={"/register"} className="nav-link">
								Sign Up
							</Link>
						</li>
					</div>
				)}
			</nav>

			<div className="container mt-3">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/home" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/user" element={<BoardUser />} />
					<Route path="/mod" element={<BoardModerator />} />
					<Route path="/admin" element={<BoardAdmin />} />
				</Routes>
			</div>

			{/*<AuthVerify logOut={this.logOut}/> */}
		</div>
	);
};

export default App;
