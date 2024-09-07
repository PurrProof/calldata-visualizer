// get query parameters from URL
export const getUrlParams = (): {
  signature: string | null;
  calldata: string | null;
} => {
  const searchParams = new URLSearchParams(window.location.search);
  return {
    signature: searchParams.get("signature"),
    calldata: searchParams.get("calldata"),
  };
};

// update query parameters in the URL without reloading the page
export const updateUrlParams = (signature: string, calldata: string): void => {
  const searchParams = new URLSearchParams();

  if (signature) searchParams.set("signature", encodeURIComponent(signature));
  if (calldata) searchParams.set("calldata", encodeURIComponent(calldata));

  const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
  window.history.pushState({}, "", newUrl); // Update the URL without reloading
};

// clear query parameters from the URL
export const clearUrlParams = (): void => {
  const newUrl = window.location.pathname;
  window.history.pushState({}, "", newUrl);
};
