import { create } from "zustand";
import type { IExample, IDecodedCalldata } from "../types";
import abiDecodeCalldata from "../helpers/abi";
import { getUrlParams, clearUrl } from "../helpers/url";
import { validateHex, validateFragment } from "../helpers/security";

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
  validateInputs: (signature: string, calldata: string) => boolean;

  resetSelection: () => void;
  loadExample: (example: IExample) => void;
  loadFromUrl: () => void;
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
    const {
      signature,
      calldata,
      clearDecoded,
      selectAllParams,
      setError,
      setDecodedData,
      validateInputs,
    } = get();
    clearDecoded();

    if (!validateInputs(signature, calldata)) {
      return;
    }

    try {
      const fragment = signature.startsWith("function ")
        ? signature
        : `function ${signature}`;
      const result: IDecodedCalldata = abiDecodeCalldata(fragment, calldata);
      setDecodedData(result);
      selectAllParams();
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "unknown error");
    }
  },

  // reset the selection state
  resetSelection: () => set({ selectedIds: [] }),

  selectAllParams: () => {
    const { decodedData } = get();
    set({
      selectedIds: Array.from(
        { length: decodedData?.accum.coders.length ?? 0 },
        (_, index) => index
      ),
    });
  },

  validateInputs: (signature: string, calldata: string): boolean => {
    const { setError } = get();
    if (signature === "" || calldata === "") {
      setError(signature === "" ? "Empty calldata." : "Empty signature.");
      return false;
    }

    try {
      validateHex(calldata);
      const fragment = signature.startsWith("function ")
        ? signature
        : `function ${signature}`;
      validateFragment(fragment);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Invalid input.");
      return false;
    }

    return true;
  },

  loadExample: (example: IExample) => {
    const { setSignature, setCalldata, decodeCalldata, clearAll } = get();

    clearAll();

    // schedule the loading and decoding of the new example in the next tick
    setTimeout(() => {
      setSignature(example.signature);
      setCalldata(example.calldata);
      decodeCalldata();
    }, 0);
  },

  loadFromUrl: () => {
    const {
      decodeCalldata,
      setSignature,
      setCalldata,
      clearAll,
      validateInputs,
    } = get();

    clearAll();

    const { signature, calldata } = getUrlParams();

    // design decision is don't keep url
    clearUrl();

    if (
      (signature === "" && calldata === "") || // getUrlParams() may return empty parameters in case of some problems
      !validateInputs(signature, calldata) // pre-validate here, don't allow invalid values from url
    ) {
      return;
    }

    setSignature(signature);
    setCalldata(calldata);
    decodeCalldata();
  },
}));

export default useStore;
