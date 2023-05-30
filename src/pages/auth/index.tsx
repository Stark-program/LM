import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { useEffect } from "react";

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  useEffect(() => {
    console.log(router.isReady);
  });

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="absolute right-20 top-20 flex flex-col items-center justify-center gap-4">
      <p className="text-center font-overpass text-lg font-bold text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? router.push("/") : router.push("/auth/signin")}
      </button>
    </div>
  );
};

export default AuthShowcase;
