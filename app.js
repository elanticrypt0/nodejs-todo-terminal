require('colors');
const { inquirerMenu, pause, prompt,inquirerTasksList2Complete,inquirerTasksList2Uncomplete,inquirerTasksList2Delete } = require('./helpers/inquirer');
const { saveDB, readDB } = require('./helpers/savedb');
const TasksList = require('./models/tasksList');

const main= async()=>{
    console.clear();
    let opt='';
    const tasksList=new TasksList();
    const tasksListDB=readDB();
    if(tasksListDB){
        tasksList.addNewTaskFromDB(tasksListDB);
    }

    do{
      
        opt=await inquirerMenu();

        switch (opt) {
            case '1':
                tasksList.addNewTask(await prompt(`\nEscriba una nueva tarea:`));
                break;
            case '2':
                tasksList.printTaskList();
                break;
            case '3':
                tasksList.printTaskListCompletedOrNot(true);
                break;
                break;
            case '4':
                tasksList.printTaskListCompletedOrNot(false);
                break;
            case '5':
                const task2Complete = await inquirerTasksList2Complete(tasksList.getAllTasks);
                tasksList.completeTasks(task2Complete);
                break;
            case '6':
                const task2Uncomplete = await inquirerTasksList2Uncomplete(tasksList.getAllTasks);
                tasksList.uncompleteTasks(task2Uncomplete);
                break;
            case '7':
                const task2Delete = await inquirerTasksList2Delete(tasksList.getAllTasks);
                tasksList.deleteTaskById(task2Delete);
                break;
            default:5
                break;
        }

        //guardar en db
        saveDB(tasksList.getTaskList);

        await pause();

    }while(opt !== '0');
}

main();