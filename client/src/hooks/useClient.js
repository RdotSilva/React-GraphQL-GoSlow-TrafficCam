// Custom hook that will create a new GraphQL client instance to use inside of any
// other component to send GraphQL requests.
import React, { useState, useEffect } from "react";
import { GraphQLClient } from "graphql-request";

// Uses local host in development. Change the production-url when deploying.
export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "production-url"
    : "http://localhost:4000/graphql";

export const useClient = () => {
  const [idToken, setIdToken] = useState("");

  useEffect(() => {
    // Get token from window and set token state.
    const token = window.gapi.auth2
      .getAuthInstance()
      .currentUser.get()
      .getAuthResponse().id_token;

    setIdToken(token);
  }, []);

  return new GraphQLClient(BASE_URL, {
    headers: { authorization: idToken }
  });
};
