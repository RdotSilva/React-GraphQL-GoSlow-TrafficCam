export const CREATE_PIN_MUTATION = `
mutation($title: String!, $image: String!, $type: String!, $content: String!, $latitude: Float!, $longitude: Float!) {
  createPin(input: {
    title: $title, 
    image: $image,
    type: $type,
    content: $content,
    latitude: $latitude,
    longitude: $longitude
  }) {
    _id
    createdAt
    title
    image
    type
    content
    latitude
    longitude
    author {
      _id
      name
      email
      picture
    }
  }
}
`;

export const DELETE_PIN_MUTATION = `
  mutation($pinId: ID!) {
    deletePin(pinId: $pinId) {
      _id
    }
  }
`;

export const CREATE_COMMENT_MUTATION = `
mutation($pinId: ID!, $text: String!) {
  createComment(pinId: $pinId, text: $text) {
    _id
    createdAt
    title
    content
    type
    image
    latitude
    longitude
    author {
      _id
      name
    }
    comments {
      text
      createdAt
      author {
        name
        picture
      }
    }
  }
}
`;

export const ADD_VOTE_MUTATION = `
mutation($pinId: ID!, $userId: ID!) {
  addVote(pinId: $pinId, userId: $userId) {
    _id
    createdAt
    title
    content
    type
    image
    latitude
    longitude
    author {
      _id
      name
    }
    comments {
      text
      createdAt
      author {
        name
        picture
      }
    }
    votes {
      _id
    }
  }
}
`;

export const REMOVE_VOTE_MUTATION = `
mutation($pinId: ID!, $userId: ID!) {
  removeVote(pinId: $pinId, userId: $userId) {
    _id
    createdAt
    title
    content
    type
    image
    latitude
    longitude
    author {
      _id
      name
    }
    comments {
      text
      createdAt
      author {
        name
        picture
      }
    }
    votes {
      _id
    }
  }
}
`;
