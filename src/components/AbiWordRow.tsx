import { Fragment, useMemo } from "react";
import Bar from "./Bar";
import getColor from "../helpers/colors";
import { hexlify } from "ethers";
import Xarrow from "react-xarrows";
import useStore from '../store/store';
import type { Coder, AbiWord } from "ethers";

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
  coders: Coder[],
  selectedCoders: number[],
  hoveredParamId: number | null,
  innerCoderId: number
) => (
  <div
    key={`word${formatOffset(currentOffset)}`}
    id={`word${formatOffset(currentOffset)}`}
    className="row"
  >
    <div className="column word">{hexlify(chunk)}</div>

    <div className="column offset">
      {word.role && <span className={`tag ${word.role}`}>{word.role}</span>}
      {formatOffset(currentOffset)} — {formatOffset(currentOffset + 31)}
    </div>

    {
      selectedCoders.map((id, index) => {
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
      })
    }
  </div >
);

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

    const rowList = [];
    let rest = word.data;
    let currentOffset = offset;

    while (rest.length > 0) {
      const chunk = rest.slice(0, 32);
      rest = rest.slice(32);

      rowList.push(
        renderChunkRow(chunk, currentOffset, word, coders, selectedCoders, hoveredParamId, innerCoderId)
      );

      currentOffset += 32;
    }

    return { coders, selectedCoders, innerCoderId, rows: rowList };
  }, [word, offset, selectedIds, decodedData, hoveredParamId]);

  return <>{rows}</>;
};

export default AbiWordRow;
