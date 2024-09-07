import { memo } from "react";
import Param, { IParam } from "./Param";

interface IParamGroupProps {
  params: IParam[];
  onClick: (id: number) => void;
  selectedIds: number[];
}

const ParamGroup = memo(({ params, onClick, selectedIds }: IParamGroupProps) => (
  <div className="param-group">
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

export default ParamGroup;
