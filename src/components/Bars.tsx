import React from "react";
import IAbiWord from "./AbiWord";

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
            className={`bar selected${id}`}
            style={{ right: `${index * 6}px` }}
          />
        ))}
    </>
  );
};

export default Bars;
