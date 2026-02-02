import React, { useEffect, useState } from "react";

import { Link } from "react-router";

import { toast, ToastContainer } from "react-toastify";
import useAuth from "../../../Hook/useAuth";

import Logo from "../Logo/Logo";
import useAxios from "../../../Hook/useAxiosInstant";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const axiosInstance = useAxios();
  const [currentUser, setCurrentUser] = useState();
  const LogoutUser = () => {
    logOut().then(() => toast.success("Logout successfully"));
  };

  useEffect(() => {
    if (!user?.email) return;
    axiosInstance.get(`/user?email=${user?.email}`).then((res) => {
      setCurrentUser(res.data);
      console.log(res.data);
    });
  }, [user?.email, axiosInstance]);
  console.log(currentUser);
  return (
    <div className="max-w-[90%] mx-auto py-4 -mt-8">
      <div className="navbar bg-slate-200 p-3 rounded-box">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/">Home</Link>
              </li>

              {/* <li>
                 <Link to="/tipsAdd">Add tips</Link>
              </li> */}
              {user && (
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
              )}
              <li>
                <Link to="/">Special Offer</Link>
              </li>

              {/* {user && currentUser?.roll == "admin" && (
                <li>
                  {" "}
                  <Link to="/addChallenges">Add Challenges</Link>{" "}
                </li>
              )} */}
            </ul>
          </div>
          <div className="flex items-center ml-2">
            <div className="hidden md:block">
              <Logo></Logo>
            </div>

            <Link className="text-2xl text-green-400 ml-1 md:block hidden">
              LocalChefBazaar
            </Link>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Home</a>
            </li>

            {user && (
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            )}
            <li>
              <Link to="/">Special Offer</Link>
            </li>

            {/* {user && currentUser?.roll == "admin" && (
              <li>
                {" "}
                <Link to="/addChallenges">Add Challenges</Link>{" "}
              </li>
            )} */}

            {/* <li>
              <Link to="/tipsAdd">Add tips</Link>
            </li> */}
          </ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn m-1">
                <img
                  src={
                    currentUser?.photoUrl
                      ? currentUser?.photoUrl
                      : `https://i.ibb.co.com/GQqk9w6N/e035717e-a755-485a-86c7-c165a4f7bb80.jpg`
                  }
                  alt="logo"
                  className="w-6 h-6"
                />
                <span>{currentUser?.displayName}</span>
              </div>
              <ul
                tabIndex="-1"
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                <li>
                  <Link to="/dashboard/myProfile">Profile</Link>
                </li>
                <li>
                  <Link to="/dashboard/myFavoriteFood">My Favorite Food</Link>
                </li>
                <li>
                  <button onClick={LogoutUser}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-primary mr-2 font-bold hover:bg-blue-600"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-primary font-bold hover:bg-blue-600 "
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Navbar;
