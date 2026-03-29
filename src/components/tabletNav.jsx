import Logo from "./logo";
import { LoginProfile, NavLinks } from "./commonNav";
import { useNavigate } from "react-router-dom";

function TabletNav({ className }) {
  const navigate = useNavigate();

  return (
    <nav className={`fixed w-full rounded-br-2xl rounded-bl-2xl ${className}`}>
      <div className="h-18 px-15 flex justify-between items-center font-medium">
        <Logo />
        <div className="flex items-center gap-7">
          <ul className="flex gap-7">
            <NavLinks />
          </ul>
          <LoginProfile
            onClick={() => navigate( "auth/login", { replace: true })}
          />
        </div>
      </div>
    </nav>
  );
}

export default TabletNav;
