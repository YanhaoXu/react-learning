import AuthRoute from "@/components/AuthRoute";
import Article from "@/views/Article";
import Home from "@/views/Home";
import Layout from "@/views/Layout";
import Login from "@/views/Login";
import Publish from "@/views/Publish";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const routers = [
  {
    path: "/",
    element: (
      <AuthRoute>
        <Layout />
      </AuthRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "article",
        element: <Article />,
      },
      {
        path: "publish",
        element: <Publish />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
];

const router = createBrowserRouter(routers);

export default function Router() {
  return <RouterProvider router={router} />;
}
