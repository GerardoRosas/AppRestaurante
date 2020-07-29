import React, { useContext } from 'react';
import { Image } from 'react-native';
import {
    Container, 
    Content,
    Footer,
    Card,
    FooterTab,
    Button,
    Body,
    Text,
    H1,
    CardItem
} from 'native-base';
import globalStyles from '../styles/global';
import { useNavigation } from '@react-navigation/native';

import PedidoContext from '../context/pedidos/pedidosContext';

const DetallePlatillo = () => {

    const { platillo } = useContext(PedidoContext);
    const { nombre, imagen, descripcion, precio } = platillo;

    //Redireccionar al dar clik en el boton de ordenar
    const navigation = useNavigation();

    return (
        <Container style={globalStyles.contenedor}>
            <Content sytyle={globalStyles.contenido}>
                <H1 style={globalStyles.titulo}>{nombre}</H1>

                <Card>
                    <CardItem>
                        <Body>
                            <Image 
                                style={globalStyles.imagen}
                                source={{uri: imagen}}
                            />
                            <Text style={{marginTop: 20}}>{descripcion}</Text>
                            <Text style={globalStyles.cantidad}>Precio: ${precio}</Text>
                        </Body>
                    </CardItem>
                </Card>
            </Content>

            <Footer>
                <FooterTab>
                    <Button 
                        style={globalStyles.boton}
                        onPress={() => navigation.navigate("FormularioPlatillo")}
                        rounded
                    >
                        <Text style={globalStyles.botonTexto}>Ordenar Platillo</Text>
                    </Button>
                </FooterTab>
            </Footer>

        </Container>
    );
}
 
export default DetallePlatillo;