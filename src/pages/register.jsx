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
  return (
    <div className="register-container flex items-center justify-center pt-20 pb-15 px-5 min-h-screen">
    </div>
  );
}

export default Register;
