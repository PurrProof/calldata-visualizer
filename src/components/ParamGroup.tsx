import { memo } from "react";
import Param from "./Param";
import { AbiCodersTreeNode } from "ethers";

const ParamGroup = memo(({ nodes }: { nodes: AbiCodersTreeNode[] }) => {
  return (
    <div className="param-group">
      {nodes.map((node) => (
        <Param
          key={node.coderId}
          node={node}
        />
      ))}
    </div>
  );
});

export default ParamGroup;
