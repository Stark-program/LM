import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";

import { AuthShowcase } from "../Header";
const MobileMenu = (props: MobileMenuProps) => {
  const { mobileMenu, mobileMenuShow } = props;
  const session = useSession();
  console.log("session", session);
  return (
    <Transition.Root show={mobileMenuShow} as={Fragment}>
      <Dialog as="div" className="relative z-20" onClose={mobileMenu}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed bottom-0 left-full right-0 top-0  bg-opacity-90 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none  fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-y-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={mobileMenu}
                      >
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full flex-col overflow-y-scroll bg-black bg-opacity-90  py-6 shadow-xl">
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      {session.data?.user ? (
                        <h1 className="font-overpass text-xl font-bold text-white">
                          Logged in as {session.data?.user?.name}
                        </h1>
                      ) : null}
                      <div className=" flex h-20 items-center border-t  border-gray-500 px-6 text-left font-overpass text-xl font-bold text-white underline decoration-[#fd3594ff] decoration-2  underline-offset-8">
                        <Link
                          href="/"
                          className="flex h-full w-full items-center"
                          onClick={mobileMenu}
                        >
                          Home
                        </Link>
                      </div>
                      <div className=" flex h-20 items-center border-b  border-t border-gray-500 px-6 text-left font-overpass text-xl font-bold text-white  underline decoration-[#fd3594ff] decoration-2 underline-offset-8 ">
                        <Link
                          href="/games"
                          className="flex h-full w-full items-center"
                          onClick={mobileMenu}
                        >
                          Bet
                        </Link>
                      </div>

                      <div className=" flex h-20 items-center justify-center border-b border-gray-500 px-6 text-left font-overpass text-xl font-bold text-white">
                        {/* <Link
                          href="/auth/signin"
                          className="flex h-full w-full items-center"
                          onClick={mobileMenu}
                        >
                          Signin
                        </Link> */}
                        <AuthShowcaseMobile />
                      </div>
                      <div className=" flex h-20 items-center border-b  border-gray-500 px-6 text-left font-overpass text-xl font-bold text-white underline decoration-[#fd3594ff] decoration-2 underline-offset-8">
                        <Link
                          href="/auth/signup"
                          className="flex h-full w-full items-center"
                          onClick={mobileMenu}
                        >
                          Sign up
                        </Link>
                      </div>

                      {/* /End replace */}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export const AuthShowcaseMobile: React.FC = () => {
  const sessionData = useSession();

  // const { data: secretMessage } = api.example.getSecretMessage.useQuery(
  //   undefined, // no input
  //   { enabled: sessionData?.user !== undefined }
  // );

  return (
    <div className="flex h-full w-full items-center justify-center lg:flex-row lg:gap-4">
      <button
        className="z-10 flex h-full w-full items-center font-overpass font-bold text-white underline decoration-[#fd3594ff] decoration-2  underline-offset-8 lg:w-1/4"
        onClick={sessionData.data ? () => void signOut() : () => void signIn()}
      >
        {sessionData.data ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

interface MobileMenuProps {
  mobileMenu: () => void;
  mobileMenuShow: boolean;
}
export default MobileMenu;
