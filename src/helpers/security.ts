import { isHexString, Fragment } from "ethers";

export const validateFragment = (input: string): boolean => {
  const allowedChars = /^[a-zA-Z0-9_(),[\] ]*$/;
  if (!allowedChars.test(input)) {
    throw new Error("Invalid characters in function signature");
  }
  try {
    Fragment.from(input);
  } catch (e: unknown) {
    throw Error("Invalid signature");
  }
  return true;
};

export const validateHex = (input: string): boolean => {
  if (!isHexString(input)) {
    throw new Error("Invalid hexadecimal string");
  }
  return true;
};
