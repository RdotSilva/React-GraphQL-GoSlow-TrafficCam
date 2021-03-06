const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    _id: ID
    name: String
    email: String
    picture: String
  }

  type Pin {
    _id: ID
    createdAt: String
    title: String
    type: String
    content: String
    image: String
    latitude: Float
    longitude: Float
    author: User
    comments: [Comment]
    votes: [User]
  }

  type Comment {
    text: String
    createdAt: String
    author: User
  }

  input CreatePinInput {
    title: String
    image: String
    type: String
    content: String
    latitude: Float
    longitude: Float
  }

  type Query {
    me: User
    getPins: [Pin!]
  }

  type Mutation {
    createPin(input: CreatePinInput!): Pin
    deletePin(pinId: ID!): Pin
    createComment(pinId: ID!, text: String!): Pin
    addVote(pinId: ID!, userId: ID!): Pin
    removeVote(pinId: ID!, userId: ID!): Pin
  }

  type Subscription {
    pinAdded: Pin
    pinDeleted: Pin
    pinUpdated: Pin
  }
`;
