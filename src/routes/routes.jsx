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
import AllToys from "../components/ALLToys/AllToys"
import Contact from "../components/Contact/Contact"
import About from "../components/About/About"
import Services from "../components/Services/Services"


const router = createBrowserRouter([
   {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/", // Home page
        element: <Home />,
      },
      {
        path: "/all-toys",
        element: <AllToys />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/profile",
        element: (
          <PrivateRouter>
            <MyProfile />
          </PrivateRouter>
        ),
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
  
        <Suspense fallback={<Loading></Loading>}>
          <ToyDetails />
        </Suspense>
      
    ),
    loader: () => fetch("../toysData.json"),


  },
  {
    path: "*",
    element: <ErrorPages></ErrorPages>
  },





])

export default router
