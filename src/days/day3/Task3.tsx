import SimpleButton from "@src/components/SimpleButton";
import { useState } from "react";
import { MdDone } from "react-icons/md";

function validateName(value: string): string {
  if (value.trim().length === 0) {
    return "Name is required";
  } else {
    return "";
  }
}

function validateEmail(value: string): string {
  if (value.trim().length === 0) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email format";
  return "";
}

function validatePassword(value: string): string {
  if (value.trim().length === 0) return "Password is required";
  if (value.length < 6) return "Password must be at least 6 characters long";
  return "";
}

function Task3() {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    password: string;
  }>({ name: "", email: "", password: "" });

  const [formError, setFormError] = useState<{
    name: string;
    email: string;
    password: string;
  }>({ name: "", email: "", password: "" });
  const [submitted, setSubmitted] = useState<boolean>(false);

  function checkValue(type: string, value: string) {
    if (type === "name") {
      const response = validateName(value);
      console.log(response);
      setFormData((prev) => ({ ...prev, name: value }));
      setFormError((prev) => ({ ...prev, name: response }));
    } else if (type === "email") {
      const response = validateEmail(value);
      setFormData((prev) => ({ ...prev, email: value }));
      setFormError((prev) => ({ ...prev, email: response }));
    } else if (type === "password") {
      const response = validatePassword(value);
      setFormData((prev) => ({ ...prev, password: value }));
      setFormError((prev) => ({ ...prev, password: response }));
    }
  }

  return (
    <div className="flex justify-center py-10">
      <div className="w-2xl">
        <div className="text-center">
          <h1 className="text-4xl font-semibold">Tab Switcher Component</h1>
          <p className="opacity-70 mt-3">
            Click tabs to switch between different content
          </p>
        </div>
        <div className="w-full rounded-lg border border-white/30 bg-[#343a40] p-5 mt-10">
          {submitted ? (
            <div className="flex flex-col items-center justify-center gap-5">
              <div className="bg-green-500/30 p-5 rounded-full">
                <MdDone className="text-2xl" />
              </div>
              <h2 className="text-2xl font-bold">
                Form Submitted Successfully!
              </h2>
              <p className="opacity-80">
                Thank you for providing your information.
              </p>
              <button
                className="bg-white text-black px-4 mt-3  py-2 flex gap-4 rounded-md items-center cursor-pointer"
                onClick={() => {
                  setFormData({
                    name: "",
                    email: "",
                    password: "",
                  });
                  setFormError({
                    name: "",
                    email: "",
                    password: "",
                  });
                  setSubmitted(false);
                }}
              >
                Start Over
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <h2 className="text-lg font-semibold">Interactive Tabs</h2>
              <div className="flex flex-col gap-5 my-10">
                <ValidatedInput
                  type="text"
                  label="Name"
                  error={formError.name}
                  checkValue={checkValue}
                  value={formData.name}
                />
                <ValidatedInput
                  type="email"
                  label="Email"
                  error={formError.email}
                  checkValue={checkValue}
                  value={formData.email}
                />
                <ValidatedInput
                  type="password"
                  label="Password"
                  error={formError.password}
                  checkValue={checkValue}
                  value={formData.password}
                />
              </div>
              <div>
                <SimpleButton
                  disabled={
                    formData.name === "" ||
                    formData.email === "" ||
                    formData.password === "" ||
                    formError.name !== "" ||
                    formError.password !== "" ||
                    formError.email !== ""
                  }
                >
                  Submit
                </SimpleButton>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Task3;

function ValidatedInput({
  label,
  value,
  error,
  checkValue,
  type,
}: {
  label: string;
  type: string;
  value: string;
  error: string;
  checkValue: (type: string, value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={label.toLowerCase()}>{label}</label>
      <input
        type={type}
        id={label.toLowerCase()}
        value={value}
        className="w-full focus:outline-none border border-white/30 rounded-md px-2 py-1"
        onChange={(e) => {
          checkValue(label.toLowerCase(), e.target.value);
        }}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
