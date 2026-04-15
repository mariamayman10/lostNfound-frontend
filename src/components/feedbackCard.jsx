import { FaStar } from "react-icons/fa";
const baseUrl = import.meta.env.VITE_BACKEND;

function FeedbackCard({ fb }) {
  return (
    <div className="bg-white text-(--primary) rounded-xl p-5 shadow-md hover:-translate-y-1 transition-transform w-68">
      <div className="flex flex-col items-center ">
        <img
          src={`${baseUrl}/users/profile/${fb.user.photoUrl.split("/")[3]}`}
          alt={fb.user.name}
          className="w-20 h-20 rounded-full object-cover mb-4"
        />

        <div>
          <h4 className="font-semibold text-lg">{fb.user.name}</h4>

          <div className="flex gap-1 mt-1 justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={14}
                className={
                  star <= fb.rating ? "text-(--secondary)" : "text-gray-300"
                }
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-md mt-8 leading-relaxed text-center text-gray-700">
        {fb.message}
      </p>
    </div>
  );
}

export default FeedbackCard;
