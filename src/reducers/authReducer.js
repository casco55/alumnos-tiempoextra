import { types } from "../types/types";


export const authReducer = ( state = {}, action ) =>{
    switch (action.type) {
        case types.login:
            
            return {
                userAlumno: action.payload.userAlumno,
                idAlumno: action.payload.idAlumno,
                nombreUsuario: action.payload.nombreUsuario,
                apellidoUsuario: action.payload.apellidoUsuario,
                nombreInstitucion: action.payload.nombreInstitucion,
                nombreNivel: action.payload.nombreNivel,
            }
        case types.logout:        
            return {}
            
    
        default:
            return state;
    }
}