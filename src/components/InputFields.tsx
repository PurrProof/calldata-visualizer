import useStore from "../store/store"; // Import Zustand store

const InputFields = () => {
  // Fetch state and setters from Zustand store
  const { signature, setSignature, calldata, setCalldata } = useStore();

  return (
    <form className="calldata">
      <div>
        <label>Function Signature:</label>
        <input
          type="text"
          value={signature}
          onChange={(e) => setSignature(e.target.value)}
          placeholder="Enter function signature"
          style={{ width: "100%" }}
        />
      </div>
      <div>
        <label>Calldata:</label>
        <textarea
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
