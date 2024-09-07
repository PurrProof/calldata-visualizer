import InputFields from './components/InputFields';
import Examples from './components/Examples';
import ParamGroup from './components/ParamGroup';
import AbiWordRow from './components/AbiWordRow';
import useStore from './store/store';
import { IAbiWord } from './types';

const App = () => {
  const { signature, decodedData, error, processSignature, decodeCalldata, clearAll } = useStore();

  return (
    <>
      <h1>Decoded ABI Parameters Vizualization</h1>
      <InputFields />
      <button onClick={decodeCalldata}>Decode</button >
      <Examples />
      <button onClick={clearAll}>Clear</button >

      {error && <div className="error">{error}</div>}

      {
        decodedData && (
          <div className="abi-decoded-container">
            <div className="abi-decoded-params">
              <ParamGroup params={processSignature(signature)} />
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
