import React from "react";
import useAuth from "../Hook/useAuth";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import LoadingSpinner from "../Component/Shared/LoadingSpinner";
import { Link } from "react-router";
import { toast } from "react-toastify";
import useAxios from "../Hook/useAxiosInstant";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hook/useAxiosSecure";
const BeaChefAdmin = () => {
  const { loading,setLoading} = useAuth();
  const navigate = useNavigate();
   const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, email, role } = data;

    try {
      const userInfo = {
        name,
        email: email.toLowerCase(),
        role,
      };

      await axiosSecure.post("/chefOrAdmin", userInfo).then((res) => {
        if (res.data.insertedId) {
          console.log({ message: "user is created" });
        }
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Application Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        setLoading(false);
        navigate("dashboard/myProfile");
      });
    } catch (err) {
      // console.log(err);
      toast.error(err?.message);
    }
  };

  return (
    <div className="max-w-[80%] mx-auto">
      <div className="hero bg-base-200 min-h-screen">
        <div className="card bg-base-100  w-[50%] shrink-0 shadow-2xl">
          <h1 className="text-center font-bold text-2xl bg-sky-100 p-3 rounded-tr-lg rounded-tl-lg">
            Be a Chef or Admin
          </h1>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset className="fieldset">
                <label className="label">Name</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Name"
                  {...register("name", {
                    required: true,
                  })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}

                {/* Email field */}
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input w-full"
                  placeholder="Email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}

                {/* Role field */}
                <label className="label">Role</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Define Role"
                  {...register("role", {
                    required: true,
                  })}
                />
                {errors.role && (
                  <p className="text-red-500 text-sm">{errors.role.message}</p>
                )}

                <button className="btn btn-neutral mt-4 p-2">
                  {loading ? <LoadingSpinner></LoadingSpinner> : "SUBMIT"}
                </button>
              </fieldset>
            </form>

            <Link to="/register" className="text-center">
              If don't have an account pls. Register first{" "}
              <span className="text-xl font-bold text-green-400 underline mr-0.5">
                Register
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeaChefAdmin;
