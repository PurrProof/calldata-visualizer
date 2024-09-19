import LZString from "lz-string";
import { hexlify, toBeArray } from "ethers";

export const getUrlParams = (): {
  signature: string;
  calldata: string;
} => {
  const searchParams = new URLSearchParams(window.location.search);
  const sig = searchParams.get("signature") ?? "";
  const calldata = searchParams.get("calldata") ?? "";
  const lzdata = searchParams.get("lzdata") ?? "";
  const res = { signature: sig ? decodeURIComponent(sig) : "", calldata: "" };

  try {
    if (lzdata !== "") {
      // we have compressed calldata in the url, this is priority
      res.calldata = LZString.decompressFromUint8Array(
        toBeArray(decodeURIComponent(lzdata))
      );
    } else {
      res.calldata = calldata ? decodeURIComponent(calldata) : "";
    }
    return res;
  } catch (error: unknown) {
    console.log("can't decode url parameters");
  }

  // fallback return empty parameters
  return { signature: "", calldata: "" };
};

/*
  //we don't update urls, that's design decision
  export const updateUrl = (signature: string, calldata: string): void => {
  const searchParams = new URLSearchParams();

  if (signature) searchParams.set("signature", encodeURIComponent(signature));
  if (calldata) searchParams.set("calldata", encodeURIComponent(calldata));

  const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
  window.history.pushState({}, "", newUrl); // update the URL without reloading
};*/

export const clearUrl = (): void => {
  const newUrl = window.location.pathname;
  window.history.pushState({}, "", newUrl);
};

export const generateUrl = (
  signature: string,
  calldata: string,
  format?: string
): string => {
  const baseUrl = `${window.location.origin}${window.location.pathname}`;
  const url = new URL(baseUrl);
  const params: Map<string, string> = new Map();
  // don't lz signature, there is no win in length
  params.set("signature", signature);
  if (format === "plain") {
    params.set("calldata", calldata);
  } else {
    params.set("lzdata", hexlify(LZString.compressToUint8Array(calldata)));
  }
  params.forEach((value: string, key: string) => {
    url.searchParams.set(key, encodeURIComponent(value));
  });
  return url.toString();
};
