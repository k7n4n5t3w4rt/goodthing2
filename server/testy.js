import shouldFunction from "should/as-function.js";
import fs from "fs";

export { shouldFunction as should };

/**
 * @param {string} message
 * @param {Function} testFunction
 * @param {"skip"|boolean} [skip=false]
 */
export const test = (message, testFunction, skip = false) => {
  if (skip !== "skip") {
    try {
      testFunction();
      console.log("ok - " + message, ":)");
    } catch (e) {
      console.log("not ok - " + message, ":(");
      console.error(e.message);
    }
  }
};

/**
 * @param {string} message
 * @param {(arg:any) => Promise<any>} testFunction
 * @param {"skip"|boolean} [skip=false]
 */
export const testPromise = (message, testFunction, skip = false) => {
  if (skip !== "skip") {
    testFunction()
      .then(() => {
        console.log("ok - " + message, ":)");
      })
      .catch((e) => {
        console.log("not ok - " + message, ":(");
        console.error(e.message);
      });
  }
};
