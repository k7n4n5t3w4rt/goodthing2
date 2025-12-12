/**
 * Generate a numeric seed from a string.
 * @param {string} [seedString="NOT VERY RANDOM"]
 * @returns {number}
 */
export default (seedString = "NOT VERY RANDOM") => {
  return parseInt(
    seedString.split("").reduce((acc, letter) => {
      const letterCode = letter.toLowerCase().charCodeAt(0) - 97 + 1;
      return acc + letterCode.toString();
    }, ""),
  );
};
