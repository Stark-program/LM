import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  const session = useSession();
  return (
    <>
      <Head>
        <title>On The Minute</title>
        <meta
          name="description"
          content="Bet on when YOU think the game will end. Easy as that."
        />
        <meta property="og:title" content="On The Minute" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://onthemin.net/" />
        <meta
          property="og:description"
          content="Bet on when YOU think the game will end. Easy as that."
        />
        <meta property="og:image" content="https://i.imgur.com/R6XBN7r.png" />
        <meta name="twitter:card" content="https://i.imgur.com/R6XBN7r.png" />
        <meta property="twitter:domain" content="onthemin.net" />
        <meta property="twitter:url" content="https://onthemin.net/" />
        <meta name="twitter:title" content="On The Minute" />
        <meta
          name="twitter:description"
          content="Bet on when YOU think the game will end. Easy as that."
        />
        <meta name="twitter:image" content="https://i.imgur.com/R6XBN7r.png" />
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
          <div className="flex w-2/3 flex-col space-y-8 lg:space-y-16 lg:p-10 ">
            <h1 className="m-1 font-overpass  text-3xl font-bold text-white md:text-5xl lg:text-7xl">
              Bet on Baseball with minute accuracy
            </h1>
            <p className="font-overpass text-lg text-[#e5e0df] md:text-xl">
              If you're looking for a novel way to bet on baseball games, you've
              come to the right place! We offer a unique betting platform that
              allows you to predict the exact minute a baseball game will end.
            </p>
            {session.data ? (
              <Link
                className=" rounded bg-[#fd3594ff] p-2 text-center font-overpass text-lg font-bold text-black hover:bg-[#85214f] lg:w-1/6 "
                href={"/games"}
              >
                Start Betting Now
              </Link>
            ) : (
              <Link
                className=" rounded bg-[#fd3594ff] p-2 text-center font-overpass text-lg font-bold text-black  lg:w-1/6 "
                href={"/auth/signin"}
              >
                Please login to continue
              </Link>
            )}
          </div>
        </div>
        <div className="relative my-6 flex w-screen justify-center px-4 lg:h-[410px]">
          <div className="my-10 flex flex-col  rounded-lg border border-gray-300 bg-black p-10 lg:w-2/3 lg:pl-20">
            <h1 className="text-left font-overpass text-3xl font-bold text-white lg:text-7xl">
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
        <div className="relative flex w-screen justify-center px-4">
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
          <div className="my-10 rounded-lg border border-gray-300 bg-black p-10 lg:w-2/3 lg:pl-20">
            <h1 className="font-overpass text-4xl font-bold text-white">
              FAQs
            </h1>
            <div className="grid lg:grid-cols-2">
              <div className=" my-2 rounded-md bg-[#770c3e] p-7 lg:mr-2 lg:p-14">
                <h2 className="font-overpass text-xl font-bold text-white">
                  What if the game goes into extra innings?
                </h2>
                <p className="mt-4 font-overpass text-[#e5e0df]">
                  If the game goes into extra innings, the end time will be
                  determined by the official MLB scoreboard. Your bet will still
                  be valid as long as the game ends at the predicted minute.
                </p>
              </div>
              <div className=" my-2 rounded-md bg-[#770c3e] p-7 lg:ml-2 lg:p-14">
                <h2 className="font-overpass text-xl font-bold text-white">
                  How do I know if I won?
                </h2>
                <p className="mt-4 font-overpass text-[#e5e0df]">
                  If the game ends at the precise minute you predicted, you win!
                  We'll notify you via email and update your account balance.
                </p>
              </div>
              <div className=" my-2 rounded-md bg-[#770c3e] p-7 lg:mr-2 lg:p-14">
                <h2 className="font-overpass text-xl font-bold text-white">
                  What is the payout for winning bets?
                </h2>
                <p className="mt-4 font-overpass text-[#e5e0df]">
                  The payout for winning bets varies depending on the odds at
                  the time of betting. Check the odds for each game before
                  placing your bets.
                </p>
              </div>
              <div className=" my-2 rounded-md bg-[#770c3e] p-7 lg:ml-2 lg:p-14">
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

// const AuthShowcase: React.FC = () => {
//   const sessionData = useSession();

//   // const { data: secretMessage } = api.example.getSecretMessage.useQuery(
//   //   undefined, // no input
//   //   { enabled: sessionData?.user !== undefined }
//   // );

//   return (
//     <div className="absolute right-20 top-20 flex flex-col items-center justify-center gap-4">
//       <p className="text-center font-overpass text-lg font-bold text-white">
//         {sessionData && (
//           <span>Logged in as {sessionData.data?.user?.name}</span>
//         )}
//       </p>
//       <button
//         className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
//         onClick={sessionData.data ? () => void signOut() : () => void signIn()}
//       >
//         {sessionData.data ? "Sign out" : "Sign in"}
//       </button>
//       <Link
//         className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
//         href={"/auth/signup"}
//       >
//         Sign Up
//       </Link>
//     </div>
//   );
// };
