import React, { useState, useEffect, useContext } from "react";
import ReactMapGL, { NavigationControl, Marker, Popup } from "react-map-gl";
import { withStyles } from "@material-ui/core/styles";
import PinIcon from "./PinIcon";
import Blog from "../Blog/Blog";
import differenceInMinutes from "date-fns/differenceInMinutes";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";
import Context from "../../context/context";
import { useClient } from "../../hooks/useClient";
import { GET_PINS_QUERY } from "../../graphql/queries";
import { DELETE_PIN_MUTATION } from "../../graphql/mutations";
import { useSubscription } from "@apollo/react-hooks";
import {
  PIN_ADDED_SUBSCRIPTION,
  PIN_DELETED_SUBSCRIPTION,
  PIN_UPDATED_SUBSCRIPTION
} from "./../../graphql/subscriptions";

const INITIAL_VIEWPORT = {
  latitude: 37.7577,
  longitude: -122.4376,
  zoom: 13
};

const Map = ({ classes }) => {
  const client = useClient();
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    getPins();
  }, []);

  const [viewport, setViewport] = useState(INITIAL_VIEWPORT);

  const [userPosition, setUserPosition] = useState(null);
  useEffect(() => {
    getUserPosition();
  }, []);

  const [popup, setPopup] = useState(null);

  const getPins = async () => {
    const { getPins } = await client.request(GET_PINS_QUERY);
    dispatch({ type: "GET_PINS", payload: getPins });
  };

  const getUserPosition = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        setViewport({ ...viewport, latitude, longitude });
        setUserPosition({ latitude, longitude });
      });
    }
  };

  // Handle a left click event on the map. Add a draft pin when user clicks map.
  const handleMapClick = event => {
    const { lngLat, leftButton, target } = event;

    if (!leftButton || target.childNodes.length < 1) return;
    if (!state.draft) {
      dispatch({ type: "CREATE_DRAFT" });
    }

    const [longitude, latitude] = lngLat;

    dispatch({
      type: "UPDATE_DRAFT_LOCATION",
      payload: { longitude, latitude }
    });
  };

  // Check if a pin has been added recently added and highlight in different color for recently added pins.
  const highlightNewPin = pin => {
    const minutesSincePinAdded = 30;
    const isNewPin =
      differenceInMinutes(Date.now(), Number(pin.createdAt)) <=
      minutesSincePinAdded;

    return isNewPin ? "limegreen" : "darkblue";
  };

  const handleSelectPin = pin => {
    setPopup(pin);
    dispatch({ type: "SET_PIN", payload: pin });
  };

  const isAuthUser = () => state.currentUser._id === popup.author._id;

  const handleDeletePin = async pin => {
    const variables = { pinId: pin._id };

    const { deletePin } = await client.request(DELETE_PIN_MUTATION, variables);

    dispatch({ type: "DELETE_PIN", payload: deletePin });

    setPopup(null);
  };

  // GraphQL subscriptions
  useSubscription(PIN_ADDED_SUBSCRIPTION, {
    onSubscriptionData: ({ subscriptionData }) => {
      const { pinAdded } = subscriptionData.data;
      console.log({ pinAdded });
      dispatch({ type: "CREATE_PIN", payload: pinAdded });
    }
  });

  useSubscription(PIN_DELETED_SUBSCRIPTION, {
    onSubscriptionData: ({ subscriptionData }) => {
      const { pinDeleted } = subscriptionData.data;
      console.log({ pinDeleted });
      dispatch({ type: "DELETE_PIN", payload: pinDeleted });
    }
  });

  return (
    <div className={classes.root}>
      <ReactMapGL
        width="100vw"
        height="calc(100vh - 64px)"
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxApiAccessToken="pk.eyJ1IjoicmRvdHNpbHZhIiwiYSI6ImNrNjJwNHl3NjBndGEzZXIwNDVrM3hhOXAifQ.xyMmyqimZBA6XtUG7oUUjQ"
        onViewportChange={newViewport => setViewport(newViewport)}
        onClick={handleMapClick}
        {...viewport}
      >
        {/* Navigation Control */}
        <div className={classes.navigationControl}>
          <NavigationControl
            nViewportChange={newViewport => setViewport(newViewport)}
          />
        </div>
        {/* Pin for User's Current Position */}
        {userPosition && (
          <Marker
            latitude={userPosition.latitude}
            longitude={userPosition.longitude}
            offsetLeft={-19}
            offsetTop={-37}
          >
            <PinIcon size={40} color="red" label="Your Location"></PinIcon>
          </Marker>
        )}
        {/* Draft Pin */}
        {state.draft && (
          <Marker
            latitude={state.draft.latitude}
            longitude={state.draft.longitude}
            offsetLeft={-19}
            offsetTop={-37}
          >
            <PinIcon size={40} color="hotpink" label="Draft Pin"></PinIcon>
          </Marker>
        )}
        {/* Created Pins */}
        {state.pins.map(pin => (
          <Marker
            key={pin._id}
            latitude={pin.latitude}
            longitude={pin.longitude}
            offsetLeft={-19}
            offsetTop={-37}
          >
            <PinIcon
              onClick={() => handleSelectPin(pin)}
              size={40}
              color={highlightNewPin(pin)}
              label={pin.type}
            />
          </Marker>
        ))}
        {/* Popup Dialog for Created Pins */}
        {popup && (
          <Popup
            anchor="top"
            latitude={popup.latitude}
            longitude={popup.longitude}
            closeOnClick={false}
            onClose={() => setPopup(null)}
          >
            <img
              className={classes.popupImages}
              src={popup.image}
              alt={popup.title}
            />
            <div className={classes.popupTab}>
              <Typography>
                {popup.latitude.toFixed(6)}, {popup.longitude.toFixed(6)}
              </Typography>
              {isAuthUser() && (
                <Button onClick={() => handleDeletePin(popup)}>
                  <DeleteForeverTwoToneIcon className={classes.deleteIcon} />
                </Button>
              )}
            </div>
          </Popup>
        )}
      </ReactMapGL>
      {/* Subscriptions for Creating / Updating / Deleting pins. */}
      {/* <Subscription
        subscription={PIN_UPDATED_SUBSCRIPTION}
        onSubscriptionData={({ subscriptionData }) => {
          const { pinUpdated } = subscriptionData.data;
          console.log({ pinUpdated });
          dispatch({ type: "CREATE_COMMENT", payload: pinUpdated });
        }}
      /> */}
      <Blog />
    </div>
  );
};

const styles = {
  root: {
    display: "flex"
  },
  rootMobile: {
    display: "flex",
    flexDirection: "column-reverse"
  },
  navigationControl: {
    position: "absolute",
    top: 0,
    left: 0,
    margin: "1em"
  },
  deleteIcon: {
    color: "red",
    height: 40,
    width: 40
  },
  popupImage: {
    padding: "0.4em",
    height: 200,
    width: 200,
    objectFit: "cover"
  },
  popupTab: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  }
};

export default withStyles(styles)(Map);
