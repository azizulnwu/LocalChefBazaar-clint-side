import React from "react";
import useAuth from "../../Hook/useAuth";
import useAxios from "../../Hook/useAxiosInstant";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { ToastContainer } from "react-toastify";
import { useSearchParams } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import PageTitle from "../../Pages/PageTitle";
const MyOrderPage = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure()
  // console.log(sessionId);
  const {
    data: myOrder = [],
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myOrder", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(
        `/orderedFood/myOrder?email=${user?.email}`,
      );
      // console.log(result.data);
      return result.data;
    },
  });

  // Payment Info..................

  const PayAmountHandler = async (data) => {
    const paymentData = {
      foodPrice: data.foodPrice,
      foodName: data.foodName,
      email: user?.email,
      id: data._id,
    };

    const result = await axiosInstance.post(
      "/create-checkout-session",
      paymentData,
    );
    // console.log(result.data);
    window.location.assign(result.data.url);
  };

  // const delateOldOrderHandler = (id) => {
  //   const orderInfo = {
  //     id,
  //   };

  //   axiosInstance.post("/orderedFood/delete", orderInfo).then(() => {
  //     Swal.fire({
  //       position: "top-end",
  //       icon: "success",
  //       title: "Delete Old Order",
  //       showConfirmButton: false,
  //       timer: 1500,
  //     });
  //      refetch();
  //   });
  // };
 
  // console.log(orderedFood);
   refetch()
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="max-w-[98%] mx-auto p-4">
      <PageTitle title="Dashboard | My Order Page"/>
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-2 bg-slate-400 p-4 mb-4 rounded-br-lg rounded-bl-lg">
        {myOrder.map((data) => (
          <div key={data._id} className="bg-slate-300 w-full">
            <div
              className="card  flex flex-col md:flex-row  mt-4  
     "
            >
              <div className="card-body  border-2 border-red-500 bg-base-100  flex flex-col items-start rounded-2xl">
                <h2 className="card-title mt-2 text-2xl">
                  {" "}
                  Food Name: {data.foodName}
                </h2>

                <p>
                  {" "}
                  <span className="font-bold text-[15px] ">
                    Order Status :{" "}
                  </span>
                  {data.orderStatus}
                </p>

                <p>
                  <span className="font-bold text-[15px]">Delivery Time</span> :
                  {data.estimatedDeliveryTime}
                </p>
                <p>
                  <span className="font-bold text-[15px]">Chef Name</span> :{" "}
                  {data.chefName}
                </p>
                <p>
                  <span className="font-bold text-[15px]">Chef ID</span> :{" "}
                  {data.chefId}
                </p>

                <p>
                  <span className="font-bold text-[15px]">Payment Status</span>{" "}
                  : {data.paymentStatus}
                </p>
                <p>
                  <span className="font-bold text-[15px]">Order Time</span> :{" "}
                  {data.orderTime}
                </p>
                <div className="card-actions w-full  flex justify-between my-4">
                  <p className="badge badge-outline font-bold md:py-0 py-6">
                    Total Price : {data.foodPrice}Tk
                  </p>
                  <p className="badge badge-outline font-bold">
                    Quantity : {data.quantity}
                  </p>
                </div>

                <div className="card-actions flex justify-center w-full">
                  <button
                    onClick={() => PayAmountHandler(data)}
                    className={`btn btn-primary hover:bg-blue-600 ${
                      data.orderStatus !== "accepted" && "btn-disabled"
                    }  ${data.paymentStatus !== "pending" && "btn-disabled"}`}
                  >
                    Pay
                  </button>
                  {/* <button
                    onClick={() => delateOldOrderHandler(data._id)}
                    className={`btn bg-red-500 hover:bg-red-400 ml-0.5 ${
                      data.orderStatus === "delivered" ? "" : "btn-disabled"
                    }`}
                  >
                    Delate
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ToastContainer></ToastContainer>
    </div>
  );
};

export default MyOrderPage;
