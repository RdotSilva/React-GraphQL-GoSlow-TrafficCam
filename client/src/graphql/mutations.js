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
