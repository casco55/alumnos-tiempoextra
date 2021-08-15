import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
} from "react-router-dom"
import { login } from '../actions/auth'
import { LoginScreen } from '../components/login/LoginScreen'
import { Usuario } from '../components/usuario/Usuario'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'



export const AppRouter = () => {

    

    const dispatch = useDispatch();
    const [checking, setChecking] = useState(true);
    var isLoggedIn = false;
    const { userProfesor } = useSelector(state => state.auth);

    if( userProfesor === null || userProfesor === undefined){
        isLoggedIn = false;
    }else{
        isLoggedIn = true;
    }   

    useEffect(() => {
        const lectura = localStorage.getItem('usuarioProfesor')
        if(lectura){
            const rec = JSON.parse(lectura)
            dispatch( login(rec.userProfesor, rec.idProfesor, rec.nombreUsuario, rec.apellidoUsuario, rec.nombreInstitucion))          
        }
        
        setChecking(false)
    }, [ dispatch, setChecking ])

   
    
    if (checking){
        return (
            <h1>Espere..., estamos verificando sus credenciales</h1>
        )
    }
    

    return (
        
        
        <Router>
            
            <div className="container-fluid">
                
                    <div className="container-fluid">                        
                        <Switch>
                            <PublicRoute 
                                path="/login"
                                isAuthenticated={ isLoggedIn }  
                                component={ LoginScreen
                                }                        
                            />                       
                            
                            <PrivateRoute
                                isAuthenticated={ isLoggedIn } 
                                exact
                                path="/"                        
                                component={ Usuario }                        
                            />

                            
                            
                               
                        </Switch>
                    </div>
                
            </div>
            
            
        </Router>
        
    )
}