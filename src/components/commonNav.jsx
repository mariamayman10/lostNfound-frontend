import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import Btn from "./btn";

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
  const user = useSelector((state) => state.user.idToken);

  return (
    <>
      {user ? (
        <button onClick={() => navigate("profile")}>
          <FaRegUserCircle size={20} />
        </button>
      ) : (
        <Btn onClick={() => navigate("auth/login")} classN="btn1">
          Login
        </Btn>
      )}
    </>
  );
}
