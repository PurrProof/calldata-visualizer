import { useCallback, useMemo, useRef } from 'react';
import InputFields from './components/InputFields';
import Example from './components/ExampleLoader';
import ParamTree from './components/ParamTree';
import AbiWordRow from './components/AbiWordRow';
import getParamsWithIds from './helpers/params';
import useDecoderState from './hooks/useDecoderState';
import useAbiDecoder from './hooks/useAbiDecoder';
import useParamSelection from './hooks/useParamSelection';

import { IAbiWord } from './types/abi';

const App = () => {
  const exampleRef = useRef<any>(null);

  const {
    signature,
    setSignature,
    calldata,
    setCalldata,
    decodedData,
    setDecodedData,
    error,
    setError,
  } = useDecoderState();

  const { abiDecode } = useAbiDecoder();
  const { selectedIds, handleParamClick, resetSelection } = useParamSelection();

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

  const handleExampleLoad = useCallback(
    (newSignature: string, newCalldata: string) => {
      setSignature(newSignature);
      setCalldata(newCalldata);
      decodeAndSetData(newSignature, newCalldata);
    },
    [setSignature, setCalldata, decodeAndSetData]
  );

  const handleDecodeClick = useCallback(() => {
    decodeAndSetData(signature, calldata);
  }, [decodeAndSetData, signature, calldata]);

  const processedParams = useMemo(() => getParamsWithIds(signature), [signature]);

  return (
    <>
      <h1>Decoded ABI Parameters</h1>
      <InputFields
        signature={signature}
        setSignature={setSignature}
        calldata={calldata}
        setCalldata={setCalldata}
      />
      <Example ref={exampleRef} onLoadExample={handleExampleLoad} />
      <button onClick={handleDecodeClick}>Decode Data</button>

      {error && <div className={error}>{error}</div>}

      {
        decodedData && (
          <div className={"decoded"}>
            <ParamTree params={processedParams} onClick={handleParamClick} selectedIds={selectedIds} />
            {Array.from(decodedData.accum.words.entries() as [number, IAbiWord][]).map(
              ([offset, word]: [number, IAbiWord]) =>
                <AbiWordRow
                  key={offset}
                  word={word}
                  offset={offset}
                  selectedIds={selectedIds}
                />
            )}
          </div>
        )
      }
    </>
  );
};

export default App;
