import { useAuth } from "./context";
import { Outlet, useNavigate } from "react-router-dom";

const PrivateRoute = () => {
    const { currentUser } = useAuth()
    let navigate = useNavigate()

    const authtetic = currentUser

    return (authtetic ? <Outlet/> : navigate('/login')) ;
}
 
export default PrivateRoute;