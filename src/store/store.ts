import { create } from "zustand";
import { ethers } from "ethers";
import getParamsWithIds from "../helpers/params";
import type { IExample } from "../types/abi";

interface IDecodedData {
  decoded: any;
  accum: {
    words: Map<number, any>;
  };
}

// Zustand store interface
interface StoreState {
  signature: string;
  calldata: string;
  decodedData: any | null;
  error: string | null;
  selectedIds: number[];
  setSignature: (signature: string) => void;
  setCalldata: (calldata: string) => void;
  setDecodedData: (decodedData: any | null) => void;
  setError: (error: string | null) => void;
  handleParamClick: (
    id: number,
    event?: React.MouseEvent<HTMLDivElement>
  ) => void; // Accept event to stop propagation
  resetSelection: () => void;
  abiDecode: (signature: string, calldata: string) => IDecodedData | null;
  processSignature: (signature: string) => any[];
  handleDecodeClick: () => void;
  loadExample: (example: IExample) => void;
}

const useStore = create<StoreState>((set, get) => ({
  signature: "",
  calldata: "",
  decodedData: null,
  error: null,
  selectedIds: [],

  setSignature: (signature) => set({ signature }),
  setCalldata: (calldata) => set({ calldata }),
  setDecodedData: (decodedData) => set({ decodedData }),
  setError: (error) => set({ error }),

  handleDecodeClick: () => {
    const { signature, calldata, abiDecode } = get();
    try {
      const result = abiDecode(signature, calldata);
      if (result) {
        set({ decodedData: result, error: null });
      } else {
        set({ error: "Decoding error", decodedData: null });
      }
    } catch (error: any) {
      set({ error: `Decoding error: ${error.message}`, decodedData: null });
    }
  },

  handleParamClick: (id, event) => {
    if (event) {
      event.stopPropagation();
    }

    const { selectedIds } = get();
    const newSelectedIds = selectedIds.includes(id)
      ? selectedIds.filter((selectedId) => selectedId !== id)
      : [...selectedIds, id];

    set({ selectedIds: newSelectedIds });
  },

  resetSelection: () => set({ selectedIds: [] }),

  loadExample: (example: IExample): void => {
    const { resetSelection, setSignature, setCalldata, abiDecode } = get();
    resetSelection();
    setSignature(example.signature);
    setCalldata(example.calldata);
    abiDecode(example.signature, example.calldata);
  },

  processSignature: (signature: string) => {
    if (!signature) return [];
    return getParamsWithIds(signature);
  },

  abiDecode: (signature, calldata): IDecodedData | null => {
    try {
      const iface = new ethers.Interface([signature]);
      const func = iface.getFunction(signature);
      if (!func) {
        throw new Error("Can't get function by signature");
      }
      const decoded = iface.decodeFunctionData(func, calldata);
      const accum = ethers.AbiCoder.defaultAbiCoder().getAccumulatedAbiWords();
      set({ decodedData: { decoded, accum }, error: null });
      return { decoded, accum };
    } catch (error: any) {
      console.error("Decoding error:", error);
      set({ decodedData: null, error: `Decoding error: ${error.message}` });
      return null;
    }
  },
}));

export default useStore;
