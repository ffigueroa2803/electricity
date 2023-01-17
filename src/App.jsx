import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RouterProvider } from "react-router-dom"

import { useAuth } from "./hooks/useAuth"
import { useAuthCheck } from "./hooks/useAuthCheck"
import { themeSetColor, themeSetMode } from "./features/theme/themeSlice"
import { RootRouter } from "./routers/RootRouter"
import { PublicRouter } from "./routers/PublicRouter"
import "./App.css"

const App = () => {

  const { currentMode } = useSelector((state) => state?.theme)

  const dispatch = useDispatch()

  const isLoggedIn = useAuth()
  const authChecked = useAuthCheck()

  useEffect(() => {
    const currentThemeMode = localStorage.getItem("themeMode")
    const currentThemeColor = localStorage.getItem("colorMode")
    if (currentThemeMode && currentThemeColor) {
      dispatch(themeSetMode(currentThemeMode))
      dispatch(themeSetColor(currentThemeColor))
    }
  }, [dispatch])


  return !authChecked ? (
    <div>Checking Authentication</div>
  ) : (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      {isLoggedIn ? <RouterProvider router={RootRouter} /> : <RouterProvider router={PublicRouter} />}
    </div>
  )
}

export default App