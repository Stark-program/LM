import type { GameDataPropsType, GameDataType } from "~/pages/games";
import { format } from "date-fns";
import Link from "next/link";

export default function Game({ gameData }: GameDataPropsType) {
  const games: GameDataType[] = gameData;
  if (gameData !== undefined) {
    return (
      <div className="flex flex-col  space-y-10">
        {games.map((game, index) => {
          const startDate = new Date(game.time);
          const date_time = format(startDate, "MM/dd/yyyy hh:mm:ss");

          if (
            game.teams.home.team.id === 115 ||
            game.teams.away.team.id === 115
          ) {
            return (
              <div
                key={index}
                className="flex flex-col items-center align-middle text-white md:flex-row md:space-x-16"
              >
                <div className="flex w-full justify-center underline decoration-2 md:w-1/5">
                  {date_time}
                </div>
                <div className="flex w-2/3 justify-center text-center md:w-2/5">{`${game.teams.home.team.name}(${game.teams.home.leagueRecord.wins} - ${game.teams.home.leagueRecord.losses}) vs ${game.teams.away.team.name}(${game.teams.away.leagueRecord.wins} - ${game.teams.away.leagueRecord.losses}) `}</div>
                <div className="flex w-full justify-center md:w-1/5 md:justify-end">
                  {game.dayNight}
                </div>
                <div className="flex w-full justify-center md:w-1/5 md:justify-end">
                  <Link
                    className="rounded bg-[#fd3594ff] p-2 font-overpass text-lg font-bold text-black hover:bg-[#85214f]"
                    href={{
                      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                      pathname: `/games/${gameData[index]?.id}`,
                      query: {
                        time: game.time,
                      },
                    }}
                  >
                    Bet on this game
                  </Link>
                </div>
              </div>
            );
          }
        })}
      </div>
    );
  }
}
