# ABI CallData Visualizer

![Screenshot](public/assets/calldada-visualizer.png)

## What is it?

The **ABI CallData Visualizer** is a web-based tool designed to help developers, auditors, and smart contract engineers decode and visualize calldata used in Ethereum smart contracts. It provides an intuitive graphical representation of complex calldata structures, such as arrays, tuples, and nested data types, making it easier to understand how input data is structured and encoded.

## Key Features

- **Calldata Decoding**: Input raw calldata and see it decoded into human-readable parameters.
- **Graphical Visualization**: Visual representation of calldata elements, showing offsets, lengths, and data flow.
- **Supports Nested Structures**: Handles arrays, tuples, and other complex Solidity types.
- **Function Signature Input**: Enter ABI function signatures for automatic calldata decoding.
- **Interactive**: Select, deselect, and manipulate decoded elements for closer inspection.
- **URL Sharing**: Copy a shareable URL with the current calldata and visualization state.

## Who is it for?

This tool is primarily for:

- **Blockchain Developers**: Debugging smart contract inputs and calldata.
- **Auditors**: Verifying calldata structure and contents in contract audits.
- **Web3 Engineers**: Visualizing calldata for smart contract interactions.

## How to Use

1. **Enter Function Signature**: Type or paste the Solidity function signature, e.g., `function test((bytes[])[])`.
2. **Enter Calldata**: Paste the hexadecimal calldata string in the provided field.
3. **Decode**: Click the `Decode` button to view the visual representation of the calldata.
4. **Inspect**: View offsets, counts, and other data related to the calldata structure.
5. **Share**: Use the `Copy URL` button to share the visualization with others.
