const fs = require("fs");

/**
 * a simple class for  setting up hierarchy
 */
class loglevel {
  constructor() {
    this.levels = {
      None: 1,
      Error: 2,
      Warn: 3,
      Info: 4,
      Debug: 5,
      Trace: 6,
      All: 7,
    };
  }
}

/***
 * Logger class with different levels
 */
class Logger extends loglevel {
  constructor(setlevel = null, filePath = null) {
    super();
    const Defconfig = this.readConfig();

    if (setlevel || filePath === null) {
      this.logPath = Defconfig.logpath;
      this.currentlevel = this.levels[Defconfig.level];
    } else {
      this.logpath = filePath;
      this.currentlevel = setlevel;
    }
  }

  /**
   * reads the config file
   * @returns log level, output dir
   */
  readConfig() {
    const configbuff = fs.readFileSync("./config.json");
    return JSON.parse(configbuff.toString());
  }

  /**
   *log trace
   * @param  any message to be logged in trace level trace
   */
  trace() {
    let lvl = "Trace";
    const err = Error();
    const caller = err.stack.split("\n")[2];

    this.CheckHier(lvl, caller, arguments);
  }

  /**
   * log debug
   * @param  any message to be logged in trace level debug
   */
  debug() {
    let lvl = "Debug";
    const err = Error();
    const caller = err.stack.split("\n")[2];

    this.CheckHier(lvl, caller, arguments);
  }

  /**
   * log error 
   * @param  any message to be logged in trace level error
   */
  error() {
    let lvl = "Error";
    const err = Error();
    const caller = err.stack.split("\n")[2];

    this.CheckHier(lvl, caller, arguments);
  }

  /**
   * log info 
   * @param  any message to be logged in trace level info
   */
  info() {
    let lvl = "Info";
    const err = Error();
    const caller = err.stack.split("\n")[2];

    this.CheckHier(lvl, caller, arguments);
  }

  /**
   * log warning
   * @param  any message to be logged in trace level warning
   */
  warn() {
    let lvl = "Warn";
    const err = Error();
    const caller = err.stack.split("\n")[2];

    this.CheckHier(lvl, caller, arguments);
  }

  /**
   * allow log wrt current log level
   * @param  lvl logging level
   * @param  msg message to be loged
   */
  CheckHier(lvl, caller, msg) {
    if (this.levels[lvl] <= this.currentlevel) {
      //log to be display as per level value
      this.formatS(lvl, caller, msg);
    }
  }

  /**
   * log printing format func
   * arguments format eg
   * [Arguments] {
            '0': 'Warn',                                                                     //logging level
            '1': 'at Object.<anonymous> (/home/anil/Desktop/node-js/note-app/test.js:12:8)', //error trace
            '2': [Arguments] { '0': 'this is ', '1': 331, '2': 'info message' }              //user message to be logged
}
   * @param {*} lvl logging level
   * @param {*} msg msg message to be loged
   */
  formatS() {
    let args = ""; //variable for appending n args from user
    let stack = arguments[1].split(" ");
    let callerFunc = stack[stack.indexOf("at") + 1];
    stack = stack[stack.length - 1].split("/").pop().split(":");

    for (let i = 0; i < arguments[2].length; i++) {
      args += " " + arguments[2][i];
    
    }
    let datetime=this.dateTime()
    let msg =
      "\n " + datetime+"\t"+
      arguments["0"] +
      ":\t" +
      stack[0] +
      "->" +callerFunc +
      "->" +
      "line:" +
      stack[1] +"\t"+
      " \tmessage:" +
      args;
    fs.appendFileSync(this.logPath, msg);
  }
  dateTime(){
      const today=new Date()
      let YY=today.getFullYear()
      let MM=today.getMonth()
      let DD=today.getDay()
      let hr=today.getHours()
      let min=today.getMinutes()
      let sec=today.getSeconds()
    return YY+'-' +MM+'-' +DD+" " +hr+':' +min+':' +sec+" "      
  }
}

module.exports = Logger;
