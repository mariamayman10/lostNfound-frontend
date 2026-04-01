function ReplyCard({reply}) {
  return (
    <div key={reply.id} className="bg-white p-3 rounded-lg border">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-[#08350f]">{reply.userName}</span>
        <span className="text-xs text-gray-400">
          {new Date(reply.createdAt).toLocaleString()}
        </span>
      </div>

      <p className="text-gray-700 mt-1">{reply.content}</p>
    </div>
  );
}

export default ReplyCard
