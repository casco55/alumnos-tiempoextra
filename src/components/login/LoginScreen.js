import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { startLogginUserPassword } from '../../actions/auth';
import { ValidacionFormulario } from '../validaciones/ValidacionFormulario';

// import '../../estilos/style.css'

export const LoginScreen = () => {

    const dispatch = useDispatch();

    const { loading } = useSelector(state => state.ui);

    const [values, setValues] = useState({
        user: '',
        pass: '',
        tipo: 'login',
        error: false
    })

    const { user, pass, tipo, error } = values;

    const handleLogin = (e) => {
        e.preventDefault();

        if(user === '' || pass === '') {

            setValues({
                ...values,
                error: true,
            })

        }else{

            setValues({
                ...values,
                error: false,
            })

            dispatch( startLogginUserPassword(user, pass, tipo) );
        }

        

    }

    const handleInputChange = ({ target }) => {
        setValues({
            ...values,
            [target.name]: target.value // tb funciona con name: target.value / pero de esta manera selecciona por nombre de campo 
        }) 
    }

    return (
        <div className="container mt-3">          

            <div className="container">
                <div className="row d-flex flex-column justify-content-center">
                    <h1 className="text-center">Alumnos</h1>
                </div>
                <hr />
            </div>
            <div className="container mt-5">
                <div className="row d-flex flex-column">
                    <div className="col-lg-8 mx-auto d-flex flex-column pb-5 contenedor-login">
                        <h3 className="text-center mt-3 mb-3 titulo-login">Login</h3>
                        <form onSubmit={ handleLogin }>
                            <div className="input-group col-lg-10 mx-auto my-3">
                              <input 
                                type="text" 
                                name="user" 
                                id="user" 
                                className="form-control pl-4 py-4 input-login"
                                placeholder="Usuario"
                                value={ user }
                                onChange={ handleInputChange }
                            />
                              <div className="input-group-append">
                                <span className="input-group-text pr-4 icono-input">
                                    <i className="fas fa-user"></i>
                                </span>-
                              </div>
                              <small id="helpId" className="text-muted"></small>
                            </div>                            
                            <div className="input-group col-lg-10 mx-auto my-3">
                              <input 
                                type="password" 
                                name="pass" 
                                id="pass" 
                                className="form-control pl-4 py-4 input-login" 
                                placeholder="Contraseña"
                                value={ pass }
                                onChange={ handleInputChange }
                            />
                              <div className="input-group-append">
                                <span className="input-group-text pr-4 icono-input">
                                    <i className="fas fa-lock"></i>
                                </span>
                              </div>
                            </div>
                            <div className="row d-flex flex-row justify-content-between col-lg-10 mx-auto">
                                <a href="https://portafolio.jrdesarrollos.cl" className="my-auto">¿Olvidaste tu contraseña?</a>
                                <input 
                                className="btn btn-danger btn-login col-lg-5" 
                                type="submit" 
                                value="Login"
                                disabled={ loading }
                                />
                            </div>
                        </form>
                        {error && 

                            <div className="col-9 col-lg-6 bg-danger text-light mx-auto mt-2 rounded">
                                <ValidacionFormulario />
                            </div>

                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

