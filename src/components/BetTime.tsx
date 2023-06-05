import axios from "axios";
import { format, addMinutes } from "date-fns";

export default function BetTime({ session, gameId, gameTime }: BetTimeType) {
  console.log(gameTime);
  const date = new Date(gameTime);
  console.log(date);

  const times = [];
  for (let i = 0; i < 120; i++) {
    const betTime = addMinutes(date, 90 + i).toISOString();

    // console.log(test);
    times.push(betTime);
  }

  const renderTimes = () => {};

  const handleBet = async (time: string, email: string, gameId: string) => {
    const data = {
      time: time,
      email: email,
      gameId: gameId,
    };
    const res = await axios.post("/api/handlebet", data);
  };
  console.log("betTime", session);
  return (
    <div className="flex w-full flex-col">
      <ul>
        {times.map((time: string, index: number) => {
          const betTime = format(new Date(time), "hh:mm:ss");
          return (
            <div className="flex w-full flex-row space-y-2" key={index}>
              <li className="flex w-1/5 text-white  ">{betTime}</li>
              <button
                className="rounded bg-[#fd3594ff] p-2 font-overpass text-lg font-bold text-black hover:bg-[#85214f]"
                onClick={() =>
                  void handleBet(time, session.data.user.email, gameId)
                }
              >
                Bet
              </button>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

interface BetTimeType {
  gameTime: string;
  gameId: string;
  // betTime: Array<string>;
  session: {
    data: {
      user: {
        name: string;
        email: string;
      };
    };
  };
}
