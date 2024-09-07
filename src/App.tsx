import InputFields from './components/InputFields';
import Examples from './components/Examples';
import ParamGroup from './components/ParamGroup';
import AbiWordRow from './components/AbiWordRow';
import useStore from './store/store';
import { IAbiWord } from './types';

const App = () => {
  const { decodedData, error, decodeCalldata, clearAll, selectAllParams, deselectAllParams } = useStore();

  return (
    <>
      <h1>Decoded ABI Parameters Vizualization</h1>
      <InputFields />
      <button onClick={decodeCalldata}>Decode</button >
      <button onClick={clearAll}>Clear</button >
      <button onClick={selectAllParams}>Select All</button >
      <button onClick={deselectAllParams}>Deselect All</button >
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
