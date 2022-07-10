require('colors');

const Task = require("./task");


class TasksList{

    _list={};

    constructor(){
        this._list={};
    }

    get getAllTasks(){
        const tasksList_aux=[];
        // Recorro el objeto _list y obtengo las llaves. De esas llaves las recorro una por una e inserto en el array aux el objeto de esa lista.
        Object.keys(this._list).forEach(key => {
            tasksList_aux.push(this._list[key]);
        });
        return tasksList_aux;
    }

    get getTaskList(){
        return this._list;
    }

    addNewTask(desc){
        const task=new Task(desc);
        this._list[task.id]= task;
    }
    
    addNewTaskFromDB(tasks){
        let arr=Object.keys(tasks)
            .map((key)=>{
                this._list[tasks[key].id]={
                    id:tasks[key].id,
                    description:tasks[key].description,
                    completed_at:tasks[key].completed_at
                }    
            });
    }

    printTaskList(){
        console.log('\n');
        let counter=1;
        Object.keys(this._list)
            .map((key)=>{
                console.log(`${ counter } - ${ this._list[key].completed_at===null? this._list[key].description.red : this._list[key].description.green } `);
                counter++;
            });
            console.log('\n');
            return this._list;
    }

    printTaskListCompletedOrNot(completed=true){
        console.log('\n');
        let counter=1;
        Object.keys(this._list)
            .map((key)=>{
                if(completed){
                    if(this._list[key].completed_at!==null){
                        console.log(`${ counter } - ${ this._list[key].description}  :: ${'Completada'.green}`);
                        counter++;
                    }
                }else{
                    if(this._list[key].completed_at===null){
                        console.log(`${ counter } - ${ this._list[key].description} :: ${'Pendiente'.red}`);
                        counter++;
                    }
                }
            });
            console.log('\n');
            return this._list;
    }
    

    getTaskById(id){

    }

    deleteTaskById(id =''){
        if(this._list[id]){
            delete this._list[id];
        }
    }

    completeTasks(id =''){
        id.map((elem)=>{
            if(elem!==0){
                this._list[elem].completed_at=new Date();
            }
        });
    }
    uncompleteTasks(id =''){
        id.map((elem)=>{
            if(elem!==0){
                this._list[elem].completed_at=null;
            }
        });
    }

}

module.exports=TasksList;