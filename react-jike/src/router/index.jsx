import AuthRoute from "@/components/AuthRoute";
import Layout from "@/views/Layout";
import Login from "@/views/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const routers = [
  {
    path: "/",
    element: (
      <AuthRoute>
        <Layout />
      </AuthRoute>
    ),
  },
  { path: "/login", element: <Login /> },
];

const router = createBrowserRouter(routers);

export default function Router() {
  return <RouterProvider router={router} />;
}
