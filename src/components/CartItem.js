import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { remove } from '../actions';
import { useTheme } from '@react-navigation/native';
import { color } from 'react-native-reanimated';

function CartItem({ item }) {
    const { colors } = useTheme()
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(1)
    const increment = () => {
        setQuantity(quantity + 1)
    }
    const decrement = () => {
        if (quantity == 1) return
        setQuantity(quantity - 1)
    }
    return (
        <View style={{
            borderBottomWidth: 1,
            borderBottomColor: colors.TextColor,
        }}>
            <View style={{ flexDirection: 'row', }}>
                <View>
                    <Image
                        style={styles.favorite_image}
                        source={item.image}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={[styles.stylesText, colors.TextColor]}>{item.title}</Text>
                    <Fontisto
                        style={{
                            textAlign: 'right',
                            marginRight: 20
                        }}
                        onPress={async () => await dispatch(remove(item.id))}
                        name="trash" size={35} color="red" />
                </View>
            </View>
            <View style={styles.container_quantity}>
                <Text style={styles.textamount}>{item.price * quantity} $ </Text>
                <View style={{ width: 100 }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <AntDesign onPress={decrement} name="minuscircle" size={24} color="#f4511e" />
                    <Text style={[styles.text_quantity, colors.TextColor]}>{quantity}</Text>
                    <AntDesign onPress={increment} name="pluscircle" size={24} color="#f4511e" />
                </View>
            </View>
        </View>
    );
}

export default CartItem;
const styles = StyleSheet.create({

    favorite_image: {
        borderRadius: 20,
        height: 100,
        width: 100,
        margin: 5
    },
    stylesText: {
        fontWeight: 'bold',
        marginTop: 10,
    },
    textamount: {
        fontSize: 25,
        color: 'tomato',
    },
    container_quantity: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    text_quantity: {
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 5,
        marginRight: 5,
    },
})