import React, { useReducer } from 'react';

import firebase from '../../firebase/index';

import FirebaseReducer from './firebaseReducer';
import FirebaseContext from './firebaseContext';

import { OBTENER_PRODUCTOS_EXITO } from '../../types';    
import _ from 'lodash'      

const FirebaseState = (props) => {

    //State inicial
    const initialState = {
        menu: []
    }

    //Funcion que se ejecuta para traer los productos de la base de datos
    const obtenerProductos = () => {
        
        //Consultar a firebase por los productos
        firebase.db.collection('productos').where('existencia', '==', true) //Trae los que esten en existencia 
                                            .onSnapshot(manejarSnapshot) //onSnapshot maneja la base de datos en tiempo real

        function manejarSnapshot(snapshot){
            let platillos = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            })

            //Ordenar por categoria con lodash
            platillos = _.sortBy(platillos, 'categoria');

            dispatch({
                type: OBTENER_PRODUCTOS_EXITO,
                payload: platillos
            });
        }
    }

    //useReducer con dispatch para ejecutar las funciones
    const [ state, dispatch ] = useReducer(FirebaseReducer, initialState);

    return (
        <FirebaseContext.Provider 
            value={{
                menu: state.menu,
                firebase,
                obtenerProductos
            }}
        >

            {props.children}

        </FirebaseContext.Provider>
    )
}

export default FirebaseState;