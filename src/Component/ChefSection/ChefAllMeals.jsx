import React, { useRef } from "react";
import useAuth from "../../Hook/useAuth";
import { Link, useNavigate, useParams } from "react-router";
import useAxios from "../../Hook/useAxiosInstant";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { ToastContainer } from "react-toastify";
import ChefMealUpdate from "./ChefMealUpdate";

const ChefAllMeals = () => {
  const { user } = useAuth();
  // const { id } = useParams();
  const navigate = useNavigate();
  const modalRef = useRef();
  // console.log(id);
  const axiosInstance = useAxios();
  // const axiosSecure = useAxiosSecure()
  const {
    data: chefALLMeal = {},
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["chefALLMeal", user?.displayName],
    queryFn: async () => {
      const result = await axiosInstance.get(
        `/chefALLMeal?email=${user?.email}`,
      );
      // console.log(result.data);
      return result.data;
    },
  });
  console.log(chefALLMeal);
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
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
  } = chefALLMeal;
  console.log(chefALLMeal);

  const closeModal = () => {
    modalRef.current.close();
    return refetch();
  };

  const delateFavoriteFood = async (id) => {
    const deleteInfo = {
      id,
    };

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance.post("/chefALLMeal/delete", deleteInfo).then(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Delete Review  Successful",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        });
      }
    });
  };
  const Id = [];
  


  return (
    <div className="max-w-[98%] mx-auto p-4">
       
      <div className=" grid grid-cols-1 md:grid-cols-1 gap-2 bg-slate-300 p-4 mb-4 rounded-br-lg rounded-bl-lg">
       
        {chefALLMeal.map((data) => 
         
           (
           
            <div key={data._id} className="bg-slate-300 w-full">
              <div
                className="card card-side flex flex-col md:flex-row   
     "
              >
                <figure className="">
                  <img src={data.foodImage} alt="Movie" className="md:w-100 md:h-110 " />
                </figure>

                <div className="card-body bg-base-100  flex flex-col items-start md:h-110">
                  <h2 className="card-title mt-2 text-2xl">
                    {" "}
                    Food Name: {data.foodName}
                  </h2>
                  

                  <p>
                    <span className="font-bold text-[15px]">Chef Name</span> :{" "}
                    {data.chefName}
                  </p>
                  <p>
                    {" "}
                    <span className="font-bold text-[15px] ">
                      Ingredients :
                    </span>
                  </p>
                  <p className="-ml-[100]"> {data.ingredients}</p>

                  <p>
                    <span className="font-bold text-[15px]">
                      Estimated Delivery Time
                    </span>{" "}
                    : {data.estimatedDeliveryTime}
                  </p>
                  <p>
                    <span className="font-bold text-[15px]">Delivery Area</span>{" "}
                    : Khulna City
                  </p>
                  <p>
                    <span className="font-bold text-[15px]">
                      Chef Experience
                    </span>{" "}
                    : {data.chefExperience}
                  </p>
                  <p>
                    <span className="font-bold text-[15px]">ChefId</span> :{" "}
                    {data.chefId}
                  </p>
                  <p>
                    <span className="font-bold text-[15px]">Chef Email</span> :{" "}
                    {data.chefEmail}
                  </p>
                  <div className="card-actions justify-center my-4">
                    <p className="badge badge-outline font-bold">
                      Price : {data.price}
                    </p>
                    <p className="badge badge-outline font-bold">
                      Rating : {data.rating}
                    </p>
                  </div>

                  <div key={data._id}  className="card-actions">
                    <Link
                      to={`/dashboard/updateReview/${data._id}`}
                      key={data._id} 
                      className="btn btn-primary hover:bg-blue-600"
                  
                    >
                      Update Meals
                    </Link>
                    
                    <button
                      onClick={() => delateFavoriteFood(data._id)}
                      className="btn bg-red-500 hover:bg-red-400 ml-0.5"
                    >
                      Delate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>

      <ToastContainer></ToastContainer>
    </div>
  );
};

export default ChefAllMeals;


