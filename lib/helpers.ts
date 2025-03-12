"use client";
import { endOfYear, startOfYear, subMonths, subYears } from "date-fns";
import {
  SETUP_TOKEN_CACHE_NAME,
  SETUP_REFETCH_TOKEN_CACHE_NAME,
  REFETCH_TOKEN_CACHE_NAME,
  TOKEN_CACHE_NAME,
  LOGGEDIN_STATUS,
  NOT_UPLOAD_SKIPPED,
} from "./common";

export const addOnboardingData = (
  access_token: string,
  refresh_token: string
) => {
  // set token refetech
  localStorage.setItem(SETUP_REFETCH_TOKEN_CACHE_NAME, refresh_token);
  // set token
  localStorage.setItem(SETUP_TOKEN_CACHE_NAME, access_token);
};

export const removeOnboardingData = () => {
  // console.log("hello" ,SETUP_REFETCH_TOKEN_CACHE_NAME, SETUP_TOKEN_CACHE_NAME  )
  localStorage.removeItem(SETUP_REFETCH_TOKEN_CACHE_NAME);
  localStorage.removeItem(SETUP_TOKEN_CACHE_NAME);
  localStorage.removeItem("name");
};

export const removeLoginData = () => {
  localStorage.removeItem(REFETCH_TOKEN_CACHE_NAME);
  // set token
  localStorage.removeItem(TOKEN_CACHE_NAME);
  // add login status
  localStorage.removeItem(LOGGEDIN_STATUS);
  // set all work space

  removeOnboardingData();

  localStorage.removeItem(NOT_UPLOAD_SKIPPED);
};

export const addLoginData = (token: string, loginstatus: any) => {
  // set token
  localStorage.setItem(TOKEN_CACHE_NAME, token);
  // add login status
  localStorage.setItem(LOGGEDIN_STATUS, loginstatus);
  // set all work space
  // console.log('..../', available_workspace);
};

export const getLoginData = (value: string) => {
  // get login status
  if (value === LOGGEDIN_STATUS) {
    return localStorage.getItem(LOGGEDIN_STATUS);
  } else if (value === REFETCH_TOKEN_CACHE_NAME) {
    return localStorage.getItem(REFETCH_TOKEN_CACHE_NAME);
  } else if (value === TOKEN_CACHE_NAME) {
    return localStorage.getItem(TOKEN_CACHE_NAME);
  }
};

export const generateHmacSHA256 = (
  message: string | undefined,
  secret: string | undefined
) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const key = encoder.encode(secret);

  return window.crypto.subtle
    .importKey("raw", key, { name: "HMAC", hash: { name: "SHA-256" } }, true, [
      "sign",
    ])
    .then((cryptoKey) => {
      return window.crypto.subtle.sign("HMAC", cryptoKey, data);
    })
    .then((signature) => {
      const arrayBuffer = new Uint8Array(signature);
      const hexString = Array.from(arrayBuffer, (byte) =>
        byte.toString(16).padStart(2, "0")
      ).join("");
      return hexString;
    });
};

export const getInitials = (fullName: string) => {
  const names = fullName?.split(" ");
  const initials = names?.map((name) => name.charAt(0));
  return initials?.slice(0, 2)?.join("")?.toUpperCase();
};

// Number to Convert strings and thousands

export function formatNumber(number: number) {
  if (isNaN(number)) {
    return 0;
  }
  if (number === 0 || number < 1) {
    return number?.toFixed(2);
  }
  const suffixes = ["", "k", "M"];
  const suffixIndex = Math.floor(Math.log10(number) / 3);

  if (suffixIndex === 0) {
    // Numbers less than 1000
    return number.toFixed(2).toString();
  } else {
    // Numbers greater than or equal to 1000
    const suffix = suffixes[suffixIndex];
    const scaledNumber = number / Math.pow(1000, suffixIndex);
    const roundedNumber = Math.round(scaledNumber * 10) / 10;

    return roundedNumber.toString() + suffix;
  }
}

// Format Numbers with comma
export function formatNumberCommas(number: number) {
  if (isNaN(number)) {
    return 0;
  }
  if (number === 0 || number < 1) {
    return number;
  }
  const suffixes = ["", "K", "M", "B", "T"];
  const suffixIndex = Math.floor(Math.log10(number) / 3);
  if (suffixIndex < 1) {
    // Numbers less than 1000
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    // Numbers greater than or equal to 1000
    const suffix = suffixes[suffixIndex];
    const scaledNumber = number / Math.pow(1000, suffixIndex);

    // Format the number with commas for thousands
    const formattedNumber = scaledNumber.toLocaleString(undefined, {
      maximumFractionDigits: 1,
    });

    return formattedNumber + suffix;
  }
}

//file size

export const calcSize = (size: number) => {
  return size < 1000000
    ? `${Math.floor(size / 1000)} KB`
    : `${Math.floor(size / 1000000)} MB`;
};

//Date Converter

export function dateReverse(date: string) {
  if (date && typeof date === "string") {
    const parts = date.split("-");
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }

  return "";
}

export function reverseElementQueryfilterMapper(queryString: string) {
  queryString = removePageQueryParam(queryString);
  const reverseTypeMappings: any = {
    user: { type: "users", label: "value" },
    artists: { type: "artists", label: "value" },
    upc: { type: "products", label: "upc" },
    isrc: { type: "assets", label: "isrc" },
    dsp: { type: "dsps", label: "value" },
    country: { type: "country", label: "value" },
    aggregator: { type: "aggregators", label: "value" },
  };

  const [key, encodedValues] = queryString.split("=");
  if (!key || !encodedValues) return [];

  const mapping = reverseTypeMappings[key];
  if (!mapping) return [];
  const decodedValues = decodeURIComponent(encodedValues);
  const valueArray = decodedValues.split(",");
  return {
    valueArray,
    type: mapping?.type,
  };
}

export function capitalize(str: string) {
  return str?.charAt(0)?.toUpperCase() + str?.slice(1);
}

export const removePageQueryParam = (queryString: string) => {
  const params = queryString.split("&").map((param) => param.split("="));
  const filteredParams = params.filter(([key, value]) => key !== "page");

  const updatedQueryString = filteredParams
    .map((param: any[]) => param.join("="))
    .join("&");

  return updatedQueryString;
};

export const truncateText = (filename: string, maxLength: number) => {
  if (filename?.length <= maxLength) {
    return filename;
  }
  return filename?.slice(0, maxLength) + "...";
};

export const calculateDateRange = (val: any) => {
  const today = new Date();
  let fromDate,
    toDate = today;

  switch (val) {
    case "Last 12 months":
      fromDate = subMonths(today, 12);
      break;
    case "Last 6 Months":
      fromDate = subMonths(today, 6);
      break;
    case "Last 3 Months":
      fromDate = subMonths(today, 3);
      break;
    case "This Year":
      fromDate = startOfYear(today);
      break;
    case "Last Year":
      fromDate = startOfYear(subYears(today, 1));
      toDate = endOfYear(subYears(today, 1));
      break;
    default:
      return null;
  }

  return { from: fromDate, to: toDate };
};

export function elementQueryfilterMapper(key: string, value: string[]): string {
  if (key && value && value.length > 0) {
    // Join the array elements into a comma-separated string
    const values = value.join(",");
    return `${key}=${values}`;
  }
  return "";
}

export const arraysEqual = (arr1: any[], arr2: any[]) => {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((item, index) => item.value === arr2[index].value);
};

export function isObjectEmpty(obj: {}) {
  return Object.keys(obj).length === 0;
}

export const mockSearch = async (
  value: string,
  data: any[]
): Promise<any[]> => {
  return new Promise((resolve) => {
    console.log({ data });
    setTimeout(() => {
      const res = data.filter((option: { value: string }) => {
        const lowerCaseOptions = option.value.toLowerCase();
        return lowerCaseOptions.includes(value.toLowerCase());
      });
      resolve(res);
    }, 1000);
  });
};

export const mockDownloadSearch = async (
  value: string,
  data: any[]
): Promise<any[]> => {
  return new Promise((resolve) => {
    console.log({ data });
    setTimeout(() => {
      const res = data.filter((option: { label: string }) => {
        const lowerCaseOptions = option.label.toLowerCase();
        return lowerCaseOptions.includes(value.toLowerCase());
      });
      resolve(res);
    }, 1000);
  });
};

import { parse, format } from "date-fns";

/**
 * Converts a date string in the format
 * "EEE MMM dd yyyy HH:mm:ss 'GMT'xxx '(West Africa Standard Time)'"
 * to "yyyy-MM-dd".
 * @param {string} date - The URL-encoded date string.
 * @returns {string} - The formatted date as "yyyy-MM-dd".
 */
export const formatDateString = (date: any) => {
  // Decode the URL-encoded string
  const decodedDateString = decodeURIComponent(date);

  // Create a Date object
  const dateObject = new Date(decodedDateString);

  const formattedDate = new Date(
    dateObject.getTime() - dateObject.getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0];

  return formattedDate;
};
