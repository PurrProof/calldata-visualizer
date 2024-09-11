import { memo } from "react";
import ParamGroup from "./ParamGroup";
//import Bar from "./Bar";
import getColor from "../helpers/colors";
import useStore from "../store/store";
import { AbiCodersTreeNode } from "ethers"

const Param = memo(({ node }: { node: AbiCodersTreeNode }) => {
  const { selectedIds, handleParamClick, setHoveredParam, decodedData } = useStore(
    (state) => ({
      selectedIds: state.selectedIds,
      handleParamClick: state.handleParamClick,
      setHoveredParam: state.setHoveredParam,
      decodedData: state.decodedData,
    })
  );

  const isSelected = selectedIds.includes(node.coderId);
  const { name, type } = decodedData?.accum.coders[node.coderId] || {};

  return (
    <div
      id={`param${node.coderId}`}
      className={`param ${decodedData?.accum.coders[node.coderId].constructor.name === "AnonymousCoder" ? "anonymous" : ""}`}
      style={
        isSelected
          ? {
            backgroundColor: getColor(node.coderId),
            borderColor: getColor(node.coderId),
          }
          : {}
      }
      onClick={(event) => { event.stopPropagation(); handleParamClick(node.coderId) }}
      onMouseOver={(event) => { event.stopPropagation(); setHoveredParam(node.coderId) }}
      onMouseLeave={() => setHoveredParam(null)}
    >

      {name === type ? type : <><strong>{name}</strong> {type}</>}

      {/* don't render bar, because we set bg for now 
      isSelected && <Bar key={param.id} depth={0} id={param.id} align="right" />*/}

      {node.children && node.children.length > 0 && <ParamGroup nodes={node.children} />}
    </div >
  );
});

export default Param;
