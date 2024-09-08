import { Fragment } from "react";
import Bar from "./Bar";
import { IAbiWord } from "../types";
import getColor from "../helpers/colors";
import { hexlify } from "ethers";
import Xarrow from "react-xarrows";
import useStore from '../store/store';
import { Coder } from "ethers";

interface IAbiWordRowProps {
  word: IAbiWord;
  offset: number;
}

const formatOffset = (offset: number): string => {
  return "0x" + offset.toString(16).toUpperCase().padStart(4, "0");
};

const AbiWordRow = ({ word, offset }: IAbiWordRowProps) => {
  const { selectedIds, hoveredParamId, decodedData } = useStore((state) => ({
    selectedIds: state.selectedIds,
    hoveredParamId: state.hoveredParamId,
    decodedData: state.decodedData,
  }));
  const coders: Coder[] = decodedData ? decodedData.accum.coders : [];
  const selectedCoders = selectedIds.filter((id) => word.coders.includes(id)).sort();
  const innerCoderId = word.coders[word.coders.length - 1];

  return (
    <div
      id={`word${formatOffset(offset)}`}
      key={`word${formatOffset(offset)}`}
      className="row"
    >
      <div className="column word">
        {hexlify(word.data)}
        <div className="tags">
          <span className="tag">{coders[innerCoderId].name}</span>
          <span className="tag">{coders[innerCoderId].dynamic ? "dynamic" : "static"}</span>
          <span className="tag">{word.isIndex ? "index" : "data"}</span>
        </div>
      </div>

      <div className="column offset">{formatOffset(offset)} — {formatOffset(offset + 31)}</div>

      {selectedCoders.map((id, index) => {
        const startId = `param${id}`;
        const endId = `word${formatOffset(offset)}`;
        return (
          <Fragment key={id}>  {/* Use React.Fragment with a key */}
            <Bar key={id} depth={index} id={id} align="left" />
            <Xarrow
              key={`${startId}-${endId}`}
              start={startId}
              end={endId}
              startAnchor="right"
              endAnchor="left"
              color={`${getColor(id)}`}
              //dashness={hoveredParamId === id ? false : true}
              strokeWidth={hoveredParamId === id ? 3 : 1}
            />
          </Fragment>
        );
      })}
    </div >
  );
};

export default AbiWordRow;
