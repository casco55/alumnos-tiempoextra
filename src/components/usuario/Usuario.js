import React, { useMemo, useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth';
import { cargaSemanasAlumno } from '../../actions/selectores';

import '../../estilos/styleUser.css'
import { FormularioSubirVideo } from './FormularioSubirVideo';
import logo from '../imagenes/logo.png'

export const Usuario = () => {

    const dispatch = useDispatch();
    const { idAlumno, nombreUsuario, apellidoUsuario, nombreInstitucion, nombreNivel} = useSelector(state => state.auth);
    const { listaSemanasAlumno } = useSelector(state => state.cargaAlumnos);
    if( listaSemanasAlumno === undefined){
        dispatch( cargaSemanasAlumno(idAlumno) );
    }
    useEffect(() => {
        dispatch( cargaSemanasAlumno(idAlumno) );
    }, [idAlumno])
    const handleLogout = () => {
        dispatch( startLogout() )
    }
    const [state, setState] = useState({
        idSemanaProgramaNivel: 0,
        idVideoSemanal: 0,
        numeroSemanaPrograma: 0,
        tituloSemana: '',
        nombreVideoSemanal: '',
    })
    const { idSemanaProgramaNivel, idVideoSemanal, numeroSemanaPrograma, tituloSemana, nombreVideoSemanal } = state;
    return (
    
        <>    
               <div className="continer-fluid bg-dark">
                    <div className="row justify-content-between text-light">
                    <img src={logo} alt="Logo Tiempo extra" className="logo ml-3" />
                        <div className="col-8 col-lg-4 d-flex justify-content-end items-align-center">
                            <p className="my-auto mx-1">{nombreInstitucion} {nombreNivel} </p>
                            <p className="my-auto mx-1 text-info">{nombreUsuario} {apellidoUsuario}</p>
                            <button 
                                className="nav-item nav-link btn btn-info text-light my-auto"
                                onClick={ handleLogout }
                            >
                                Logout
                            </button>
                        </div>

                    </div>
                </div>
                <div className="container-fluid mt-0">
                    <div className="row">
                    {listaSemanasAlumno !== undefined &&
                        listaSemanasAlumno.map((fila) => (
                            <div key={fila.id} className="col-6 col-md-4 col-lg-2 text-center" onClick={ () => {
                                setState({
                                    ...state,
                                    idSemanaProgramaNivel: fila.id,
                                    idVideoSemanal: fila.idVideoSemanal,
                                    numeroSemanaPrograma: fila.numeroSemanaPrograma,
                                    tituloSemana: fila.tituloSemana,
                                    nombreVideoSemanal: fila.nombreVideoSemanal,
                                })
                            }}>Semana {fila.numeroSemanaPrograma}</div>
                        ))
                    }                        
                    </div>
                </div> 
                {idSemanaProgramaNivel !== 0 && 
                    <FormularioSubirVideo
                        idSemanaProgramaNivel = {idSemanaProgramaNivel}
                        idVideoSemanal = {idVideoSemanal} 
                        numeroSemanaPrograma = {numeroSemanaPrograma}
                        tituloSemana = {tituloSemana}
                        nombreVideoSemanal = {nombreVideoSemanal}
                        idAlumno = {idAlumno}
                    />
                }     

            
        </>
    )
}
