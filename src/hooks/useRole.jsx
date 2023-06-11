import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../providers/AuthProvider";

const useRole = () => {
    const token = localStorage.getItem("access-token");
    const {user, loading} = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const {data: role, isLoading} = useQuery({
        queryKey: ["role", user?.email],
        enabled: !loading && !!user?.email && !!token,
        queryFn: async () => {
            if(!loading && user?.email) {
                const res = await axiosSecure.get(`/user/role/${user?.email}`);
            return res.data;
            }
        }
    })
    return [role, isLoading];
};

export default useRole;