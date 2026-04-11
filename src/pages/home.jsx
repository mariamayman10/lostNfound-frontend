import { useNavigate } from "react-router-dom";
import Btn from "../components/btn";
import FeedbackForm from "../components/feedbackForm";
import FeedbackList from "../components/feedbackList";

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="home min-h-screen flex flex-col justify-center">
        <div className="home-wrapper flex md:justify-between justify-center items-center lg:px-30 md:px-20 sm:px-15 px-8 mt-10">
          <div className="md:w-[55%] w-full ">
            <p className="text-4xl font-bold text-[#f5f5f5] mb-5 md:text-left text-center">
              Lost Something On Campus?
              <br />
              Let's Help You Find It
            </p>
            <p className="text-md text-[#cdcdcd] mb-5 md:text-left text-center">
              Searched every corner of campus? Don't stress! Post, search, or
              report lost and found items in minutes. Reconnect with what
              matters.
            </p>
            <div className="btns-wrapper flex gap-3 md:justify-start justify-center">
              <div>
                <Btn
                  onClick={() => navigate("/report/create")}
                  classN="btn2 font-bold"
                >
                  Report an Item
                </Btn>
              </div>
              <Btn
                onClick={() => navigate("/reports?type=lost")}
                classN="btn1 font-bold"
              >
                Browse Lost Items
              </Btn>
            </div>
          </div>
          <div className="w-[45%] md:block hidden">
            <img
              src="/images/home-sideimg.png"
              alt="/images/home-sideimg.png"
              className="w-full"
            />
          </div>
        </div>
      </div>
      <FeedbackForm />
      <FeedbackList/>
    </div>
  );
}

export default Home;
