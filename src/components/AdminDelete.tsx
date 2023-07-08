export default function AdminDelete({ betInfo }: BetInfo) {
  const { handleDelete } = betInfo;

  return (
    <>
      <button
        className="rounded bg-[#fd3594ff]  font-overpass  font-bold text-black"
        onClick={() => void handleDelete()}
      >
        Delete Bet
      </button>
    </>
  );
}

type BetInfo = {
  betInfo: {
    time: string;
    gameId: string;
    handleDelete: () => void;
  };
};
