import axios from "axios";
import { format, addMinutes } from "date-fns";
import { useState } from "react";
import AdminEdit from "~/components/AdminEdit";
import AdminDelete from "~/components/AdminDelete";

export default function BetTime({
  session,
  gameId,
  gameTime,
  currentBets,
}: BetTimeType) {
  const [activeBets, setActiveBets] = useState<CurrentBets>(currentBets);
  const date = new Date(gameTime);
  console.log(currentBets);
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

    const resData = res.data as PlaceBetResData;
    if (res.status === 201) {
      setActiveBets((prevState: CurrentBets) => [
        ...prevState,
        { userName: resData.name, timeslot: resData.timeslot },
      ]);
    }
    if (res.status === 200 && !resData.success) {
      alert("You have already placed a bet for this game");
    }
  };

  const handleDelete = async (time: string, gameId: string) => {
    const res = await axios.post("/api/deletebet", {
      time: time,
      gameId: gameId,
    });
    const resData = res.data as DeleteResData;
    if (res.status === 201) {
      activeBets.find((element: CurrentBets) => {
        if (element.timeslot === resData.timeslot) {
          const index = activeBets.indexOf(element);
          if (index > -1) {
            setActiveBets(() => activeBets.splice(index, 1));
          }
        }
      });
    }
    console.log("parent", res);
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
            <div
              className="flex w-full flex-row space-x-4 space-y-2"
              key={index}
            >
              <li className="flex w-1/5 text-white  ">{betTime}</li>
              {similarBets !== undefined ? (
                <h4 className="font-overpass text-white">
                  {similarBets.userName}
                </h4>
              ) : (
                <button
                  className="rounded bg-[#fd3594ff] p-2 font-overpass text-lg font-bold text-black hover:bg-[#85214f]"
                  onClick={() => {
                    if (!session.data) {
                      alert("You must be signed in to place a bet");
                    } else
                      void handleBet(time, session.data?.user.email, gameId);
                  }}
                >
                  Bet
                </button>
              )}
              <div className="flex w-full justify-end space-x-2 pr-4">
                {session.data?.user.email === "admin@lm.com" ? (
                  <>
                    <AdminDelete
                      betInfo={{
                        time: time,
                        gameId: gameId,
                        handleDelete: () => void handleDelete(time, gameId),
                      }}
                    />
                    {/* <AdminEdit /> */}
                  </>
                ) : null}
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

type DeleteResData = {
  success: boolean;
  name: string;
  timeslot: string;
};
type PlaceBetResData = {
  success: boolean;
  name: string;
  timeslot: string;
};
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
