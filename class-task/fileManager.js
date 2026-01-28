const fs = require("fs");

const command = process.argv[2];
const file1 = process.argv[3];
const file2 = process.argv[4];

// READ FILE
if (command === "read") {
  fs.readFile(file1, "utf8", function (err, data) {
    if (err) {
      console.log("Error in reading file");
      return;
    }
    console.log(data);
  });
}

// WRITE FILE
else if (command === "write") {
  fs.writeFile(file1, file2, function (err) {
    if (err) {
      console.log("Error in writing file");
      return;
    }
    console.log("File is  written");
  });
}

// APPEND FILE
else if (command === "append") {
  fs.appendFile(file1, file2, function (err) {
    if (err) {
      console.log("Error in appending file");
      return;
    }
    console.log("Content is appended");
  });
}

// COPY FILE
else if (command === "copy") {
  fs.copyFile(file1, file2, function (err) {
    if (err) {
      console.log("Error in copying file");
      return;
    }
    console.log("File is copied");
  });
}

// DELETE FILE
else if (command === "delete") {
  fs.unlink(file1, function (err) {
    if (err) {
      console.log("Error in deleting file");
      return;
    }
    console.log("File is deleted");
  });
}

// LIST DIRECTORY
else if (command === "list") {
  fs.readdir(file1, function (err, files) {
    if (err) {
      console.log("Error in reading directory");
      return;
    }
    for (let i = 0; i < files.length; i++) {
      console.log(files[i]);
    }
  });
}

// INVALID COMMAND
else {
  console.log("Invalid command");
}
