import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/SignUp/Register";
import ErrorPage from "../Pages/Error/ErrorPage";
import Home from "../Component/Home/Home";
import ForgotPassword from "../Pages/ForgotPassword/ForgotPassword";

export const router = createBrowserRouter([
  {
    path: "/",
   Component:RootLayout, 
   children:[
    {
      index:true,
      Component:Home,
    }
   ]
  },
  {
    path:"/login",
    Component:Login
  },
  {
    path:"/register",
    Component:Register,
  },
   {
    path:"/forgotPassword",
    element:<ForgotPassword></ForgotPassword>
  },
  {
    path:"*",
    Component:ErrorPage,
  }

]);