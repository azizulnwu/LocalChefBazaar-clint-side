import React from "react";

import { Link, useLocation, useNavigate } from "react-router";

import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useAuth from "../../Hook/useAuth";
import BrandLogo from "../../Component/Shared/Logo/BrandLogo";
import LoadingSpinner from "../../Component/Shared/LoadingSpinner";
import useAxios from "../../Hook/useAxiosInstant";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const axiosInstance = useAxios();
  // console.log(location.state);
  const { signIn, signInWithGoogle, loading, setLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onLogin = (data) => {
    const { email, password } = data;
    signIn(email, password)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        setLoading(false);
        navigate(location.state || "/");
      })
      .catch((err) => {
        // console.log(err);
        toast.error(err?.message);
      });
  };

  const SignInWithGoogle = async () => {
    try {
      setLoading(true);

      const result = await signInWithGoogle();
      const user = result.user;
      // console.log(user);

      const userInfo = {
        displayName: user.displayName,
        email: user.email.toLowerCase(),
        photoUrl: user.photoURL,
        provider: "google",
        userStatus: "Active",
        address: "Google",
      };

      const res = await axiosInstance.post("/users", userInfo);
      if (res.data.insertedId) {
        console.log({ message: "user is created" });
      }

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Registration Successful",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/");
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  if (loading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="max-w-[80%] mx-auto">
      <Link to="/">
        <BrandLogo></BrandLogo>
      </Link>

      <div className="hero md:bg-base-200 mt-10   min-h-screen md:mt-2 ">
        <div className="card bg-base-100 md:mt-0 -mt-75  md:w-[50%] shrink-0 shadow-2xl">
          <h1 className="text-center font-bold text-2xl bg-sky-100 p-3 rounded-tr-lg rounded-tl-lg ">
            Please Login
          </h1>
          <div className="card-body md:space-y-0 space-y-6">
            <form onSubmit={handleSubmit(onLogin)}>
              <fieldset className="fieldset">
                {/* Email field */}
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input w-full"
                  placeholder="Email"
                  {...register("email", {
                    required: true,
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}

                {/* Password field */}
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input w-full"
                  placeholder="Password"
                  {...register("password", {
                    required: true,

                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/,
                      message:
                        "Password must be at least 6 characters and include uppercase, lowercase, and special character",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}

                <div>
                  <Link to="/forgotPassword" className="link link-hover mt-2">
                    Forgot password?
                  </Link>
                </div>
                <button className="btn btn-neutral mt-4 p-2">
                  {loading ? <LoadingSpinner></LoadingSpinner> : "Login"}
                </button>
              </fieldset>
            </form>
            <button
              onClick={SignInWithGoogle}
              className="btn bg-white text-black border-[#e5e5e5]"
            >
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Login with Google
            </button>
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

export default Login;
