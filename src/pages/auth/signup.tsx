import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
export default function SignUp() {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleFormSubmit = async (e) => {
    try {
      const res = await axios.post("/api/createuser", user);
      console.log(res);
      if (res.status === 201) {
        router.push("/");
      }
    } catch (err) {
      if (err.response.status === 424) {
        alert("Account already exists");
        setUser({
          name: "",
          email: "",
          phone: "",
          password: "",
        });
      }
      console.log(err);
    }
  };
  return (
    <section className=" bg-gray-900">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <div className="w-full rounded-lg border-gray-700 bg-gray-800 shadow dark:border sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white dark:text-white md:text-2xl">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-white dark:text-white"
                >
                  Your Name
                </label>
                <input
                  type="name"
                  name="name"
                  id="name"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-500  bg-gray-700 p-2.5 text-white dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  placeholder="James Bond"
                  required={true}
                  value={user.name}
                  onChange={(e) => {
                    setUser({ ...user, name: e.target.value });
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-white dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-500  bg-gray-700 p-2.5 text-white dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  placeholder="example@example.com"
                  required={true}
                  value={user.email}
                  onChange={(e) => {
                    setUser({ ...user, email: e.target.value });
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-white dark:text-white"
                >
                  Your Phone Number
                </label>
                <input
                  type="phone"
                  name="phone"
                  id="phone"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-500  bg-gray-700 p-2.5 text-white dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  placeholder="555-555-5555"
                  required={true}
                  value={user.phone}
                  onChange={(e) => {
                    setUser({ ...user, phone: e.target.value });
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-white dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-500  bg-gray-700 p-2.5 text-white dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  required={true}
                  value={user.password}
                  onChange={(e) => {
                    setUser({ ...user, password: e.target.value });
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="mb-2 block text-sm font-medium text-white dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="confirm-password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-500  bg-gray-700 p-2.5 text-white dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  required={true}
                />
              </div>
              {/* <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 h-4 w-4 rounded border border-gray-500  dark:border-gray-600 bg-gray-700 dark:ring-offset-gray-800"
                    required={true}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <a
                      className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div> */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  void handleFormSubmit(e);
                }}
                className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-white dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/auth/signin"
                  className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
