import React from "react";
import useAuth from "../../Hook/useAuth";
import useAxios from "../../Hook/useAxiosInstant";
import { useQuery } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { Link } from "react-router";
import BrandLogo from "../Shared/Logo/BrandLogo";
import useAxiosSecure from "../../Hook/useAxiosSecure";
const ManageRequest = () => {
  const { user } = useAuth() || [];
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure()
  const { email } = user || [];

  const {
    data: ChefOrAdmin = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["chefOrAdmin", user],
    queryFn: async () => {
      const res = await axiosSecure.get(`/chefOrAdmin`);
      // console.log(res.data);
      return res.data;
    },
  });

  // console.log(ChefOrAdmin);
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  

  const roleHandler = async (data, email) => {
    // console.log(data);
    const updateData = {
      role: data,
      email,
    };
    await axiosSecure.patch("/user/role", updateData).then(async () => {
      toast("Role update goingOn");
      const deleteChallengerData = {
        email,
      };
      // console.log(deleteChallengerData)
      await axiosSecure.post("/chefOrAdmin/delete", deleteChallengerData);

      refetch();
    });
  };

  const setRoleChef = (data, email) => {
    roleHandler(data, email);
  };
  const setRoleAdmin = (data, email) => {
    roleHandler(data, email);
  };

  const deleteRequest = async (email) => {
    const deleteChallengerData = {
      email,
    };
    // console.log(deleteChallengerData)
    await axiosInstance
      .post("/chefOrAdmin/delete", deleteChallengerData)
      .then(() => {
        toast("Request Deleted");
        refetch();
      });
  };

  return (
    <div className=" md:max-w-[90%] mx-auto p-10 mt-8 bg-slate-50">
      <div className="mt-10">
        {/* ================= DESKTOP TABLE ================= */}
        <div className="hidden md:block overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-slate-200">
                <th>Name</th>
                <th>Email</th>
                <th>ID</th>
                <th>Expected Roll</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {ChefOrAdmin.map((data) => (
                <tr key={data.challengeId} className="bg-slate-100">
                  <td>{data.name}</td>

                  <td>{data.email}</td>
                  <td>{data._id}</td>
                  <td>
                    {" "}
                    <div className="font-bold">{data.role}</div>
                  </td>

                  <td className="space-x-2">
                    {data.role === "chef" && (
                      <button
                        onClick={() => setRoleChef("chef", data.email)}
                        className="btn bg-blue-300 hover:font-bold"
                      >
                        Accept Request
                      </button>
                    )}

                    {data.role === "admin" && (
                      <button
                        onClick={() => setRoleAdmin("admin", data.email)}
                        className="btn bg-blue-300 hover:font-bold"
                      >
                        Accept Request
                      </button>
                    )}

                    <button
                      onClick={() => deleteRequest(data.email)}
                      className="btn bg-red-500 font-bold hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ================= MOBILE VIEW ================= */}
        <div className="md:hidden  space-y-4 ">
          {ChefOrAdmin.map((data) => (
            <div
              key={data.challengeId}
              className="  rounded-lg px-2  bg-slate-150 space-y-2"
            >
              <div className="flex items-center gap-3 justify-center ">
                <div>
                  <p className="font-bold">{data.name}</p>
                  <p className="text-sm text-gray-500">{data.email}</p>
                </div>
              </div>

              <p className="">
                <span className="font-semibold ">ID:</span> {data._id}
              </p>
              <p>
                <span className="font-semibold">Role:</span> {data.role}
              </p>

              <div className="flex flex-wrap gap-2 pt-2 justify-center">
                {data.role === "chef" && (
                  <button
                    onClick={() => setRoleChef("chef", data.email)}
                    className="btn bg-blue-300"
                  >
                    Accept Request
                  </button>
                )}

                {data.role === "admin" && (
                  <button
                    onClick={() => setRoleAdmin("admin", data.email)}
                    className="btn bg-blue-300"
                  >
                    Accept Request
                  </button>
                )}

                <button
                  onClick={() => deleteRequest(data.email)}
                  className="btn bg-red-500 text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ToastContainer></ToastContainer>
    </div>
  );
};

export default ManageRequest;
