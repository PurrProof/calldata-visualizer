import { Fragment, useMemo } from "react";
import Bar from "./Bar";
import getColor from "../helpers/colors";
import { hexlify } from "ethers";
import Xarrow from "react-xarrows";
import useStore from '../store/store';
import type { Coder, AbiWord } from "ethers";
import { ethers } from "ethers";

interface IAbiWordRowProps {
  word: AbiWord;
  offset: number;
}

const formatOffset = (offset: number): string =>
  `0x${offset.toString(16).toUpperCase().padStart(4, "0")}`;

const renderChunkRow = (
  chunk: Uint8Array,
  currentOffset: number,
  word: AbiWord,
  selectedCoders: number[],
  hoveredParamId: number | null,
  bgColor: string | null
) => {
  const innerCoderId = word.coders[word.coders.length - 1];
  return (
    <div
      key={`word${formatOffset(currentOffset)}`}
      id={`word${formatOffset(currentOffset)}`}
      className="row"
    >
      <div
        className="column word"
        style={bgColor ? { backgroundColor: bgColor, borderColor: bgColor } : undefined}
      >
        {hexlify(chunk)}
      </div>

      <div id={`offset${formatOffset(currentOffset)}`} className="column offset">
        {word.role && <span className={`tag ${word.role}`}>{word.role}</span>}
        {formatOffset(currentOffset)} — {formatOffset(currentOffset + 31)}
        {/* Render extra Xarrow when word.role === 'offset' */}
        {word.role === 'offset' && bgColor && (
          < Xarrow
            start={`offset${formatOffset(currentOffset)}`}
            end={`offset${formatOffset(word.parentOffset + parseInt(hexlify(chunk), 16))}`}
            startAnchor={{ position: "right", offset: { y: -19 } }}
            endAnchor="right"
            color={bgColor}
            path="grid"
            gridBreak={(-15 - innerCoderId * 5).toString()}
            strokeWidth={2}
            labels={{ end: <div className="label" style={{ color: bgColor }}>{"0x" + ethers.toNumber(chunk).toString(16)}</div> }}
            _extendSVGcanvas={20}
          />
        )}

      </div>

      {/* Render Xarrows for selected coders */}
      {selectedCoders.map((id, index) => {
        const startId = `param${id}`;
        const endId = `word${formatOffset(currentOffset)}`;
        return (
          <Fragment key={id}>
            <Bar depth={index} id={id} align="left" />
            <Xarrow
              start={startId}
              end={endId}
              startAnchor="right"
              endAnchor="left"
              color={getColor(id)}
              strokeWidth={hoveredParamId === id ? 3 : 1}
            />
          </Fragment>
        );
      })}
    </div>
  );
};

const AbiWordRow = ({ word, offset }: IAbiWordRowProps) => {
  const { selectedIds, hoveredParamId, decodedData } = useStore((state) => ({
    selectedIds: state.selectedIds,
    hoveredParamId: state.hoveredParamId,
    decodedData: state.decodedData,
  }));

  const { rows } = useMemo(() => {
    const coders: Coder[] = decodedData?.accum.coders || [];
    const selectedCoders = selectedIds.filter(id => word.coders.includes(id)).sort((a, b) => a - b);
    const innerCoderId = word.coders[word.coders.length - 1];
    const bgColor = selectedIds.includes(innerCoderId) ? getColor(innerCoderId) : null;
    const rowList = [];
    let rest = word.data;
    let currentOffset = offset;

    while (rest.length > 0) {
      const chunk = rest.slice(0, 32);
      rest = rest.slice(32);

      rowList.push(
        renderChunkRow(chunk, currentOffset, word, selectedCoders, hoveredParamId, bgColor)
      );

      currentOffset += 32;
    }

    return { coders, selectedCoders, innerCoderId, rows: rowList };
  }, [word, offset, selectedIds, decodedData, hoveredParamId]);

  return <>{rows}</>;
};

export default AbiWordRow;
