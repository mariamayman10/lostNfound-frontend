import { useState } from "react";
import { loginUser } from "../services/authService";
import { formatError } from "../utils/errorFormatter";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function login(e) {
    setIsLoading(true);
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    const res = await loginUser(data);
    setIsLoading(false);
    if (res.succ) {
      dispatch(setUser(res.data));
      navigate("/home", { replace: true });
    } else setError(formatError(res.data));
  }
  return (
    <div className="login-container flex items-center justify-center px-5 pt-2 min-h-screen">
      <div className="login-wrapper flex flex-col sm:flex-row justify-center w-full h-95">
        <img
          src="/images/auth-sideimg.png"
          alt="auth-sideimg"
          className="hidden sm:block sm:w-45 md:w-70 lg:w-100 rounded-tl-[18px] rounded-bl-[18px]"
          height={600}
        />
        <div className="login-right sm:w-125 bg-[#e7e7e7] lg:p-3 p-2.5 rounded-[18px] sm:rounded-tl-none sm:rounded-bl-none">
          <div className="login-register ml-auto flex items-center justify-end">
            <p>Don't Have An Account?</p>
            <button
              className="register-btn p-2 underline"
              onClick={() => navigate("/auth/register", { replace: true })}
            >
              Register
            </button>
          </div>
          <div className="login-form mt-1.5 lg:px-9 px-4">
            <p className="text-2xl font-bold mb-6">Login</p>
            <form onSubmit={login}>
              <div className="input-row mb-6">
                <label for="email" className="block">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  onChange={() => setError("")}
                  className="mt-2 px-4 py-2 rounded-2xl w-full border border-[#ff9800]"
                />
              </div>
              <div className="input-row">
                <label for="password" className="block">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  onChange={() => setError("")}
                  className="mt-2 px-4 py-2 rounded-2xl w-full border border-[#ff9800]"
                />
              </div>
              {error && <p className="error-msg">{error}</p>}
              <div className="flex justify-end mt-3">
                <button className="btn1 px-6 py-2" disabled={isLoading}>{isLoading? "Loading...":"Login"}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
