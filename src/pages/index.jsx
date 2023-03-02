import { lazy } from "react";

const Areas = lazy(() => import("./Areas"));
const Brands = lazy(() => import("./Brands"));
const Dashboard = lazy(() => import("./Dashboard"));
const Forgot = lazy(() => import("./Forgot"));
const Login = lazy(() => import("./Login"));
const Measures = lazy(() => import("./Measures"));
const Places = lazy(() => import("./Places"));
const Products = lazy(() => import("./Products"));
const Profile = lazy(() => import("./Profile"));
const Users = lazy(() => import("./Users"));

export {
  Areas,
  Brands,
  Dashboard,
  Forgot,
  Login,
  Measures,
  Places,
  Products,
  Profile,
  Users,
};
