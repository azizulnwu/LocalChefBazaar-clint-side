import React from "react";
import useAuth from "../../Hook/useAuth";
import { Link, useNavigate, useParams } from "react-router";
import useAxios from "../../Hook/useAxiosInstant";
import { useQuery } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import LoadingSpinner from "../Shared/LoadingSpinner";
import BrandLogo from "../Shared/Logo/BrandLogo";
import MealReview from "./MealReview";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import PageTitle from "../../Pages/PageTitle";

const MealDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  // console.log(id);
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure()
  const {
    data: mealDetails = {},
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["mealDetails", id],
    queryFn: async () => {
      const result = await axiosSecure.get(`/mealDetails/${id}`);
      // console.log(result.data);
      return result.data;
    },
  });
  // console.log(user);
 
  const {
    _id,
    foodName,
    chefName,
    foodImage,
    price,
    rating,
    ingredients,
    estimatedDeliveryTime,
    chefExperience,
    chefId,
    chefEmail,
  } = mealDetails;

  const FavoriteFoodHandler = () => {
    const favoriteFoodInfo = {
      userEmail: user.email.toLowerCase(),
      mealId: _id,
      mealName: foodName,
      chefId: chefId,
      chefName: chefName,
      price: price,
      createAt: new Date(),
    };

    axiosSecure.post("/userFavoriteFood", favoriteFoodInfo).then(() => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Favorite Food Added Successful",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    });
  };
 if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  // const userChallengeHandler = async () => {
  //   const { email } = user;

  //   const res = await axiosInstance.get(
  //     `/userChallengeDuplicateFind?category=${category}&email=${email}`
  //   );
  //   if (res.data) {
  //    toast("Challenge Already Accept.Please back to home");
  //     return;
  //   }

  //   const userChallengesInfo = {
  //     userEmail: email,
  //     category,
  //     challengeId: _id,
  //     title,
  //     description,
  //     image,
  //     progress: 0,
  //     status: "Not Started",
  //   };

  //   axiosInstance.post("/userChallenges", userChallengesInfo).then((res) => {
  //     if (res.data.insertedId) {
  //       console.log({ message: "Challenge is accept" });
  //     }

  //     axiosInstance.patch(`/challenges/category?category=${category}`);
  //   });

  //   Swal.fire({
  //     position: "top-end",
  //     icon: "success",
  //     title: "Challenge Accept Successfully",
  //     showConfirmButton: false,
  //     timer: 1500,
  //   });
  //   navigate("/");
  // };

  return (
    <div className="max-w-[98%] mx-auto p-4">
        
      <Link to="/">
        <BrandLogo></BrandLogo>
      </Link>
      <div className="bg-slate-300">
        <div
          className="card card-side flex flex-col md:flex-row  mt-10   
     "
        >
          <figure className="">
            <img src={foodImage} alt="Movie" className="w-100 md:h-110" />
          </figure>

          <div className="card-body bg-base-100  flex flex-col items-start md:h-110">
            <h2 className="card-title mt-2 text-2xl"> Food Name: {foodName}</h2>

            <p>
              <span className="font-bold text-[15px]">Chef Name</span> :{" "}
              {chefName}
            </p>
            <p>
              {" "}
              <span className="font-bold text-[15px] md:block hidden">Ingredients :</span>
            </p>
            <p className="md:block hidden"> {ingredients}</p>

            <p>
              <span className="font-bold text-[15px]">
                Estimated Delivery Time
              </span>{" "}
              : {estimatedDeliveryTime}
            </p>
            <p>
              <span className="font-bold text-[15px]">Delivery Area</span> :{" "}
              Khulna City
            </p>
            <p>
              <span className="font-bold text-[15px]">Chef Experience</span> :{" "}
              {chefExperience}
            </p>
            <p>
              <span className="font-bold text-[15px]">ChefId</span> : {chefId}
            </p>
            <p>
              <span className="font-bold text-[15px]">Chef Email</span> :{" "}
              {chefEmail}
            </p>
            <div className="card-actions justify-center my-4">
              <p className="badge badge-outline font-bold">Price : {price}</p>
              <p className="badge badge-outline font-bold">Rating : {rating}</p>
            </div>

            <div className="card-actions">
              <Link
                to={`/orderPage/${id}`}
                className="btn btn-primary hover:bg-blue-600 "
              >
                Order Now
              </Link>
              <button
                onClick={FavoriteFoodHandler}
                className="btn btn-primary hover:bg-blue-600 "
              >
                Add to Favorite
              </button>
            </div>
          </div>
        </div>
      <div className="hidden md:block">
          <MealReview
          id={id}
          foodName={foodName}
          foodImage={foodImage}
       
        ></MealReview>
      </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default MealDetails;
