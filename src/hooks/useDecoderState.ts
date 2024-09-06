import { useState } from "react";

interface IUseDecoderState {
  signature: string;
  setSignature: React.Dispatch<React.SetStateAction<string>>;
  calldata: string;
  setCalldata: React.Dispatch<React.SetStateAction<string>>;
  decodedData: any | null; // Placeholder for actual type
  setDecodedData: React.Dispatch<React.SetStateAction<any | null>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const useDecoderState = (): IUseDecoderState => {
  const [signature, setSignature] = useState<string>("");
  const [calldata, setCalldata] = useState<string>("");
  const [decodedData, setDecodedData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  return {
    signature,
    setSignature,
    calldata,
    setCalldata,
    decodedData,
    setDecodedData,
    error,
    setError,
  };
};

export default useDecoderState;
