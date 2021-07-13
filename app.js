

const yargs= require('yargs')
const mynote=require('./note.js')
yargs.version('1.2.3')

// let NoteList=[]

yargs.command({
    command: 'add',
    describe: 'insert new note',
    builder:{
        title:{
            describe:'note title',
            demandOption:true,
            type:'string',
        },
        body:{ 
            describe:'enter brief description',
            demandOption:true,
            type:'string'

        }
    },
    handler: function (argv) {
        console.log('Title::',argv.title)
        console.log('Body::',argv.body)
        mynote.addNote(argv.title,argv.body)
        
        // console.log('formated',argv);
        // NoteList.push(new Note(argv.title,argv.body))
    }
})
yargs.command({
    command:'delete',
    describe:'delete note',
    builder:{
        title:{
            describe:'mention title to be deleted',
            demandOption: true,
            type:'string'
        }
    },
    handler(argv){
        mynote.deleteNote(argv.title)
    }
      
         
        
    
})
yargs.command({
    command:'list',
    describe:'note list',
    handler: function (){
        console.log('your list..')
       mynote.getNote()
    }
})  
yargs.parse()

