export default function AdminDelete({ betInfo }: BetInfo) {
  const { handleDelete } = betInfo;

  return (
    <>
      <button className="text-white" onClick={() => void handleDelete()}>
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
