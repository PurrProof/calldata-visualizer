import { memo } from "react";
import ParamGroup from "./ParamGroup";
//import Bar from "./Bar";
import getColor from "../helpers/colors";
import useStore from "../store/store";

export interface IParam {
  id: number;
  name?: string;
  type: string;
  components?: IParam[];
}

const Param = memo(({ param }: { param: IParam }) => {
  const { selectedIds, handleParamClick, setHoveredParam } = useStore();
  const isSelected = selectedIds.includes(param.id);

  return (
    <div
      id={`param${param.id}`}
      className="param"
      style={
        isSelected
          ? {
            backgroundColor: getColor(param.id),
            borderColor: getColor(param.id),
          }
          : {}
      }
      onClick={(event) => { event.stopPropagation(); handleParamClick(param.id) }}
      onMouseOver={(event) => { event.stopPropagation(); setHoveredParam(param.id) }}
      onMouseLeave={() => setHoveredParam(null)}
    >
      <strong>{param.name}</strong> {param.type}

      {/* don't render bar, because we set bg for now 
      isSelected && <Bar key={param.id} depth={0} id={param.id} align="right" />*/}

      {param.components && <ParamGroup params={param.components} />}
    </div>
  );
});

export default Param;
