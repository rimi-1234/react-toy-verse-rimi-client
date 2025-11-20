import { createBrowserRouter } from "react-router"
import MainLayout from "../Layouts/MainLayout/MainLayout"
import Home from "../Pages/Home/Home"
import AuthLayout from "../Layouts/AuthLayout/AuthLayout"
import Register from "../Pages/Register/Register"

import Login from "../Pages/Login/Login"
import ToyDetails from "../components/ToyDetails/ToyDetails"
import PrivateRouter from "../Provider/PrivateRouter"
import { Suspense } from "react"
import Loading from "../components/Loading/Loading"
import MyProfile from "../Pages/MyProfile/MyProfile"
import MyCart from "../components/MyCart/MyCart"
import ForgotPassword from "../Pages/ForgotPassword/ForgotPassword"
import ErrorPages from "../Pages/ErrorPages/ErrorPages"


const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,

    children: [
      {
        path: '/',
        Component: Home,

      },
      {
        path: '/profile',
        element:
          <PrivateRouter>
            <MyProfile></MyProfile>

          </PrivateRouter >

      },
      {
        path: "/my-cart",
        element: (
          <PrivateRouter>
            <MyCart />
          </PrivateRouter>
        ),
      },

    ],
  },
  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/auth/login",
        element: <Login></Login>,
      },
      {
        path: "/auth/register",
        element: <Register></Register>,
      },
      {
        path: "/auth/forgot-password",
        element: <ForgotPassword ></ForgotPassword>,
      },
    ],
  },
  {
    path: "/toys-details/:id",
    element: (
      <PrivateRouter>
        <Suspense fallback={<Loading></Loading>}>
          <ToyDetails />
        </Suspense>
      </PrivateRouter>
    ),
    loader: () => fetch("../toysData.json"),


  },
  {
    path: "*",
    element: <ErrorPages></ErrorPages>
  },





])

export default router
