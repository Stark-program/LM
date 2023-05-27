import type { GetServerSideProps } from "next";
import axios from "axios";
import { format, add, addMinutes } from "date-fns";

export default function BetGame({ gameData, gameTime }: GameDataType) {
  console.log(gameData, gameTime);
  const date = new Date(gameTime);
  const futureDate = format(addMinutes(date, 180), "hh:mm:ss");
  console.log(futureDate);
  return <div>Bet</div>;
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
    },
  };
};

interface GameDataType {
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
