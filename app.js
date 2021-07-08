const validator=require('validator')
const chalk=require('chalk')

const n=require('./note.js')
// urno
console.log(n())

console.log(validator.isEmail('anilsunamgmail.com'))
// console.log(chalk.redBright.bold("Edited by chalk")+ chalk.bold("4.1"))
// console.log(chalk.keyword('orange')('orange color'))
// console.log(chalk.rgb(123,45,67).underline('ubterlined reddish color'))
const error =chalk.bold.red
const warning= chalk.keyword('orange')
const success=chalk.green.inverse

console.log('\t'+error('error report'))
console.log('\t'+warning('warning report'))
console.log('\t'+success('success report'))
