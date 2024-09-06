import { ParamType } from "ethers";

interface ProcessedParam {
  id: number;
  name?: string;
  type: string;
  components?: ProcessedParam[]; // Recursive type for nested components
}

// Modify the function to handle ParamType from ethers.js
export function assignIdsToParams(
  params: ParamType[], // Now accepting ethers.js ParamType
  idCounter: { current: number } = { current: 0 }
): ProcessedParam[] {
  return params.map(({ name, type, components }) => {
    const paramId = idCounter.current++; // Increment the counter for each parameter

    if (components && components !== null) {
      // Convert readonly components to a mutable array and recursively process
      return {
        id: paramId,
        type,
        components: assignIdsToParams([...components], idCounter), // Recursive call with mutable array
      };
    }
    return { id: paramId, name: name || "Unnamed", type };
  });
}
