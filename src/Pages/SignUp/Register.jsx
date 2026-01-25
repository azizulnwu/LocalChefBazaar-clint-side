import { Link, useNavigate } from "react-router";

import { useForm } from "react-hook-form";

import Swal from "sweetalert2";
import { toast } from "react-toastify";

import useAuth from "../../Hook/useAuth";
import ImageUpload from "../../Utility/Image";
import BrandLogo from "../../Component/Shared/Logo/BrandLogo";
import LoadingSpinner from "../../Component/Shared/LoadingSpinner";
import { useState } from "react";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import useAxios from "../../Hook/useAxiosInstant";
const Register = () => {
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const [passwordSeen, setPasswordSeen] = useState(true);
  const [confirmPasswordSeen, setConfirmPasswordSeen] = useState(true);
  const {
    user,
    createUser,
    signInWithGoogle,
    updateUserProfile,
    loading,
    setLoading,
  } = useAuth();
  // console.log(user);
  // const { displayName, email, photoUrl } = user || {};

  // if(loading)return <Loading></Loading>

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { name, image, email, password, address } = data;
    const imageFile = image[0];

    try {
      createUser(email, password).then(() => {
        ImageUpload(imageFile).then(async (data) => {
          console.log(data);
          const userInfo = {
            displayName: name,
            email: email.toLowerCase(),
            photoUrl: data,
            address,
            userStatus: "Active",
          };

          await axiosInstance.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log({ message: "user is created" });
            }
          });

          updateUserProfile(name, data?.data?.display_url);
        });

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Registration Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        setLoading(false);
        navigate("/login");
      });
    } catch (err) {
      // console.log(err);
      toast.error(err?.message);
    }
  };

  const SignInWithGoogle = async () => {
    try {
      setLoading(true);

      const result = await signInWithGoogle();
      const user = result.user;
      console.log(user);

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

  return (
    <div className="max-w-[80%] mx-auto">
      <Link to="/">
        <BrandLogo></BrandLogo>
      </Link>

      <div className="hero bg-base-200 min-h-screen mt-2">
        <div className="card bg-base-100  w-[50%] shrink-0 shadow-2xl">
          <h1 className="text-center font-bold text-2xl bg-sky-100 p-3 rounded-tr-lg rounded-tl-lg">
            Register Page
          </h1>

          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset className="fieldset">
                {/* Name field */}
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

                {/* image field */}
                <label className="label">Upload Image</label>
                <input
                  type="file"
                  className="file-input w-full"
                  {...register("image", { required: true })}
                />
                {errors.image && (
                  <p className="text-red-500 text-sm">{errors.image.message}</p>
                )}

                {/* Address field */}
                <label className="label">Address</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Address"
                  {...register("address", {
                    required: true,
                  })}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">
                    {errors.address.message}
                  </p>
                )}

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
                <div>
                  <input
                    type={passwordSeen ? "password" : "text"}
                    className="input w-full relative"
                    placeholder="Password"
                    {...register("password", {
                      required: true,

                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/,
                        message:
                          "Password must be at least 6 characters and include uppercase, lowercase, and special character",
                      },
                    })}
                  />
                  <span
                    onClick={() => setPasswordSeen(!passwordSeen)}
                    className="absolute  -ml-7 mt-2.5"
                  >
                    {passwordSeen ? (
                      <LuEye className="w-5 h-5" />
                    ) : (
                      <LuEyeOff className="w-5 h-5" />
                    )}
                  </span>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}

                {/*Confirm Password field */}
                {/* <label className="label">Confirm Password</label>
                <div>
                  <input
                    type={confirmPasswordSeen ? "password" : "text"}
                    className="input w-full"
                    placeholder="Confirm Password"
                    {...register("confirmPassword", {
                      required: true,

                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/,
                        message:
                          "Password must be at least 6 characters and include uppercase, lowercase, and special character",
                      },
                    })}
                  />
                  <span
                    onClick={() => setConfirmPasswordSeen(!confirmPasswordSeen)}
                    className="absolute  -ml-7 mt-2.5"
                  >
                    {confirmPasswordSeen ? (
                      <LuEye className="w-5 h-5" />
                    ) : (
                      <LuEyeOff className="w-5 h-5" />
                    )}
                  </span>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )} */}

                <button className="btn btn-neutral mt-4 p-2">
                  {loading ? <LoadingSpinner></LoadingSpinner> : "SUBMIT"}
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
            <Link to="/login" className="text-center">
              If you Already Registered pls.{" "}
              <span className="text-xl font-bold text-green-400 underline mr-0.5">
                Login
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
