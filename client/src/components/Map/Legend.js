import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PlaceTwoTone from "@material-ui/icons/PlaceTwoTone";

const Legend = () => {
  return <div></div>;
};

const styles = {
  root: {
    display: "flex"
  },
  legend: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
    width: 100,
    height: 100,
    backgroundColor: "white",
    borderRadius: 5
  }
};

export default withStyles(styles)(Legend);
