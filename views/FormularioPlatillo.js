import React, { useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import {
    Container, 
    Content,
    Form,
    Icon,
    Input,
    Grid,
    Col,
    Button,
    Text,
    Footer,
    FooterTab

} from 'native-base';
import globalStyles from '../styles/global';
import { useNavigation } from '@react-navigation/native';

import PedidoContext from '../context/pedidos/pedidosContext';

const FormularioPlatillo = () => {

    //State local
    const [ cantidad, guardarCantidad ] = useState(1);
    const [ total, guardarTotal ] = useState(0);

    //Extraemos el context
    const { platillo, guardarPedido } = useContext(PedidoContext);
    const { precio } = platillo;

    useEffect(() => {
        carlcularTotal()
    }, [cantidad])

    //Calcula el total del platillo
    const carlcularTotal = () => {
        const totalPagar = precio * cantidad;
        guardarTotal(totalPagar);
    }

    //Decrementa en uno el state 
    const decrementarUno = () => {
        if(cantidad > 1 ){
            const nuevaCantidad = parseInt(cantidad) - 1;
            guardarCantidad(nuevaCantidad);
        }
        return;
    }

    //incrementar en uno el state de cantidad
    const incrementarUno = () => {
        const nuevaCantidad = parseInt(cantidad) + 1;
        guardarCantidad(nuevaCantidad);
    }

    //Confirma si la orden es correcta 
    const confirmarOrden = () => {
        Alert.alert(
            '¿Deseas confirmar tu pedido?',
            '',
            [
                {
                    text: 'Confirmar',
                    onPress: () => {
                        //Almacenar el pedido al pedido principal
                        const pedido = {
                            ...platillo,
                            cantidad,
                            total
                        }
                        guardarPedido(pedido);
                        navigation.navigate('ResumenPedido')

                        //Navegar hacia el resumen
                    }
                },
                {
                    text: 'Cancelar',
                    style: 'cancel'
                }
            ]
        )
    }
    
    //Redireccionar 
    const navigation = useNavigation();

    return ( 
        <Container>
            <Content>
                <Form>
                    <Text style={globalStyles.titulo}>Cantidad</Text>

                    <Grid>
                        <Col>
                            <Button
                                dark
                                style={{marginLeft: 60, height: 50}}
                                onPress={() => decrementarUno()}
                            >
                                <Icon style={{fontSize: 30}} name="remove" />
                            </Button>
                        </Col>
                        <Col>
                            <Input
                                value={cantidad.toString()}
                                style={{textAlign: 'center', fontSize:30}}
                                keyboardType= 'numeric'
                                onChangeText={(cantidad) => guardarCantidad(cantidad)}
                            />
                        </Col>
                        <Col>
                            <Button
                                dark
                                style={{marginLeft: 15, height: 50}}
                                onPress={() => incrementarUno()}
                            >
                                <Icon style={{fontSize: 30}} name="add" />
                            </Button>
                        </Col>
                    </Grid>

                    <Text style={globalStyles.cantidad}>Subtotal: {total}</Text>
                </Form>
            </Content>
            <Footer>
                    <FooterTab>
                        <Button 
                            style={globalStyles.boton}
                            rounded
                            onPress={() => confirmarOrden()}
                        >
                            <Text style={globalStyles.botonTexto}>Agregar al Pedido</Text>
                        </Button>
                    </FooterTab>
            </Footer>
        </Container>
    );
}
 
export default FormularioPlatillo;