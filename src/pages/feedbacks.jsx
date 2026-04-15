import { useState } from "react";
import { useEffect } from "react";
import { getFeedbacks } from "../services/feedbackService";
import FeedbackCard from "../components/feedbackCard";

function Feedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchFeedbacks() {
      setIsLoading(true);
      const res = await getFeedbacks(100);
      if (res.succ) setFeedbacks(res.data);
      setIsLoading(false);
    }
    fetchFeedbacks();
  }, []);
  return (
    <div className="flex flex-col justify-center min-h-screen max-w-6xl m-auto">
      {isLoading ? (
        <p className="text-center font-medium text-gray-400 py-5">
          Loading Feedbacks...
        </p>
      ) : (
        <>
          <h2 className="text-2xl font-semibold text-center mb-8 text-(--secondary)">
            What People Say
          </h2>

          <div className="flex justify-center gap-4 flex-wrap">
            {feedbacks.map((fb) => (
              <FeedbackCard fb={fb} key={fb.id} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Feedbacks;
