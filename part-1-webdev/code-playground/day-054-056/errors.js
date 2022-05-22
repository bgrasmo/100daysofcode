const fs = require('fs');

function readFile() {
  try {
    const fileData = fs.readFileSync('data.json');
  } catch {
    console.log('The file read failed!');
  }
  console.log('Hi there!');
}

readFile();