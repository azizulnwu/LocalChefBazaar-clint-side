import React from "react";
import { Link, useNavigate, useParams } from "react-router";
import BrandLogo from "../Shared/Logo/BrandLogo";
import useAxios from "../../Hook/useAxiosInstant";
import useAuth from "../../Hook/useAuth";
import { useForm } from "react-hook-form";
import ImageUpload from "../../Utility/Image";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const UserReview = () => {
  const axiosInstance = useAxios();
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  // console.log(id)

  const {
    data: mealDetails = {},
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["mealDetails", id],
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
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const { reviewerName, reviewerImage, comment, rating } = data;
    const imageFile = reviewerImage[0];

    try {
      const reviewInfo = {
        reviewerName,

        comment,
        rating,
        foodId: id,

        foodName: mealDetails.foodName,
        foodImage: mealDetails.foodImage,
      };

      axiosInstance.post("/userReview", reviewInfo).then((res) => {
        if (res.data.insertedId) {
          console.log({ message: "Review Upload Successful" });
        }
       
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Review Upload Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      }
      
    );
     const imgUrl =await ImageUpload(imageFile)
          const reviewImgInfo = {
            id,
            reviewerName,
            reviewerImage: imgUrl,
          };

          axiosInstance.patch("/userReview/image", reviewImgInfo).then((res) => {
            if (res.data.insertedId) {
              console.log({ message: "review Upload Successful" });
            }
          });
       

    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
    reset();
  };
  return (
    <div className="md:max-w-[80%] mx-auto">
      <Link to="/">
        <BrandLogo></BrandLogo>
      </Link>
      <div className="hero bg-base-200 min-h-screen p-4 mt-2">
        <div className="card bg-base-100  w-[50%] shrink-0 shadow-2xl">
          <h1 className="text-center font-bold text-2xl bg-sky-100 p-3 rounded-tr-lg rounded-tl-lg">
            Please Give Review
          </h1>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset className="fieldset">
                {/* Reviewer Name field */}
                <label className="label">Reviewer Name</label>
                <input
                  type="text"
                  defaultValue={user.displayName}
                  className="input w-full"
                  placeholder="Reviewer Name"
                  {...register("reviewerName", {
                    required: true,
                  })}
                />
                {errors.reviewerName && (
                  <p className="text-red-500 text-sm">
                    {errors.reviewerName.message}
                  </p>
                )}

                {/* Reviewer image field */}
                <label className="label"> Reviewer image</label>
                <input
                  type="file"
                  className="file-input w-full"
                  {...register("reviewerImage", { required: true })}
                />
                {errors.reviewerImage && (
                  <p className="text-red-500 text-sm">
                    {errors.reviewerImage.message}
                  </p>
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

                {/*Comment field */}
                <label className="label">Comment</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Comment"
                  {...register("comment", {
                    required: true,
                  })}
                />
                {errors.comment && (
                  <p className="text-red-500 text-sm">
                    {errors.comment.message}
                  </p>
                )}

                <button className="btn btn-neutral mt-4 p-2">SUBMIT</button>
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

export default UserReview;
