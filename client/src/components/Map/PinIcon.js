import React from "react";
import PlaceTwoTone from "@material-ui/icons/PlaceTwoTone";
import { withStyles } from "@material-ui/core/styles";

const PinIcon = ({ size, color, onClick, label, classes }) => (
  <div className={classes.center}>
    <PlaceTwoTone onClick={onClick} style={{ fontSize: size, color }} />
    <div>{label}</div>
  </div>
);
const styles = {
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontWeight: "bold"
  }
};

export default withStyles(styles)(PinIcon);
