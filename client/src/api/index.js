import axios from "axios";

const BASE_URL = "http://localhost:5001/food-app-e3b86/us-central1/app";
// localhost:5001/food-app-e3b86/us-central1/app/api/users/jwtVerification
export const validateUserJWTToken = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/users/jwtVerification`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(res.data);

    return res?.data?.data;
  } catch (err) {
    console.log(`Error : ${err}`);
  }
};
