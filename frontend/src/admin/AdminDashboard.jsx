import { useNavigate, Outlet } from "react-router-dom";

export default function AdminDashboard(){
    
    const navigate = useNavigate();
    return(
        <div className="flex flex-col ">
            <div className="bg-blue-300 h-[7%] w-full py-3">
                <h1 onClick={() => navigate("/secret/admin")}>Admin dashboard</h1>
            </div>

            <Outlet />
        </div>
    )
}