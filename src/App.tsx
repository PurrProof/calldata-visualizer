import { useCallback, useMemo, useRef } from 'react';
import InputFields from './components/InputFields';
import Example from './components/ExampleLoader';
import ParamTree from './components/ParamTree';
import AbiWordList from './components/AbiWordList';
import { assignIdsToParams } from './helpers/params';
import { ethers } from 'ethers';

import useDecoderState from './hooks/useDecoderState';
import useAbiDecoder from './hooks/useAbiDecoder';
import useParamSelection from './hooks/useParamSelection';

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

  const { decodeData } = useAbiDecoder();
  const { selectedIds, handleParamClick, resetSelection } = useParamSelection(); // Use resetSelection

  const handleExampleLoad = useCallback(
    (newSignature: string, newCalldata: string) => {
      setSignature(newSignature);
      setCalldata(newCalldata);
      setDecodedData(null);
      setError(null);
      resetSelection();

      const result = decodeData(newSignature, newCalldata); // Decode data
      if (result) {
        setDecodedData(result);
      } else {
        setError('Decoding error');
      }
    },
    [setSignature, setCalldata, setDecodedData, setError, decodeData, resetSelection]
  );

  const handleDecodeClick = useCallback(() => {
    resetSelection(); // Clear parameter selection
    const result = decodeData(signature, calldata);
    if (result) {
      setDecodedData(result);
    } else {
      setError('Decoding error');
    }
  }, [decodeData, signature, calldata, setDecodedData, setError, resetSelection]);

  // memoize functionParams and processedParams
  const functionParams = useMemo(() => {
    if (!signature) return [];
    try {
      const iface = new ethers.Interface([signature]);
      const func = iface.getFunction('swap');
      return func ? func.inputs : [];
    } catch (error: any) {
      console.error('Error parsing function signature:', error);
      setError('Error parsing function signature: ' + error.message); // Set error if parsing fails
      return [];
    }
  }, [signature, setError]);

  const processedParams = useMemo(() => assignIdsToParams([...functionParams]), [functionParams]);

  return (
    <div>
      <h1>Decoded ABI Parameters</h1>
      <InputFields
        signature={signature}
        setSignature={setSignature}
        calldata={calldata}
        setCalldata={setCalldata}
      />
      <Example ref={exampleRef} onLoadExample={handleExampleLoad} />
      <button onClick={handleDecodeClick}>Decode Data</button>

      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}

      {decodedData && (
        <>
          <ParamTree params={processedParams} onClick={handleParamClick} selectedIds={selectedIds} />
          <AbiWordList words={decodedData.accum.words} selectedIds={selectedIds} />
        </>
      )}
    </div>
  );
};

export default App;