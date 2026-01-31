import React from "react";
import { Link } from "react-router";
import useAuth from "../../Hook/useAuth";
import useAxios from "../../Hook/useAxiosInstant";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../Shared/LoadingSpinner";

const MealReview = ({ id }) => {
  const { user, isLoading } = useAuth();
  const axiosInstance = useAxios();
  console.log(id);
  const { data: userReview = [], refetch } = useQuery({
    queryKey: ["userReview", user],
    queryFn: async () => {
      const res = await axiosInstance.get(`/userReview/${id}`);
      return res.data;
    },
  });
  console.log(userReview)
  refetch();

  







  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="p-4">
      <div className="card bg-base-100 max-w-[97%] mx-auto -mt-9">
        <div className="card-body">
          <h2 className="card-title">Meal Review section</h2>
          <div className="mt-10">
            {/* ================= DESKTOP TABLE ================= */}
            <div className="hidden md:block overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr className="bg-slate-200">
                    <th>Reviewer Name</th>
                    <th>Reviewer Image</th>
                    <th>Food Rating</th>
                    <th>Reviewer Comment</th>
                  </tr>
                </thead>

                <tbody>
                  {userReview.map((data) => (
                    <tr key={data?._id} className="bg-slate-100 ">
                      <td>{data?.reviewerName}</td>
                      <td>
                        <img
                          src={data?.reviewerImage}
                          alt=""
                          className={data?.reviewerImage && "w-10 h-10"}
                        />
                      </td>

                      <td>{data?.rating}</td>
                      <td>{data?.comment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ================= MOBILE VIEW ================= */}
            <div className="md:hidden space-y-4">
              {userReview.map((data) => (
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
                    <span className="font-semibold">Comment:</span>{" "}
                    {data?.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="card-actions justify-end">
          
            <Link
              to={`/mealReview/${id}`}
              className="btn btn-primary hover:bg-blue-600 "
            >
              Give Review
            </Link>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealReview;
