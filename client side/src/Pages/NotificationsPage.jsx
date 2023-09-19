import { useLocation } from "react-router-dom";
import NavigationBar from "../Components/NavigationBar";
import NavTopContent from "../Components/NavTopContent";
import Notifications from "../Components/Notifications";

export default function NotificationsPage({}) {
    const location = useLocation();
    const { user_id } = location.state;

    return (
        <div className="w-full bg-white">
            <NavigationBar navPosition=" fixed top-0 " navBackgColor=" bg-var-1 " content={<NavTopContent userId={user_id} />}/>
            <Notifications userId={user_id} />
        </div>
    )
}