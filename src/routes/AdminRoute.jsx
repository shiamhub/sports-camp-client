import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useRole from "../hooks/useRole";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const [role, isLoading] = useRole();
    const location = useLocation();

    if(loading || isLoading) {
        return <div>Loading...</div>
    }
    if(user && role?.role === 'admin') {
        return children;
    }
    
    return <Navigate to="/" replace state={{from: location}} ></Navigate>
};

export default AdminRoute;