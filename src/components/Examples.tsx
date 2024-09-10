import useStore from '../store/store';
import type { IExample } from '../types';

const examples: IExample[] = [
  {
    id: 1,
    name: "Tuple1",
    signature:
      "function swap(uint256 A,(uint256,bytes,uint256),(uint256,bytes,bytes,uint256),uint256)",
    calldata:
      "0xd2f393e7" +
      "0000000000000000000000000000000000000000000000000000000000000001" +
      "0000000000000000000000000000000000000000000000000000000000000080" +
      "0000000000000000000000000000000000000000000000000000000000000120" +
      "0000000000000000000000000000000000000000000000000000000000000006" +
      "0000000000000000000000000000000000000000000000000000000000000002" +
      "0000000000000000000000000000000000000000000000000000000000000060" +
      "0000000000000000000000000000000000000000000000000000000000000003" +
      "0000000000000000000000000000000000000000000000000000000000000003" +
      "1111110000000000000000000000000000000000000000000000000000000000" +
      "0000000000000000000000000000000000000000000000000000000000000004" +
      "0000000000000000000000000000000000000000000000000000000000000080" +
      "00000000000000000000000000000000000000000000000000000000000000c0" +
      "0000000000000000000000000000000000000000000000000000000000000005" +
      "0000000000000000000000000000000000000000000000000000000000000003" +
      "2222220000000000000000000000000000000000000000000000000000000000" +
      "0000000000000000000000000000000000000000000000000000000000000003" +
      "3333330000000000000000000000000000000000000000000000000000000000",
  },
  {
    //https://medium.com/@ljmanini/abi-encoding-deep-dive-fbb750facea9
    id: 2,
    name: "Tuple2",
    signature:
      "function swap((bytes32,uint8,address,address,uint256,bytes), (address,bool,address,bool), uint256, uint256)",
    calldata:
      "0x52bbbe2900000000000000000000000000000000000000000000000000000000000000e00000000000000000000000008d7e58c0ebf988dbb31a993696286106964dd4f400000000000000000000000000000000000000000000000000000000000000000000000000000000000000008d7e58c0ebf988dbb31a993696286106964dd4f400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000b3a7f984c82f6ffa3d428ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff929a9b6d40e4723f690db77a7ebb65d3254be1e00002000000000000000004d000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000677d4fbbcdd9093d725b0042081ab0b67c63d12100000000000000000000000000000000000000000000000006f05b59d3b2000000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000000",
  },
  {
    id: 3,
    name: "test(uint256[3],address[2])",
    signature: "function test(uint256[3],address[2])",
    calldata: "0x66c8adc4000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000003000000000000000000000000abcd1234567890abcdef1234567890abcdef12340000000000000000000000001234567890abcdef1234567890abcdef12345678"
  },
  {
    id: 4,
    name: "test(uint256[3][])",
    signature: "function test(uint256[3][])",
    calldata: "0xe5f7fd4700000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000050000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000700000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000009"
  },
  {
    id: 5,
    name: "test(uint256[][3])",
    signature: "function test(uint256[][3])",
    calldata: "0xba6a2b690000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000140000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000500000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000700000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000009"
  },
  {
    id: 6,
    name: "test((bytes[])[])",
    signature: "function test((bytes[])[])",
    calldata: "0xcde4bbac00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000001400000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000211110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002222200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000000233330000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002444400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000025555000000000000000000000000000000000000000000000000000000000000"
  },
  {
    id: 7,
    name: "test(bytes[2])",
    signature: "function test(bytes[2])",
    calldata: "0x5ff931b90000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000004011111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111000000000000000000000000000000000000000000000000000000000000004022222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222"
  },
];

const Examples = () => {
  const loadExample = useStore((state) => state.loadExample)

  return (
    <div className="examples">Examples:
      {examples.map((example: IExample) => (
        <button key={example.id} onClick={() => loadExample(example)}>{example.name}</button>
      ))}
    </div>
  );
};

export default Examples;
