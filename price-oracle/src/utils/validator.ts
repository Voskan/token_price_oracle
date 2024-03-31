/**
 * Check if a string is a valid URL.
 * @param {string} url The URL to check.
 * @returns {boolean} Returns true if the URL is valid.
 */
const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Check if a value is a number.
 * @param {any} value The value to check.
 * @returns {boolean} Returns true if the value is a number.
 */
const isValidNumber = (value: any): boolean => {
  return typeof value === "number" && !isNaN(value);
};

/**
 * Check if a number is within a specified range.
 * @param {number} value The number to check.
 * @param {number} min The minimum value of the range.
 * @param {number} max The maximum value of the range.
 * @returns {boolean} Returns true if the number is within the range.
 */
const isInRange = (value: number, min: number, max: number): boolean => {
  return isValidNumber(value) && value >= min && value <= max;
};

export { isValidUrl, isValidNumber, isInRange };
