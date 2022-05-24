const fs = require('fs');
const chalk = require('chalk');

let objetoTareas = {
    archivo: './tareas/tareas.json',

    leerArchivo: function(){
        /* Lee el archivo JSON y devuelve un array con los objetos tarea que haya */
        let rawdata = fs.readFileSync(this.archivo);
        let arrayTareas = JSON.parse(rawdata);
        return arrayTareas;
    },

    mostrarTareas: function(array) {
        /* Recibe un array de objetos tarea y muestra por consola las tareas que hay en este */
        console.log(chalk.bold("\nListado de tareas\n---------------------"));
        array.forEach((element, index) => { // parametros (elemento actual, indice del elemento actual(OPCIONAL), array del elemento actual(OPCIONAL))
            console.log(index+1 + ". " + chalk.bold(element.titulo) + " - " + chalk.green.italic(element.estado));
        });
        console.log("\n\n");

    },

    escribirJSON: function(array) {
        /* Recibe un array de objetos tarea, le aplica stringify y los guarda en el archivo (Sobreescribe el contenido previo del archivo)  */
        let datosConvertidos = JSON.stringify(array);
        fs.writeFileSync(this.archivo, datosConvertidos, function(error) {
            if (error) throw error;
            console.log('Ha ocurrido un error al intentar guardar la tarea');
        });
    },

    guardarTarea: function(tarea) {
        /* Recibe un objeto de tipo tarea y lo guarda en el archivo json. */
        let arrayTareas = this.leerArchivo(this.archivo);
        arrayTareas.push(tarea);
        this.escribirJSON(arrayTareas);
    },

    leerPorEstado(estadoSolicitado){
    /* Recibe un estado por parametro. Devuelve un array con las tareas del archivo JSON que cumplan con dicho estado. */
        let arrayTareas = this.leerArchivo(this.archivo);
        let arrayFiltrado = arrayTareas.filter(function(tarea) {
            return tarea.estado.toLowerCase() == estadoSolicitado.toLowerCase() ;
        });
        return arrayFiltrado;
    },

    filtrarPorEstado: function(estado){
    /* Recibe un estado (string) y filtra las tareas del archivo JSON por estado y luego las muestra por consola. */
        let tareasFiltradas = this.leerPorEstado(estado);
        this.mostrarTareas(tareasFiltradas);
    }

}

module.exports = objetoTareas;