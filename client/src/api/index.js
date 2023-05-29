import axios from "axios";

export const baseURL =
  "http://127.0.0.1:5001/food-delivery-app-a85ec/us-central1/app";

export const validateUserJWTToken = async (token) => {
  try {
    // We are connection with server/routes/user.js file here
    const res = await axios.get(`${baseURL}/api/users/jwtVerification`, {
      headers: { Authorization: "Bearer " + token },
    });

    return res.data.data; // data : decodedValue
  } catch (err) {
    return null;
  }
};
