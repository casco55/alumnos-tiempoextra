import { types } from "../types/types";


export const guardarConArchivoReducer = ( state = {}, action ) =>{
    switch (action.type) {

        case types.guardarConArchivo:
            return {
                ...state,
                mensaje: action.payload.mensaje
            }
            
    
        default:
            return state;
    }
}