import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

import { toast, ToastContainer } from "react-toastify";
import useAuth from "../../Hook/useAuth";
import useAxios from "../../Hook/useAxiosInstant";
import BrandLogo from "../Shared/Logo/BrandLogo";

const MyProfile = () => {
  const { user, logOut, setLoading } = useAuth();
  const axiosInstance = useAxios();
  // const axiosSecure = useAxiosSecure()
  const navigate = useNavigate();
  const [currentUserProfile, setCurrentUserProfile] = useState();

  const LogoutUser = () => {
    logOut().then(() => {
      toast.success("Logout successfully");
      setLoading(false);
      navigate("/");
    });
  };
  // console.log(user);
  useEffect(() => {
    if (!user?.email) return;

    axiosInstance.get(`/user?email=${user?.email}`).then((res) => {
      setCurrentUserProfile(res.data);
    });
  }, [user?.email, axiosInstance]);
  // console.log(currentUserProfile);
  return (
    <div className="">
      <div className="card card-side shadow-sm mt-8 md:p-4 bg-base-300 flex flex-col md:flex-row md:items-end">
        <figure>
          <img
            src={
              currentUserProfile?.photoUrl
                ? currentUserProfile?.photoUrl
                : `https://i.ibb.co.com/GQqk9w6N/e035717e-a755-485a-86c7-c165a4f7bb80.jpg`
            }
            alt="logo"
            className="md:w-100 md:h-100 p-3"
          />
        </figure>
        <div className="space-y-3 ml-4 flex flex-col items-start">
          <h2 className="">
            <span className="font-bold text-[15px]  "> Email </span> :{" "}
            {currentUserProfile?.email}
          </h2>
          <p>
            <span className="font-bold text-[15px]"> Name </span> :{" "}
            {currentUserProfile?.displayName}
          </p>
          <p>
            <span className="font-bold text-[15px]">Roll </span>:{" "}
            {currentUserProfile?.role}
          </p>
          {currentUserProfile?.chefID && <p>
            <span className="font-bold text-[15px]">ChefID </span>:{" "}
            {currentUserProfile?.chefID}
          </p>}
          {
            !currentUserProfile?.chefID && <p>
            <span className="font-bold text-[15px]">ID </span>:{" "}
            {currentUserProfile?._id}
          </p>
          }

          

          <p className=" md:block hidden">
            <span className="font-bold text-[15px]">CreateAt </span>:{" "}
            {currentUserProfile?.createAt}
          </p>
          <div className="card-actions md:justify-end">
            {currentUserProfile?.role !== "admin" && (
              <Link
                to="/dashboard/beaChefAdmin"
                className="btn btn-primary mt-2 hover:bg-blue-600 "
              >
                Be a Chef or Admin
              </Link>
            )}
            <button
              onClick={LogoutUser}
              className="btn btn-primary mt-2 hover:bg-blue-600 "
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default MyProfile;
