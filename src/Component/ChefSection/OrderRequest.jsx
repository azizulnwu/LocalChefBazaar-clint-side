import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import useAuth from "../../Hook/useAuth";
import useAxios from "../../Hook/useAxiosInstant";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import PageTitle from "../../Pages/PageTitle";

const OrderRequest = () => {
  const { user } = useAuth();
  const [chefId, setChefId] = useState();
  const axiosSecure = useAxiosSecure()
  const axiosInstance = useAxios();

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure.get(`/user?email=${user?.email}`).then((res) => {
      setChefId(res.data);
    });
  }, [user?.email, axiosSecure]);

  const {
    data: orderedFood = [],
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orderedFood", chefId?.chefID],
    queryFn: async () => {
      const result = await axiosSecure.get(
        `/orderedFood?chefId=${chefId?.chefID}`,
      );
      // console.log(result.data);
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  const orderStatusHandler = async (data, id) => {
    const updateData = {
      orderStatus: data,
      id,
    };
    await axiosSecure
      .patch("/orderedFood/orderStatus", updateData)
      .then(async () => {
        toast("Order Status update goingOn");
        refetch();
      });
  };

  const cancelRequest = (data, id) => {
    orderStatusHandler(data, id);
  };

  const setOrderStatusAccept = (data, id) => {
    orderStatusHandler(data, id);
  };
  const setOrderStatusDeliver = (data, id) => {
    orderStatusHandler(data, id);
  };

  return (
    <div className="md:max-w-[98%] mx-auto p-4">
      <PageTitle title="Dashboard | Order Request"/>
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-2 bg-slate-400 p-4 mb-4 rounded-br-lg rounded-bl-lg">
        {orderedFood.map((data) => (
          <div key={data._id} className="bg-slate-300 w-full">
            <div
              className="card  flex flex-col md:flex-row  mt-4  
     "
            >
              <div className="card-body  border-2 border-red-500 bg-base-100  flex flex-col items-start rounded-2xl px-4">
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

                <p className="">
                  <span className="font-bold text-[15px]">User Email</span> :
                  {data.userEmail}
                </p>
                <p>
                  <span className="font-bold text-[15px]">User Address</span> :{" "}
                  {data.userAddress}
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
                    onClick={() => cancelRequest("cancelled", data._id)}
                    className={`btn bg-red-400 hover:bg-red-500 ml-0.5 ${
                      data.orderStatus === "cancelled" && "btn-disabled"
                    }  ${data.orderStatus === "accepted" && "btn-disabled"}
                     ${data.orderStatus === "delivered" && "btn-disabled"}
                    `}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setOrderStatusAccept("accepted", data._id)}
                    className={`btn btn-primary hover:bg-blue-600 ${
                      data.orderStatus === "accepted" && "btn-disabled"
                    }  ${data.orderStatus === "cancelled" && "btn-disabled"}  ${data.orderStatus === "delivered" && "btn-disabled"}`}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => setOrderStatusDeliver("delivered", data._id)}
                    className={`btn btn-primary hover:bg-blue-600 ${
                      data.orderStatus === "accepted" ? "" : "btn-disabled"
                    }
                    ${data.paymentStatus === "paid" ? "" : "btn-disabled"}
                    
                    
                    `}
                  >
                    Deliver
                  </button>
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

export default OrderRequest;
