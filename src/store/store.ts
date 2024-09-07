import { create } from "zustand";
import { ethers } from "ethers";

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
  abiDecode: (signature: string, calldata: string) => void;
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

  handleParamClick: (id, event) => {
    // Stop event propagation
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

  abiDecode: (signature, calldata) => {
    try {
      const iface = new ethers.Interface([signature]);
      const func = iface.getFunction(signature);
      if (!func) {
        throw new Error("Can't get function by signature");
      }
      const decoded = iface.decodeFunctionData(func, calldata);
      const accum = ethers.AbiCoder.defaultAbiCoder().getAccumulatedAbiWords();
      set({ decodedData: { decoded, accum }, error: null });
    } catch (error: any) {
      console.error("Decoding error:", error);
      set({ decodedData: null, error: `Decoding error: ${error.message}` });
    }
  },
}));

export default useStore;
