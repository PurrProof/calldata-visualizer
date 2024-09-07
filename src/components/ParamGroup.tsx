import { memo } from "react";
import Param, { IParam } from "./Param";

interface IParamGroupProps {
  params: IParam[];
}

const ParamGroup = memo(({ params }: IParamGroupProps) => {
  return (
    <div className="param-group">
      {params.map((param) => (
        <Param
          key={param.id}
          param={param}
        />
      ))}
    </div>
  );
});

export default ParamGroup;
