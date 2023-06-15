import jwt_decode from "jwt-decode";

export const useVerifyToken = () => {
  try {
    const idToken = localStorage.getItem("auth");
    const userProfile = jwt_decode(idToken);
    const now = new Date().getTime() / 1000; // Date().getTime() returns milliseconds.
    // So divide by 1000 to get seconds
    if (now > userProfile.exp) {
      // user profile has expired.
      localStorage.removeItem("auth");
      localStorage.clear();
      return null;
    }
    return userProfile;
  } catch (err) {
    return null;
  }
};
