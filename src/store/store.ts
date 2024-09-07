import { create } from "zustand";
import type { IExample, IDecodedCalldata, IProcessedParam } from "../types";
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
  decodeCalldata: () => void;
  clearAll: () => void;
  clearDecoded: () => void;
  selectAllParams: () => void;
  deselectAllParams: () => void;

  resetSelection: () => void;
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

  clearAll: () => {
    const { setSignature, setCalldata, clearDecoded } = get();
    setSignature("");
    setCalldata("");
    clearDecoded();
  },

  clearDecoded: () => {
    const { resetSelection, setError, setDecodedData, setHoveredParam } = get();
    setError(null);
    setDecodedData(null);
    setHoveredParam(null);
    resetSelection();
  },

  // handle the decode button click
  decodeCalldata: () => {
    const { signature, calldata, clearDecoded } = get();
    clearDecoded();
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
    const { setSignature, setCalldata, decodeCalldata } = get();
    setSignature(example.signature);
    setCalldata(example.calldata);
    decodeCalldata(); // decode after loading example
  },

  selectAllParams: () => {
    const { decodedData } = get();

    // if there's no decoded data, return
    if (!decodedData?.inputsWithIds) return;

    // recursive function to collect all param ids
    const collectAllParamIds = (params: IProcessedParam[]): number[] =>
      params.flatMap((param) => [
        param.id,
        ...(param.components ? collectAllParamIds(param.components) : []),
      ]);

    set({ selectedIds: collectAllParamIds(decodedData.inputsWithIds) });
  },

  deselectAllParams: () => {
    set({ selectedIds: [] });
  },
}));

export default useStore;
