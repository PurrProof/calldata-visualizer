import React, { memo, useCallback } from "react";
import ParamGroup from "./ParamGroup";
import Bar from "./Bar"
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
      style={isSelected ? {
        backgroundColor: getColor(param.id),
        borderColor: getColor(param.id)
      } : {}}
      onClick={handleClick}
    >
      <strong>
        #{param.id} {param.name || "Unnamed"}:
      </strong>{" "}
      {param.type}

      {isSelected ? <Bar key={param.id} depth={0} id={param.id} align="right" /> : null}

      {
        param.components && (
          <ParamGroup
            params={param.components}
            onClick={onClick}
            selectedIds={selectedIds}
          />
        )
      }
    </div >
  );
});

export default Param;
