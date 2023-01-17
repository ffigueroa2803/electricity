import { useLayoutEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { userLoggedIn } from "../features/auth/authSlice"

export const useAuthCheck = () => {

  const dispatch = useDispatch()
  const [authChecked, setAuthChecked] = useState(false)

  useLayoutEffect(() => {

    const localAuth = localStorage.getItem("auth")

    if (localAuth) {
      const auth = JSON.parse(localAuth)
      if (auth?.accessToken) {
        dispatch(userLoggedIn({ accessToken: auth.accessToken, }))
      }
    }

    setAuthChecked(true)

  }, [dispatch, setAuthChecked])

  return authChecked
}
