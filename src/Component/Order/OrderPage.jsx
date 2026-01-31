import React, { useEffect, useState } from "react";
import useAxios from "../../Hook/useAxiosInstant";
import useAuth from "../../Hook/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import BrandLogo from "../Shared/Logo/BrandLogo";
import { Link, useNavigate, useParams } from "react-router";
import ImageUpload from "../../Utility/Image";
import { useQuery } from "@tanstack/react-query";

const OrderPage = () => {
  const axiosInstance = useAxios();
  const { user } = useAuth();
  const [userStatus, setUserStatus] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: orderMealDetails = {},
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orderMealDetails", id],
    queryFn: async () => {
      const result = await axiosInstance.get(`/mealDetails/${id}`);
      // console.log(result.data);
      return result.data;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const {
      foodName,
      foodPrice,
      quantity,
      chefId,
      userEmail,
      userAddress,
      chefName,
      estimatedDeliveryTime,
    } = data;

    try {
      const mealInfo = {
        foodName,
        foodPrice: foodPrice * quantity,
        quantity,
        chefId,
        chefName,
        estimatedDeliveryTime,
        userAddress,
        userEmail: userEmail.toLowerCase(),
      };

      Swal.fire({
        title: "Order Placement",
        text: `Your Total Price Is ${foodPrice * quantity}Tk`,
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosInstance.post("/orderedFood", mealInfo).then((res) => {
            if (res.data.insertedId) {
              console.log({ message: "Challenges Upload Successful" });
            }

            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Order Place Successful",
              showConfirmButton: false,
              timer: 1500,
            });
          });
          navigate("/");
        }
      });
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
    reset();
  };

  useEffect(() => {
    if (!user?.email) return;
    if (orderMealDetails?.foodName) {
      setValue("foodName", orderMealDetails.foodName);
      setValue("foodPrice", orderMealDetails.price);
      setValue("chefId", orderMealDetails.chefId);
      setValue("chefName", orderMealDetails.chefName);
      setValue("estimatedDeliveryTime", orderMealDetails.estimatedDeliveryTime);
    }

    if (user?.email) {
      setValue("userEmail", user.email);
    }

    axiosInstance.get(`/user?email=${user?.email}`).then((res) => {
      setUserStatus(res.data);
    });
  }, [user?.email, axiosInstance, orderMealDetails, user, setValue]);

  return (
    <div className="md:max-w-[80%] mx-auto">
      <Link to="/">
        <BrandLogo></BrandLogo>
      </Link>
      <div className="hero bg-base-200 min-h-screen p-4 mt-2">
        <div className="card bg-base-100  w-[50%] shrink-0 shadow-2xl">
          <h1 className="text-center font-bold text-2xl bg-sky-100 p-3 rounded-tr-lg rounded-tl-lg">
            Please Add Meal
          </h1>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset className="fieldset">
                {/* Food Name field */}
                <label className="label">Meal Name</label>
                <input
                  type="text"
                  className="input w-full"
                  value={orderMealDetails.foodName}
                  placeholder="Food Name"
                  {...register("foodName")}
                  readOnly
                />
                {errors.foodName && (
                  <p className="text-red-500 text-sm">
                    {errors.foodName.message}
                  </p>
                )}

                {/* food Price */}
                <label className="label">Food Price</label>
                <input
                  type="number"
                  value={orderMealDetails.price}
                  className="input w-full"
                  placeholder="Food Price"
                  {...register("foodPrice")}
                  readOnly
                />
                {errors.foodPrice && (
                  <p className="text-red-500 text-sm">
                    {errors.foodPrice.message}
                  </p>
                )}

                {/* Quantity field */}
                <label className="label">Quantity</label>
                <input
                  type="number"
                  className="input w-full"
                  placeholder="Quantity"
                  {...register("quantity", {
                    required: true,
                  })}
                />
                {errors.quantity && (
                  <p className="text-red-500 text-sm">
                    {errors.quantity.message}
                  </p>
                )}

                {/* Chef ID field */}
                <label className="label">Chef ID</label>
                <input
                  type="text"
                  className="input w-full"
                  value={orderMealDetails.chefId}
                  placeholder="Chef ID"
                  {...register("chefId")}
                  readOnly
                />
                {errors.chefId && (
                  <p className="text-red-500 text-sm">
                    {errors.chefId.message}
                  </p>
                )}
                {/* Chef Name field */}
                <label className="label">Chef Name</label>
                <input
                  type="text"
                  className="input w-full"
                  value={orderMealDetails.chefName}
                  placeholder="chefName"
                  {...register("chefName")}
                  readOnly
                />
                {errors.chefName && (
                  <p className="text-red-500 text-sm">
                    {errors.chefName.message}
                  </p>
                )}
                {/* Estimated Delivery Time field */}
                <label className="label">Estimated Delivery Time</label>
                <input
                  type="text"
                  className="input w-full"
                  value={orderMealDetails.estimatedDeliveryTime}
                  placeholder="chefName"
                  {...register("estimatedDeliveryTime")}
                  readOnly
                />
                {errors.estimatedDeliveryTime && (
                  <p className="text-red-500 text-sm">
                    {errors.estimatedDeliveryTime.message}
                  </p>
                )}

                {/* User Email field */}
                <label className="label">User Email</label>
                <input
                  type="text"
                  className="input w-full"
                  value={user?.email}
                  placeholder="User Email"
                  {...register("userEmail")}
                />
                {errors.userEmail && (
                  <p className="text-red-500 text-sm">
                    {errors.userEmail.message}
                  </p>
                )}
                {/* User address field */}
                <label className="label">User Address </label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="User Address"
                  {...register("userAddress", {
                    required: true,
                  })}
                />
                {errors.userAddress && (
                  <p className="text-red-500 text-sm">
                    {errors.userAddress.message}
                  </p>
                )}

                {userStatus?.userStatus !== "fraud" && (
                  <button className="btn btn-neutral mt-4 p-2">
                    Confirm Order
                  </button>
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

export default OrderPage;
