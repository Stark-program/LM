import axios from "axios";
import { format, addMinutes } from "date-fns";
import { useState } from "react";
import BetAlreadyPlaced from "~/components/alerts/BetAlreadyPlaced";
import AdminDelete from "~/components/AdminDelete";

import { TimePicker } from "@mui/x-date-pickers/TimePicker";

export default function BetTime({
  session,
  gameId,
  gameTime,
  currentBets,
}: BetTimeType) {
  const [activeBets, setActiveBets] = useState<CurrentBets[]>(currentBets);
  const [betHasBeenPlaced, setBetHasBeenPlaced] = useState(false);
  const [confirmBetState, setConfirmBetState] = useState(false);
  const [betInfo, setBetInfo] = useState({ time: "", email: "", gameId: "" });
  const [time, setTime] = useState(undefined);
  const [timeTaken, setTimeTaken] = useState(false);
  const date = new Date(gameTime);
  const times = [];

  for (let i = 0; i < 120; i++) {
    const betTime = addMinutes(date, 90 + i).toISOString();

    times.push(betTime);
  }

  const handleBet = async (time: string, email: string, gameId: string) => {
    const timeConvert = new Date(time).toISOString();

    const data = {
      time: timeConvert,
      email: email,
      gameId: gameId,
    };
    const res = await axios.post("/api/handlebet", data);

    const resData = res.data as PlaceBetResData;
    if (res.status === 201) {
      setActiveBets((prevState) => [
        ...prevState,
        { userName: resData.name, timeslot: resData.timeslot },
      ]);
      setConfirmBetState(false);
    }
    if (res.status === 200 && !resData.success) {
      // alert("You have already placed a bet for this game");
      if (resData.timeTaken) {
        setTimeTaken(true);
      } else {
        setConfirmBetState(false);
        setBetHasBeenPlaced(true);
      }
    }
  };

  const handleBetPlacedState = () => {
    setBetHasBeenPlaced(false);
  };

  const handleTimeTakenState = () => {
    setTimeTaken(false);
    setConfirmBetState(false);
  };

  const handleConfirmBet = () => {
    setConfirmBetState(true);
  };

  const handleDelete = async (time: string, gameId: string) => {
    const res = await axios.post("/api/deletebet", {
      time: time,
      gameId: gameId,
    });
    console.log(res);
    const resData = res.data as DeleteResData;
    console.log("resData", resData);
    if (res.data.success) {
      console.log("delete", resData);
      const currentBets = [...activeBets];
      setActiveBets([...resData.allBets]);
      // activeBets.find((element: CurrentBets) => {
      //   console.log("this logged", element);
      // if (element.timeslot === resData.timeslot) {
      //   console.log("this also logged");
      //   const arr = [...activeBets];

      //   const filterRemove = arr.filter((time: CurrentBets) => {
      //     console.log("this logged as well");
      //     return time.timeslot !== element.timeslot;
      //   });
      //   console.log(filterRemove);
      // setActiveBets(filterRemove);
      // window.location.reload();
      // }
      // });
    }
  };
  console.log("active", activeBets);

  return (
    <div className="flex w-full flex-col ">
      {betHasBeenPlaced ? (
        <BetAlreadyPlaced
          handleState={handleBetPlacedState}
          message={{
            title: "Bet has already been placed for this account",
            description:
              "Our records show you have already placed a bet for this game. If this is a mistake please contact Alex.",
          }}
        />
      ) : null}
      {confirmBetState ? (
        <ConfirmBet
          confirmInfo={{
            handleConfirm: async () => {
              await handleBet(betInfo.time, betInfo.email, betInfo.gameId);
            },
            handleState: () => setConfirmBetState(false),
          }}
        />
      ) : null}
      {timeTaken ? (
        <BetAlreadyPlaced
          handleState={handleTimeTakenState}
          message={{
            title: "Time already taken",
            description:
              "Our records show a bet has already been placed for this time, if this is a mistake please contact Alex",
          }}
        />
      ) : null}
      <div className="flex h-screen w-full flex-col ">
        <div className="">
          <h1 className="mt-10 text-center font-overpass text-lg text-white">
            {" "}
            Game starts at {format(date, "hh:mm aaaa")}
          </h1>
        </div>
        <div className="flex flex-col space-y-2 md:flex-row md:justify-center md:space-y-0">
          <TimePicker
            label="Basic time picker"
            className="h-12 w-full bg-white md:w-1/2"
            onChange={(newValue) => void setTime(newValue)}
          />
          <button
            className="h-12 w-full rounded bg-[#fd3594ff] p-2 font-overpass text-lg font-bold text-black hover:bg-[#85214f] sm:w-1/5 md:ml-2"
            onClick={() => {
              void setConfirmBetState(true);
              setBetInfo({
                time: time.$d,
                email: session.data?.user.email,
                gameId: gameId,
              });
            }}
          >
            Submit
          </button>
        </div>
        <ul className=" mt-10 flex w-full flex-col justify-center space-y-10 px-2 ">
          {activeBets
            .sort((a, b) => {
              const aDate = new Date(a.timeslot);
              const bDate = new Date(b.timeslot);
              return aDate - bDate;
            })
            .map(
              (bet: { userName: string; timeslot: string }, index: number) => {
                return (
                  <div className="flex w-full flex-row" key={index}>
                    <div className="w-1/2">
                      <h1 className="text-center font-overpass text-lg text-white">
                        {bet.userName}
                      </h1>
                    </div>
                    <div className="w-1/2">
                      <h1 className="text-center font-overpass text-lg text-white">
                        {format(new Date(bet.timeslot), "hh:mm aaaa")}
                      </h1>
                    </div>
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
                );
              }
            )}
        </ul>
      </div>
    </div>
  );
}

const ConfirmBet: React.FC = ({ confirmInfo }: ConfirmBetProps) => {
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg
                    className="h-6 w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    className="text-base font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    Are you sure you want to choose this time?{" "}
                    <span className="font-bold underline">
                      {/* {confirmInfo.betTime} */}
                    </span>
                  </h3>
                </div>
              </div>
            </div>
            <div className="space-y-2 bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 md:space-y-0">
              <button
                onClick={() => void confirmInfo.handleConfirm()}
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Yes, this time
              </button>
              <button
                onClick={() => void confirmInfo.handleState()}
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type DeleteResData = {
  success: boolean;
  name: string;
  timeslot: string;
  allBets: CurrentBets[];
};
type PlaceBetResData = {
  success: boolean;
  name: string;
  timeslot: string;
  timeTaken?: boolean;
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
  id?: number;
  gameId: string;
  userId: string;
  userName: string;
  timeslot: string;
}

interface ConfirmBetProps {
  confirmInfo: {
    betTime: string;
    handleConfirm: () => void;
    handleState: () => void;
  };
}
