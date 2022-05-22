const fs = require('fs/promises');

function readFile() {
  fs.readFile('data.txt').then((fileData) => {
    console.log('File parsing done!');
    console.log(fileData.toString());
  });
  console.log('Hi there!');
}

async function readFile2() {
  const fileData = await fs.readFile('data.txt')

  console.log('File parsing done!');
  console.log(fileData.toString());
  console.log('Hi there!');
}
// readFile();
readFile2();
