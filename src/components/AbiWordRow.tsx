import Bars from "./Bars";
import { IAbiWord } from "../types/abi";
import { hexlify } from "ethers";
import "./AbiWordRow.css"

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
    className={`row ${word.isIndex ? "index" : "data"}`}
    style={{ position: "relative" }}
  >
    <div className="column word">
      {hexlify(word.data)}
      <Bars word={word} selectedIds={selectedIds} />
    </div>
    <div className="column offset">
      {formatOffset(offset)} — {formatOffset(offset + 31)}
    </div>
  </div>
);

export default AbiWordRow;
