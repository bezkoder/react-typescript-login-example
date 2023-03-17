import { useState, useEffect } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";


type State = {
  content: string;
}

const BoardAdmin =() => {
  const [state, setState] = useState<State>({content: ""})

  useEffect(() => {
    UserService.getAdminBoard().then(
      response => {
        setState({
          content: response.data
        });
      },
      error => {
        setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []) 


    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{state?.content}</h3>
        </header>
      </div>
    );
}
export default BoardAdmin;
