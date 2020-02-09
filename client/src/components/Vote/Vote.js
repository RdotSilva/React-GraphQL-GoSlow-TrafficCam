import React, { useState, useContext } from "react";
import { withStyles } from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";

import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

import {
  ADD_VOTE_MUTATION,
  REMOVE_VOTE_MUTATION
} from "../../graphql/mutations";

import { useClient } from "../../hooks/useClient";
import Context from "../../context/context";

const Vote = ({ classes }) => {
  return (
    <>
      <IconButton onClick={handleAddVote} className={classes.sendButton}>
        <ArrowUpwardIcon />
      </IconButton>
      <IconButton onClick={handleRemoveVote} className={classes.sendButton}>
        <ArrowDownwardIcon />
      </IconButton>
    </>
  );
};

const styles = theme => ({
  form: {
    display: "flex",
    alignItems: "center"
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  clearButton: {
    padding: 0,
    color: "red"
  },
  sendButton: {
    padding: 0,
    color: theme.palette.secondary.dark
  }
});

export default withStyles(styles)(Vote);
