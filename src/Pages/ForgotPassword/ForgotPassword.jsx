import React from "react";
import { Link, useNavigate } from "react-router";

import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAuth from "../../Hook/useAuth";
import BrandLogo from "../../Component/Shared/Logo/BrandLogo";
import LoadingSpinner from "../../Component/Shared/LoadingSpinner";



const ForgotPassword = () => {
  const { loading } = useAuth();
  const navigate = useNavigate();

  // if(loading)return <Loading></Loading>

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleForgotPassword = async (data) => {
    console.log(data);
    alert("Pls. check your Email");
    navigate("/");
  };

  return (
    <div className="max-w-[80%] mx-auto">
      <Link to="/">
        <BrandLogo></BrandLogo>
      </Link>

      <div className="hero bg-base-200 min-h-screen">
        <div className="card bg-base-100  w-[50%] shrink-0 shadow-2xl">
          <h1 className="text-center font-bold text-2xl bg-sky-100 p-3 rounded-tr-lg rounded-tl-lg">
            Find Forgot Password
          </h1>
          <div className="card-body">
            <form onSubmit={handleSubmit(handleForgotPassword)}>
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

export default ForgotPassword;
