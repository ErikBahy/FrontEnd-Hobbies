import axios from "axios";
import { Auth } from "aws-amplify";
export const url =
  "https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev";

export const getMongoIdFromCognitoId = async (cognitoId) => {
  const userAuth = await Auth.currentAuthenticatedUser();
  const token = userAuth.signInUserSession.idToken.jwtToken;
  const requestInfo = {
    headers: {
      Authorization: token,
    },
  };
  const res = await axios.get(
    `https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/userCognitoForErikWithLove/${cognitoId}`,
    requestInfo
  );

  return res.data._id;
};
export const getUserFromCognitoId = async (cognitoId) => {
  const userAuth = await Auth.currentAuthenticatedUser();
  const token = userAuth.signInUserSession.idToken.jwtToken;
  const requestInfo = {
    headers: {
      Authorization: token,
    },
  };
  const res = await axios.get(
    `https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/userCognitoForErikWithLove/${cognitoId}`,
    requestInfo
  );

  return res.data;
};
export const getUserFromDatabase = async (cognitoId) => {
  const userAuth = await Auth.currentAuthenticatedUser();
  const token = userAuth.signInUserSession.idToken.jwtToken;
  const requestInfo = {
    headers: {
      Authorization: token,
    },
  };
  const res = await axios.get(
    `https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/userCognitoForErikWithLove/${cognitoId}`,
    requestInfo
  );

  return res.data;
};

export const addUser = async () => {
  const userAuth = await Auth.currentAuthenticatedUser();
  const token = userAuth.signInUserSession.idToken.jwtToken;
  const requestInfo = {
    headers: {
      Authorization: token,
    },
  };
  const currentUser = await Auth.currentAuthenticatedUser();
  // const token = user.signInUserSession.idToken.jwtToken;
  const userId = currentUser.attributes.sub;
  const username = currentUser.username;

  axios.post(
    `https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/chechandpost/user/${userId}`,
    {
      username: username,
      location: "",
      bio: "",
      prfilePicture: "",
    },
    requestInfo
  );
};

export const getCurrentUserId = async () => {
  const currentUser = await Auth.currentAuthenticatedUser();

  const userId = currentUser.attributes.sub;

  return userId;
};
export const checkFollow = async (currentUserMongoId, userMongoId) => {
  const userAuth = await Auth.currentAuthenticatedUser();
  const token = userAuth.signInUserSession.idToken.jwtToken;
  const requestInfo = {
    headers: {
      Authorization: token,
    },
  };
  const res = await axios.get(
    `https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/boolIfFollows/${currentUserMongoId}/${userMongoId}`,
    requestInfo
  );

  return await res.data;
};
export const checkLike = async (currentUserMongoId, postId) => {
  const userAuth = await Auth.currentAuthenticatedUser();
  const token = userAuth.signInUserSession.idToken.jwtToken;
  const requestInfo = {
    headers: {
      Authorization: token,
    },
  };
  const res = await axios.get(
    `https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/boolIfLikes/${currentUserMongoId}/${postId}`,
    requestInfo
  );

  return await res.data;
};
export const checkJoin = async (currentUserMongoId, postId) => {
  const userAuth = await Auth.currentAuthenticatedUser();
  const token = userAuth.signInUserSession.idToken.jwtToken;
  const requestInfo = {
    headers: {
      Authorization: token,
    },
  };
  const res = await axios.get(
    `https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/boolIfJoined/${currentUserMongoId}/${postId}`,
    requestInfo
  );

  return await res.data;
};

export const getUserFollowers = async (userMongoId) => {
  const userAuth = await Auth.currentAuthenticatedUser();
  const token = userAuth.signInUserSession.idToken.jwtToken;
  const requestInfo = {
    headers: {
      Authorization: token,
    },
  };
  const followers = await axios.get(
    `https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/yourfollowers/${userMongoId}`,
    requestInfo
  );

  return await followers.data;
};

export const getUserFollowed = async (userMongoId) => {
  const userAuth = await Auth.currentAuthenticatedUser();
  const token = userAuth.signInUserSession.idToken.jwtToken;
  const requestInfo = {
    headers: {
      Authorization: token,
    },
  };
  const followed = await axios.get(
    `https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/yourfollowed/${userMongoId}`,
    requestInfo
  );

  return await followed.data;
};

export const updateUserInfo = async (
  mongoId,
  newBio,
  newLocation,
  newProfilePicture,
  setuserDetailsEffect,
  userDetailsEffect,
  called
) => {
  let body = {};
  if (newBio) {
    body.bio = newBio;
  }
  if (newLocation) {
    body.location = newLocation;
  }
  if (newProfilePicture) {
    body.prfilePicture = newProfilePicture;
  }
  const userAuth = await Auth.currentAuthenticatedUser();
  const token = userAuth.signInUserSession.idToken.jwtToken;
  const requestInfo = {
    headers: {
      Authorization: token,
    },
  };
  await axios.patch(
    `https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/user/put/${mongoId}`,
    body,
    requestInfo
  );
  if (called === "userdetails") {
    setuserDetailsEffect(!userDetailsEffect);
  }
};
