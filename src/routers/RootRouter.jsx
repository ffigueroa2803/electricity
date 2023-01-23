import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import { Areas, Brands, Dashboard, Measures, Places, Profile, Users } from "../pages"
import { RootLayout } from "../layouts"

export const RootRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Profile />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/users" element={<Users />} />
      <Route path="/areas" element={<Areas />} />
      <Route path="/brands" element={<Brands />} />
      <Route path="/measures" element={<Measures />} />
      <Route path="/places" element={<Places />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  )
)