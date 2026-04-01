import ReplyCard from "./replyCard";

function CommentCard({
  comment,
  onReply,
  replyToId,
  replyText,
  setReplyText,
  onCancel,
  onSubmitReply,
  posting,
}) {
  const isReplying = replyToId === comment.id;

  return (
    <div className="bg-gray-50 p-4 rounded-xl border">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-[#08350f]">{comment.userName}</p>
        <span className="text-xs text-gray-400">
          {new Date(comment.createdAt).toLocaleString()}
        </span>
      </div>

      <p className="text-gray-700 mt-1">{comment.content}</p>

      <button
        onClick={() => onReply(comment.id)}
        className="text-sm text-[#ff9800] mt-2 hover:underline"
      >
        Reply
      </button>

      {isReplying && (
        <div className="mt-3 flex gap-2 items-center">
          <input
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
            className="flex-1 border rounded-lg px-3 py-1 outline-none"
          />

          <button
            onClick={() => onSubmitReply(comment.id)}
            className="bg-[#08350f] text-white px-3 py-1 rounded-lg"
            disabled={replyText === "" || posting}
          >
            {posting ? "Posting..." : "Post"}
          </button>

          <button onClick={onCancel} className="text-gray-500 px-2">
            ✕
          </button>
        </div>
      )}
      {comment.replies?.length > 0 && (
        <div className="mt-3 ml-6 border-l pl-4 space-y-3">
          {comment.replies.map((reply) => (
            <ReplyCard key={reply.id} reply={reply}/>
          ))}
        </div>
      )}
    </div>
  );
}
export default CommentCard;
