import React from "react";

interface IInputFieldsProps {
  signature: string;
  setSignature: (value: string) => void;
  calldata: string;
  setCalldata: (value: string) => void;
}

const InputFields = ({
  signature,
  setSignature,
  calldata,
  setCalldata,
}: IInputFieldsProps) => (
  <div>
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
  </div>
);

export default InputFields;
