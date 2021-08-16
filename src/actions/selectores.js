import { types } from "../types/types"
import axios from 'axios';

const URL = 'http://localhost/api-alumnos/api.php';

    // const URL = 'https://apitiempoextra.jrdesarrollos.cl/api.php';

    export const cargaSemanasAlumno = ( id ) => async dispatch => {

        const respuesta = await axios.get(`${URL}?id=${id}&tipo=listaSemanasAlumno`);
        console.log(respuesta)
        const listaSemanasAlumno = respuesta.data
    
        dispatch( cargarSemanasAlumno(listaSemanasAlumno) )
        
    }
    export const cargarSemanasAlumno = (listaSemanasAlumno) => {
        return {
            type: types.cargaSemanasAlumno,
            payload: {
                listaSemanasAlumno,
            }
        }
    }
    
    export const consultaVideoEntregado = ( idAlumno, idVideoSemanal ) => async dispatch => {

        const respuesta = await axios.get(`${URL}?idAlumno=${idAlumno}&idVideoSemanal=${idVideoSemanal}&tipo=consultaVideoEntregado`);
        console.log(respuesta)
        const estadoEntrega = respuesta.data
    
        dispatch( consultarVideoEntregado(estadoEntrega) )
        
    }
    export const consultarVideoEntregado = (estadoEntrega) => {
        return {
            type: types.consultaVideoEntregado,
            payload: {
                estadoEntrega,
            }
        }
    }