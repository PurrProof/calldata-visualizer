import Bar from "./Bar";
import { IAbiWord } from "../types/abi";
import getColor from "../helpers/colors";
import { hexlify } from "ethers";
import Xarrow from "react-xarrows";
import useStore from '../store/store';

interface IAbiWordRowProps {
  word: IAbiWord;
  offset: number;
}

const formatOffset = (offset: number): string => {
  return "0x" + offset.toString(16).toUpperCase().padStart(4, "0");
};

const AbiWordRow = ({ word, offset }: IAbiWordRowProps) => {
  const selectedIds = useStore((state) => state.selectedIds);
  const selectedCoders = selectedIds.filter((id) => word.coders.includes(id)).sort();

  return (
    <div id={`word${formatOffset(offset)}`} className={`row ${word.isIndex ? "index" : "data"}`}>
      <div className="column word">
        {hexlify(word.data)}
      </div>

      <div className="column offset">
        {formatOffset(offset)} — {formatOffset(offset + 31)}
      </div>

      {selectedCoders.map((id, index) => {
        const startId = `param${id}`;
        const endId = `word${formatOffset(offset)}`;
        return (
          <>
            <Bar key={id} depth={index} id={id} align="left" />
            <Xarrow
              key={`${startId}-${endId}`}
              start={startId}
              end={endId}
              startAnchor="right"
              endAnchor="left"
              color={`${getColor(id)}`}
              strokeWidth={1}
            />
          </>
        );
      })}
    </div>
  );
};

export default AbiWordRow;
