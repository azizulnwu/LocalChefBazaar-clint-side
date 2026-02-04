import React from "react";
import useAuth from "../../Hook/useAuth";
import useAxios from "../../Hook/useAxiosInstant";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { toast, ToastContainer } from "react-toastify";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const ManageUser = () => {
  const { user } = useAuth() || [];
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure()
  const { email } = user || [];

  const {
    data: userAll = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["userAll", user],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/all`);
      console.log(res.data);
      return res.data;
    },
  });

  const roleHandler = async (data, email) => {
    const updateData = {
      userStatus: data,
      email,
    };
    await axiosSecure.patch("/user/status", updateData).then(async () => {
      toast("Status update goingOn");
      refetch();
    });
  };

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className=" md:max-w-[90%] mx-auto p-10 mt-8 bg-slate-50">
      <div className="mt-4">
        {/* ================= DESKTOP TABLE ================= */}
        <div className="hidden md:block overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-slate-200">
                <th>Name</th>
                <th>Email</th>

                <th>User Roll</th>
                <th>User Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {userAll.map((data) => (
                <tr key={data.challengeId} className="bg-slate-100">
                  <td>{data.displayName}</td>

                  <td>{data.email}</td>

                  <td>
                    {" "}
                    <div className="font-bold">{data.role}</div>
                  </td>
                  <td>{data.userStatus}</td>

                  <td className="space-x-2">
                    {data.role !== "admin" && data.userStatus !== "fraud" && (
                      <button
                        onClick={() => roleHandler("fraud", data.email)}
                        className="btn bg-blue-300 hover:font-bold"
                      >
                        Make Fraud
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ================= MOBILE VIEW ================= */}
        <div className="md:hidden space-y-4 ">
          {userAll.map((data) => (
            <div
              key={data.challengeId}
              className="border rounded-lg p-2 bg-slate-100 space-y-2"
            >
              <div className="flex items-center justify-center gap-3">
                <div>
                  <p className="font-bold">{data.displayName}</p>
                  <p className="text-sm text-gray-500 ">{data.email}</p>
                </div>
              </div>

              <p>
                <span className="font-semibold ">ID:</span> {data._id}
              </p>
              <p>
                <span className="font-semibold">Role:</span> {data.role}
              </p>

              <div className="flex-wrap gap-2 pt-2 flex justify-center">
                {data.role !== "admin" && data.role !== "fraud" && (
                  <button
                    onClick={() => roleHandler("fraud", data.email)}
                    className="btn bg-blue-300 "
                  >
                    Make Fraud
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ToastContainer></ToastContainer>
    </div>
  );
};

export default ManageUser;
