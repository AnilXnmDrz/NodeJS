
const yargs= require('yargs')

yargs.version('1.2.3')
yargs.command({
    command: 'insert',
    describe: 'insert data ',
    handler: function () {
        console.log('inserting data')
    }
})
yargs.command({
    command:'delete',
    describe:'delete data',
    handler: function (){
        console.log('deleting data')
    }
})

console.log(yargs.argv)
