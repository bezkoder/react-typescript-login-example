import { useState, useEffect } from "react";

import UserService from "../services/user.service";

type State = {
	content: string;
};

const Home = () => {
	const [state, setState] = useState<State>({ content: "" });

	useEffect(() => {
		UserService.getPublicContent().then(
			(response) => {
				setState({
					content: response.data,
				});
			},
			(error) => {
				setState({
					content:
						(error.response && error.response.data) ||
						error.message ||
						error.toString(),
				});
			}
		);
	}, []);

	return (
		<div className="container">
			<header className="jumbotron">
				<h3>{state.content}</h3>
			</header>
		</div>
	);
};
export default Home;
