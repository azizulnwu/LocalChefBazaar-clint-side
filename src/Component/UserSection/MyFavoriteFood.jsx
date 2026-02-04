import React from "react";
import useAuth from "../../Hook/useAuth";
import useAxios from "../../Hook/useAxiosInstant";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const MyFavoriteFood = () => {
  const { user, isLoading } = useAuth();
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure()
  const { data: userFavoriteFood = [], refetch } = useQuery({
    queryKey: ["userFavoriteFood", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/userFavoriteFood?email=${user?.email}`,
      );
      return res.data;
    },
  });

  const delateFavoriteFood = async (id) => {
    const deleteInfo = {
      id,
    };

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to delet this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post("/userFavoriteFood/delete", deleteInfo).then(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Delete Review  Successful",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        });
      }
    });
  };

  refetch();
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div className="p-4 mt-2">
      <div className="card bg-base-100 max-w-[97%] mx-auto -mt-9">
        <div className="card-body">
          <h2 className="card-title">My Favorite Food List</h2>
          <div className="mt-10">
            {/* ================= DESKTOP TABLE ================= */}
            <div className="hidden md:block overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr className="bg-slate-200">
                    <th>Meal Name</th>

                    <th>Chef Name</th>
                    <th>Meal Price</th>
                    <th>Date Added</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {userFavoriteFood.map((data) => (
                    <tr key={data?._id} className="bg-slate-100 ">
                      <td>{data?.mealName}</td>

                      <td>{data?.chefName}</td>
                      <td>{data?.price}</td>
                      <td>{data?.createAt}</td>
                      <td>
                        {" "}
                        <button
                          onClick={() => delateFavoriteFood(data._id)}
                          className="btn bg-red-500 hover:bg-red-400 ml-0.5"
                        >
                          Delate
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ================= MOBILE VIEW ================= */}
            <div className="md:hidden space-y-4">
              {userFavoriteFood.map((data) => (
                <div
                  key={data?._Id}
                  className="border rounded-lg p-4 bg-slate-100 space-y-2"
                >
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-bold">{data?.reviewerName}</p>
                      <p className="text-sm text-gray-500">{data?.rating}</p>
                    </div>
                  </div>

                  <p>
                    <span className="font-semibold">Rating</span> {data?.rating}
                  </p>
                  <p>
                    <span className="font-semibold">Review Time</span>{" "}
                    {data?.createAt}
                  </p>
                  <p>
                    <span className="font-semibold">Comment:</span>{" "}
                    {data?.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="card-actions justify-end"></div>
        </div>
      </div>
    </div>
  );
};

export default MyFavoriteFood;
