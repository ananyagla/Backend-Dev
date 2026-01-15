const os = require("os");
const fs = require("fs");

setInterval(function () {
  let cpu = os.cpus().length;
  let memory = os.totalmem();
  let platform = os.platform();

  let data =
    "CPU Cores: " + cpu + "\n" +
    "Total Memory: " + memory + "\n" +
    "Platform: " + platform + "\n" +
    "----------------------\n";

  fs.appendFile("systemInfo.txt", data, function (err) {
    if (err) {
      console.log("Error writing file");
    } else {
      console.log("System info logged");
    }
  });

}, 5000);
