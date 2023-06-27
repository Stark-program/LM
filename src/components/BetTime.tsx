import axios from "axios";
import { format, addMinutes } from "date-fns";
import { useState } from "react";
import BetAlreadyPlaced from "~/components/alerts/BetAlreadyPlaced";
import AdminDelete from "~/components/AdminDelete";

export default function BetTime({
  session,
  gameId,
  gameTime,
  currentBets,
}: BetTimeType) {
  const [activeBets, setActiveBets] = useState<CurrentBets[]>(currentBets);
  const [betHasBeenPlaced, setBetHasBeenPlaced] = useState(false);
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

    const resData = res.data as PlaceBetResData;
    if (res.status === 201) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      setActiveBets((prevState) => [
        ...prevState,
        { userName: resData.name, timeslot: resData.timeslot },
      ]);
    }
    if (res.status === 200 && !resData.success) {
      // alert("You have already placed a bet for this game");
      setBetHasBeenPlaced(true);
    }
  };

  const handleBetPlacedState = () => {
    setBetHasBeenPlaced(false);
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
          const arr = [...activeBets];
          const filterRemove = arr.filter((time: CurrentBets) => {
            return time.timeslot !== element.timeslot;
          });
          setActiveBets(filterRemove);
        }
      });
    }
  };

  return (
    <div className="flex w-full flex-col ">
      {betHasBeenPlaced ? (
        <BetAlreadyPlaced handleState={handleBetPlacedState} />
      ) : null}
      <ul className=" space-y-10 px-2 sm:ml-6">
        {times.map((time: string, index: number) => {
          const betTime = format(new Date(time), "hh:mm:ss");
          const similarBets: CurrentBets | undefined = activeBets.find(
            (element: CurrentBets) => {
              if (element.timeslot === time) {
                return element;
              }
            }
          );

          return (
            <div
              className="flex w-full flex-col items-center justify-center sm:flex-row "
              key={index}
            >
              {/* <li className="flex w-full text-center  text-white underline decoration-2 sm:w-1/5   ">
                {betTime}
              </li> */}
              {similarBets !== undefined ? (
                <h4 className="font-overpass text-white">
                  {similarBets.userName}
                </h4>
              ) : (
                <button
                  className="w-full rounded bg-[#fd3594ff] p-2 font-overpass text-lg font-bold text-black hover:bg-[#85214f] sm:w-1/5"
                  onClick={() => {
                    if (!session.data) {
                      alert("You must be signed in to place a bet");
                    } else
                      void handleBet(time, session.data?.user.email, gameId);
                  }}
                >
                  {betTime}
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
  currentBets: CurrentBets[];
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
