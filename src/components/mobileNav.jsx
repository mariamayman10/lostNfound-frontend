import { useState } from "react";
import { useSelector } from "react-redux";
import { HiBars3 } from "react-icons/hi2";
import { FaRegUserCircle } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "./logo";
import Btn from "./btn";
import Notifications from "./notifications";

function MobileNav({ className = "" }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const user = useSelector((store) => store.user.userId);

  return (
    <nav className={`mobile-nav fixed z-50 w-full ${className}`}>
      <div className="rounded-bl-[18px] rounded-br-[18px] bg-[#024943]">
        <div className="h-16 px-4 flex justify-between items-center">
          <Logo />
          <div className="flex items-center">
            {user && (
              <>
                <Notifications user={user} />
                <button onClick={() => navigate("profile")} className="mr-2">
                  <FaRegUserCircle size={20} />
                </button>

              </>
            )}
            <button onClick={() => setOpen(!open)} className="text-2xl">
              <HiBars3 />
            </button>
          </div>
        </div>
        <div
          className={`
          overflow-hidden transition-max-h duration-300 ease-in-out w-full
          ${open ? "max-h-96" : "max-h-0"} bg-[#024943d5]
        `}
        >
          <ul className="flex flex-col items-center gap-4 p-4 font-medium mobile-ul">
            <li>
              <NavLink to="home" onClick={() => setOpen(false)}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="reports" onClick={() => setOpen(false)}>
                Reports
              </NavLink>
            </li>
            <li>
              <NavLink to="contact-us" onClick={() => setOpen(false)}>
                Contact
              </NavLink>
            </li>
          </ul>
          {user === "" && (
            <div className="px-4 pb-4 flex justify-center">
              <Btn
                onClick={() => {
                  setOpen(false);
                  navigate("auth/login", { replace: true });
                }}
                classN="btn1 w-full mb-2"
              >
                Login
              </Btn>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default MobileNav;
