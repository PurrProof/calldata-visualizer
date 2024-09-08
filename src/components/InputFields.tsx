import useStore from "../store/store"; // Import Zustand store

const InputFields = () => {
  const { signature, setSignature, calldata, setCalldata, decodeCalldata } = useStore(
    (state) => ({
      signature: state.signature,
      setSignature: state.setSignature,
      calldata: state.calldata,
      setCalldata: state.setCalldata,
      decodeCalldata: state.decodeCalldata,
    })
  );

  return (
    <form className="calldata" onSubmit={(event) => { event.preventDefault(); decodeCalldata() }}>
      <div>
        <label htmlFor="f-sig">Function Signature:</label>
        <input
          id="f-sig"
          type="text"
          value={signature}
          onChange={(e) => setSignature(e.target.value)}
          placeholder="Enter function signature"
          style={{ width: "100%" }}
        />
      </div>
      <div>
        <label htmlFor="f-calldata">Calldata:</label>
        <textarea
          id="f-calldata"
          value={calldata}
          onChange={(e) => setCalldata(e.target.value)}
          placeholder="Enter calldata"
          rows={4}
          style={{ width: "100%" }}
        />
      </div>
    </form>
  );
};

export default InputFields;
