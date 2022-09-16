import axios from "axios";
import { Auth } from "aws-amplify";
export const url =
  "https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev";

export const getMongoIdFromCognitoId = async (cognitoId) => {
  const res = await axios.get(
    `https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/userCognitoForErikWithLove/${cognitoId}`
  );

  return res.data._id;
};
export const getUserFromCognitoId = async (cognitoId) => {
  const res = await axios.get(
    `https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/userCognitoForErikWithLove/${cognitoId}`
  );

  return res.data;
};
export const getUserFromDatabase = async (cognitoId) => {
  const res = await axios.get(
    `https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/userCognitoForErikWithLove/${cognitoId}`
  );

  console.log(res.data, "cognito idfrom context");
  return res.data;
};

export const addUser = async () => {
  const currentUser = await Auth.currentAuthenticatedUser();
  // const token = user.signInUserSession.idToken.jwtToken;
  const userId = currentUser.attributes.sub;
  const username = currentUser.username;
  console.log(username, "usernami robt");
  axios.post(
    `https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/chechandpost/user/${userId}`,
    {
      username: username,
      location: "",
      bio: "",
    }
  );
  console.log(userId);
};

export const getCurrentUserId = async () => {
  const currentUser = await Auth.currentAuthenticatedUser();

  const userId = currentUser.attributes.sub;

  return userId;
};
export const checkFollow = async (currentUserMongoId, userMongoId) => {
  const res = await axios.get(
    `https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/boolIfFollows/${currentUserMongoId}/${userMongoId}`
  );
  console.log(res.data, "res.data is followed or no");
  return await res.data;
};
