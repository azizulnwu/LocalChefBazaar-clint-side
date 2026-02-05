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
import MealReview from "../Component/MealSection/MealReview";
import UserReview from "../Component/UserSection/UserReview";
import ShowReview from "../Component/MealSection/ShowReview";
import UpdateReview from "../Component/MealSection/UpdateReview";
import MyFavoriteFood from "../Component/UserSection/MyFavoriteFood";
import ChefAllMeals from "../Component/ChefSection/ChefAllMeals";
import ChefMealUpdate from "../Component/ChefSection/ChefMealUpdate";
import ManageUser from "../Component/Adminsection/ManageUser";
import OrderPage from "../Component/Order/OrderPage";
import OrderRequest from "../Component/ChefSection/OrderRequest";
import MyOrderPage from "../Component/UserSection/MyOrderPage";
import PaymentSuccess from "../Component/Payment/PaymentSuccess";
import PaymentCancelled from "../Component/Payment/PaymentCancelled";
import PrivateRoute from "./PrivateRoute";
import AdminPrivateRoute from "./AdminPrivateRoute";
import SpecialOffer from "../Pages/SpecialOffer";
import AllMeals from "../Component/MealSection/ALlMeals";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
        
      },
      {
        path:"/allMeals",
        Component:AllMeals,
       
      }
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
    element: (
      <PrivateRoute>
        <MealDetails></MealDetails>
      </PrivateRoute>
    ),
  },
  {
    path: "/mealReview/:id",
    element: (
      <PrivateRoute>
        <UserReview></UserReview>
      </PrivateRoute>
    ),
  },
  {
    path: "/updateReview/:id",
    element: (
      <PrivateRoute>
        <UpdateReview></UpdateReview>
      </PrivateRoute>
    ),
  },

  {
    path: "/orderPage/:id",
    element: (
      <PrivateRoute>
        <OrderPage></OrderPage>
      </PrivateRoute>
    ),
  },
   {
    path: "/specialOffer",
    Component: SpecialOffer,
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
        index: true,
        element: (
          <PrivateRoute>
            <DashBoardHome></DashBoardHome>
          </PrivateRoute>
        ),

      },
      {
        path: "/dashboard/myProfile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "/dashboard/beaChefAdmin",
        element: <BeaChefAdmin></BeaChefAdmin>,
      },
      {
        path: "/dashboard/manageRequest",
        element: <ManageRequest></ManageRequest>,
      },
      {
        path: "/dashboard/createMeal",
        element: <CreateMeal></CreateMeal>,
      },
      {
        path: "/dashboard/orderRequest",
        element: <OrderRequest></OrderRequest>,
      },
      {
        path: "/dashboard/showReview",
        element: <ShowReview></ShowReview>,
      },
      {
        path: "/dashboard/myFavoriteFood",
        element: <MyFavoriteFood></MyFavoriteFood>,
      },
      {
        path: "/dashboard/myOrderPage",
        element: <MyOrderPage></MyOrderPage>,
      },
      {
        path: "/dashboard/myAllMeals",
        element: <ChefAllMeals></ChefAllMeals>,
      },
      {
        path: "/dashboard/updateReview/:id",
        element: <ChefMealUpdate></ChefMealUpdate>,
      },
      {
        path: "/dashboard/ManageUser",
        element: <ManageUser></ManageUser>,
      },
      {
        path: "/dashboard/paymentSuccess",
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
        path: "/dashboard/paymentCancelled",
        element: <PaymentCancelled></PaymentCancelled>,
      },
    ],
  },
]);
