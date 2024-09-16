import { ethers } from "ethers";
import type { IDecodedCalldata } from "../types/";

const abiDecodeCalldata = (
  signature: string,
  calldata: string
): IDecodedCalldata => {
  const iface = new ethers.Interface([signature]);
  const func = iface.getFunction(signature);
  if (!func) throw new Error("can't get function by signature");

  const decoded = iface.decodeFunctionData(func, calldata);
  const accum = ethers.AbiCoder.defaultAbiCoder().getAccumulatedAbiWords();

  return { decoded, accum };
};

export default abiDecodeCalldata;
