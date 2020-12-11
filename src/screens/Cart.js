import React, { useEffect, useState } from 'react';
import { ScrollView, View, FlatList, Text, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import CartItem from '../components/CartItem';
import { totalCart } from '../actions';
import { useTheme } from '@react-navigation/native';

function Cart(props) {
    const cart = useSelector(state => state.cart.cart)
    const dispatch = useDispatch()
    const colors = useTheme()
    useEffect(() => {
        dispatch(totalCart())
    }, [cart])
    return (
        <ScrollView>
            <Header name='Cart' />
            <View>
                <FlatList
                    data={cart}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        return (
                            <CartItem item={item} />
                        )
                    }}
                />
            </View>
            <Text style={{
                color: colors.TextColor,
                fontWeight: 'bold',
                fontSize: 20,
                textAlign: 'right',
                padding: 5
            }}>TOTAL : {cart?.reduce((amount, item) => item.price + amount, 0)} $</Text>
            <TouchableOpacity
                style={{
                    backgroundColor: 'tomato',
                    margin: 20,
                    borderRadius: 5
                }}
                onPress={() => alert('Ok')}>
                <Text style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 20,
                    textAlign: 'center',
                    padding: 5
                }}>CHECKOUT</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

export default Cart;
