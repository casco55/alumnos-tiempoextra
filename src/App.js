import React from 'react'
import { Provider } from 'react-redux';
import { AppRouter } from './routers/AppRouter';
import { store } from './store/store';
import '../src/estilos/style.css'

export const App = () => {
    return (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    )
}
