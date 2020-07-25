import React, { useReducer } from 'react';

import PedidosReducer from './pedidosReducer';
import PedidoContext from './pedidosContext';

import { SELECCIONAR_PRODUCTO } from '../../types'

const PedidoState = (props) => {

    //State inicial
    const initialState = {
        pedido: [],
        platillo: null
    }

    //useReducer con dispatch para ejecutar las funciones
    const [ state, dispatch ] = useReducer(PedidosReducer, initialState);

    //Selecciona el producto que el usuario
    const seleccionarPlatillo = (item) => {
        dispatch({
            type: SELECCIONAR_PRODUCTO,
            payload: item
        })
    }

    return (
        <PedidoContext.Provider 
            value={{
                pedido: state.pedido,
                platillo: state.platillo,
                seleccionarPlatillo
            }}
        >

            {props.children}

        </PedidoContext.Provider>
    )
}

export default PedidoState;