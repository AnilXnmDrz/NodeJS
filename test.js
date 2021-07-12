
const tasks={
    tasks:[{
        text:"shopping",
        completed:true
    },
    {
        text:"clean yard",
        completed:false
    },
    {
        text:"file course",
        completed:false
    },
],
taskStatus(){
    //  this.tasks.forEach((task) => {
   
    //   if(task.completed ===false){
    //       console.log(task.text ," pending")
    //   }
    // })
    return this.tasks.filter((tasks)=>tasks.completed===false) //es6 arrow func
}

}

console.log(tasks.taskStatus());