export const getUrlParams = (): {
  signature: string;
  calldata: string;
} => {
  const searchParams = new URLSearchParams(window.location.search);
  const sig = searchParams.get("signature");
  const data = searchParams.get("calldata");
  return {
    signature: sig ? decodeURIComponent(sig) : "",
    calldata: data ? decodeURIComponent(data) : "",
  };
};

export const updateUrlParams = (signature: string, calldata: string): void => {
  const searchParams = new URLSearchParams();

  if (signature) searchParams.set("signature", encodeURIComponent(signature));
  if (calldata) searchParams.set("calldata", encodeURIComponent(calldata));

  const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
  window.history.pushState({}, "", newUrl); // update the URL without reloading
};

// clear query parameters from the URL
export const clearUrlParams = (): void => {
  const newUrl = window.location.pathname;
  window.history.pushState({}, "", newUrl);
};
