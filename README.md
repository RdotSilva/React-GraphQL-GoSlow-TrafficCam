# React GraphQL Go Slow Traffic Map

React Web application using GraphQL that allows users to track traffic cameras.

Users select an area on the map to add a new camera pin. The pin contains traffic camera data including title, description, and an image of the camera (uploaded by a user). Each camera pin will have voting system where users can vote a camera up or down. Users can comment on a traffic camera pin to let others know if the camera is still active, moved to a new location, or is currently broken.

### Prerequisites

You must create a config file with your environment variables.

1. Create a new file in the root folder: .env

2. Add variables

```
MONGO_URI=YOUR_MONGO_URI

OAUTH_CLIENT_ID=YOUR_OAUTH_CLIENT

```

## Installation

1. Install dependencies in main project folder.

```
npm install
```

2. Install dependencies in client folder.

```
cd client

npm install
```

## Running the servers

This projects uses concurrently to run the Node and React servers together.

Make sure you are in the project root directory before executing any of these commands.

Start development server.

```
npm run dev
```

Start production server.

```
npm start
```

## Built With

- React
- JavaScript
- NodeJS
- GraphQL
- Apollo Server
- Apollo Client (hooks)
- MongoDB Atlas
- Mapbox GL
- Material UI
- VSCode

## Screenshots

![Coming Soon](https://upload.wikimedia.org/wikipedia/commons/8/80/Comingsoon.png "Coming Soon")
