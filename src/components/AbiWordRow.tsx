import Bars from "./Bars";
import { IAbiWord } from "../types/abi";
import getColor from "../helpers/colors";
import { hexlify } from "ethers";
import Xarrow from "react-xarrows";

interface IAbiWordRowProps {
  word: IAbiWord;
  offset: number;
  selectedIds: number[];
}

const formatOffset = (offset: number): string => {
  return "0x" + offset.toString(16).toUpperCase().padStart(4, "0");
};

const AbiWordRow = ({ word, offset, selectedIds }: IAbiWordRowProps) => (
  <div
    id={`word${formatOffset(offset)}`}
    className={`row ${word.isIndex ? "index" : "data"}`}
  >
    <div className="column word">
      {hexlify(word.data)}
      <Bars word={word} selectedIds={selectedIds} />
    </div>
    <div className="column offset">
      {formatOffset(offset)} — {formatOffset(offset + 31)}
    </div>

    {word.coders.map((coderId) => {
      const startId = `param${coderId}`;
      const endId = `word${formatOffset(offset)}`;
      return (
        <Xarrow
          key={`${startId}-${endId}`}
          start={startId}
          end={endId}
          startAnchor="right"
          endAnchor="left"
          color={`${getColor(coderId)}`}
          strokeWidth={1}
        />
      );
    })}

  </div >
);

export default AbiWordRow;
