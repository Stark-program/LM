import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Header() {
  return (
    <div className=" z-10 hidden justify-between bg-black px-8 py-4 text-white lg:flex">
      <div className="flex w-full space-x-10 text-lg">
        <Link
          href="/"
          className="font-overpass font-bold text-white underline decoration-[#fd3594ff] decoration-2  underline-offset-8"
        >
          Home
        </Link>
        <Link
          href="/games"
          className="font-overpass font-bold text-white underline decoration-[#fd3594ff] decoration-2  underline-offset-8"
        >
          Bet
        </Link>
      </div>
      <div className="z-10 flex w-1/3 justify-end space-x-10">
        {AuthShowcase()}
        {/* <Link
          href="/auth/signin"
          className="z-10 font-overpass font-bold text-white underline decoration-[#fd3594ff]  decoration-2 underline-offset-8"
        >
          Sign In
        </Link> */}
        <Link
          href="/auth/signup"
          className="z-10 flex items-center font-overpass font-bold text-white underline decoration-[#fd3594ff] decoration-2  underline-offset-8 lg:w-1/4"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export const AuthShowcase: React.FC = () => {
  const sessionData = useSession();

  // const { data: secretMessage } = api.example.getSecretMessage.useQuery(
  //   undefined, // no input
  //   { enabled: sessionData?.user !== undefined }
  // );

  return (
    <div className="flex w-full flex-col items-center justify-center lg:flex-row lg:gap-4">
      <p className="w-full text-left font-overpass text-lg font-bold text-white lg:w-3/4">
        {sessionData.data?.user ? (
          <span>Logged in as {sessionData.data?.user?.name}</span>
        ) : null}
      </p>
      <button
        className="z-10 flex w-full justify-start font-overpass font-bold text-white underline decoration-[#fd3594ff] decoration-2  underline-offset-8 lg:w-1/4"
        onClick={sessionData.data ? () => void signOut() : () => void signIn()}
      >
        {sessionData.data ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
