import { useCallback } from "react";
import { ethers } from "ethers";

interface DecodedData {
  decoded: any;
  accum: {
    words: Map<number, any>;
  };
}

interface UseAbiDecoder {
  decodeData: (signature: string, calldata: string) => DecodedData | null;
}

const useAbiDecoder = (): UseAbiDecoder => {
  const decodeData = useCallback(
    (signature: string, calldata: string): DecodedData | null => {
      try {
        const iface = new ethers.Interface([signature]);
        const decoded = iface.decodeFunctionData("swap", calldata);
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

  return { decodeData };
};

export default useAbiDecoder;
