import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PlaceTwoTone from "@material-ui/icons/PlaceTwoTone";

const Legend = ({ classes }) => {
  return (
    <div className={classes.legend}>
      <div>
        <PlaceTwoTone /> Speed Camera
      </div>
      <div>
        <PlaceTwoTone /> Light Camera
      </div>
      <div>
        <PlaceTwoTone /> Other Camera
      </div>
      <div className={classes.yourLocation}>
        <PlaceTwoTone /> Your Location
      </div>
    </div>
  );
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
    width: 150,
    height: 120,
    backgroundColor: "white",
    borderRadius: 5
  },
  yourLocation: {
    color: "#EA4335",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
};

export default withStyles(styles)(Legend);
