import { useCallback } from "react";
import { ethers } from "ethers";

interface IDecodedData {
  decoded: any;
  accum: {
    words: Map<number, any>;
  };
}

interface IUseAbiDecoder {
  abiDecode: (signature: string, calldata: string) => IDecodedData | null;
}

const useAbiDecoder = (): IUseAbiDecoder => {
  const abiDecode = useCallback(
    (signature: string, calldata: string): IDecodedData | null => {
      try {
        const iface = new ethers.Interface([signature]);
        const func = iface.getFunction(signature);
        if (!func) {
          throw Error("can't get function by signature");
        }
        const decoded = iface.decodeFunctionData(func, calldata);
        const accum =
          ethers.AbiCoder.defaultAbiCoder().getAccumulatedAbiWords();
        return { decoded, accum };
      } catch (error: any) {
        console.error("Decoding error:", error);
        return null;
      }
    },
    []
  );

  return { abiDecode };
};

export default useAbiDecoder;
