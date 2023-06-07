import axios from "axios";
import { format, addMinutes } from "date-fns";
import { useState } from "react";

export default function BetTime({
  session,
  gameId,
  gameTime,
  currentBets,
}: BetTimeType) {
  const [activeBets, setActiveBets] = useState(currentBets);
  const date = new Date(gameTime);

  const times = [];
  for (let i = 0; i < 120; i++) {
    const betTime = addMinutes(date, 90 + i).toISOString();

    times.push(betTime);
  }

  const handleBet = async (time: string, email: string, gameId: string) => {
    const data = {
      time: time,
      email: email,
      gameId: gameId,
    };
    const res = await axios.post("/api/handlebet", data);
    if (res.status === 201) {
      setActiveBets((prevState) => [
        ...prevState,
        { userName: res.data.name, timeslot: res.data.timeslot },
      ]);
    }
    if (res.status === 200 && res.data.failure) {
      alert(res.data.failure);
    }
  };

  return (
    <div className="flex w-full flex-col">
      <ul>
        {times.map((time: string, index: number) => {
          const betTime = format(new Date(time), "hh:mm:ss");
          const similarBets = activeBets.find((element: CurrentBets) => {
            if (element.timeslot === time) {
              return element;
            }
          });

          return (
            <div className="flex w-full flex-row space-y-2" key={index}>
              <li className="flex w-1/5 text-white  ">{betTime}</li>
              {similarBets !== undefined ? (
                <h4 className="font-overpass text-white">
                  {similarBets.userName}
                </h4>
              ) : (
                <button
                  className="rounded bg-[#fd3594ff] p-2 font-overpass text-lg font-bold text-black hover:bg-[#85214f]"
                  onClick={() =>
                    void handleBet(time, session.data.user.email, gameId)
                  }
                >
                  Bet
                </button>
              )}
            </div>
          );
        })}
      </ul>
    </div>
  );
}

interface BetTimeType {
  currentBets: CurrentBets;
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

interface CurrentBets {
  gameId: string;
  userId: string;
  userName: string;
  timeslot: string;
}
