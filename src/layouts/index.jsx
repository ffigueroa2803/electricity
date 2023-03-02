import { lazy } from "react";

const PublicLayout = lazy(() => import("./PublicLayout"));
const AuthLayout = lazy(() => import("./AuthLayout"));
const PrivateLayout = lazy(() => import("./PrivateLayout"));

export { AuthLayout, PublicLayout, PrivateLayout };
