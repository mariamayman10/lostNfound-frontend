import ReportCard from "../components/reportCard";

function ReportsList({ reports }) {
  return (
    <div className="reports-container mt-10 grid justify-items-center gap-5">
      {reports.length > 0 &&
        reports.map((r) => <ReportCard report={r} key={r.id} />)}
    </div>
  );
}

export default ReportsList;
