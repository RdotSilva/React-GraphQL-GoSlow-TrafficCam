import React, { useContext } from "react";
import { GoogleLogin } from "react-google-login";
import { GraphQLClient } from "graphql-request";
import { withStyles } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";

import Context from "./../../context/context";

const ME_QUERY = `
{
  me {
    _id
    name
    email
    picture
  }
}
`;

const Login = ({ classes }) => {
  const { dispatch } = useContext(Context);

  const onSuccess = async googleUser => {
    const idToken = googleUser.getAuthResponse().id_token;

    // Setup GraphQL client using graphql-request package to avoid Apollo boilerplate
    const client = new GraphQLClient("http://localhost:4000/graphql", {
      headers: { authorization: idToken }
    });

    // Get current user auth info
    const { me } = await client.request(ME_QUERY);

    dispatch({ type: "LOGIN_USER", payload: me });
  };

  return (
    <GoogleLogin
      clientId="506161880294-2a62unmgu76hniod2gvk73llftkfqeaq.apps.googleusercontent.com"
      onSuccess={onSuccess}
      onFailure={onFailure}
      isSignedIn={true}
    />
  );
};

const styles = {
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  }
};

export default withStyles(styles)(Login);
