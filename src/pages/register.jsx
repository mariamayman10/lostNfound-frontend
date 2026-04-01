import { useState } from "react";
import { registerUser } from "../services/authService";
import InputRow from "../components/inputRow";
import { formatError } from "../utils/errorFormatter";
import { useNavigate } from "react-router-dom";

const inputsConfig = [
  [
    { labelTxt: "Name", label: "name", type: "text" },
    { labelTxt: "Email", label: "email", type: "email", onChange: true },
  ],
  [
    {
      labelTxt: "Phone Number",
      label: "phoneNumber",
      type: "text",
      onChange: false,
    },
    { labelTxt: "Photo", label: "photo", type: "file", onChange: false },
  ],
  [
    {
      labelTxt: "Password",
      label: "password",
      type: "password",
      onChange: true,
    },
    {
      labelTxt: "Confirm Password",
      label: "cpassword",
      type: "password",
      onChange: true,
    },
  ],
];

function Register() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function register(e) {
    setIsLoading(true);
    e.preventDefault();

    const form = e.target;
    const data = Object.fromEntries(new FormData(form).entries());
    if (data.password !== data.cpassword) {
      setError("Passwords are not matched");
      return;
    }
    const formData = new FormData(form);
    formData.delete("cpassword");

    const res = await registerUser(formData);
    setIsLoading(false);
    if (res.succ) navigate("/home", { replace: true });
    else setError(formatError(res.data));
  }

  return (
    <div className="register-container flex items-center justify-center pt-20 pb-15 px-5 min-h-screen">
      <div className="register-wrapper flex flex-col sm:flex-row justify-center w-full min-h-95">
        <img
          src="/images/auth-sideimg.png"
          alt="auth-sideimg"
          className="hidden sm:block sm:w-45 md:w-70 lg:w-100 rounded-tl-[18px] rounded-bl-[18px]"
          height={600}
        />
        <div className="register-right sm:w-125 bg-[#e7e7e7] lg:p-5 p-2.5 rounded-[18px] sm:rounded-tl-none sm:rounded-bl-none">
          <div className="register-form lg:mt-4 mt-1.5 lg:px-6 px-4 py-3">
            <p className="text-2xl font-bold mb-4">Register</p>
            <form onSubmit={register}>
              {inputsConfig.map((row, rowIdx) => (
                <div className="flex flex-wrap -mx-0.75 mb-3" key={rowIdx}>
                  {row.map((ipt, iptIdx) => {
                    return ipt.label !== "photo" ? (
                      <InputRow
                        key={iptIdx}
                        labelTxt={ipt.labelTxt}
                        label={ipt.label}
                        type={ipt.type}
                        onChange={ipt.onChange ? () => setError("") : () => {}}
                      />
                    ) : (
                      <div className="input-row px-[2.5px] w-full sm:w-1/2 mb-4 sm:mb-0">
                        <label htmlFor="photo" className="block">
                          Profile Picture
                        </label>
                        <input
                          type="file"
                          id="photo"
                          name="photo"
                          required
                          accept="image/*"
                          className="mt-2 px-4 py-2 rounded-2xl w-full border border-[#ff9800]"
                        />
                      </div>
                    );
                  })}
                </div>
              ))}
              {error && <p className="error-msg">{error}</p>}

              <div className="flex justify-end mt-3">
                <button className="btn1 px-6 py-2" disabled={isLoading}>
                  {isLoading ? "Loading..." : "Register"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
