import { useState } from "react";
import { commentOnReport } from "../services/reportService";

function AddCommentBox({ id, token, setComments }) {
  const [comment, setComment] = useState("");
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");
  const updateComment = (val) => {
    setComment(val);
    setError("");
  };

  async function addComment() {
    if (comment === "") return;
    setPosting(true);
    setError("");
    const commentObj = {
      content: comment,
      parentId: null,
      reportId: id,
    };
    const res = await commentOnReport(token, commentObj);
    if (res.succ) {
      setComment("");
      setComments((prev) => [...prev, res.data]);
    } else setError("Failed to save the comment, try again...");
    setPosting(false);
  }
  return (
    <div className="bg-white p-4 rounded-xl shadow border border-[#024943]">
      {error && <p className="error-msg">{error}</p>}
      <textarea
        placeholder="Write a comment..."
        className="w-full resize-none outline-none"
        value={comment}
        onChange={(e) => updateComment(e.target.value)}
        rows={3}
      />

      <div className="flex justify-end mt-2">
        <button
          className="bg-[#ff9800] text-white px-4 py-1 rounded-lg hover:opacity-90"
          onClick={addComment}
          disabled={comment === "" || posting}
        >
          {posting ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
}
export default AddCommentBox;
