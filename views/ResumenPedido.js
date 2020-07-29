import React, { useContext, useEffect } from 'react';
import { Alert, StyleSheet } from 'react-native';
import {
    Container,
    Content,
    List,
    ListItem,
    Thumbnail,
    Text,
    Left,
    Body,
    Button, 
    H1, FooterTab, Footer
} from 'native-base';
import globalStyles from '../styles/global';
import { useNavigation } from '@react-navigation/native';
import firebase from '../firebase';

import PedidoContext from '../context/pedidos/pedidosContext';

const ResumenPedido = () => {

    //Context de pedido
    const {pedido, total, mostrarResumen, eliminarProducto, pedidoRealizado } = useContext(PedidoContext);

    useEffect(() => {
        calcularTotal()
    }, [pedido]);

    const calcularTotal = () => {
        let nuevoTotal = 0;
        nuevoTotal = pedido.reduce((nuevoTotal, articulo) => nuevoTotal + articulo.total, 0)
        mostrarResumen(nuevoTotal)
    }

    const navigation = useNavigation();

    //Redirecciona 
    const progresoPedido = () => {
        Alert.alert(
            "Revisa tu Pedido",
            'Una vez que realizas tu pedido, no podrás cambiarlo',
            [
                {
                    text: 'Confirmar',
                    onPress: async() => {
                        //Crear un objeto con toda la imformacion
                        const pedidoObj = {
                            tiempoentrega: 0,
                            completado: false,
                            total: Number(total),
                            orden: pedido,
                            creado: Date.now()
                        }

                        //Escribir el pedido en firebase
                        try {
                            const pedido = await firebase.db.collection('ordenes').add(pedidoObj);
                            pedidoRealizado(pedido.id);
                            
                            navigation.navigate('ProgresoPedido');
                        } catch (error) {
                            console.log(error)
                        }

                    }
                },
                {
                    text: 'Revisar', style: 'cancel'
                }
            ]
        )
    }

    //Confirmar eliminar de la lista de prodcutos
    const confirmarEliminacion = (id) => {
        Alert.alert(
            "¿Deseas eliminar el producto?",
            '',
            [
                {
                    text: 'Confirmar',
                    onPress: () => {
                        //Eliminar del state
                        eliminarProducto(id)
                    }
                },
                {
                    text: 'Cancelar', style: 'cancel'
                }
            ]
        )
    }

    return (
        <Container style={globalStyles.contenedor}>
            <Content style={globalStyles.contenido}>
                <H1 style={globalStyles.titulo}>Resumen Pedido</H1>
                {pedido.map((platillo, i) => {
                    const { cantidad, nombre, imagen, id, precio } = platillo
                    return (
                        <List key={id + i}>
                            <ListItem thumbnail>
                                <Left>
                                    <Thumbnail large square source={{uri: imagen}} />
                                </Left>

                                <Body>
                                    <Text>{nombre}</Text>
                                    <Text>Cantidad {cantidad}</Text>
                                    <Text>Precio: ${precio}</Text>

                                    <Button 
                                        onPress={() => confirmarEliminacion(id)}
                                        full 
                                        danger
                                        style={{marginTop: 20}}
                                    >
                                        <Text style={[globalStyles.botonTexto, {color: '#FFF'}]}>Eliminar</Text>
                                    </Button>
                                </Body>
                            </ListItem>
                        </List>
                    )
                })}

                <Text style={globalStyles.cantidad}>Total a Pagar: ${total}</Text>

                <Button
                    style={{marginTop: 30}}
                    onPress={() => navigation.navigate('Menu')}
                    full
                    rounded
                    dark
                >
                    <Text style={[globalStyles.botonTexto, {color: '#FFF'}]}>Seguir Pidiendo</Text>
                </Button>
            </Content>

            <Footer>
                <FooterTab>
                <Button
                    style={[globalStyles.boton, {marginTop: 30}]}
                    onPress={() => progresoPedido() }
                    full
                    rounded
                >
                    <Text style={globalStyles.botonTexto}>Ordenar Pedido</Text>
                </Button>
                </FooterTab>
            </Footer>
        </Container>
    );
}
 
export default ResumenPedido;