import { IAbiWord } from "../types/abi";
import getColor from "../helpers/colors";

const Bars = ({
  word,
  selectedIds,
}: {
  word: IAbiWord;
  selectedIds: number[];
}) => {
  const sortedSelectedIds = [...selectedIds].sort((a, b) => a - b);
  return (
    <>
      {sortedSelectedIds
        .filter((id) => word.coders.includes(id))
        .map((id, index) => (
          <div
            key={id}
            className="bar"
            style={{
              left: `${index * 5}px`, backgroundColor: getColor(id), borderColor: getColor(id)
            }}
          />
        ))}
    </>
  );
};

export default Bars;
