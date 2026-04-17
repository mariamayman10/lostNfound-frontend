import { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { getReports } from "../services/reportService";
import { useSearchParams } from "react-router-dom";
import ReportsList from "../components/reportsList";

function Reports() {
  const [params, setParams] = useSearchParams();
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const title = params.get("title") || "";
  const category = params.get("category") || "";
  const location = params.get("location") || "";
  const type = params.get("type") || "";
  const sortBy = params.get("sortby") || "";
  const status = params.get("status") || "";

  function updateParam(key, value) {
    const newParams = new URLSearchParams(params);
    if (value) newParams.set(key, value);
    else newParams.delete(key);
    setParams(newParams);
  }

  useEffect(() => {
    async function getFilteredReports() {
      setIsLoading(true);
      setError("");
      let res = await getReports({ title, category, location, type, status, sortBy });
      if (res.succ) setReports(res.data);
      else setError("Something happened while fetching, try again...");
      setIsLoading(false);
    }
    getFilteredReports();
  }, [title, category, location, type, status, sortBy]);

  return (
    <div className="pt-25 lg:px-20 md:px-15 sm:px-10 px-7 min-h-screen">
      <div className="filters">
        <form>
          <div className="flex justify-between gap-5 flex-wrap">
            <div className="flex flex-wrap gap-3">
              <input
                type="text"
                placeholder="Search by title..."
                value={title}
                onChange={(e) => updateParam("title", e.target.value)}
                className="border border-[#024943] focus:border-[#fe9a14] rounded-3xl px-4 py-2 transition duration-200"
              />
              <input
                type="text"
                placeholder="Search by category..."
                value={category}
                onChange={(e) => updateParam("category", e.target.value)}
                className="border border-[#024943] focus:border-[#fe9a14] rounded-3xl px-4 py-2 transition duration-200"
              />
              <input
                type="text"
                placeholder="Search by location..."
                value={location}
                onChange={(e) => updateParam("location", e.target.value)}
                className="border border-[#024943] focus:border-[#fe9a14] rounded-3xl px-4 py-2 transition duration-200"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="relative w-fit">
                <select
                  value={type}
                  onChange={(e) => updateParam("type", e.target.value)}
                  className="cursor-pointer w-35 border border-[#024943] focus:border-[#fe9a14] rounded-3xl px-4 py-2 appearance-none transition duration-200"
                >
                  <option value="" defaultChecked>
                    All Types
                  </option>
                  <option value="lost">Lost</option>
                  <option value="found">Found</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <MdOutlineKeyboardArrowDown />
                </span>
              </div>
              <div className="relative w-fit">
                <select
                  value={status}
                  onChange={(e) => updateParam("status", e.target.value)}
                  className="cursor-pointer w-35 border border-[#024943] focus:border-[#fe9a14] rounded-3xl px-4 py-2 appearance-none transition duration-200"
                >
                  <option value="" defaultChecked>
                    All Status
                  </option>
                  <option value="open">Open</option>
                  <option value="claimed">Claimed</option>
                  <option value="closed">Closed</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <MdOutlineKeyboardArrowDown />
                </span>
              </div>
              <div className="relative w-fit">
                <select
                  value={sortBy}
                  onChange={(e) => updateParam("sortby", e.target.value)}
                  className="cursor-pointer w-35 border border-[#024943] focus:border-[#fe9a14] rounded-3xl px-4 py-2 appearance-none transition duration-200"
                >
                  <option value="" defaultChecked>
                    Sort By
                  </option>
                  <option value="desc">Newest</option>
                  <option value="asc">Oldest</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <MdOutlineKeyboardArrowDown />
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
      {error && <p className="error-msg">{error}</p>}
      {isLoading ? (
        <p className="text-xl font-bold text-center text-gray-400 mt-10">
          Loading Reports...
        </p>
      ) : reports.length > 0 ? (
        <ReportsList reports={reports} />
      ) : (
        <p className="text-xl font-bold text-center text-gray-400 mt-10">
          No such reports
        </p>
      )}
    </div>
  );
}

export default Reports;
