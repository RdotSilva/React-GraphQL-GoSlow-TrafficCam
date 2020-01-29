const User = require("../models/User");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);

// Find a user in DB or create a new user if they don't exist
exports.findOrCreateUser = async token => {
  // Verify auth token
  const googleUser = await verifyAuthToken(token);

  // Check if user exists
  const user = await checkIfUserExists(googleUser.email);

  // If user exists return them otherwise create new user in DB
  return user ? user : createNewUser(googleUser);
};

// Verify the auth token from google OAUTH
const verifyAuthToken = async token => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.OAUTH_CLIENT_ID
    });

    // Return the google user
    return ticket.getPayload();
  } catch (err) {
    console.error(`Error verifying auth token`, err);
  }
};

// Check if user exists in DB by checking email
const checkIfUserExists = async email => {
  const result = await User.findOne({ email }).exec();
  return result;
};

// Create new user if they don't exist in DB
const createNewUser = googleUser => {
  const { name, email, picture } = googleUser;
  const user = { name, email, picture };

  return new User(user).save();
};
