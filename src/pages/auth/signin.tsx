import Link from "next/link";
import { signIn, getProviders } from "next-auth/react";
import { type FormEventHandler, useState } from "react";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getServerSession } from "next-auth/next";
import { useRouter } from "next/router";
import authOptions from "../api/auth/[...nextauth]";
import FailedLogIn from "~/components/FailedLogIn";

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [failedLogIn, setFailedLogIn] = useState(false);
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      })
        .then(({ ok }) => {
          if (ok) {
            setFailedLogIn(false);
            router.push("/").catch((err) => console.log(err));
          } else {
            setFailedLogIn(true);
          }
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className=" h-screen bg-gray-950">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <div className="w-full rounded-lg bg-gray-800  shadow dark:border dark:border-gray-700 sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white dark:text-white md:text-2xl">
              Sign in to your account
            </h1>
            <>
              {Object.values(providers).map((provider) => {
                if (provider.id === `credentials`) return null;
                if (provider.id === "discord") {
                  return (
                    <div
                      className="flex w-full justify-center"
                      key={provider.name}
                    >
                      <button
                        type="button"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        className="mb-2  flex w-full justify-center rounded bg-[#7289da] px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                        onClick={() => void signIn(provider.id)}
                      >
                        Discord
                      </button>
                    </div>
                  );
                }

                return (
                  <div
                    className="flex w-full justify-center"
                    key={provider.name}
                  >
                    <button
                      onClick={() => void signIn(provider.id)}
                      type="button"
                      data-te-ripple-init
                      data-te-ripple-color="light"
                      className="mb-2 flex w-full justify-center  rounded bg-[#ea4335] px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                    >
                      Google
                    </button>
                  </div>
                );
              })}
            </>
            <form
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={handleSubmit}
            >
              <div>
                {failedLogIn ? <FailedLogIn /> : null}
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
                  placeholder="name@company.com"
                  required={true}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  {/* <div className="flex h-5 items-center">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 h-4 w-4 rounded border border-gray-500  bg-gray-700 dark:border-gray-600 dark:ring-offset-gray-800"
                      required={true}
                    ></input>
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div> */}
                </div>
                {/* <a
                  href="#"
                  className="dark:text-primary-500 text-sm font-medium text-white hover:underline"
                >
                  Forgot password?
                </a> */}
              </div>
              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-white dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  href="/auth/signup"
                  className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
