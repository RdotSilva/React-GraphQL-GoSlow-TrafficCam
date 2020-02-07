import React, { useContext, useReducer } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Context from "./context/context";
import reducer from "./context/reducer";

import App from "./pages/App";
import Splash from "./pages/Splash";
import ProtectedRoute from "./ProtectedRoute";

import "mapbox-gl/dist/mapbox-gl.css";
import * as serviceWorker from "./serviceWorker";

// Apollo imports
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { WebSocketLink } from "apollo-link-ws";
import { ApolloProvider } from "@apollo/react-hooks";

const wsLink = new WebSocketLink({
  uri: "ws://localhost:4000/graphql",
  options: {
    reconnect: true
  }
});

const client = new ApolloClient({
  link: wsLink,
  cache: new InMemoryCache()
});

const Root = () => {
  const initialState = useContext(Context);

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Router>
      <ApolloProvider client={client}>
        <Context.Provider value={{ state, dispatch }}>
          <Switch>
            <ProtectedRoute exact path="/" component={App} />
            <Route path="/login" component={Splash} />
          </Switch>
        </Context.Provider>
      </ApolloProvider>
    </Router>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));

serviceWorker.unregister();
