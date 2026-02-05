import React, { useEffect, useState } from "react";
import useAxios from "../../Hook/useAxiosInstant";
import useAuth from "../../Hook/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import ImageUpload from "../../Utility/Image";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import PageTitle from "../../Pages/PageTitle";

const ChefMealUpdate = () => {
  // const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [userStatus, setUserStatus] = useState();

  const { data: chefMeal = [], refetch } = useQuery({
    queryKey: ["chefMeal", user, id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/chefMeal/${id}`);
      console.log(res.data);
      return res.data;
    },
  });

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure.get(`/user?email=${user?.email}`).then((res) => {
      setUserStatus(res.data);
    });
  }, [user?.email, axiosSecure]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const {
      foodName,
      price,
      foodImage,
      rating,
      ingredients,
      estimatedDeliveryTime,
      chefExperience,
      chefEmail,
    } = data;
    const imageFile = foodImage[0];

    const foodImageUrl = await ImageUpload(imageFile);
    try {
      const mealUpdateInfo = {
        id,
        foodName,
        chefEmail,
        price,
        rating,
        ingredients,
        estimatedDeliveryTime,
        chefExperience,
        foodImage: foodImageUrl,
      };

      axiosSecure.patch("/chefALLMeal", mealUpdateInfo).then((res) => {
        if (res.data.insertedId) {
          console.log({ message: "Review Upload Successful" });
        }

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Meal Update Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
        refetch();
        navigate("/dashboard/myAllMeals");
      });
    } catch (err) {
      // console.log(err);
      toast.error(err?.message);
    }
    reset();
  };

  return (
    <div className="max-w-[100%] mx-auto">
      <PageTitle title="Dashboard | Update Meal"/>
        <div className="hero bg-base-200 min-h-screen p-4 mt-2">
        <div className="card bg-base-100  md:w-[50%] w-full shrink-0 shadow-2xl">
       <h1 className="text-center font-bold text-2xl bg-sky-100 p-3 rounded-tr-lg rounded-tl-lg">
            Please Update Meal
          </h1>
           <div className="card-body">
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset">
          {/* Food Name field */}
          <label className="label">Food Name</label>
          <input
            type="text"
            className="input w-full"
            placeholder="Food Name"
            o //l'''],
            defaultValue={chefMeal[0]?.foodName}
            {...register("foodName")}
          />
          {errors.foodName && (
            <p className="text-red-500 text-sm">{errors.foodName.message}</p>
          )}

          {/* Chef Name */}
          <label className="label">Chef Name</label>
          <input
            type="text"
            defaultValue={user?.displayName}
            className="input w-full"
            placeholder="Chef Name"
            {...register("chefName")}
          />
          {errors.chefName && (
            <p className="text-red-500 text-sm">{errors.chefName.message}</p>
          )}
          {/* foodImage field */}
          <label className="label">FoodImage</label>
          <input
            type="file"
            // defaultValue={chefMeal[0]?.foodImage}
            className="file-input w-full"
            {...register("foodImage")}
          />
          {errors.foodImage && (
            <p className="text-red-500 text-sm">{errors.foodImage.message}</p>
          )}

          {/* Price field */}
          <label className="label">Price</label>
          <input
            type="number"
            defaultValue={chefMeal[0]?.price}
            className="input w-full"
            placeholder="Price"
            {...register("price")}
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}

          {/* Rating field */}
          <label className="label">Rating</label>
          <input
            type="number"
            defaultValue={chefMeal[0]?.rating}
            className="input w-full"
            placeholder="Rating"
            {...register("rating")}
          />
          {errors.rating && (
            <p className="text-red-500 text-sm">{errors.rating.message}</p>
          )}

          {/* Ingredients field */}
          <label className="label">Ingredients</label>
          <input
            type="text"
            defaultValue={chefMeal[0]?.ingredients}
            className="input w-full"
            placeholder="Ingredients"
            {...register("ingredients")}
          />
          {errors.ingredients && (
            <p className="text-red-500 text-sm">{errors.ingredients.message}</p>
          )}
          {/* EstimatedDeliveryTime field */}
          <label className="label">EstimatedDeliveryTime </label>
          <input
            type="text"
            defaultValue={chefMeal[0]?.estimatedDeliveryTime}
            className="input w-full"
            placeholder="EstimatedDeliveryTime  time hrs"
            {...register("estimatedDeliveryTime")}
          />
          {errors.estimatedDeliveryTime && (
            <p className="text-red-500 text-sm">
              {errors.estimatedDeliveryTime.message}
            </p>
          )}

          {/* ChefExperience field */}
          <label className="label">ChefExperience</label>
          <input
            type="text"
            defaultValue={chefMeal[0]?.chefExperience}
            className="input w-full"
            placeholder="ChefExperience"
            {...register("chefExperience")}
          />
          {errors.chefExperience && (
            <p className="text-red-500 text-sm">
              {errors.chefExperience.message}
            </p>
          )}
          {/* ChefId field */}
          <label className="label">ChefId</label>
          <input
            type="text"
            defaultValue={chefMeal[0]?.chefId}
            className="input w-full"
            placeholder="ChefId"
            {...register("chefId")}
          />
          {errors.chefId && (
            <p className="text-red-500 text-sm">{errors.chefId.message}</p>
          )}

          {/*chefEmailfield */}
          <label className="label">ChefEmail</label>
          <input
            type="email"
            className="input w-full"
            defaultValue={user?.email}
            placeholder="ChefEmail"
            {...register("chefEmail")}
          />
          {errors.chefEmail && (
            <p className="text-red-500 text-sm">{errors.chefEmail.message}</p>
          )}

          {userStatus?.userStatus !== "fraud" && (
            <button className="btn btn-neutral mt-4 p-2">SUBMIT</button>
          )}
          {/* <button className="btn btn-neutral mt-4 p-2">
                  {loading ? <LoadingSpinner></LoadingSpinner> : "SUBMIT"}
                </button> */}
        </fieldset>
      </form>
       </div>
       </div>
       </div>
    </div>
  );
};

export default ChefMealUpdate;
