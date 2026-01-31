import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxios from "./useAxiosInstant";

const useStatus = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();

  const {
    data: userStatus,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userStatus", user?.email],

    queryFn: async () => {
      const res = await axiosInstance.get(`/user?email=${user.email}`);
      return res.data;
    },
  });

  return { userStatus, isLoading, error };
};

export default useStatus;
