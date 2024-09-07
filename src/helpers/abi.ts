import { ethers, ParamType } from "ethers";
import type { IDecodedCalldata, IProcessedParam } from "../types/";

export const abiDecodeCalldata = (
  signature: string,
  calldata: string
): IDecodedCalldata => {
  const iface = new ethers.Interface([signature]);
  const func = iface.getFunction(signature);
  if (!func) throw new Error("can't get function by signature");

  const decoded = iface.decodeFunctionData(func, calldata);
  const accum = ethers.AbiCoder.defaultAbiCoder().getAccumulatedAbiWords();
  const inputsWithIds: IProcessedParam[] = assignIdsToParams(func.inputs);

  return { decoded, accum, inputsWithIds };
};

// recursively assign IDs to function parameters and return them with IDs.
export const assignIdsToParams = (
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

export default abiDecodeCalldata;
