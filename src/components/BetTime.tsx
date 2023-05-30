import axios from "axios";

export default function BetTime({ betTime }: BetTimeType) {
  console.log(betTime);
  return (
    <div className="flex w-full flex-col">
      <ul>
        {betTime.map((time: string, index: number) => {
          return (
            <div className="flex w-full flex-row space-y-2" key={index}>
              <li className="flex w-1/5 text-white  ">{time}</li>
              <button className="rounded bg-[#fd3594ff] p-2 font-overpass text-lg font-bold text-black hover:bg-[#85214f]">
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
  betTime: Array<string>;
}
