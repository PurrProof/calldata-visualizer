import { useState, useCallback } from "react";
import { ethers } from "ethers";

// Define types for the decoded data
interface DecodedData {
  decoded: any; // You can replace 'any' with a more specific type if available
  accum: {
    words: Map<number, any>; // Adjust types for the word structure as needed
  };
}

interface UseDecoder {
  signature: string;
  setSignature: React.Dispatch<React.SetStateAction<string>>;
  calldata: string;
  setCalldata: React.Dispatch<React.SetStateAction<string>>;
  decodedData: DecodedData | null;
  setDecodedData: React.Dispatch<React.SetStateAction<DecodedData | null>>;
  decodeData: (currentSignature?: string, currentCalldata?: string) => void;
  selectedIds: number[];
  handleParamClick: (id: number) => void;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const useDecoder = (): UseDecoder => {
  const [signature, setSignature] = useState<string>("");
  const [calldata, setCalldata] = useState<string>("");
  const [decodedData, setDecodedData] = useState<DecodedData | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  const decodeData = useCallback(
    (currentSignature = signature, currentCalldata = calldata) => {
      try {
        setDecodedData(null); // Clear previous decoded data
        setSelectedIds([]); // Clear all selected IDs
        setError(null); // Clear previous errors

        if (currentSignature && currentCalldata) {
          const iface = new ethers.Interface([currentSignature]);
          const decoded = iface.decodeFunctionData("swap", currentCalldata);
          const accum =
            ethers.AbiCoder.defaultAbiCoder().getAccumulatedAbiWords();
          setDecodedData({ decoded, accum }); // Store new decoded data in state
        }
      } catch (error: any) {
        console.error("Decoding error:", error);
        setError("Decoding error: " + error.message);
        setDecodedData(null); // Clear if there's an error during decoding
      }
    },
    [signature, calldata]
  );

  const handleParamClick = (id: number) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    );
  };

  return {
    signature,
    setSignature,
    calldata,
    setCalldata,
    decodedData,
    setDecodedData,
    decodeData,
    selectedIds,
    handleParamClick,
    error,
    setError,
  };
};

export default useDecoder;
