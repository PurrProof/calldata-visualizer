import React, { memo, useCallback } from "react";
import Param, { IParam } from "./Param";

interface IParamTreeProps {
  params: IParam[];
  onClick: (id: number) => void;
  selectedIds: number[];
}

const ParamTree = memo(({ params, onClick, selectedIds }: IParamTreeProps) => (
  <div className="param-list">
    {params.map((param) => (
      <Param
        key={param.id}
        param={param}
        onClick={onClick}
        selectedIds={selectedIds}
      />
    ))}
  </div>
));

export default ParamTree;
