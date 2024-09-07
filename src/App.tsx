import InputFields from './components/InputFields';
import Example from './components/ExampleLoader';
import ParamGroup from './components/ParamGroup';
import AbiWordRow from './components/AbiWordRow';
import useStore from './store/store';
import { IAbiWord } from './types/abi';

const App = () => {
  const { signature, decodedData, error, processSignature, handleDecodeClick } = useStore();

  return (
    <>
      <h1>Decoded ABI Parameters</h1>
      <InputFields />
      <Example />
      <button onClick={handleDecodeClick}>Decode Data</button>

      {error && <div className={error}>{error}</div>}

      {decodedData && (
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
      )}
    </>
  );
};

export default App;
