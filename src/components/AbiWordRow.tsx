import Bars from "./Bars";
import IAbiWord from "./AbiWord";
import { hexlify } from "ethers";

interface IAbiWordRowProps {
  word: IAbiWord;
  offset: number;
  selectedIds: number[];
}

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
      {"0x" + offset.toString(16).toUpperCase().padStart(4, "0")} —{" "}
      {"0x" + (offset + 31).toString(16).toUpperCase().padStart(4, "0")}
    </div>
  </div>
);

export default AbiWordRow;
