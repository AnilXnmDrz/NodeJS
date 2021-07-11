const fs = require("fs");
const chalk = require("chalk");

const addNote = function (title, body) {
  const data = loadData();
const dub=data.filter(function (data){return data.title===title})
if (dub.length===0){

    data.push({
        title: title,
        body: body,
      });
      saveData(data);
} else{
    console.log(chalk.inverse.redBright('note already  exists'))
} 
};

const saveData = function (data) {
  // console.log("data",data);
  fs.writeFileSync("notes.json", JSON.stringify(data));
};

const getNote = function () {
  console.log(loadData());
};
const loadData = function () {
  try {
    const data = fs.readFileSync("notes.json");
    return JSON.parse(data.toString());
  } catch (error) {
    return [];
  }
};

const deleteNote = function (title) {
  const data = loadData();
  let found = false;
  for (let i in data) {
    if (data[i].title == title) {
      data.splice(i, 1);
      console.log(chalk.greenBright.inverse(">note removed"));
      found = true;
    }
  }
  if (found == false) {
    console.log(chalk.red.inverse(">note not found"));
  }

  saveData(data);
};

module.exports = {
  getNote: getNote,
  addNote: addNote,
  deleteNote: deleteNote,
};
