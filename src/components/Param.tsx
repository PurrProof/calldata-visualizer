import React, { memo, useCallback } from "react";
import ParamTree from "./ParamTree";
import "./Param.css";

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
      className={`param ${isSelected ? "selected" + param.id : ""}`}
      onClick={handleClick}
    >
      <strong>
        #{param.id} {param.name || "Unnamed"}:
      </strong>{" "}
      {param.type}
      {param.components && (
        <ParamTree
          params={param.components}
          onClick={onClick}
          selectedIds={selectedIds}
        />
      )}
    </div>
  );
});

export default Param;
