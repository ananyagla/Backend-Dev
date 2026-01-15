const fs = require("fs");


fs.readFile("file1.txt", "utf8", function (err, data) {
  if (err) {
    console.log("Error");
    return;
  }

  let words = data.split(" ");
  let count = words.length;

  fs.writeFile("output.txt", count.toString(), function (err) {
    if (err) {
      console.log("Error");
    } else {
      console.log("Done");
    }
  });
});

