import type { GameDataPropsType, GameDataType } from "~/pages/games";
import { format } from "date-fns";
import Link from "next/link";

export default function Game({ gameData }: GameDataPropsType) {
  const games: GameDataType[] = gameData;
  if (gameData !== undefined) {
    return (
      <div className="flex w-full  flex-col items-center justify-center space-y-10 ">
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
                className="mx-2 flex flex-col items-center space-y-4 rounded-lg bg-slate-800 py-4 align-middle text-white md:mx-0 md:w-1/2"
              >
                <div className="flex w-2/3 justify-center text-center font-overpass text-2xl md:w-4/5">{`${game.teams.home.team.name}  vs ${game.teams.away.team.name} `}</div>
                <div className="flex w-full justify-center  text-lg decoration-2 md:w-full">
                  {date_time}
                </div>

                {/* <div className="flex w-full justify-center md:w-1/5 md:justify-end">
                  {game.dayNight}
                </div> */}
                <div className="flex w-full justify-center  ">
                  <Link
                    className="rounded bg-[#fd3594ff] p-2 font-overpass text-lg font-bold text-black hover:bg-[#85214f]"
                    href={{
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
