import { types } from "../types/types";

export const cargaAlumnosReducer = ( state = {}, action ) =>{
    switch (action.type){
        case types.cargaSemanasAlumno:

            return {
                ...state,
                listaSemanasAlumno: action.payload.listaSemanasAlumno,
            }
        case types.consultaVideoEntregado:

            return {
                ...state,
                estadoEntrega: action.payload.estadoEntrega,
            }
        default:
            return state;
    }
    
}