import { useDispatch, useSelector } from "react-redux";
import { getMyReports } from "../services/userService";
import { useEffect, useState } from "react";
import Btn from "../components/btn";
import { clearUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
const baseUrl = import.meta.env.VITE_BACKEND;

function Profile() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [lostReports, setLostReports] = useState([]);
  const [foundReports, setFoundReports] = useState([]);
  
  function logout(){
    localStorage.removeItem('user');
    dispatch(clearUser());
    navigate('/home', {replace: true})
  }

  useEffect(() => {
    async function fetchReports() {
      const reports = await getMyReports(user.idToken);
      setLostReports(reports.lostReports)
      setFoundReports(reports.foundReports);
    }
    fetchReports()
  });
  return (
    <div className="profile-container min-h-screen pt-30 lg:px-15 md:px-10 px-5 ">
      <div className="flex justify-end mb-6">
        <Btn classN="btn1" onClick={logout}>Logout</Btn>
      </div>
      <div className="profile-info flex items-center md:gap-10 gap-4">
        <img
          src={`${baseUrl}/users/profile/${user.photoUrl.split("/")[3]}`}
          alt="profile"
          className="rounded-[50%] sm:w-35 sm:h-35 w-25 h-25 object-cover object-top"
        />
        <div>
          <p className="sm:text-2xl text-[20px] font-bold">{user.name}</p>
          <p className="sm:text-l text-[16px] text-gray-400 font-medium">
            {user.email}
          </p>
          <p className="sm:text-l text-[16px] text-gray-400 font-light">
            {user.phoneNumber}
          </p>
        </div>
      </div>
      {lostReports.length > 0 && (
        <div>
          <p className="text-2xl font-bold mb-5">Lost Reports</p>
          <ReportsList reports={lostReports} />
        </div>
      )}
      {foundReports.length > 0 && (
        <div>
          <p className="text-2xl font-bold mb-5">Found Reports</p>
          <ReportsList reports={foundReports} />
        </div>
      )}
    </div>
  );
}

export default Profile;
