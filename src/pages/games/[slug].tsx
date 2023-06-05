import type { GetServerSideProps } from "next";
import axios from "axios";

import BetTime from "~/components/BetTime";
import { useSession } from "next-auth/react";

export default function BetGame({ gameData, gameTime, gameId }: GameDataType) {
  console.log(gameId);
  console.log(gameTime);
  const session = useSession();
  console.log("session-games/slug", session);

  return (
    <div className="flex  justify-center overflow-x-hidden bg-gray-300">
      <div className="flex w-5/6 items-center justify-center bg-black">
        <BetTime session={session} gameId={gameId} gameTime={gameTime} />
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

  return {
    props: {
      gameData: res.data,
      gameTime: time,
      gameId: slug,
    },
  };
};

interface GameDataType {
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
