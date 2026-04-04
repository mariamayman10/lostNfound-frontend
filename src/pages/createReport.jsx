import { useState } from "react";
import InputRow from "../components/inputRow";
import { useSelector } from "react-redux";
import { createReport } from "../services/reportService";
import { formatError } from "../utils/errorFormatter";
import { useNavigate } from "react-router-dom";

const inputConfig = [
  [
    { labelTxt: "Title", label: "title", type: "text" },
    { labelTxt: "Location", label: "location", type: "text" },
  ],
  [
    { labelTxt: "Category", label: "category", type: "text" },
    { label: "images" },
  ],
  [
    { labelTxt: "Description", label: "description", type: "text" },
    { label: "type" },
  ],
];
function CreateReport() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const token = useSelector((store) => store.user.idToken);

  async function handleCreation(e) {
    setIsLoading(true);
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const images = formData.getAll("images");
    if (images.length < 1 || images.length > 3) {
      setIsLoading(false);
      setError("You must upload between 1 and 3 images");
      return;
    }

    const res = await createReport(formData, token);
    setIsLoading(false);
    if (res.succ) {
      navigate("/reports", { replace: true });
    } else setError(formatError(res.data));

  }

  return (
    <div className="create-report-container min-h-screen flex flex-col justify-center lg:px-30 md:px-20 sm:px-15 px-9 pt-25">
      <p className="text-3xl font-bold mb-4 text-[#fe9a14]">Create Report</p>
      <form onSubmit={handleCreation}>
        {inputConfig.map((row, rowIdx) => (
          <div className="flex flex-wrap -mx-0.75 mb-3" key={rowIdx}>
            {row.map((ipt, iptIdx) => {
              if (ipt.label === "type") {
                return (
                  <div
                    className="input-row px-[2.5px] w-full sm:w-1/2 mb-4 sm:mb-0"
                    key={iptIdx}
                  >
                    <label htmlFor="type" className="block">
                      Type
                    </label>
                    <select
                      id="type"
                      name="type"
                      required
                      className="mt-2 px-4 py-2 rounded-2xl w-full border border-[#ff9800]"
                    >
                      <option value="found">Found</option>
                      <option value="lost">Lost</option>
                    </select>
                  </div>
                );
              }

              if (ipt.label === "images") {
                return (
                  <div
                    className="input-row px-[2.5px] w-full sm:w-1/2 mb-4 sm:mb-0"
                    key={iptIdx}
                  >
                    <label htmlFor="images" className="block">
                      Images
                    </label>
                    <input
                      type="file"
                      id="images"
                      name="images"
                      required
                      multiple
                      accept="image/*"
                      onChange={() => setError("")}
                      className="mt-2 px-4 py-2 rounded-2xl w-full border border-[#ff9800]"
                    />
                  </div>
                );
              }

              return (
                <InputRow
                  key={iptIdx}
                  label={ipt.label}
                  labelTxt={ipt.labelTxt}
                  onChange={() => setError("")}
                  type={ipt.type}
                />
              );
            })}
          </div>
        ))}
        {error && <p className="error-msg">{error}</p>}

        <div className="flex justify-end mt-3 mb-6">
          <button className="btn1 px-6 py-2" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Report"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateReport;
