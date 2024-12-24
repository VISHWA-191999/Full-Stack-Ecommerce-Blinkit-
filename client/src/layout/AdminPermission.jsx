import { useSelector } from "react-redux"
import isAdmin from "../utils/isAdmin"

const AdminPermission = ({children}) =>{  // it is higher order function here we pass children component from route.js
    const user = useSelector(state => state.user)
    const role=isAdmin(user.role) 

    return (
        <div>
            {role ? children : <div className="text-red-500 font-semibold ">Don't have permission</div> }

        </div>
    )
}

export default AdminPermission