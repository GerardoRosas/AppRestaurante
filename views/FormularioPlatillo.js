import React, { useContext, useState } from 'react';
import {  } from 'react-native';
import {
    Container, 
    Content,
    Form,
    Icon,
    Input,
    Grid,
    Col,
    Button,
    Text

} from 'native-base';
import globalStyles from '../styles/global';
import { useNavigation } from '@react-navigation/native';

import PedidoContext from '../context/pedidos/pedidosContext';

const FormularioPlatillo = () => {

    //State local
    const [ cantidad, guardarCantidad ] = useState(1);

    const { platillo } = useContext(PedidoContext);

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
                </Form>
                    
            </Content>
        </Container>
    );
}
 
export default FormularioPlatillo;