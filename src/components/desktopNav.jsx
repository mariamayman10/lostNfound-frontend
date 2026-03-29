import Logo from "./logo";
import SearchBar from "./searchBar";
import { NavLinks, LoginProfile } from "./commonNav";
import { useNavigate } from "react-router-dom";

function DesktopNav({ className }) {
  const navigate = useNavigate();

  return (
    <nav className={`fixed w-full rounded-br-2xl rounded-bl-2xl ${className}`}>
      <div className="h-18 px-10 lg:px-15 flex justify-between items-center font-medium">
        <div className="flex items-center gap-8">
          <Logo />
          <ul className="flex gap-7">
            <NavLinks />
          </ul>
        </div>
        <div className="flex gap-4">
          <SearchBar />
          <LoginProfile
            onClick={() => navigate("auth/login", { replace: true })}
          />
        </div>
      </div>
    </nav>
  );
}

export default DesktopNav;
