import { useState } from "react";
import { FaRegFileLines } from "react-icons/fa6";
import { MdDone } from "react-icons/md";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

type FormData = {
  name: string;
  email: string;
  address: string;
  phone: number | undefined;
};

function Task3() {
  const [step, setStep] = useState<1 | 2 | 3 | "completed">(1);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    address: "",
    phone: undefined,
  });

  return (
    <div className="flex justify-center py-10">
      <div className="w-2xl">
        <div className="text-center">
          <h1 className="text-3xl font-semibold flex items-center justify-center gap-2">
            <FaRegFileLines className="text-blue-500" /> Multi-Step Form
          </h1>
          <p className="opacity-70 mt-3">Complete the form step by step</p>
          <div className="flex items-center justify-center gap-2 mt-5">
            <div
              className={`flex items-center justify-center w-10  h-10 rounded-full ${
                step !== 1 ? "bg-green-500/70" : "bg-[#343a40]"
              }`}
            >
              {step !== 1 ? <MdDone /> : 1}
            </div>
            <div
              className={`${
                step !== 1 ? "bg-green-500/70" : "bg-[#343a40]"
              } h-1 mr-2 w-14`}
            ></div>
            <div
              className={`flex items-center justify-center w-10  h-10 rounded-full ${
                step === 3 || step === "completed"
                  ? "bg-green-500/70"
                  : "bg-[#343a40]"
              }`}
            >
              {step === 3 || step === "completed" ? <MdDone /> : 2}
            </div>
            <div
              className={`${
                step === 3 || step === "completed"
                  ? "bg-green-500/70"
                  : "bg-[#343a40]"
              } h-1 mr-2 w-14`}
            ></div>
            <div
              className={`flex items-center justify-center w-10  h-10 rounded-full bg-[#343a40]`}
            >
              3
            </div>
          </div>
          <p className="mt-5 px-3 py-1 bg-[#343a40]/50 w-fit mx-auto rounded-full text-xs font-semibold">
            Step {step} of 3
          </p>
        </div>
        <div className="w-full flex flex-col gap-4 bg-[#343a40] mt-5 p-5 rounded-lg border border-white/30">
          {step === "completed" ? (
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
                    address: "",
                    phone: undefined,
                  });
                  setStep(1);
                }}
              >
                Start Over
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              {step === 1 && (
                <>
                  <h2>Contact Details</h2>
                  <div className="flex flex-col gap-1 mt-5">
                    <label htmlFor="name">Name :</label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      className="w-full focus:outline-none border border-white/30 rounded-md px-2 py-1"
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1 mt-5">
                    <label htmlFor="email">Email :</label>
                    <input
                      type="text"
                      id="email"
                      value={formData.email}
                      className="w-full focus:outline-none border border-white/30 rounded-md px-2 py-1"
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                </>
              )}
              {step === 2 && (
                <>
                  <h2>Contact Details</h2>
                  <div className="flex flex-col gap-1 mt-5">
                    <label htmlFor="address">Address :</label>
                    <input
                      id="address"
                      type="text"
                      value={formData.address}
                      className="w-full focus:outline-none border border-white/30 rounded-md px-2 py-1"
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1 mt-5">
                    <label htmlFor="phone">Phone :</label>
                    <input
                      type="number"
                      id="phone"
                      value={formData.phone}
                      className="w-full focus:outline-none border border-white/30 rounded-md px-2 py-1"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          phone: parseInt(e.target.value),
                        });
                      }}
                    />
                  </div>
                </>
              )}
              {step === 3 && (
                <div className="flex flex-col gap-3">
                  <h2 className="text-xl font-bold">Review & Submit</h2>
                  <p className="font-semibold opacity-90">
                    Please review your information:
                  </p>
                  <div className="bg-[#212529]/50 p-5 rounded-lg flex flex-col gap-1">
                    Name: {formData.name}
                    <p>Email: {formData.email}</p>
                    <p>Address: {formData.address}</p>
                    <p>Phone: {formData.phone}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between mt-10">
                <button
                  disabled={step === 1}
                  className={`border border-white/50 px-4  py-2 flex gap-4 rounded-md items-center ${
                    step === 1 ? "opacity-30 cursor-default" : "cursor-pointer"
                  }`}
                  onClick={() => {
                    if (step === 2) {
                      setStep(1);
                    }
                    if (step === 3) {
                      setStep(2);
                    }
                  }}
                >
                  <FaAngleLeft /> Back
                </button>
                <button
                  className={`bg-white text-black px-4  py-2 flex gap-4 rounded-md items-center ${
                    step === 1
                      ? formData.name.length > 0 && formData.email.length !== 0
                        ? "cursor-pointer"
                        : "opacity-30 cursor-default"
                      : step === 2
                      ? formData.address.length > 0 &&
                        formData.phone !== undefined
                        ? "cursor-pointer"
                        : "opacity-30 cursor-default"
                      : "cursor-pointer"
                  }`}
                  onClick={() => {
                    if (step === 1) {
                      if (
                        formData.name.length > 0 &&
                        formData.email.length > 0
                      ) {
                        setStep(2);
                      }
                    }
                    if (step === 2) {
                      if (
                        formData.address.length > 0 &&
                        formData.address !== undefined
                      ) {
                        setStep(3);
                      }
                    }
                    if (step === 3) {
                      setStep("completed");
                    }
                  }}
                >
                  Next <FaAngleRight />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Task3;
