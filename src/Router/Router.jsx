import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/SignUp/Register";
import ErrorPage from "../Pages/Error/ErrorPage";

import ForgotPassword from "../Pages/ForgotPassword/ForgotPassword";
import DashboardLayout from "../Layout/DashboardLayout";
import MyProfile from "../Component/MyProfile/MyProfile";
import BeaChefAdmin from "../Pages/BeaChefAdmin";
import ManageRequest from "../Component/Adminsection/ManageRequest";
import DashBoardHome from "../Pages/Dasbord/DashBoardHome";
import Home from "../Home/Home";
import CreateMeal from "../Component/ChefSection/CreateMeal";

import MealDetails from "../Component/MealSection/MealDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/forgotPassword",
    element: <ForgotPassword></ForgotPassword>,
  },
  {
    path: "/mealDetails/:id",
    element: <MealDetails></MealDetails>
  },
  {
    path: "*",
    Component: ErrorPage,
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      {
        index:true,
        element:<DashBoardHome></DashBoardHome>
      },
      {
       path:"/dashboard/myProfile",
       element:<MyProfile></MyProfile>
      },
      {
       path:"/dashboard/beaChefAdmin",
       element:<BeaChefAdmin></BeaChefAdmin>
      },
      {
        path:"/dashboard/manageRequest",
        element:<ManageRequest></ManageRequest>
      },
      {
        path:"/dashboard/createMeal",
        element:<CreateMeal></CreateMeal>
      }
    ],
  },
]);
