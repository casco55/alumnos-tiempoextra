import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { guardaArchivo } from '../../actions/guardarConArchivo';
import { consultaVideoEntregado } from '../../actions/selectores';
import { ValidacionFormulario } from '../validaciones/ValidacionFormulario';

export const FormularioSubirVideo = ({idSemanaProgramaNivel, idVideoSemanal, numeroSemanaPrograma, tituloSemana, nombreVideoSemanal, idAlumno}) => {

    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.ui)
    const { estadoEntrega } = useSelector(state => state.cargaAlumnos);
    if(estadoEntrega === undefined){
        dispatch( consultaVideoEntregado(idAlumno, idVideoSemanal) )
    }

    useEffect(() => {
        dispatch( consultaVideoEntregado(idAlumno, idVideoSemanal) )
    }, [idSemanaProgramaNivel])
    console.log(estadoEntrega)
    const [state, setState] = useState({
        comentarioEntregaVideoSemanal: '',
        videoSemanal: '',
        tipo: 'entregaVideoSemanal',
        error: false,
    })
    const { comentarioEntregaVideoSemanal, videoSemanal, tipo, error } = state;

    const handleSubmit = (e) => {
        e.preventDefault();
        if(comentarioEntregaVideoSemanal === '' || videoSemanal === ''){
            setState({
                ...state,
                error: true,
            })
        }else{
            setState({
                ...state,
                error: false,
            })
  
            let formData = new FormData();
            formData.append("tipo", tipo)
            formData.append("idAlumno", idAlumno)
            formData.append("idVideoSemanal", idVideoSemanal)
            formData.append("archivo", videoSemanal)          
            formData.append("comentarioEntrega", comentarioEntregaVideoSemanal)
            const info = formData;
  
            dispatch( guardaArchivo(info) )
                
        }
    }
    const handleInputChange = ({ target }) => {
        setState({
            ...state,
            [target.name]: target.value // tb funciona con name: target.value / pero de esta manera selecciona por nombre de campo 
        })
    }
    const handleFileChange = (e) => {
    
        setState({
            ...state,
            videoSemanal: e.target.files[0] 
        })
        
        }


    return (
        <>  
            {estadoEntrega === "\nENTREGADO" &&
                <div className="container-fluid bg-success">
                    <h3 className="text-center">
                        Ya tienes una entrega para esta semana, aunque la puedes reemplazar
                    </h3>
                </div>
            }
            <h3 className="text-center mt-3">Subir Video Semana {numeroSemanaPrograma}: {nombreVideoSemanal}</h3>
            <form onSubmit={ handleSubmit }>
                <div className="container-fluid pt-1">
                    <div className="row d-flex justify-content-around">
                        <div className="col-lg-5 d-flex flex-column">
                            <div className="input-group my-2 d-flex flex-column">
                                <label htmlFor="comentarioEntregaVideoSemanal">Nombre Video:*</label>
                                <input
                                    type="text"
                                    name="comentarioEntregaVideoSemanal" 
                                    id="comentarioEntregaVideoSemanal" 
                                    placeholder="NORTE"
                                    className="form-control w-100" 
                                    value={ comentarioEntregaVideoSemanal }
                                    onChange={ handleInputChange }
                                />
                            </div>
                            <div className="input-group my-2 d-flex flex-column">
                                <label htmlFor="videoSemanal">Video:*</label>
                                <input 
                                  type="file" 
                                  className="form-control-file"
                                  name="videoSemanal" 
                                  id="videoSemanal" 
                                  onChange={ handleFileChange }
                                />
                            </div>
                        </div>
                        
                    </div>
                    <div className="input-group my-2 d-flex flex-column">
                        <input
                            type="submit"
                            value="Enviar"
                            className="btn btn-outline-primary mx-auto col-4"
                            disabled={ loading }
                        />
                    </div>
                </div>
            </form>

            {error && 

                <div className="col-lg-6 bg-danger text-light mx-auto mt-2 rounded">
                    <ValidacionFormulario />
                </div>

            }
        </>
    )
}
