const fetch = require("node-fetch");

function fetchdata(url) {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });
}

function getDirectory(dirName) {
  return fetchJSON(`http://localhost:3000/${dirName}`);
}

function printFilename(fileName) {
  console.log(fileName);
}

function processItems(items) {
  items.forEach((item) => {
    if (item.isDir === true) {
      getDirectory(item.name)
        .then((data) => {
          data.files.forEach((file) => {
            printFilename(file.name);
          });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      printFilename(item.name);
    }
  });
}

fetchdata("http://localhost:3000/")
  .then((data) => {
    processItems(data.items);
  })
  .catch((error) => {
    console.error(error);
  });
