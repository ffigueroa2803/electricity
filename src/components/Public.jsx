import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

const Public = ({ children }) => {
    const isLoggedIn = useAuth()
    return !isLoggedIn ? children : <Navigate to="/dashboard" />
}

export default Public