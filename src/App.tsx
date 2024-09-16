import { useEffect, useRef } from "react";
import InputFields from './components/InputFields';
import Examples from './components/Examples';
import ParamGroup from './components/ParamGroup';
import AbiWordRow from './components/AbiWordRow';
import CopyUrlButton from './components/CopyUrlButton';
import Links from './components/Links';
import Footer from './components/Footer';
import useStore from './store/store';
import type { AbiWord } from 'ethers';

const App = () => {
  const {
    decodedData,
    error,
    decodeCalldata,
    clearAll,
    selectAllParams,
    resetSelection,
    loadFromUrl
  } = useStore((state) => ({
    decodedData: state.decodedData,
    error: state.error,
    decodeCalldata: state.decodeCalldata,
    clearAll: state.clearAll,
    selectAllParams: state.selectAllParams,
    resetSelection: state.resetSelection,
    loadFromUrl: state.loadFromUrl,
  }));

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
      <main>
        <h1>ABI CallData Visualizer / Decoder</h1>
        <Links />
        <Examples />
        <InputFields />
        <button onClick={decodeCalldata}>Decode</button >
        <button onClick={clearAll}>Clear</button >
        <button onClick={selectAllParams}>Select All</button >
        <button onClick={resetSelection}>Deselect All</button >
        <CopyUrlButton />

        {error && <div className="error">{error}</div>}

        {
          decodedData && (
            <div className="abi-decoded-container">
              <div className="abi-decoded-params">
                <ParamGroup nodes={decodedData.accum.codersTree.children} />
              </div>
              <div className="abi-decoded-data">
                {Array.from(decodedData.accum.words.entries()).map(
                  ([offset, word]: [number, AbiWord]) => (
                    <AbiWordRow key={offset} word={word} offset={offset} />
                  )
                )}
              </div>
            </div>
          )
        }
      </main>
      <Footer />
    </>
  );
};

export default App;
