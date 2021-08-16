import Swal from 'sweetalert2';
import { types } from "../types/types"
import axios from 'axios'
import { startLoading, finishLoading } from "./ui";



export const guardaArchivo = info => async dispatch => {

    const type = info.get('tipo');

    console.log(type)

    const URL = 'http://localhost/api-alumnos/guardararchivo.php';

    // const URL = 'https://apitiempoextra.jrdesarrollos.cl/api.php';

    dispatch( startLoading());
    const respuesta = await axios.post(URL , info);
    console.log(respuesta.data)

    const exito = respuesta.data.exito;
    const mensaje = respuesta.data.mensaje;
    
    if(exito === 'no'){
        Swal.fire(mensaje);
        dispatch(finishLoading());
    }else{
        Swal.fire(mensaje);
        dispatch( guardarArchivo(mensaje) );
       
        dispatch(finishLoading());
    }
    
    
    
}
 export const guardarArchivo = ( mensaje ) =>{
    return {
        type: types.guardarConArchivo,
        payload: {
            mensaje,
        }
    }
}