import axios from "axios";
import React from "react";

const axiosInstance = axios.create({
  baseURL: "https://local-chef-bazaar-server-side.vercel.app",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
