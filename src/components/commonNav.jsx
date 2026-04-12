import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import Btn from "./btn";
import Notifications from "./notifications";

export function NavLinks() {
  return (
    <>
      <li>
        <NavLink to="home">Home</NavLink>
      </li>
      <li>
        <NavLink to="reports">Reports</NavLink>
      </li>
      <li>
        <NavLink to="contact-us">Contact</NavLink>
      </li>
    </>
  );
}

export function LoginProfile() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userId);

  return (
    <>
      {user ? (
        <div className="flex items-center">
          <Notifications user={user} />
          <button onClick={() => navigate("profile")}>
            <FaRegUserCircle size={20} />
          </button>
        </div>
      ) : (
        <Btn onClick={() => navigate("auth/login")} classN="btn1">
          Login
        </Btn>
      )}
    </>
  );
}
