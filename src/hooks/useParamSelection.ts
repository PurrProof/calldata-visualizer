import { useState } from "react";

interface IUseParamSelection {
  selectedIds: number[];
  handleParamClick: (id: number) => void;
  resetSelection: () => void; // New function to reset the selection
}

const useParamSelection = (): IUseParamSelection => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleParamClick = (id: number) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    );
  };

  // Function to reset the selected IDs
  const resetSelection = () => {
    setSelectedIds([]);
  };

  return { selectedIds, handleParamClick, resetSelection };
};

export default useParamSelection;
