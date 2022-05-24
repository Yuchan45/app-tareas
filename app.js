const chalk = require('chalk');

function atajarArgsConsola(array){
    /*  Recibe el array resultante del process.argvs, y devuelve un array de como maximo 3 posiciones. */
    let [arg0, arg1, arg2, ...arg3] = array;
    return [arg0, arg1, arg2, arg3.join(" ")];
}


function menu(objTareas, argumentos) {
    /* Recibe un objeto del tipo tarea y un array con los argumentos atajados. Realiza las diferentes funcionalidades solicitadas dependiendo del argumento recidido por consola. */
    switch(argumentos[2]){
        case "listar":
            let arrayTareas = objTareas.leerArchivo(objTareas.archivo);
            objTareas.mostrarTareas(arrayTareas);
            break;

        case undefined:
            console.log(chalk.red("*Atención - Tienes que pasar una acción.\nLas acciones disponibles son: listar, crear y filtrar.\n"));
            break;

        case "crear":
            if (argumentos[3] == '') {
                console.log(chalk.red("*Atención - Debes ingresar el nombre de la nueva tarea. (ej: node app.js crear 'Nueva tarea')\n"));
                break;
            }
            let nuevaTarea = {
                titulo: argumentos[3],
                estado: "Pendiente"
            }
            objTareas.guardarTarea(nuevaTarea);
            console.log(chalk.green("*Se ha creado la tarea '" + nuevaTarea.titulo + "' exitosamente!\n"));
            break;

        case "filtrar":
            if (argumentos[3] == '') {
                console.log(chalk.red("*Atención - Debes ingresar el estado por el que deseas filtrar. (ej: node app.js filtrar 'Pendiente')\n"));
                break;
            }
            let estado = argumentos[3];
            objTareas.filtrarPorEstado(estado);
            break;

        default:
            console.log(chalk.red("*No entiendo qué quieres hacer.\nLas acciones disponibles son: listar, crear y filtrar.\n"));
    } 

}

function main(){
    const objTareas = require('./tareas');
    let arrayArgumentos = atajarArgsConsola(process.argv);
    menu(objTareas, arrayArgumentos);
}

main();