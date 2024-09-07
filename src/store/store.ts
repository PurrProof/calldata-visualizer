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

// zustand store interface
interface StoreState {
  signature: string;
  calldata: string;
  decodedData: IDecodedData | null;
  error: string | null;
  selectedIds: number[];
  setSignature: (signature: string) => void;
  setCalldata: (calldata: string) => void;
  setDecodedData: (decodedData: IDecodedData | null) => void;
  setError: (error: string | null) => void;
  handleParamClick: (
    id: number,
    event?: React.MouseEvent<HTMLDivElement>
  ) => void;
  resetSelection: () => void;
  abiDecode: (signature: string, calldata: string) => IDecodedData | null;
  processSignature: (signature: string) => any[];
  handleDecodeClick: () => void;
  loadExample: (example: IExample) => void;
}

// zustand store
const useStore = create<StoreState>((set, get) => ({
  signature: "",
  calldata: "",
  decodedData: null,
  error: null,
  selectedIds: [],

  // setters for state
  setSignature: (signature) => set({ signature }),
  setCalldata: (calldata) => set({ calldata }),
  setDecodedData: (decodedData) => set({ decodedData }),
  setError: (error) => set({ error }),

  // decode calldata based on the provided signature
  abiDecode: (signature, calldata): IDecodedData | null => {
    try {
      const iface = new ethers.Interface([signature]);
      const func = iface.getFunction(signature);
      if (!func) throw new Error("Can't get function by signature");

      const decoded = iface.decodeFunctionData(func, calldata);
      const accum = ethers.AbiCoder.defaultAbiCoder().getAccumulatedAbiWords();

      return { decoded, accum };
    } catch (error: any) {
      console.error("Decoding error:", error);
      set({ error: `Decoding error: ${error.message}` });
      return null;
    }
  },

  // handle the decode button click
  handleDecodeClick: () => {
    const { signature, calldata, abiDecode } = get();
    const result = abiDecode(signature, calldata);
    set({ decodedData: result || null });
  },

  // handle parameter click, optionally prevent event propagation
  handleParamClick: (id, event) => {
    event?.stopPropagation();

    const { selectedIds } = get();
    const newSelectedIds = selectedIds.includes(id)
      ? selectedIds.filter((selectedId) => selectedId !== id)
      : [...selectedIds, id];

    set({ selectedIds: newSelectedIds });
  },

  // reset the selection state
  resetSelection: () => set({ selectedIds: [] }),

  // load example data into state
  loadExample: (example: IExample) => {
    const { setSignature, setCalldata, resetSelection, handleDecodeClick } =
      get();
    resetSelection();
    setSignature(example.signature);
    setCalldata(example.calldata);
    handleDecodeClick(); // decode after loading example
  },

  // process the signature and extract parameter ids
  processSignature: (signature: string) => {
    if (!signature) return [];
    return getParamsWithIds(signature);
  },
}));

export default useStore;
