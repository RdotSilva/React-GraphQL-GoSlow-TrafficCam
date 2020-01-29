const user = {
  _id: "1",
  name: "Ryan",
  email: "ryan@ryan.com",
  picture: "www.fake.com"
};

module.exports = {
  Query: {
    me: () => user
  }
};
