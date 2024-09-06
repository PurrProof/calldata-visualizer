import { IAbiWord } from "../types/abi";
import AbiWordRow from "./AbiWordRow";

interface IAbiWordListProps {
  words: Map<number, IAbiWord>;
  selectedIds: number[];
}

const AbiWordList = ({ words, selectedIds }: IAbiWordListProps) => (
  <div>
    {Array.from(words.entries()).map(([offset, word]) => (
      <AbiWordRow
        key={offset}
        word={word}
        offset={offset}
        selectedIds={selectedIds}
      />
    ))}
  </div>
);

export default AbiWordList;
