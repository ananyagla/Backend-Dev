const fs = require("fs");
const readline = require("readline");

// Create read stream
const readStream = fs.createReadStream("server.log");

// Read line by line using stream
const rl = readline.createInterface({
  input: readStream
});

let totalLines = 0;
let errorCount = 0;
let warningCount = 0;
let infoCount = 0;

// Process each line
rl.on("line", (line) => {
  totalLines++;

  if (line.includes("ERROR")) {
    errorCount++;
  } else if (line.includes("WARNING")) {
    warningCount++;
  } else if (line.includes("INFO")) {
    infoCount++;
  }
});

// When reading is complete
rl.on("close", () => {
  const report =
    "Log File Summary\n" +
    "-----------------\n" +
    "Total Lines: " + totalLines + "\n" +
    "ERROR: " + errorCount + "\n" +
    "WARNING: " + warningCount + "\n" +
    "INFO: " + infoCount + "\n";

  fs.writeFile("summary.txt", report, (err) => {
    if (err) {
      console.log("Error in  writing summary file");
      return;
    }
    console.log("Summary report has generated");
  });
});
