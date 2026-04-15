import { useEffect, useState } from "react";
import { getFeedbacks } from "../services/feedbackService";
import { useNavigate } from "react-router-dom";
import FeedbackCard from "./feedbackCard";

function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchFeedbacks() {
      setIsLoading(true);
      const res = await getFeedbacks(3);
      if (res.succ) setFeedbacks(res.data);
      setIsLoading(false);
    }
    fetchFeedbacks();
  }, []);
  if (isLoading)
    return (
      <p className="text-center font-medium text-gray-400 py-5">
        Loading Feedbacks
      </p>
    );
  return (
    <div className="bg-(--primary) text-(--text-color) py-12 px-4">
      <div className="max-w-6xl m-auto">
        <h2 className="text-2xl font-semibold text-center mb-8">
          What People Say
        </h2>

        <div className="flex justify-center gap-4 flex-wrap">
          {feedbacks.map((fb) => (
            <FeedbackCard fb={fb} key={fb.id} />
          ))}
        </div>
      </div>
      <div className="flex justify-end">
        <button
          className="text-(--secondary) underline mt-5"
          onClick={() => navigate("/feedbacks")}
        >
          View All Feedbacks
        </button>
      </div>
    </div>
  );
}
export default FeedbackList;
