import glob from "glob";
import { exec } from "child_process";

let counter = 0;

const cleanInt = (getVar) => Math.abs(Math.floor(parseFloat(getVar)) || 0);

const experimentalWarningFilter = (currentElement) =>
  currentElement.indexOf(
    "ExperimentalWarning: The ESM module loader is experimental",
  ) === -1 && currentElement !== "";

const processExecMessages = (resolve) => (e, stdout, stderr) => {
  if (e) {
    ++counter;
    resolve([`${e.message}...${stderr}`]);
    return;
  }
  let messageString = stdout.trim();
  if (stderr) {
    const notOks = stderr.split(/\r?\n/) || [];
    const trimmedNotOks = notOks.map((currentElement) => currentElement.trim());
    // filter out Node ESM experimental warnings
    const filtered = trimmedNotOks.filter(experimentalWarningFilter);
    if (filtered.length) {
      messageString += " - " + filtered.join(" ~ ");
    }
  }
  const messages = messageString.split(/\r?\n/).filter((s) => s !== "") || [];
  resolve(messages);
};

const execFactory = async (e, testies) => {
  // Sort the test files to ensure a consistent execution order.
  testies.sort();

  let faucetMessages = [];
  for (const testy of testies) {
    const execPromise = new Promise((resolve) => {
      exec(`node ${testy}`, processExecMessages(resolve));
    });
    const messages = await execPromise;
    faucetMessages = [...faucetMessages, ...messages];
  }

  // Log this out for the faucet reporter
  console.log(`1..${faucetMessages.length}`);
  faucetMessages
    .sort((a, b) => {
      // faucet needs the messages to be sorted by test number
      const aNum = cleanInt(a.split(" ")[1]);
      const bNum = cleanInt(b.split(" ")[1]);
      if (aNum < bNum) return -1;
      if (aNum > bNum) return 1;
      return 0;
    })
    .forEach((message) => {
      // Log this out for the faucet reporter
      console.log(message);
    });
};

glob("**/*.testy.js", execFactory);
