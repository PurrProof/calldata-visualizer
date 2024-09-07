import { create } from "zustand";
import getParamsWithIds from "../helpers/params";
import type { IExample, IDecodedCalldata } from "../types";
import abiDecodeCalldata from "../helpers/abi";

// zustand store interface
interface StoreState {
  signature: string;
  calldata: string;
  decodedData: IDecodedCalldata | null;
  error: string | null;
  selectedIds: number[];
  hoveredParamId: number | null;

  setSignature: (signature: string) => void;
  setCalldata: (calldata: string) => void;
  setDecodedData: (decodedData: IDecodedCalldata | null) => void;
  setError: (error: string | null) => void;
  setHoveredParam: (id: number | null) => void;

  handleParamClick: (id: number) => void;
  handleDecodeClick: () => void;

  resetSelection: () => void;
  processSignature: (signature: string) => any[];
  loadExample: (example: IExample) => void;
}

// zustand store
const useStore = create<StoreState>((set, get) => ({
  signature: "",
  calldata: "",
  decodedData: null,
  error: null,
  selectedIds: [],
  hoveredParamId: null, // Initialize hover state

  // setters
  setSignature: (signature) => set({ signature }),
  setCalldata: (calldata) => set({ calldata }),
  setDecodedData: (decodedData) => set({ decodedData }),
  setError: (error) => set({ error }),
  setHoveredParam: (id) => set({ hoveredParamId: id }),

  // handle parameter click
  handleParamClick: (id) => {
    const { selectedIds } = get();
    const newSelectedIds = selectedIds.includes(id)
      ? selectedIds.filter((selectedId) => selectedId !== id)
      : [...selectedIds, id];

    set({ selectedIds: newSelectedIds });
  },

  // handle the decode button click
  handleDecodeClick: () => {
    const { signature, calldata, resetSelection, setError } = get();
    resetSelection();
    setError(null);
    try {
      const result: IDecodedCalldata = abiDecodeCalldata(signature, calldata);
      set({ decodedData: result });
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "unknown error";
      set({ error: `Decoding error: ${msg}` });
    }
  },

  // reset the selection state
  resetSelection: () => set({ selectedIds: [] }),

  // load example data into state
  loadExample: (example: IExample) => {
    const { setSignature, setCalldata, handleDecodeClick } = get();
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
