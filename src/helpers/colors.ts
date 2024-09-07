import { presetPalettes } from "@ant-design/colors";

// https://github.com/ant-design/ant-design-colors

const colorSetKeys = Object.keys(presetPalettes);

// create a sequence of even-indexed columns followed by odd-indexed columns (static)
const evenColumns = colorSetKeys.filter((_, i) => i % 2 === 0); // 0, 2, 4, ...
const oddColumns = colorSetKeys.filter((_, i) => i % 2 !== 0); // 1, 3, 5, ...
const customColumnOrder = [...evenColumns, ...oddColumns];
const customColumnOrderLength = customColumnOrder.length; // pre-calculate the length

const getColor = (index: number): string => {
  // we'll take these colors from each column
  const sequence = [5, 3];

  const sequenceIndex =
    Math.floor(index / customColumnOrderLength) % sequence.length;
  const colorIndex = sequence[sequenceIndex]; // color index (2nd, 4th, 6th, or 8th)
  const columnIndex = index % customColumnOrderLength; // cyclic through custom column order

  // get color from the preset palettes
  const color = presetPalettes[customColumnOrder[columnIndex]][colorIndex];

  return color;
};

export default getColor;
