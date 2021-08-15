import Swal from 'sweetalert2';
import { types } from "../types/types"
import axios from 'axios'
import { startLoading, finishLoading } from "./ui";



export const startLogginUserPassword = (usuario, password, tipo ) => async dispatch => {

    const URL = 'http://localhost/api-profesores/api.php';

    // const URL = 'https://apitiempoextra.jrdesarrollos.cl/api.php';

    dispatch( startLoading());
    const respuesta = await axios.get(`${URL}?user=${usuario}&pass=${password}&tipo=${tipo}`);
    const userProfesor = respuesta.data.userProfesor
    const idProfesor = respuesta.data.idProfesor
    const nombreUsuario = respuesta.data.nombreUsuario
    const apellidoUsuario = respuesta.data.apellidoUsuario
    const nombreInstitucion = respuesta.data.nombreInstitucion

    localStorage.setItem('usuarioProfesor', JSON.stringify({'userProfesor': userProfesor, 'idProfesor': idProfesor, 'nombreUsuario': nombreUsuario, 'apellidoUsuario': apellidoUsuario, 'nombreInstitucion': nombreInstitucion}));
    if(userProfesor === null){
        Swal.fire(' Error de autenticación')
        dispatch(finishLoading());
    }else{
        dispatch( login(userProfesor, idProfesor, nombreUsuario, apellidoUsuario, nombreInstitucion) )
        dispatch(finishLoading());
    }  
    
}

export const login = ( userProfesor, idProfesor, nombreUsuario, apellidoUsuario, nombreInstitucion ) =>{
    return {
        type: types.login,
        payload: {
            userProfesor,
            idProfesor,
            nombreUsuario,
            apellidoUsuario,
            nombreInstitucion
        }
    }
}
export const startLogout = ( dispatch ) => {
    localStorage.removeItem('usuarioProfesor')
    return {
        type: types.logout,
    }
}    

