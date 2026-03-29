import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../services/userService";
import { GoDash } from "react-icons/go";

const baseUrl = import.meta.env.VITE_BACKEND;

function User() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    async function getUser() {
      const res = await getUserById(id);
      if (res.succ) setUser(res.data);
      else setError("Couldn't load user");
    }
    getUser();
  }, [id]);
  return (
    <div className="flex flex-col justify-center min-h-screen lg:px-20 md:px-15 sm:px-10 px-7">
      {!user.name ? (
        <p className="text-xl font-bold text-center text-gray-400 mt-10">
          Loading User...
        </p>
      ) : error ? (
        <p className="error-msg">{error}</p>
      ) : (
        <div>
          <div className="profile-info flex flex-col items-center text-center md:gap-10 gap-4">
            <img
              src={`${baseUrl}/users/profile/${user.photoUrl.split("/")[3]}`}
              alt="profile"
              className="rounded-[50%] sm:w-35 sm:h-35 w-25 h-25 object-cover object-top"
            />
            <div>
              <duv className="flex items-center sm:text-3xl mb-5 text-[#ff9800]">
                <GoDash />
                CONTACT INFO
                <GoDash />
              </duv>
              <div className="text-[#024943]">
                <p className="sm:text-2xl text-[20px] font-bold">{user.name}</p>
                <p className="sm:text-xl text-[16px] font-medium">
                  {user.email}
                </p>
                <p className="sm:text-xl text-[16px] font-light">
                  {user.phoneNumber}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default User;
