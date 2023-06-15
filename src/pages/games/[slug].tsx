import type { GetServerSideProps } from "next";
import axios from "axios";
import BetTime from "~/components/BetTime";
import { useSession } from "next-auth/react";
import { prisma } from "~/server/db";

import { env } from "~/env.mjs";
import TableBets from "~/components/TableBets";

export default function BetGame({
  gameData,
  gameTime,
  gameId,
  currentBets,
}: GameDataType) {
  const session = useSession();

  return (
    <div className="flex justify-center overflow-x-hidden bg-gray-300">
      <div className="flex w-full flex-row items-center justify-center bg-black sm:w-5/6">
        <BetTime
          session={session}
          gameId={gameId}
          gameTime={gameTime}
          currentBets={currentBets}
        />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query;
  const { time } = context.query;
  const res = await axios.get(
    `http://statsapi.mlb.com/api/v1/game/${slug}/content`
  );
  const currentBets = await prisma.bet.findMany({
    where: {
      gameId: slug,
    },
  });

  return {
    props: {
      gameData: res.data as GameDataType,
      gameTime: time,
      gameId: slug,
      currentBets: JSON.parse(JSON.stringify(currentBets)),
    },
  };
};

interface GameDataType {
  currentBets: {
    gameId: string;
    userId: string;
    userName: string;
    timeslot: string;
  };
  gameId: string;
  gameTime: string;
  gameData: {
    copyright: string;
    link: string;
    editorial: object;
    media: {
      epg: [[object], [object], [object]];
      milestones: boolean;
      featuredMedia: { id: string };
      freeGame: boolean;
      enhancedGame: boolean;
    };
    highlights: {
      scoreboard: boolean;
      gameCenter: boolean;
      milestone: boolean;
      highlights: { items: [] };
      live: { items: [] };
      scoreboardPreview: { items: [] };
    };
    summary: {
      hasPreviewArticle: boolean;
      hasRecapArticle: boolean;
      hasWrapArticle: boolean;
      hasHighlightsVideo: boolean;
    };
    gameNotes: object;
  };
}
