import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

function Contact() {
  return (
    <div className="min-h-screen px-6 py-20 flex justify-center items-center">
      <div className="w-full max-w-xl bg-[#e9e9e9] text-[#024943] p-8 rounded-2xl shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

        <p className="text-gray-400 mb-8">
          If you have any questions or need help, feel free to reach out.
        </p>

        <div className="text-lg">
          <div className="flex justify-center items-center gap-3 font-semibold mb-4">
            <FaPhone />
            +966 11 111 1111
          </div>
          <div className="flex justify-center items-center gap-3 font-semibold">
            <MdEmail />
            lostnfound7985@gmil.com
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-8">
          Available daily from 9:00 AM to 6:00 PM
        </p>
      </div>
    </div>
  );
}
export default Contact;
