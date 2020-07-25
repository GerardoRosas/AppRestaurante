import React, { useContext , useEffect, Fragment } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigate, useNavigation } from '@react-navigation/native';
import {
    Container,
    Separator,
    Content,
    List,
    ListItem,
    Thumbnail,
    Text,
    Body

} from 'native-base';
import globalStyle from '../styles/global';

import FirebaseContext from '../context/firebase/firebaseContext';
import PedidoContext from '../context/pedidos/pedidosContext';


const Menu = () => {

    //Context de firebase
    const { obtenerProductos, menu } = useContext(FirebaseContext);
    const { seleccionarPlatillo } = useContext(PedidoContext);

    //Hook para redireccionar 
    const navigation = useNavigation();

    useEffect(() => {
        obtenerProductos()

    }, []);

    const mostrarHeading = (categoria, index) => {
        
        //Indez es la posicion de cada platillo en el arreglo
        if(index > 0){
            const categoriaAnterior = menu[index - 1].categoria;
            if(categoriaAnterior !== categoria){
                return (
                    <Separator style={styles.separador}>
                        <Text style={styles.separadorTexto}>{categoria}</Text>
                    </Separator>
                )
            }
        }else{
            return (
                <Separator style={styles.separador}>
                    <Text style={styles.separadorTexto}>{categoria}</Text>
                </Separator>
            )
        }
    }

    return (
        <Container style={globalStyle.contenedor}>
            <Content style={{backgroundColor: '#FFF'}}>
                
                <List>
                    {menu.map((item, index) => {
                        const {imagen, nombre, descripcion, precio, categoria, id} = item;

                        return (
                            <Fragment key={id}>
                                {mostrarHeading(categoria, index)}
                                <ListItem
                                    onPress={() => {
                                        seleccionarPlatillo(item)
                                        navigation.navigate('DetallePlatillo')
                                    }}
                                    
                                >
                                    <Thumbnail
                                        large
                                        square
                                        source={{uri: imagen}}
                                    />
                                    <Body>
                                        <Text>{nombre}</Text>
                                        <Text
                                            note
                                            numberOfLines={2}
                                        >{descripcion}</Text>

                                        <Text>Precio: ${precio}</Text>
                                    </Body>
                                </ListItem>
                            </Fragment>
                        )
                    })}
                </List>

            </Content>

        </Container>
    );
}

const styles = StyleSheet.create({
    separador: {
        backgroundColor: '#000'
    }, 
    separadorTexto:{
        color: '#FFDA00',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 13
    }
})
 
export default Menu;