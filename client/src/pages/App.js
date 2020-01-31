import React from "react";
import withRoot from "../withRoot";
import Header from "../components/Layout/Header";
import Map from "../components/Map/Map";

const App = () => {
  return (
    <>
      <Header />
      <Map />
    </>
  );
};

export default withRoot(App);
