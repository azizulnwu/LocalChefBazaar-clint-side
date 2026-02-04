import React from "react";
import useAxios from "../../Hook/useAxiosInstant";
import useAuth from "../../Hook/useAuth";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import BrandLogo from "../Shared/Logo/BrandLogo";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const UpdateReview = ({ id,closeModal}) => {
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure()
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const { comment, rating } = data;
    // console.log(comment, rating, id);
    try {
      const reviewInfo = {
        comment,
        rating,
        id,
      };

      axiosSecure.patch("/userReviewUpdate", reviewInfo).then((res) => {
        if (res.data.insertedId) {
          console.log({ message: "Review Upload Successful" });
        }

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Review Update Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        
      });
    } catch (err) {
      // console.log(err);
      toast.error(err?.message);
    }
    reset();
    closeModal()
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset">
          {/* Rating field */}
          <label className="label">Update Rating</label>
          <input
            type="number"
            className="input w-full"
            placeholder="Update Rating"
            {...register("rating", {
              required: true,
              maxLength: {
                value: 100,
                message: "rating must be at least 5 characters",
              },
            })}
          />
          {errors.rating && (
            <p className="text-red-500 text-sm">{errors.rating.message}</p>
          )}

          {/*Comment field */}
          <label className="label">Update Comment</label>
          <input
            type="text"
            className="input w-full"
            placeholder="Update Comment"
            {...register("comment", {
              required: true,
            })}
          />
          {errors.comment && (
            <p className="text-red-500 text-sm">{errors.comment.message}</p>
          )}

          <button className="btn btn-neutral mt-4 p-2">SUBMIT</button>
        </fieldset>
      </form>
    </div>
  );
};

export default UpdateReview;
