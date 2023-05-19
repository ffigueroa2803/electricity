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
  Order,
  OrderAction,
  Places,
  Products,
  Profile,
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
        <Route path="products" element={<Products />} />
        <Route path="nota-pedido" element={<Order />} />
        <Route path="nota-pedido/:notaId" element={<OrderAction />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  )
);
