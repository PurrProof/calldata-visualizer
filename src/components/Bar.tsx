import getColor from "../helpers/colors";

const Bar = ({ id, depth, align }: { id: number, depth: number, align: "left" | "right" }) => {
  return (
    <div
      className="bar"
      style={{
        backgroundColor: getColor(id),
        borderColor: getColor(id),
        [align]: `${depth * 5 - (align === "left" ? 0 : 1)
          }px`
      }}
    />
  );
};

export default Bar;
