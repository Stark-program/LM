import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  // const target = useRef(undefined);
  // const parallax = useParallax({
  //   speed: 0,
  //   targetElement: target.current,
  // });

  const handleClick = () => {
    console.log("clicked");
  };

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className="relative flex min-h-screen  flex-col items-center overflow-x-hidden bg-gradient-to-b"
        style={{
          backgroundImage: "url('/sattelite.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
          zIndex: 10,
        }}
      >
        <div className="relative flex h-[530px] w-full justify-center bg-[#000000cc]">
          <Image
            src={"/baseball-background.jpg"}
            alt="picture"
            quality={75}
            style={{
              zIndex: -10,
              objectFit: "cover",
            }}
            fill={true}
            priority={true}
            className="relative"
          />
          <div className="flex w-2/3 flex-col space-y-16 p-10 ">
            <h1 className="text- m-1 font-overpass text-7xl font-bold text-white">
              Bet on Baseball with minute accuracy
            </h1>
            <p className="font-overpass text-lg text-[#e5e0df]">
              If you're looking for a novel way to bet on baseball games, you've
              come to the right place! We offer a unique betting platform that
              allows you to predict the exact minute a baseball game will end.
            </p>
            <Link
              className="w-1/6 rounded bg-[#fd3594ff] p-2 font-overpass text-lg font-bold text-black hover:bg-[#85214f] "
              onClick={handleClick}
              href={"/games"}
            >
              Start Betting Now
            </Link>
          </div>
        </div>
        <div className=" relative my-6 flex h-[410px] w-screen justify-center">
          <div className="my-10 flex w-2/3  flex-col rounded-lg border border-gray-300 bg-black p-10 pl-20">
            <h1 className="text-left font-overpass text-7xl font-bold text-white">
              How It Works
            </h1>
            <ul className="list-disc space-y-5 p-5 font-overpass font-bold text-[#e5e0df]">
              <li>Choose a game to bet on</li>
              <li>Select the minute you think the game will end</li>
              <li>Place your bet</li>
              <li>Watch the game and wait for the outcome</li>
            </ul>
          </div>
        </div>
        <div className="relative flex w-screen justify-center">
          <Image
            src={"/purple_pink.jpg"}
            alt="picture"
            quality={100}
            style={{
              zIndex: -10,
              objectFit: "cover",
            }}
            fill={true}
            className="relative"
          />
          <div className="my-10  w-2/3   rounded-lg border border-gray-300 bg-black p-10 pl-20">
            <h1 className="font-overpass text-4xl font-bold text-white">
              FAQs
            </h1>
            <div className="grid grid-cols-2">
              <div className=" my-2 mr-2 rounded-md bg-[#770c3e] p-14">
                <h2 className="font-overpass text-xl font-bold text-white">
                  What if the game goes into extra innings?
                </h2>
                <p className="mt-4 font-overpass text-[#e5e0df]">
                  If the game goes into extra innings, the end time will be
                  determined by the official MLB scoreboard. Your bet will still
                  be valid as long as the game ends at the predicted minute.
                </p>
              </div>
              <div className=" my-2 ml-2 rounded-md bg-[#770c3e] p-14">
                <h2 className="font-overpass text-xl font-bold text-white">
                  How do I know if I won?
                </h2>
                <p className="mt-4 font-overpass text-[#e5e0df]">
                  If the game ends at the precise minute you predicted, you win!
                  We'll notify you via email and update your account balance.
                </p>
              </div>
              <div className=" my-2 mr-2 rounded-md bg-[#770c3e] p-14">
                <h2 className="font-overpass text-xl font-bold text-white">
                  What is the payout for winning bets?
                </h2>
                <p className="mt-4 font-overpass text-[#e5e0df]">
                  The payout for winning bets varies depending on the odds at
                  the time of betting. Check the odds for each game before
                  placing your bets.
                </p>
              </div>
              <div className=" my-2 ml-2 rounded-md bg-[#770c3e] p-14">
                <h2 className="font-overpass text-xl font-bold text-white">
                  Is it legal to bet on baseball games online?
                </h2>
                <p className="mt-4 font-overpass text-[#e5e0df]">
                  Yes, it is legal to bet on baseball games online as long as
                  you're of legal gambling age and betting on a licensed
                  platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
