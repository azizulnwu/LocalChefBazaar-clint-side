import React, { useEffect, useState } from "react";
import useAxios from "../../Hook/useAxiosInstant";

import LoadingSpinner from "../Shared/LoadingSpinner";
import { Link, NavLink } from "react-router";
import useAuth from "../../Hook/useAuth";

const AllMeals = () => {
  const { isLoading } = useAuth();
  const axiosInstance = useAxios();
  const [allMealsLoad, setAllMealsLoad] = useState([]);

  useEffect(() => {
    axiosInstance.get("/allMeals").then((res) => {
      if (res.data) {
        setAllMealsLoad(res.data);
      }
    });
  }, [setAllMealsLoad, axiosInstance]);

  const descendingOrder = async () => {
    await axiosInstance.get("/allMeals/descending").then((res) => {
      setAllMealsLoad(res.data);
    });
  };
  const ascendingOrder = async () => {
    await axiosInstance.get("/allMeals/ascending").then((res) => {
      setAllMealsLoad(res.data);
    });
  };

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div className="w-full md:max-w-[90%] mx-auto">
      <div className="text-center font-bold text-2xl bg-sky-200 p-4 rounded-tr-lg rounded-tl-lg flex justify-between p-4">
        <h1>All Meals Section</h1>
        {/* change popover-1 and --anchor-1 names. Use unique names for each dropdown */}
        {/* For TSX uncomment the commented types below */}
        <button
          className="btn font-bold"
          popoverTarget="popover-1"
          style={{ anchorName: "--anchor-1" } /* as React.CSSProperties */}
        >
          Sorted-Meal by price
        </button>

        <ul
          className="dropdown menu w-52 rounded-box bg-base-100 shadow-sm"
          popover="auto"
          id="popover-1"
          style={{ positionAnchor: "--anchor-1" } /* as React.CSSProperties */}
        >
          <li>
            <button onClick={descendingOrder}>Descending Order</button>
          </li>
          <li>
            <button onClick={ascendingOrder}>Ascending Order</button>
          </li>
        </ul>
      </div>
      <div className="bg-red-300 w-full h-1"></div>
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-2 bg-slate-300 p-4 mb-4 rounded-br-lg rounded-bl-lg">
        {allMealsLoad.map((data) => {
          return (
            <div className="card bg-base-100  shadow-sm w-full">
              <figure className="flex-1 overflow-hidden">
                <img
                  src={data.foodImage}
                  alt="foodImage"
                  className="w-200 h-100 object-cover "
                />
              </figure>
              <div className="mt-4  w-full">
                <div className=" flex justify-center">
                  <h2 className="card-title mb-2">
                    {data.foodName}
                    <div className="badge badge-secondary text-center">NEW</div>
                  </h2>
                </div>

                <div className="flex gap-4">
                  <p className="space-y-2">
                    <span className="font-bold">ChefName</span>: {data.chefName}
                  </p>

                  <p className="space-y-2">
                    <span className="font-bold">ChefId</span>: {data.chefId}
                  </p>
                </div>

                <div className="card-actions flex  my-4 w-full">
                  <p className="badge badge-outline font-bold">
                    Food Price : {data.price} Tk
                  </p>
                  <p className="badge badge-outline font-bold">
                    Food Rating: {data.rating}
                  </p>
                </div>
                <Link
                  to={`/mealDetails/${data._id}`}
                  className="btn bg-orange-300 hover:bg-orange-400"
                >
                  See Details
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllMeals;
