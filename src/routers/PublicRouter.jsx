import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import { Forgot, Login } from "../pages"
import { PublicLayout } from "../layouts"

export const PublicRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<PublicLayout />}>
      <Route index element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/reset-password" element={<Forgot />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Route>
  )
)