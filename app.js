import { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoCheckList} from './helpers/inquirer.js';
import {guardarDB, leerDB}  from './helpers/guardarArchivo.js';
import Tareas from './models/tareas.js'
import colors from 'colors';

const main = async() => {

    let opt = '';

    const tareas = new Tareas();
    const tareasDB = leerDB();

    if (tareasDB) {
      tareas.cargarTareasFromArray(tareasDB);
    }

    do {
      //Imprime el menú
      opt =  await inquirerMenu();

      switch (opt) {
        case '1': //crear tarea
            const desc = await leerInput('Descripción: ');
            tareas.crearTarea(desc);
          break;

        case '2': //listar todas las tareas
          tareas.listadoCompleto();
          break;

        case '3': //listar completadas
          tareas.listarPendientesCompletadas(true);
          break;

        case '4': //listar pendientes
          tareas.listarPendientesCompletadas(false);
          break;

        case '5': //completado | pendiente
          const ids = await mostrarListadoCheckList(tareas.listadoArr);
          tareas.toggleCompletadas(ids);
          console.log(ids);
          break;

        case '6': //Borrar
          const id = await listadoTareasBorrar(tareas.listadoArr);
          if(id !== '0'){
            const ok = await confirmar('¿Está seguro?');
            if(ok){
              tareas.borrarTarea(id);
              console.log("Tarea borrada.");
            }
          }
          break;

        default:
          break;
      }

      guardarDB(tareas.listadoArr);

      await pausa( tareas.listadoArr);
     
    }while( opt !== '0')
}
 
main();