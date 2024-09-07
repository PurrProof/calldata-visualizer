import { useEffect, useRef } from "react";
import InputFields from './components/InputFields';
import Examples from './components/Examples';
import ParamGroup from './components/ParamGroup';
import AbiWordRow from './components/AbiWordRow';
import useStore from './store/store';
import { IAbiWord } from './types';

const App = () => {
  const { decodedData, error, decodeCalldata, clearAll, selectAllParams, resetSelection, loadFromUrl } = useStore();

  // useEffect run twice in dev mode because of React.StrictMode
  const hasLoaded = useRef(false); // ref to track if effect has run
  useEffect(() => {
    if (!hasLoaded.current) {
      loadFromUrl(); // only run once
      hasLoaded.current = true; // mark as loaded
    }
  }, [loadFromUrl]);

  return (
    <>
      <h1>ABI CallData Visualizer</h1>
      <InputFields />
      <button onClick={decodeCalldata}>Decode</button >
      <button onClick={clearAll}>Clear</button >
      <button onClick={selectAllParams}>Select All</button >
      <button onClick={resetSelection}>Deselect All</button >
      <Examples />

      {error && <div className="error">{error}</div>}

      {
        decodedData && (
          <div className="abi-decoded-container">
            <div className="abi-decoded-params">
              <ParamGroup params={decodedData.inputsWithIds} />
            </div>
            <div className="abi-decoded-data">
              {Array.from(decodedData.accum.words.entries()).map(
                ([offset, word]: [number, IAbiWord]) => (
                  <AbiWordRow key={offset} word={word} offset={offset} />
                )
              )}
            </div>
          </div>
        )
      }
    </>
  );
};

export default App;
