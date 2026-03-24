import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../Contexts/AuthContextProv";

function ProtectRoutes(){
    const {user} = useAuth();
    
    if(!user){
        return <Navigate to= "/login" replace/>
    }

    return <Outlet/>
}

export default ProtectRoutes;