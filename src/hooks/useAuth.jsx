import { useSelector } from "react-redux"

export const useAuth = () => {

  const auth = useSelector((state) => state.auth)

  if (auth?.accessToken) {
    return true
  } else {
    return false
  }
}
