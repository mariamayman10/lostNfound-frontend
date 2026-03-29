import { Link } from "react-router-dom";

const baseUrl = import.meta.env.VITE_BACKEND;

function ReportCard({ report }) {
  return (
    <Link
      to={`/report/${report.id}`}
      className="w-full bg-[#f5f5f5] text-[#024943] rounded-2xl overflow-hidden shadow hover:scale-[1.02] transition duration-200 mb-5"
    >
      <img
        src={`${baseUrl}/reports/report-img/${report.imageUrls[0].split("/")[3]}`}
        alt={report.title}
        className="h-48 w-full object-cover"
      />

      <div className="p-4 flex flex-col gap-2">
        <p className="text-lg font-semibold line-clamp-1">{report.title}</p>
        <div className="flex justify-between text-sm text-gray-400">
          <span>{report.category}</span>
          <span
            className={`px-2 py-0.5 rounded-full text-xs ${
              report.type === "lost"
                ? "bg-red-500/20 text-red-400"
                : "bg-green-500/20 text-green-400"
            }`}
          >
            {report.type}
          </span>
        </div>
        <div className="text-sm text-gray-400 flex justify-between">
          <span>Status: {report.status}</span>
          <span className="truncate max-w-[50%]">📍 {report.location}</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {new Date(report.createdAt).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
}

export default ReportCard;
