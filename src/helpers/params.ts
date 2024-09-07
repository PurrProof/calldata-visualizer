import { ethers, ParamType } from "ethers";

interface IProcessedParam {
  id: number;
  name?: string;
  type: string;
  components?: IProcessedParam[]; // Recursive type for nested components
}

/**
 * Recursively assign IDs to function parameters and return them with IDs.
 */
const assignIdsToParams = (
  params: readonly ParamType[],
  idCounter: { current: number } = { current: 0 }
): IProcessedParam[] => {
  return params.map(({ name, type, components }) => ({
    id: idCounter.current++,
    name: name || "",
    type,
    components: components
      ? assignIdsToParams(components, idCounter)
      : undefined, // Recursively handle components
  }));
};

/**
 * Parse the function signature, extract inputs, assign IDs, and return the result.
 */
const getParamsWithIds = (signature: string): IProcessedParam[] => {
  if (!signature) return [];

  try {
    const iface = new ethers.Interface([signature]);
    const func = iface.getFunction(signature);
    if (!func) {
      throw Error("can't get function");
    }
    return assignIdsToParams(func.inputs); // Recursively assign IDs to the inputs
  } catch (error: any) {
    console.error("Error parsing function signature:", error.message);
    return [];
  }
};

export default getParamsWithIds;
