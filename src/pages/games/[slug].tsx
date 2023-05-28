import type { GetServerSideProps } from "next";
import axios from "axios";
import { format, addMinutes } from "date-fns";
import BetTime from "~/components/BetTime";

export default function BetGame({ gameData, gameTime }: GameDataType) {
  console.log(gameData, gameTime);
  const date = new Date(gameTime);
  console.log(date);

  const renderTimeSlots = () => {
    const times = [];
    for (let i = 0; i < 120; i++) {
      const startBettingTime = format(addMinutes(date, 90 + i), "hh:mm:ss");
      console.log(startBettingTime);
      times.push(startBettingTime);
    }
    return <BetTime betTime={times} />;
  };

  return (
    <div className="flex  justify-center overflow-x-hidden bg-gray-300">
      <div className="flex w-5/6 items-center justify-center bg-black">
        {renderTimeSlots()}
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
