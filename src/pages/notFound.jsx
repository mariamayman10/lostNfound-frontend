import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-[#0f0f0f] text-[#f5f5f5]">
      <h1 className="text-7xl font-bold mb-4">404</h1>
      <p className="text-xl text-gray-400 mb-6">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <p className="text-sm text-gray-500 mb-8">
        It might have been removed or the link is broken.
      </p>
      <Link
        to="/"
        className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
