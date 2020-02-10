import React, { useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ScheduleTwoToneIcon from "@material-ui/icons/ScheduleTwoTone";
import PersonOutlineTwoToneIcon from "@material-ui/icons/PersonOutlineTwoTone";
import Context from "../../context/context";
import SpeedTwoToneIcon from "@material-ui/icons/SpeedTwoTone";
import TrafficTwoToneIcon from "@material-ui/icons/TrafficTwoTone";
import NotListedLocationTwoToneIcon from "@material-ui/icons/NotListedLocationTwoTone";
import format from "date-fns/format";
import CreateComment from "../Comments/CreateComment";
import Comments from "../Comments/Comments";
import Vote from "../Vote/Vote";

const PinContent = ({ classes }) => {
  const { state } = useContext(Context);

  const {
    title,
    content,
    type,
    author,
    createdAt,
    comments,
    votes
  } = state.currentPin;

  // Check what type of camera and return the correct Icon.
  const checkCameraType = cameraType => {
    switch (cameraType) {
      case "speed":
        return <SpeedTwoToneIcon />;
        break;
      case "light":
        return <TrafficTwoToneIcon />;
        break;
      case "other":
        return <NotListedLocationTwoToneIcon />;
        break;
      default:
        break;
    }
  };

  return (
    <div className={classes.root}>
      <Typography component="h2" variant="h4" color="primary" gutterBottom>
        {title}
      </Typography>
      <Typography>
        <PersonOutlineTwoToneIcon className={classes.icon} />
        {author.name}
      </Typography>
      <Typography
        className={classes.text}
        variant="subtitle2"
        color="inherit"
        gutterBottom
      >
        {checkCameraType(type)}
      </Typography>
      <Typography
        className={classes.text}
        variant="subtitle2"
        color="inherit"
        gutterBottom
      >
        <ScheduleTwoToneIcon className={classes.icon} />
        {format(Number(createdAt), "MM dd, yyyy H mm a")}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {content}
      </Typography>
      {/* Votes */}
      <Vote /> {votes.length}
      {/* Popup Dialog for Created Pins */}
      <CreateComment />
      <Comments comments={comments} />
    </div>
  );
};

const styles = theme => ({
  root: {
    padding: "1em 0.5em",
    textAlign: "center",
    width: "100%"
  },
  icon: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  text: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default withStyles(styles)(PinContent);
