const Logger = require("./mylogger.js");

const fs=require('fs')

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



// try {
//     const os=require('os')
//     console.log(process.cwd(), __dirname);
//     console.log(window.location.pathname());
//     // x=11
//     // x=0/xjj
//     // if(x>10) throw ("greater than 10")
//     // var ff= fs.readFileSync('./hhh.txt')


    
// } catch (error) {
//     console.log("error",error);
//     logger.error(error)
//     logger.warn(error)
//     // if(error==="greater than 10"){
//     //     x=1
//     //     logger.info(`error solved:${error}`)
        
//     // }
// }



