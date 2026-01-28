const fs = require("fs");

// Predefined answers (index-based)
const answers = [

  "Synchronous file operations stop the program until the file task is finished, which can slow things down. Asynchronous operations run in the background, so the program can keep working while the file is being processed.",

  "File streams are useful when dealing with large files because they read and write data little by little instead of loading everything into memory at once, which makes the application more efficient.",

  "The utf8 encoding is used when we want to read or write text in a readable format. If utf8 is not specified, Node.js returns the file data as a buffer instead of plain text.",

  "Some common file system errors are ENOENT when a file does not exist, EACCES when permission is denied, EISDIR when a directory is accessed instead of a file, and EPERM when an operation is not allowed.",

  "To safely delete a directory, all files inside it should be removed first. Once the directory is empty, it can be deleted without causing errors.",

  "Piping in streams allows data to flow directly from one stream to another. For example, data can be read from one file and written to another without manually handling each chunk.",

  "Error handling in file operations is important because it prevents the application from crashing and helps identify problems like missing files, permission issues, or storage errors.",

  "The writeFile method replaces the existing content of a file, while the appendFile method adds new data at the end of the file without removing what is already there."


];

//Read questions from file
fs.readFile("questions.txt", "utf8", (err, data) => {
  if (err) {
    console.log("Error reading questions file");
    return;
  }

  const questions = data.split("\n").filter(q => q.trim() !== "");

  //Append question and its answer
  questions.forEach((question, index) => {
    fs.appendFile(
      "finalAnswer.txt",
      question + "\nAnswer: " + answers[index] + "\n\n",
      (err) => {
        if (err) {
          console.log("Error writing answer");
        }
      }
    );
  });

  console.log("Questions and answers written successfully");
});
