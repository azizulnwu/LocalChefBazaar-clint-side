import React, { useEffect, useState } from "react";
import Navbar from "../Component/Shared/Navber/Navber";
import { Link, Outlet, useNavigate } from "react-router";
import { FaCodePullRequest } from "react-icons/fa6";
import useAuth from "../Hook/useAuth";
import useAxios from "../Hook/useAxiosInstant";
import { GiHotMeal } from "react-icons/gi";
import { GrDocumentUpdate } from "react-icons/gr";
import { PiBowlFoodBold } from "react-icons/pi";
import { FaBowlFood } from "react-icons/fa6";
import { MdManageAccounts } from "react-icons/md";
import { RiOrderPlayLine } from "react-icons/ri";
import { GoListUnordered } from "react-icons/go";
import useAxiosSecure from "../Hook/useAxiosSecure";
const DashboardLayout = () => {
 
  const { user, logOut, setLoading } = useAuth();
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure()
  const [currentUserProfile, setCurrentUserProfile] = useState();

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure.get(`/user?email=${user?.email}`).then((res) => {
      setCurrentUserProfile(res.data);
    });
  }, [user?.email, axiosSecure]);

  return (
    <div className="bg-slate-100">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbar w-full bg-base-300">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              {/* Sidebar toggle icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-4"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>
            <div className="px-4">LocalChefBazaar</div>
          </nav>
          {/* Page content here */}
          <div className="p-4">
            <div>
              <Outlet className="" />
            </div>
          </div>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
            {/* Sidebar content here */}
            <ul className="menu w-full grow">
              {/* List item */}
              <li>
                <Link
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Homepage"
                  to="/"
                >
                  {/* Home icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-4"
                  >
                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  </svg>
                  <span className="is-drawer-close:hidden">Homepage</span>
                </Link>
              </li>

              {/* List item */}
              {currentUserProfile?.role === "admin" && (
                <li>
                  <Link
                    className="is-drawer-close:tooltip wis-drawer-close:tooltip-right"
                    data-tip="Manage Request"
                    to="/dashboard/manageRequest"
                    // onClick={navigate("/dashboard/beaChefOrAdmin")}
                  >
                    {/* Settings icon */}

                    <FaCodePullRequest />
                    <span className="is-drawer-close:hidden">
                      Manage Request
                    </span>
                  </Link>
                </li>
              )}
              {/* List item */}
              {currentUserProfile?.role === "admin" && (
                <li>
                  <Link
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Manage User"
                    to="/dashboard/manageUser"
                    // onClick={navigate("/dashboard/beaChefOrAdmin")}
                  >
                    {/* Settings icon */}

                   <MdManageAccounts />
                    <span className="is-drawer-close:hidden">
                      Manage User
                    </span>
                  </Link>
                </li>
              )}

              {/* List item */}
              {currentUserProfile?.role === "chef" && (
                <li>
                  <Link
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Create Meal"
                    to="/dashboard/createMeal"
                    // onClick={navigate("/dashboard/beaChefOrAdmin")}
                  >
                    {/* Settings icon */}

                    <GiHotMeal />
                    <span className="is-drawer-close:hidden">
                      Create Meal
                    </span>
                  </Link>
                </li>
              )}
              {/* List item */}
              {currentUserProfile?.role === "chef" && (
                <li>
                  <Link
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My ALL Meal"
                    to="/dashboard/myAllMeals"
                    // onClick={navigate("/dashboard/beaChefOrAdmin")}
                  >
                    {/* Settings icon */}

                    <FaBowlFood />
                    <span className="is-drawer-close:hidden">
                      My ALL Meal
                    </span>
                  </Link>
                </li>
              )}
              {currentUserProfile?.role === "chef" && (
                <li>
                  <Link
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Order Request"
                    to="/dashboard/orderRequest"
                    // onClick={navigate("/dashboard/beaChefOrAdmin")}
                  >
                    {/* Settings icon */}

                    <RiOrderPlayLine />
                    <span className="is-drawer-close:hidden">
                    Order Request
                    </span>
                  </Link>
                </li>
              )}





              {/* List item */}
             {
              currentUserProfile?.role === "user" || currentUserProfile?.role === "admin" &&  <li>
                  <Link
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Favorite Food"
                    to="/dashboard/myFavoriteFood"
                    // onClick={navigate("/dashboard/beaChefOrAdmin")}
                  >
                    {/* Settings icon */}

                  <PiBowlFoodBold />
                    <span className="is-drawer-close:hidden">
                    Favorite Food
                    </span>
                  </Link>
                </li>
             }
                {/* List item */}
              {
                 currentUserProfile?.role === "user" &&   <li>
                  <Link
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip=" My Order Page"
                    to="/dashboard/myOrderPage"
                    // onClick={navigate("/dashboard/beaChefOrAdmin")}
                  >
                    {/* Settings icon */}

                  <GoListUnordered />
                    <span className="is-drawer-close:hidden">
                    My Order Page
                    </span>
                  </Link>
                </li>
              }
             
              {
               currentUserProfile?.role === "user" &&   <li>
                  <Link
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My All Review"
                    to="/dashboard/showReview"
                    // onClick={navigate("/dashboard/beaChefOrAdmin")}
                  >
                    {/* Settings icon */}

                   <GrDocumentUpdate />
                    <span className="is-drawer-close:hidden">
                   My All Review
                    </span>
                  </Link>
                </li>
             
              }
               
            






              <li>
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Settings"
                >
                  {/* Settings icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-4"
                  >
                    <path d="M20 7h-9"></path>
                    <path d="M14 17H5"></path>
                    <circle cx="17" cy="17" r="3"></circle>
                    <circle cx="7" cy="7" r="3"></circle>
                  </svg>
                  <span className="is-drawer-close:hidden">Settings</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
