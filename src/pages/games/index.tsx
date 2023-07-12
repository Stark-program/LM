import type { GetServerSideProps } from "next";
import axios from "axios";
import Game from "~/components/Game";
import { format, add, sub } from "date-fns";
export default function Games({ gameData }: GameDataPropsType) {
  return (
    <>
      <div className="flex h-screen justify-center overflow-x-hidden bg-gray-950">
        <div className="flex  w-full items-center justify-center bg-gray-950 sm:w-5/6">
          {gameData.length > 0 ? (
            <Game gameData={gameData} />
          ) : (
            <div className="flex w-1/2 flex-col justify-center font-overpass text-xl text-white">
              <h1 className="text-center">No games found.</h1>
              <h2 className="text-center">
                Games are not scheduled for today or tomorrow.
              </h2>
              <p className="text-center">
                {" "}
                If this is not true.. please contact Alex.
              </p>
              <p className="text-center">
                {" "}
                If you dont know Alex, then send a smoke signal.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const currentDate = format(sub(new Date(), { hours: 12 }), "yyyy-MM-dd");
  const futureDate = format(add(new Date(), { days: 1 }), "yyyy-MM-dd");
  const res: ResDataType = await axios.get(
    `http://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&startDate=${currentDate}&endDate=2023-07-16&teamId=115`
  );
  // const gamesInProgress = await axios.get(
  //   `http://statsapi.mlb.com/api/v1/schedule/games/?sportId=1`
  // );

  const games_response: GamesResponseType[] = res.data.dates;
  console.log(games_response);
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

export interface ResDataType {
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
  gameData: GameDataType[];
}

export interface GameType {
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
