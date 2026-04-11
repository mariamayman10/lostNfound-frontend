import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { getFeedbacks } from "../services/feedbackService";
const baseUrl = import.meta.env.VITE_BACKEND;

function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchFeedbacks() {
      setIsLoading(true);
      const res = await getFeedbacks();
      if (res.succ) setFeedbacks(res.data);
      setIsLoading(false);
    }
    fetchFeedbacks();
  }, []);
  if (isLoading)
    return (
      <p className="text-center font-medium text-gray-400 py-5">Loading Feedbacks</p>
    );
  return (
    <div className="bg-(--primary) text-(--text-color) py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-8">
          What People Say
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {feedbacks.map((fb) => (
            <div
              key={fb.id}
              className="bg-white text-(--primary) rounded-xl p-5 shadow-md hover:-translate-y-1 transition-transform"
            >
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={`${baseUrl}/users/profile/${fb.user.photoUrl.split("/")[3]}`}
                  alt={fb.user.name}
                  className="w-11 h-11 rounded-full object-cover"
                />

                <div>
                  <h4 className="font-semibold text-sm">{fb.user.name}</h4>

                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        size={12}
                        className={
                          star <= fb.rating
                            ? "text-(--secondary)"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-gray-700">
                "{fb.message}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default FeedbackList;
