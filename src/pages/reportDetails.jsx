import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { commentOnReport, getReportById } from "../services/reportService";
import { groupComments } from "../utils/commentsGrouper";
import CommentCard from "../components/commentCard";
import AddCommentBox from "../components/addCommentBox";
import ReportInfo from "../components/reportInfo";
import { formatError } from "../utils/errorFormatter";

function ReportDetails() {
  const token = useSelector((store) => store.user.idToken);
  const { id } = useParams();
  const [error, setError] = useState("");
  const [report, setReport] = useState({});
  const [comments, setComments] = useState([]);
  const [replyToId, setReplyToId] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [posting, setPosting] = useState(false);
  const navigate = useNavigate();

  async function handleReplySubmit() {
    if (replyText === "") return;
    setPosting(true);
    const replyObj = {
      content: replyText,
      parentId: replyToId,
      reportId: id,
    };
    const res = await commentOnReport(token, replyObj);
    if (res.succ) {
      const newReply = res.data;
      setComments((prev) => {
        return prev.map((c) => {
          if (c.id === replyToId) {
            return {
              ...c,
              replies: [...(c.replies || []), newReply],
            };
          }
          return c;
        });
      });
      setReplyText("");
      setReplyToId(null);
    } else setError(formatError(res.data));
    setPosting(false);
  }

  useEffect(() => {
    async function getReport() {
      const res = await getReportById(id, token);
      if (res.succ) {
        setComments(groupComments(res.data.comments));
        setReport(res.data);
      } else setError("Report not found");
    }
    getReport();
  }, [id, token]);

  return (
    <div className="pt-25 min-h-screen lg:px-20 md:px-15 sm:px-10 px-7">
      {!report.title ? (
        <p className="text-2xl font-medium text-center text-gray-400">
          Loading Report...
        </p>
      ) : error ? (
        <p className="error-msg">{error}</p>
      ) : (
        <div>
          <ReportInfo report={report} />
          <div className="my-10 border-t border-[#024943] pt-6">
            <h2 className="text-xl font-bold mb-4 text-[#ff9800]">Comments</h2>

            <AddCommentBox token={token} id={id} setComments={setComments} />

            <div className="mt-6 space-y-4">
              {comments.map((c) => (
                <CommentCard
                  key={c.id}
                  comment={c}
                  onReply={(id) => setReplyToId(id)}
                  replyToId={replyToId}
                  replyText={replyText}
                  setReplyText={setReplyText}
                  onCancel={() => setReplyToId(null)}
                  onSubmitReply={handleReplySubmit}
                  posting={posting}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      {report.isOwner && report.status !== "closed" && (
        <div className="flex justify-end">
          <button
            className="btn1 px-4 py-1.5 mb-6"
            onClick={() => navigate(`/report/${report.id}/update`)}
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
}

export default ReportDetails;
