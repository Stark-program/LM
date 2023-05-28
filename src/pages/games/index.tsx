/* eslint-disable @typescript-eslint/no-misused-promises */
import type { GetServerSideProps } from "next";
import axios from "axios";
import Game from "~/components/Game";
import { format, add } from "date-fns";
export default function Games({ gameData }: GameDataPropsType) {
  return (
    <>
      <div className="flex h-screen justify-center overflow-x-hidden bg-gray-300">
        <div className="flex w-5/6 items-center justify-center bg-black">
          <Game gameData={gameData} />
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
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

  return {
    props: {
      gameData: gameData,
    }, // will be passed to the page component as props
  };
};

interface ResDataType {
  data: {
    copyright: string;
    totalItems: number;
    totalEvents: number;
    totalGames: number;
    totalGamesInProgress: number;
    dates: GamesResponseType;
  };
}
interface GamesResponseType {
  date: string;
  totalItems: number;
  totalEvents: number;
  totalGames: number;
  totalGamesInProgress: number;
  games: [object];
  events: [];
}

export interface TeamsType {
  away: {
    leagueRecord: {
      wins: number;
      losses: number;
      pct: string;
    };
    seriesNumber: number;
    splitSquad: boolean;
    team: {
      id: number;
      name: string;
      link: string;
    };
  };
  home: {
    leagueRecord: {
      wins: number;
      losses: number;
      pct: string;
    };
    seriesNumber: number;
    splitSquad: boolean;
    team: {
      id: number;
      name: string;
      link: string;
    };
  };
}

export interface GameDataType {
  id: number;
  time: string;
  teams: TeamsType;
  dayNight: string;
}

export interface GameDataPropsType {
  gameData: GameDataType;
}

interface GameType {
  gamePk: number;
  link: string;
  gameType: string;
  season: string;
  gameDate: string;
  officialDate: string;
  status: {
    abstractGameState: string;
    codedGameState: string;
    detailedState: string;
    statusCode: string;
    startTimeTBD: boolean;
    abstractGameCode: string;
  };
  teams: TeamsType;
  venue: { id: number; name: string; link: string };
  content: { link: string };
  gameNumber: number;
  publicFacing: boolean;
  doubleHeader: string;
  gamedayType: string;
  tiebreaker: string;
  calendarEventID: string;
  seasonDisplay: string;
  dayNight: string;
  scheduledInnings: number;
  reverseHomeAwayStatus: boolean;
  inningBreakLength: number;
  gamesInSeries: number;
  seriesGameNumber: number;
  seriesDescription: string;
  recordSource: string;
  ifNecessary: string;
  ifNecessaryDescription: string;
}
