import { useState } from "react";
import { useNavigate } from "react-router-dom";

const baseUrl = import.meta.env.VITE_BACKEND;

function ReportInfo({ report }) {
  const [selectedImg, setSelectedImg] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="report-details flex lg:flex-nowrap flex-wrap md:gap-10 gap-5 justify-center">
      <div className="images w-full md:w-120">
        <img
          src={`${baseUrl}/reports/report-img/${report.imageUrls[selectedImg].split("/")[3]}`}
          alt="report-img"
          className="w-full h-80 object-cover rounded-2xl mb-4 shadow-lg shadow-[#a2a2a2]"
        />
        <div className="img-list flex sm:gap-5 gap-4 justify-center self-center md:self-start">
          {report.imageUrls.map((img, idx) => (
            <img
              src={`${baseUrl}/reports/report-img/${img.split("/")[3]}`}
              className="w-20 h-20 rounded-lg shadow-lg shadow-[#a2a2a2]"
              onClick={() => setSelectedImg(idx)}
              key={idx}
            />
          ))}
        </div>
      </div>
      <div className="info w-full flex-1 my-4">
        <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
          <p className="text-2xl font-bold text-[#08350f]">{report.title}</p>
          <div>
            <span
              className={`px-3 py-0.5 rounded-full mr-3 ${
                report.type === "lost"
                  ? "bg-red-500/20 text-red-400"
                  : "bg-green-500/20 text-green-400"
              }`}
            >
              {report.type === "lost" ? "Lost" : "Found"}
            </span>
            <span
              className={`px-3 py-0.5 rounded-full ${
                report.status === "open"
                  ? "bg-green-500/20 text-green-600"
                  : report.status === "claimed"
                    ? "bg-yellow-500/20 text-yellow-600"
                    : "bg-gray-500/20 text-gray-500"
              }`}
            >
              {report.status}
            </span>
          </div>
        </div>
        <div className="mb-2">
          <span className="text-sm font-medium text-gray-500">Description</span>
          <p>{report.description}</p>
        </div>
        <div className="flex flex-wrap lg:gap-15 md:gap-10 gap-3">
          <div className="mb-2">
            <span className="text-sm font-medium text-gray-500">
              {report.type === "lost" ? "Lost At" : "Found At"}
            </span>
            <p>{report.location}</p>
          </div>
          <div className="mb-2">
            <span className="text-sm font-medium text-gray-500">
              {report.type === "lost" ? "Lost By" : "Found By"}
            </span>
            <p
              className="underline cursor-pointer text-[#024943]"
              onClick={() => navigate(`/users/${report.userId}`)}
            >
              {report.userName}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap lg:gap-15 md:gap-10 gap-3">
          <div className="mb-2">
            <span className="text-sm font-medium text-gray-500">Category</span>
            <p>{report.category}</p>
          </div>
          <div className="mb-2">
            <span className="text-sm font-medium text-gray-500">
              Created At
            </span>
            <p>{new Date(report.createdAt).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportInfo;
