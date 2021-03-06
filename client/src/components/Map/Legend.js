import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PlaceTwoTone from "@material-ui/icons/PlaceTwoTone";

const Legend = ({ classes }) => {
  return (
    <div className={classes.legend}>
      <div className={classes.speedCam}>
        <PlaceTwoTone /> Speed Camera
      </div>
      <div className={classes.lightCam}>
        <PlaceTwoTone /> Light Camera
      </div>
      <div className={classes.otherCam}>
        <PlaceTwoTone /> Other Camera
      </div>
      <div className={classes.yourLocation}>
        <PlaceTwoTone /> Your Location
      </div>
      <div className={classes.recentCam}>
        <PlaceTwoTone /> Recently Added
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
    width: 130,
    height: 120,
    backgroundColor: "white",
    borderRadius: 5
  },
  yourLocation: {
    color: "#EA4335",
    display: "flex",
    alignItems: "center"
  },
  speedCam: {
    color: "#262730",
    display: "flex",
    alignItems: "center"
  },
  lightCam: {
    color: "#B99E38",
    display: "flex",
    alignItems: "center"
  },
  otherCam: {
    color: "#7FB069",
    display: "flex",
    alignItems: "center"
  },
  recentCam: {
    color: "#3C91E6",
    display: "flex",
    alignItems: "center"
  }
};

export default withStyles(styles)(Legend);
