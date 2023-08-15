import axios from "axios";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userFound, setUserFound] = useState(false);
  const [password, setPassword] = useState("");
  const [successfulChange, setSuccessfulChange] = useState(false);
  const handleSubmit = async () => {
    try {
      const data = {
        email: email,
        phoneNumber: phoneNumber,
      };
      const res = await axios.post("/api/forgotpassword", data);
      if (res.status === 201) {
        setUserFound(true);
      }
    } catch (err) {
      if (err.response.status === 404) {
        console.log("User not found");
      }
    }
  };
  const handleNewPassword = async () => {
    try {
      const data = {
        email: email,
        phoneNumber: phoneNumber,
        newPassword: password,
      };
      const res = await axios.post("/api/setnewpassword", data);
      if (res.status === 201) {
        setSuccessfulChange(true);
      }
    } catch (err) {
      if (err.response.status === 404) {
        console.log("Password not reset");
      }
    }
  };
  return (
    <div className="flex h-screen items-center justify-center bg-gray-950 text-white">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <div className="w-full rounded-lg bg-gray-800  shadow dark:border dark:border-gray-700 sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            {successfulChange ? (
              <h1 className="f bg-green-500 p-4 text-xl font-bold leading-tight tracking-tight text-white dark:text-white md:text-2xl">
                Password Changed!
              </h1>
            ) : null}
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white dark:text-white md:text-2xl">
              Enter information
            </h1>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-white dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="example@example.com"
                className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-500  bg-gray-700 p-2.5 text-white dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                required={true}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium text-white dark:text-white"
              >
                Phone Number
              </label>
              <input
                type="phone"
                name="phone"
                id="phone"
                placeholder="555-555-5555"
                className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-500  bg-gray-700 p-2.5 text-white dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                required={true}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              ></input>
            </div>
            {userFound ? (
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-white dark:text-white"
                >
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="********"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-500  bg-gray-700 p-2.5 text-white dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  required={true}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
            ) : null}

            <button
              onClick={() => {
                userFound ? void handleNewPassword() : void handleSubmit();
              }}
              type="submit"
              className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
            >
              {userFound ? "Reset Password" : "Request password"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
