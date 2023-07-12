import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import {
  Areas,
  Brands,
  Dashboard,
  Forgot,
  Login,
  Measures,
  Nota,
  NotaAction,
  Places,
  Products,
  Profile,
  Reason,
  Situation,
  Users,
} from "../pages";
import { AuthLayout, PrivateLayout, PublicLayout } from "../layouts";

export const RootRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthLayout />}>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<Forgot />} />
      </Route>
      <Route path="/authorized" element={<PrivateLayout />}>
        <Route path="profile" element={<Profile />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="areas" element={<Areas />} />
        <Route path="brands" element={<Brands />} />
        <Route path="measures" element={<Measures />} />
        <Route path="places" element={<Places />} />
        <Route path="situations" element={<Situation />} />
        <Route path="reasons" element={<Reason />} />
        <Route path="products" element={<Products />} />
        <Route path="nota-pedido" element={<Nota />} />
        <Route path="nota-pedido/:id" element={<NotaAction />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  )
);
