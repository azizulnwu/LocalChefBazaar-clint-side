import React from "react";

import useAxios from "../../Hook/useAxiosInstant";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../Shared/LoadingSpinner";

const CustomerReview = () => {
  const axiosInstance = useAxios();
  const { data: userReview = [], isLoading } = useQuery({
    queryKey: ["userReview"],
    queryFn: async () => {
      const result = await axiosInstance.get("/userReview");
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="w-full md:max-w-[90%] mx-auto rounded-box mb-4">
      <h1 className="text-center font-bold text-2xl bg-sky-200 p-4 rounded-tr-lg rounded-tl-lg">
        All Review Section
      </h1>
      <div className="bg-red-300 w-full h-1"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 bg-slate-300 p-4 rounded-br-lg rounded-bl-lg gap-2">
        {userReview.map((data) => {
          return (
            <div className="card h-100 bg-base-100 w-full flex flex-col shadow-sm ">
              <figure className="px-10 pt-10 flex-1">
                <img
                  src={data.foodImage}
                  alt="Shoes"
                  className="w-200 h-100 object-cover"
                />
              </figure>
              <div className="mt-2 items-center text-center">
                <div className="">
                  <h2 className="text-center text-xl font-bold">Food Name :</h2>
                  <p>{data.foodName}</p>
                </div>
                
                <div className="mt-2 bg-red-200">
                  <div className="hidden w-full md:block overflow-x-auto">
                    <table className="table w-full">
                      <thead>
                        <tr className="bg-slate-200">
                          <th>Reviewer Name</th>
                          <th>Reviewer Image</th>
                          <th>Rating</th>
                          <th>Comment</th>
                        </tr>
                      </thead>

                      <tbody>
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
                      </tbody>
                    </table>
                    <p>Customer Review Time: {data.createAt}</p>
                  </div>

                  {/* ================= MOBILE VIEW ================= */}
                  {/* <div className="md:hidden space-y-4">
                    {userReview.map((data) => (
                      <div
                        key={data?._Id}
                        className="border rounded-lg p-4 bg-slate-100 space-y-2"
                      >
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="font-bold">{data?.reviewerName}</p>
                            <p className="text-sm text-gray-500">
                              {data?.rating}
                            </p>
                          </div>
                        </div>

                        <p>
                          <span className="font-semibold">Rating</span>{" "}
                          {data?.rating}
                        </p>
                        <p>
                          <span className="font-semibold">Comment:</span>{" "}
                          {data?.comment}
                        </p>
                      </div>
                    ))}
                  </div> */}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomerReview;
