import { types } from "../types/types";


export const authReducer = ( state = {}, action ) =>{
    switch (action.type) {
        case types.login:
            
            return {
                userProfesor: action.payload.userProfesor,
                idProfesor: action.payload.idProfesor,
                nombreUsuario: action.payload.nombreUsuario,
                apellidoUsuario: action.payload.apellidoUsuario,
                nombreInstitucion: action.payload.nombreInstitucion,
            }
        case types.logout:        
            return {}
            
    
        default:
            return state;
    }
}