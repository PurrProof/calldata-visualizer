import { useCallback, useMemo, useRef } from 'react';
import InputFields from './components/InputFields';
import Example from './components/ExampleLoader';
import ParamGroup from './components/ParamGroup';
import AbiWordRow from './components/AbiWordRow';
import getParamsWithIds from './helpers/params';
import useAbiDecoder from './hooks/useAbiDecoder';
import useStore from './store/store';

import { IAbiWord } from './types/abi';

const App = () => {
  const exampleRef = useRef<any>(null);

  // Zustand store hooks
  const {
    signature,
    calldata,
    decodedData,
    setDecodedData,
    error,
    setError,
    resetSelection,
  } = useStore();

  const { abiDecode } = useAbiDecoder();

  const decodeAndSetData = useCallback(
    (signatureToDecode: string, calldataToDecode: string) => {
      resetSelection();
      setDecodedData(null);
      setError(null);
      const result = abiDecode(signatureToDecode, calldataToDecode); // Decode data
      if (result) {
        setDecodedData(result);
      } else {
        setError('Decoding error');
      }
    },
    [abiDecode, setDecodedData, setError, resetSelection]
  );

  const handleDecodeClick = useCallback(() => {
    decodeAndSetData(signature, calldata);
  }, [decodeAndSetData, signature, calldata]);

  const processedParams = useMemo(() => getParamsWithIds(signature), [signature]);

  return (
    <>
      <h1>Decoded ABI Parameters</h1>
      <InputFields />
      <Example ref={exampleRef} />
      <button onClick={handleDecodeClick}>Decode Data</button>

      {error && <div className={error}>{error}</div>}

      {decodedData && (
        <div className="abi-decoded-container">
          <div className="abi-decoded-params">
            <ParamGroup params={processedParams} />
          </div>
          <div className="abi-decoded-data">
            {Array.from(decodedData.accum.words.entries() as [number, IAbiWord][]).map(
              ([offset, word]: [number, IAbiWord]) =>
                <AbiWordRow
                  key={offset}
                  word={word}
                  offset={offset}
                />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default App;
