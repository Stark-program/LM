import type { GameDataPropsType, GameDataType } from "~/pages/games";
import { format, compareAsc } from "date-fns";

export default function Game({ gameData }: GameDataPropsType) {
  const games: GameDataType[] = gameData || [];
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
              className="flex flex-row items-center space-x-16 align-middle text-white"
            >
              <div className="flex w-1/5">{date_time}</div>
              <div className="flex w-2/5">{`${game.teams.home.team.name}(${game.teams.home.leagueRecord.wins} - ${game.teams.home.leagueRecord.losses}) vs ${game.teams.away.team.name}(${game.teams.away.leagueRecord.wins} - ${game.teams.away.leagueRecord.losses}) `}</div>
              <div className="flex w-1/5 justify-end">{game.dayNight}</div>
              <div className="flex w-1/5 justify-end">
                <button className="rounded bg-[#fd3594ff] p-2 font-overpass text-lg font-bold text-black hover:bg-[#85214f]">
                  Bet on this time
                </button>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}
