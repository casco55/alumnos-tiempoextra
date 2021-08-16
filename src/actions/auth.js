import Swal from 'sweetalert2';
import { types } from "../types/types"
import axios from 'axios'
import { startLoading, finishLoading } from "./ui";



export const startLogginUserPassword = (usuario, password, tipo ) => async dispatch => {

    const URL = 'http://localhost/api-alumnos/api.php';

    // const URL = 'https://apitiempoextra.jrdesarrollos.cl/api.php';

    dispatch( startLoading());
    const respuesta = await axios.get(`${URL}?user=${usuario}&pass=${password}&tipo=${tipo}`);
    console.log(respuesta)
    const userAlumno = respuesta.data.userAlumno
    const idAlumno = respuesta.data.idAlumno
    const nombreUsuario = respuesta.data.nombreUsuario
    const apellidoUsuario = respuesta.data.apellidoUsuario
    const nombreInstitucion = respuesta.data.nombreInstitucion
    const nombreNivel = respuesta.data.nombreNivel

    localStorage.setItem('usuarioAlumno', JSON.stringify({'userAlumno': userAlumno, 'idAlumno': idAlumno, 'nombreUsuario': nombreUsuario, 'apellidoUsuario': apellidoUsuario, 'nombreInstitucion': nombreInstitucion, 'nombreNivel': nombreNivel}));
    if(userAlumno === null){
        Swal.fire(' Error de autenticación')
        dispatch(finishLoading());
    }else{
        dispatch( login(userAlumno, idAlumno, nombreUsuario, apellidoUsuario, nombreInstitucion, nombreNivel) )
        dispatch(finishLoading());
    }  
    
}

export const login = ( userAlumno, idAlumno, nombreUsuario, apellidoUsuario, nombreInstitucion, nombreNivel ) =>{
    return {
        type: types.login,
        payload: {
            userAlumno,
            idAlumno,
            nombreUsuario,
            apellidoUsuario,
            nombreInstitucion,
            nombreNivel
        }
    }
}
export const startLogout = ( dispatch ) => {
    localStorage.removeItem('usuarioAlumno')
    return {
        type: types.logout,
    }
}    

