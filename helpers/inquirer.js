const inquirer = require('inquirer');
require('colors');

// Estas son las opciones en formato de INQUIRER.
const menuOpts=[
    {
        type: 'list',
        name: 'optionSelected',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name:`${'1'.green}. Crear tarea`
            },
            {
                value:`2`,
                name:`${'2'.green}. Listar tarea`
            },
            {
                value:`3`,
                name:`${'3'.green}. Listar tareas completadas`
            },
            {
                value:`4`,
                name:`${'4'.green}. Listar tareas pendientes`
            },
            {
                value:`5`,
                name:`${'5'.green}. Completar tarea(s)`
            },
            {
                value:`6`,
                name:`${'6'.green}. desCompletar tarea(s)`
            },
            {
                value:`7`,
                name:`${'7'.green}. Borrar tarea`
            },
            {
                value:`0`,
                name:`${'0'.green}. Salir`
            }
        ]
    }
];

// muestra el menú principal de la app
const inquirerMenu= async ()=>{
    console.clear();
    console.log('========================='.green);
    console.log('  Seleccione una opción');
    console.log('=========================\n'.green);

    const {optionSelected}= await inquirer.prompt(menuOpts);
    return optionSelected;

}

// esto comprueba la opción elegida anteriormente.
const pause= async()=>{

    const pauseOpts=[
        {
            type: 'input',
            name: 'pauseOptionSelected',
            message: `\nPresione ${'Enter'.yellow} para continuar: \n`,
        }
    ];
    console.log('\n');
    const {pauseOptionSelected}= await inquirer.prompt(pauseOpts);
    return pauseOptionSelected;
}

// el prompt te tira un texto para llenar y devuelve el valor.
const prompt= async(message)=>{

    const promptOpts=[
        {
            type: 'input',
            name: 'outputText',
            message
        }
    ];
    console.log('\n');
    const {outputText}= await inquirer.prompt(promptOpts);
    return outputText;
}

// listado de teareas por borrar
const inquirerTasksList2Delete= async(tasksList=[])=>{
    // Hago un array con todos los elementos
    let i=0;
    const choices= tasksList.map((task)=>{
        // const idx= `${i++ };`
        i++;
        return {
            value:task.id,
            name:`${ i } ${ task.description }`,
        }
    });
    // agrego la opción de volver
    choices.push({
        value:0,
        name:`0 - Cancelar.`
    });
    // Ahora creo el archivo
    const deleteOpts=[{
        type:'list',
        name:'deleteSelected',
        message:'¿Qué tarea desea borrar?',
        choices:choices
    }];
    const {deleteSelected}= await inquirer.prompt(deleteOpts);
    return deleteSelected;
}

// listado de teareas por borrar
const inquirerTasksList2Complete= async(tasksList=[])=>{
    // Hago un array con todos los elementos
    let i=0;
    const choices= tasksList.map((task)=>{
        // const idx= `${i++ };`
        i++;
        return {
            value:task.id,
            name:`${ i } ${ task.description }`,
        }
    });
    // agrego la opción de volver
    choices.push({
        value:0,
        name:`0 - Cancelar.`
    });
    // Ahora creo el archivo
    const completeOpts=[{
        type:'checkbox',
        name:'completeOptions',
        message:'¿Qué tarea desea completar?',
        choices:choices
    }];
    const {completeOptions}= await inquirer.prompt(completeOpts);
    return completeOptions;
}
// listado de teareas por borrar
const inquirerTasksList2Uncomplete= async(tasksList=[])=>{
    // Hago un array con todos los elementos
    let i=0;
    const choices= tasksList.map((task)=>{
        // const idx= `${i++ };`
        i++;
        return {
            value:task.id,
            name:`${ i } ${ task.description }`,
        }
    });
    // agrego la opción de volver
    choices.push({
        value:0,
        name:`0 - Cancelar.`
    });
    // Ahora creo el archivo
    const uncompleteOpts=[{
        type:'checkbox',
        name:'uncompleteOptions',
        message:'¿Qué tarea desea completar?',
        choices:choices
    }];
    const {uncompleteOptions}= await inquirer.prompt(uncompleteOpts);
    return uncompleteOptions;
}

const confirmDelete= async(message)=>{
    const question={
        type:'confirm',
        name:'confirm2Delete',
        message:message,
    }
    const {confirm2Delete}= await inquirer.prompt(question);
    return confirm2Delete;
}

module.exports={
    inquirerMenu,
    pause,
    prompt,
    inquirerTasksList2Complete,
    confirmDelete,
    inquirerTasksList2Uncomplete,
    inquirerTasksList2Delete
}