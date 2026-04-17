import { useState } from "react";
import { useSelector } from "react-redux";
import { createFeedback } from "../services/feedbackService";
import { FaStar } from "react-icons/fa";
import { formatError } from "../utils/errorFormatter";


function FeedbackForm() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(0);

  const token = useSelector((store) => store.user.idToken);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const form = e.target;
    const formData = new FormData(form);
    const message = formData.get("message");
    if (!message) {
      setError("Message is required");
      setIsLoading(false);
      return;
    }
    if (rating === 0) {
      setError("Please select a rating");
      setIsLoading(false);
      return;
    }
    const payload = {
      message,
      rating,
    };

    const res = await createFeedback(payload, token);
    setIsLoading(false);
    if (res.succ) {
      form.reset();
      setRating(0);
      setError("");
    } else {
      setError(formatError(res.data));
    }
  }

  return (
    <div className="min-h-[50vh] flex flex-col justify-center lg:px-30 md:px-20 sm:px-15 px-9 py-10">
      <p className="text-3xl font-bold mb-4 text-[#fe9a14]">Send Feedback</p>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-0.75 mb-3">
          <div className="input-row px-[2.5px] w-full mb-4">
            <label htmlFor="message" className="block">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows="4"
              onChange={() => setError("")}
              className="mt-2 px-4 py-2 rounded-2xl w-full border border-[#ff9800]"
            />
          </div>

          <div className="input-row px-[2.5px] w-full mb-4">
            <label className="block mb-2">Rating</label>
            <div className="flex gap-2 text-2xl">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => {
                    setRating(star);
                    setError("");
                  }}
                  className={`cursor-pointer transition transform hover:scale-110`}
                >
                  <FaStar
                    color={star <= rating ? "#facc15" : "#d1d5db"}
                  />
                </span>
              ))}
            </div>
          </div>
        </div>

        {error && <p className="error-msg">{error}</p>}

        <div className="flex justify-end mt-3 mb-6">
          <button className="btn1 px-6 py-2" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Feedback"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FeedbackForm;
