const fs = require("fs");

const chalk = require("chalk");
/**
 * add function to add notes
 * @param title title of note  
 * @param  body short desc about note 
 */
const addNote = function (title, body) {
  const data = loadData();
  const dub = data.filter((data) => data.title === title);
  if (dub.length === 0) {
    data.push({
      title: title,
      body: body,
    });
    saveData(data);
  } else {
    console.log(chalk.inverse.redBright("note already  exists"));
  }
};

const saveData = function (data) {
  // console.log("data",data);
  fs.writeFileSync("notes.json", JSON.stringify(data));
};

const getNote = function () {
    loadData().forEach(note => {
        console.log(chalk.yellow.inverse(note.title));
        console.log(chalk.blueBright.inverse (note.body),'\n');
        
    });
//   console.log(loadData());
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



