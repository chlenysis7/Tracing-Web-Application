import { Environment } from "../enums";
import { INominatimAddress } from "../interfaces/mapsInterfaces";

export const generateReadableDate = (dateString: string): string => {
  return new Date(dateString).toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
  });
};

export const generateWIBDateTimeFromISO = (
  date: string | null | undefined
): string | null | undefined => {
  let offset = -25200000; // WIB
  return date
    ? new Date(new Date(date).valueOf() - offset)
        .toISOString()
        .slice(0, -1)
        .concat("+0700")
    : null;
};

export const generateISODateTimeFromWIB = (
  date: string | null | undefined
): string | null => {
  return date ? new Date(date).toISOString() : null;
};

// Use this function to log only in development/staging environment
export const Log = (message?: any, ...optionalParams: any[]) => {
  return getEnvironment() === Environment.DEV ||
    getEnvironment() === Environment.STG
    ? console.log(message, ...optionalParams)
    : null;
};

// Get current app environment
export const getEnvironment = (): Environment => {
  return process.env.REACT_APP_ENV
    ? (process.env.REACT_APP_ENV as Environment)
    : Environment.DEV; // Change to Environment.DEV when API working
};

// Add x hours to Date
export function addHours(numOfHours: number, date = new Date()) {
  date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);

  return date;
}

// Convert HSL -> HEX
export function hslToHex(h: number, s: number, l: number) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0"); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export const getUserLocationStringFromNominatimAddress = (
  address?: INominatimAddress
): string => {
  let out = "";
  for (let key in address) {
    if (key === "ISO3166-2-lvl4" || key === "country_code") continue;
    out += `${address[key]}, `;
  }
  return out.slice(0, -2);
};
