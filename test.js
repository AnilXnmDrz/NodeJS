const Logger = require("./mylogger.js");



const logger = new Logger();

let x = 331;
// logger.trace("this is traces tetst");
// logger.debug("this is msg from debug", x);
// logger.error(x, "this is error",x," message",x);
logger.info("this is ", x, "info message");
const demofunction= function(){
    
    logger.warn("this is ", x, "info message");
}
demofunction()


