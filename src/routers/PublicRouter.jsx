import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import { Forgot, Login } from "../pages"
import { PublicLayout } from "../layouts"
import { Public } from "../components"

export const PublicRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Public><PublicLayout /></Public>}>
      <Route index element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/reset-password" element={<Forgot />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Route>
  )
)