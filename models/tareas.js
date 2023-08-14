import Tarea from './tarea.js'
import colors from 'colors';
class Tareas {
    //Propiedad de Tareas llamada listado
    _listado = {};

    //Uso un get para retornar un nuevo arreglo (listado)
    get listadoArr(){
        const listado = [];

        //Retorna todas las llaves que tenga el objeto y crea un arreglo de String.
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        })
        return listado;
    }

    constructor (){
        this._listado = {};
    }

    borrarTarea(id = ''){
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas = []){
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }
    
    crearTarea(desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;

    }


    listadoCompleto(){
        this.listadoArr.forEach((tarea,i) => {
            const idx = `${i + 1}`.green;
            const { desc, completadoEn } = tarea;
            const estado = ( completadoEn )
                                ? 'Completada'.green
                                : 'Pendiente'.red
            
            console.log(`${idx} ${desc} :: ${estado}`);
        });
    }
    
    listarPendientesCompletadas(completadas){
        let contador = 0;
        this.listadoArr.forEach(tarea => {
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn)
                            ? 'Completada'.green
                            : 'Pendiente'.red;
            if (completadas){
                if (completadoEn) {
                    contador += 1;
                    console.log(`${(contador + '.').green} ${desc} :: ${completadoEn}`);    
                }
            }else{
                if (!completadoEn) {
                    contador += 1;
                    console.log(`${(contador + '.').green} ${desc} :: ${completadoEn}`);    
                }
            }
            
            

        });
    }

    toggleCompletadas(ids = [] ){
        ids.forEach( id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString()
            }
        });

        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
               this._listado[tarea.id].completadoEn = null;

            }
        })
    }

}

export default Tareas;