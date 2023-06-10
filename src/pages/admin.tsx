import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getServerSession } from "next-auth/next";
import authOptions from "./api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { prisma } from "~/server/db";
import { env } from "~/env.mjs";
import type {
  GameDataType,
  ResDataType,
  GameType,
  GameDataPropsType,
} from "./games";
import { format, add } from "date-fns";
import axios from "axios";

export default function Admin({ gameData }: GameDataPropsType) {
  const { data: session } = useSession();

  return (
    <>
      <h1>Protected Page</h1>
      <p>You can view this page because you are signed in.</p>
    </>
  );

  return {};
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  const bets = prisma.bet.find;

  const currentDate = format(new Date(), "yyyy-MM-dd");
  const futureDate = format(add(new Date(), { days: 1 }), "yyyy-MM-dd");
  const res: ResDataType = await axios.get(
    `http://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&startDate=${currentDate}&endDate=${futureDate}`
  );

  const games_response = res.data.dates;

  const gameData: GameDataType[] = [];

  for (let i = 0; i < games_response.length; i++) {
    const games: GameType[] = games_response[i]?.games || [];

    games.forEach((game) => {
      if (game.teams.home.team.id === 115 || game.teams.away.team.id === 115) {
        gameData.push({
          id: game.gamePk,
          time: game.gameDate,
          teams: game.teams,
          dayNight: game.dayNight,
        });
      }
    });
  }

  if (session.user.email !== env.ADMIN) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  } else {
    return {
      props: {
        session: session,
        gameData: gameData,
      }, // will be passed to the page component as props
    };
  }
};
