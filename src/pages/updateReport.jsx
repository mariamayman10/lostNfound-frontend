import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getReportById, updateReport } from "../services/reportService";
import { formatError } from "../utils/errorFormatter";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const inputConfig = [
  { labelTxt: "Title", label: "title", type: "text" },
  { labelTxt: "Location", label: "location", type: "text" },
  { labelTxt: "Description", label: "description", type: "text" },
  { labelTxt: "Status", label: "status" },
];
function UpdateReport() {
  const { id } = useParams();
  const [error, setError] = useState("");
  const [report, setReport] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((store) => store.user.idToken);
  const [originalStatus, setOriginalStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function getReport() {
      const res = await getReportById(id, token);
      if (res.succ) {
        if (!res.data.isOwner) {
          navigate(`/report/${id}`, { replace: true });
          return;
        }
        setReport(res.data);
        setOriginalStatus(res.data.status);
      } else setError(formatError(res.data));
    }
    getReport();
  }, [id, token, navigate]);

  async function handleUpdate(e) {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const res = await updateReport(id, data, token);
    setIsLoading(false);
    if (res.succ) {
      navigate(`/report/${id}`, { replace: true });
    } else setError(formatError(res.data));
  }

  return (
    <div className="create-report-container min-h-screen flex flex-col justify-center lg:px-30 md:px-20 sm:px-15 px-9 pt-30">
      <p className="text-3xl font-bold mb-4 text-[#fe9a14]">Update Report</p>
      <form onSubmit={handleUpdate}>
        {inputConfig.map((ipt, iptIdx) => {
          if (ipt.label == "status") {
            return (
              <div className="relative w-fit" key={iptIdx}>
                <label htmlFor={ipt.label} className="block">
                  {ipt.labelTxt}
                </label>
                <select
                  name={ipt.label}
                  className="cursor-pointer w-50 border border-[#fe9a14] rounded-3xl px-4 py-2 appearance-none transition duration-200"
                  value={report[ipt.label] || ""}
                  onChange={(e) =>
                    setReport((prev) => ({
                      ...prev,
                      [ipt.label]: e.target.value,
                    }))
                  }
                  disabled={originalStatus === "closed"}
                >
                  <option value="claimed" hidden={originalStatus === "closed"}>
                    Claimed
                  </option>
                  <option value="closed">Closed</option>
                </select>
                <span className="absolute right-3 top-7/10 -translate-y-1/2 pointer-events-none">
                  <MdOutlineKeyboardArrowDown />
                </span>
              </div>
            );
          } else {
            return (
              <div className="mb-4" key={iptIdx}>
                <label htmlFor={ipt.label} className="block">
                  {ipt.labelTxt}
                </label>
                <input
                  name={ipt.label}
                  type={ipt.type}
                  className="mt-2 px-4 py-2 rounded-2xl w-full border border-[#ff9800]"
                  value={report[ipt.label] || ""}
                  onChange={(e) =>
                    setReport((prev) => ({
                      ...prev,
                      [ipt.label]: e.target.value,
                    }))
                  }
                  required
                />
              </div>
            );
          }
        })}
        {error && <p className="error-msg">{error}</p>}

        <div className="flex justify-end mt-3 mb-6">
          <button className="btn1 px-6 py-2" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Report"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateReport;
