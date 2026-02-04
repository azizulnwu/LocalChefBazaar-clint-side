import React, { useEffect } from "react";
import { useSearchParams } from "react-router";
import useAxios from "../../Hook/useAxiosInstant";
import useAuth from "../../Hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const PaymentSuccess = () => {
  const axiosInstance = useAxios();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { user, isLoading } = useAuth();
  const axiosSecure = useAxiosSecure()

  useEffect(() => {
    if (sessionId) {
     axiosInstance
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
        });
    }
  }, [sessionId, axiosInstance]);

  const { data: paymentInformation = [], refetch } = useQuery({
    queryKey: ["paymentInformation", user],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/paymentInformation?email=${user.email}`,
      );
      // console.log(res.data);
      return res.data;
    },
  });

  const delatePaymentInfo = (id) => {
    const paymentInfo = {
      id,
    };

    axiosSecure.post("/paymentInformation/delete", paymentInfo).then(() => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Payment Info Delete Successful",
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
    });
  };

  return (
    <div className="p-4 mt-2">
      <div className="card bg-base-100 max-w-[97%] mx-auto -mt-9">
        <div className="card-body">
          <h2 className="card-title">Payment Success</h2>
          <div className="mt-10">
            {/* ================= DESKTOP TABLE ================= */}
            <div className="hidden md:block overflow-x-auto">
              <h1 className="text-2xl font-bold text-blue-700 mb-4">
                Payment Information
              </h1>
              <table className="table w-full">
                <thead>
                  <tr className="bg-slate-200">
                    <th>Food Name</th>

                    <th>Total Amount</th>
                    <th>Transaction Id</th>
                    <th>Tracking Id</th>
                    <th>Transaction Time</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {paymentInformation.map((data) => (
                    <tr key={data?._id} className="bg-slate-100 ">
                      <td>{data?.foodName}</td>

                      <td>{data?.amountTotal} tk</td>
                      <td>{data?.transactionId}</td>
                      <td>{data?.trackingId}</td>
                      <td>{data?.paidTime}</td>
                      <td>
                        {" "}
                        <button
                          onClick={() => delatePaymentInfo(data._id)}
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
            <div className="md:hidden space-y-4  ">
              {paymentInformation.map((data) => (
               <div
                  key={data?.foodName}
                  className="rounded-lg p-2  space-y-2 -ml-4 "
                >
                  <div className="items-center gap-3 flex flex-col justify-center">
                    <div>
                      <p className="font-bold">{data?.amountTotal} tk</p>
                      <p className="text-sm text-gray-500">
                        {data?.transactionId}
                      </p>
                    </div>
                  </div>

                  <p>
                    <span className="font-semibold">Rating</span>{" "}
                    {data?.trackingId}
                  </p>
                  <p>
                    <span className="font-semibold">Review Time</span>{" "}
                    {data?.paidTime}
                  </p>
                  <div className="w-full h-1 border-2"></div>
                </div>
               
          
              ))}
              
            </div>
          </div>
          {/* <div className="card-actions justify-end"></div> */}
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
