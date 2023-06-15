import { useSelector } from "react-redux";
import { useVerifyToken } from "./useVerifyToken";

export const useAuth = () => {
  const auth = useSelector((state) => state?.auth);
  const verifyToken = useVerifyToken();

  return auth?.accessToken && verifyToken ? true : false;
};
