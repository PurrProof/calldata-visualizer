import { ParamType } from "ethers";

interface ProcessedParam {
  id: number;
  name?: string;
  type: string;
  components?: ProcessedParam[]; // Recursive type for nested components
}

export function assignIdsToParams(
  params: ParamType[],
  idCounter: { current: number } = { current: 0 }
): ProcessedParam[] {
  return params.map(({ name, type, components }) => {
    const paramId = idCounter.current++;

    if (components && components !== null) {
      return {
        id: paramId,
        type,
        components: assignIdsToParams([...components], idCounter), // Recursive call with mutable array
      };
    }
    return { id: paramId, name: name || "Unnamed", type };
  });
}
