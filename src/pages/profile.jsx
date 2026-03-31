import { useDispatch, useSelector } from "react-redux";
import { getMyReports } from "../services/userService";
import { useEffect, useState } from "react";
import Btn from "../components/btn";
import { clearUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import ReportsList from "../components/reportsList";
const baseUrl = import.meta.env.VITE_BACKEND;

function Profile() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [lostReports, setLostReports] = useState([]);
  const [foundReports, setFoundReports] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedReports, setSelectedReports] = useState("lost");

  function logout() {
    localStorage.removeItem("user");
    dispatch(clearUser());
    navigate("/home", { replace: true });
  }

  useEffect(() => {
    async function fetchReports() {
      setIsLoading(true);
      const reports = await getMyReports(user.idToken);
      setLostReports(reports.lostReports);
      setFoundReports(reports.foundReports);
      setIsLoading(false);
    }
    fetchReports();
  }, [user.idToken]);
  return (
    <div className="profile-container min-h-screen pt-30 lg:px-15 md:px-10 px-5 ">
      <div className="flex justify-end mb-6">
        <Btn classN="btn1" onClick={logout}>
          Logout
        </Btn>
      </div>
      <div className="profile-info flex items-center md:gap-10 gap-4 mb-6">
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
      <div>
        <button
          className={`${selectedReports === "lost" ? "btn1" : "btn2"} px-5 py-1.5 mr-5`}
          onClick={() => setSelectedReports("lost")}
        >
          Lost Reports
        </button>
        <button
          className={`${selectedReports === "found" ? "btn1" : "btn2"} px-5 py-1.5`}
          onClick={() => {
            setSelectedReports("found");
          }}
        >
          Found Reports
        </button>
      </div>
      {isLoading ? (
        <p className="text-xl font-medium text-center text-gray-400 mt-5">
          Loading Your Reports...
        </p>
      ) : selectedReports === "lost" ? (
        lostReports.length > 0 ? (
          <div>
            <ReportsList reports={lostReports} />
          </div>
        ) : (
          <p>You have No Lost Reports</p>
        )
      ) : foundReports.length > 0 ? (
        <div>
          <ReportsList reports={foundReports} />
        </div>
      ) : (
        <p>You have No Found Reports</p>
      )}
    </div>
  );
}

export default Profile;
