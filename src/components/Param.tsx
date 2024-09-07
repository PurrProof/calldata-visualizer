import React, { memo, useCallback } from "react";
import ParamGroup from "./ParamGroup";
import getColor from "../helpers/colors";

export interface IParam {
  id: number;
  name?: string;
  type: string;
  components?: IParam[];
}

export interface IParamProps {
  param: IParam;
  onClick: (id: number) => void;
  selectedIds: number[];
}

const Param = memo(({ param, onClick, selectedIds }: IParamProps) => {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      onClick(param.id);
    },
    [onClick, param.id]
  );

  const isSelected = selectedIds.includes(param.id);

  return (
    <div
      id={`param${param.id}`}
      className="param"
      style={isSelected ? { borderRightWidth: "5px", borderRightColor: getColor(param.id) } : {}}
      onClick={handleClick}
    >
      <strong>
        #{param.id} {param.name || "Unnamed"}:
      </strong>{" "}
      {param.type}
      {param.components && (
        <ParamGroup
          params={param.components}
          onClick={onClick}
          selectedIds={selectedIds}
        />
      )}
    </div>
  );
});

export default Param;
