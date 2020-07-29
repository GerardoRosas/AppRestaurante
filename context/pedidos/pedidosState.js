import React, { useReducer } from 'react';

import PedidosReducer from './pedidosReducer';
import PedidoContext from './pedidosContext';

import { 
    SELECCIONAR_PRODUCTO,
    CONFIRMAR_ORDENAR_PLATILLO,
    MOSTRAR_RESUMEN,
    ELIMINAR_PRODUCTO,
    PEDIDO_ORDENADO
} from '../../types'

const PedidoState = (props) => {

    //State inicial
    const initialState = {
        pedido: [],
        platillo: null,
        total: 0,
        idPedido: ''
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

    //Cuando el usuario confirma un platillo
    const guardarPedido = (pedido) => {
        dispatch({
            type: CONFIRMAR_ORDENAR_PLATILLO,
            payload: pedido
        })
    }

    //Muestra el total a pagar en el resumen
    const mostrarResumen = (total) => {
        dispatch({
            type: MOSTRAR_RESUMEN,
            payload: total
        })
    }

    //Elimina un articulo del carrito
    const eliminarProducto = id => {
        dispatch({
            type: ELIMINAR_PRODUCTO,
            payload: id
        })
    }

    const pedidoRealizado = (id) => {
        dispatch({
            type: PEDIDO_ORDENADO,
            payload: id
        })
    }

    return (
        <PedidoContext.Provider 
            value={{
                pedido: state.pedido,
                platillo: state.platillo,
                total: state.total,
                idPedido: state.idPedido,
                seleccionarPlatillo,
                guardarPedido,
                mostrarResumen,
                eliminarProducto,
                pedidoRealizado
            }}
        >

            {props.children}

        </PedidoContext.Provider>
    )
}

export default PedidoState;