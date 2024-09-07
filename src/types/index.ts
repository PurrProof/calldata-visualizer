export interface IAbiWord {
  data: Uint8Array;
  coders: number[];
  isIndex?: boolean;
}
export interface IExample {
  id: number;
  name: string;
  signature: string;
  calldata: string;
}

export interface IProcessedParam {
  id: number;
  name?: string;
  type: string;
  components?: IProcessedParam[]; // Recursive type for nested components
}

export interface IDecodedCalldata {
  decoded: any;
  accum: {
    words: Map<number, any>;
  };
  inputsWithIds: IProcessedParam[];
}
