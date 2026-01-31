import React, { useEffect, useState } from "react";
import useAxios from "../../Hook/useAxiosInstant";
import { useForm } from "react-hook-form";
import ImageUpload from "../../Utility/Image";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Link } from "react-router";
import useAuth from "../../Hook/useAuth";
const CreateMeal = () => {
  const axiosInstance = useAxios();
  const { user } = useAuth();
  const [userStatus, setUserStatus] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const {
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
    } = data;
    const imageFile = foodImage[0];

    try {
      const mealInfo = {
        foodName,
        chefName,
        foodImage,
        price,
        rating,
        ingredients,
        estimatedDeliveryTime,
        chefExperience,
        chefId,
        chefEmail: chefEmail.toLowerCase(),
      };

      axiosInstance.post("/meals", mealInfo).then((res) => {
        if (res.data.insertedId) {
          console.log({ message: "Challenges Upload Successful" });
        }
        ImageUpload(imageFile).then((data) => {
          const foodImage = data;
          const challengesInfo = {
            foodName,
            foodImage,
          };

          axiosInstance.patch("/meals/image", challengesInfo).then(() => {
            if (res.data.insertedId) {
              console.log({ message: "Challenges Upload Successful" });
            }
          });
        });

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Meal Upload Successful",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
    reset();
  };

  useEffect(() => {
    if (!user?.email) return;

    axiosInstance.get(`/user?email=${user?.email}`).then((res) => {
      setUserStatus(res.data);
    });
  }, [user?.email, axiosInstance]);

  return (
    <div className="md:max-w-[80%] mx-auto">
      <div className="hero bg-base-200 min-h-screen p-4 mt-2">
        <div className="card bg-base-100  w-[50%] shrink-0 shadow-2xl">
          <h1 className="text-center font-bold text-2xl bg-sky-100 p-3 rounded-tr-lg rounded-tl-lg">
            Please Add Meal
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
                  {...register("foodName", {
                    required: true,
                  })}
                />
                {errors.foodName && (
                  <p className="text-red-500 text-sm">
                    {errors.foodName.message}
                  </p>
                )}

                {/* Chef Name */}
                <label className="label">Chef Name</label>
                <input
                  type="text"
                  defaultValue={user.displayName}
                  className="input w-full"
                  placeholder="Chef Name"
                  {...register("chefName", {
                    required: true,
                  })}
                />
                {errors.chefName && (
                  <p className="text-red-500 text-sm">
                    {errors.chefName.message}
                  </p>
                )}
                {/* foodImage field */}
                <label className="label">FoodImage</label>
                <input
                  type="file"
                  className="file-input w-full"
                  {...register("foodImage", { required: true })}
                />
                {errors.foodImage && (
                  <p className="text-red-500 text-sm">
                    {errors.foodImage.message}
                  </p>
                )}

                {/* Price field */}
                <label className="label">Price</label>
                <input
                  type="number"
                  className="input w-full"
                  placeholder="Price"
                  {...register("price", {
                    required: true,
                  })}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm">{errors.price.message}</p>
                )}

                {/* Rating field */}
                <label className="label">Rating</label>
                <input
                  type="number"
                  className="input w-full"
                  placeholder="Rating"
                  {...register("rating", {
                    required: true,
                    maxLength: {
                      value: 100,
                      message: "rating must be at least 5 characters",
                    },
                  })}
                />
                {errors.rating && (
                  <p className="text-red-500 text-sm">
                    {errors.rating.message}
                  </p>
                )}

                {/* Ingredients field */}
                <label className="label">Ingredients</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Ingredients"
                  {...register("ingredients", {
                    required: true,
                  })}
                />
                {errors.ingredients && (
                  <p className="text-red-500 text-sm">
                    {errors.ingredients.message}
                  </p>
                )}
                {/* EstimatedDeliveryTime field */}
                <label className="label">EstimatedDeliveryTime </label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="EstimatedDeliveryTime  time hrs"
                  {...register("estimatedDeliveryTime", {
                    required: true,
                  })}
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
                  className="input w-full"
                  placeholder="ChefExperience"
                  {...register("chefExperience", {
                    required: true,
                  })}
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
                  className="input w-full"
                  placeholder="ChefId"
                  {...register("chefId", {
                    required: true,
                  })}
                />
                {errors.chefId && (
                  <p className="text-red-500 text-sm">
                    {errors.chefId.message}
                  </p>
                )}

                {/*chefEmailfield */}
                <label className="label">ChefEmail</label>
                <input
                  type="email"
                  className="input w-full"
                  defaultValue={user.email}
                  placeholder="ChefEmail"
                  {...register("chefEmail", { required: true })}
                />
                {errors.chefEmail && (
                  <p className="text-red-500 text-sm">
                    {errors.chefEmail.message}
                  </p>
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

export default CreateMeal;
