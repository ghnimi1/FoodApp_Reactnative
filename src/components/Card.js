import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { AddToCart, AddToFavorite, removeFav } from '../actions';
import FadeIn from '../Animation/FadeIn';
function Card({ item }) {
    const navigation = useNavigation()
    const { colors } = useTheme()
    const [toggle, setToggle] = useState(false)
    const favorite = useSelector(state => state.cart.favorite)
    const dispatch = useDispatch()
    const Add = (item) => {
        dispatch(AddToCart(item))
    }
    const AddFav = (item) => {
        const indexfavorite = favorite.findIndex(it => it.id === item.id)
        if (indexfavorite == -1)
            return (
                dispatch(AddToFavorite(item)),
                setToggle(true)
            )
        else (
            dispatch(removeFav(item.id)),
            setToggle(false)
        )
        //cart: state.cart.filter((item, index) => index !== indexcart)
    }

    return (
        <FadeIn>
            <TouchableOpacity
                onPress={() => navigation.navigate('Details', { item: item })}
                style={{
                    backgroundColor: colors.CardImg,
                    margin: 15,
                    borderRadius: 5,
                    alignItems: 'center'
                }}>
                <View style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',

                }}>
                    <Image
                        style={{
                            width: '90%',
                            height: 150,
                            borderRadius: 5,
                            marginTop: -15
                        }}
                        source={item.image} />
                </View>
                <View style={{
                    flexDirection: 'row',
                }}>
                    <View style={{
                        justifyContent: 'center',
                        width: Dimensions.get("screen").width - 100,
                    }}
                        ellipsizeMode="tail"
                        numberOfLines={2}
                    >
                        <Text style={{
                            color: 'black',
                            fontWeight: 'bold',
                            fontSize: 20,
                            textAlign: 'center',
                            marginBottom: 5,
                            marginRight: 5,
                            paddingLeft: 5
                        }}>
                            {item.title}
                        </Text>
                        <TouchableOpacity
                            onPress={() => AddFav(item)}
                            style={{
                                position: 'relative',
                                top: -180,
                                left: 35,
                            }}>
                            <MaterialIcons name="favorite"
                                size={40} color={toggle ? 'red' : 'white'} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            {Array(item.rating)
                                .fill()
                                .map((_, index) => (
                                    <AntDesign key={index} name="star"
                                        size={24} color="orange" />
                                ))}
                            <Text>({item.reviews})</Text>
                        </View>
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{
                                marginTop: 5,
                                color: 'tomato',
                                fontWeight: 'bold',
                                fontSize: 18
                            }}>{item.price} $</Text>
                            <TouchableOpacity
                                onPress={() => Add(item)}>
                                <AntDesign name="shoppingcart"
                                    size={30} color="blue" />
                            </TouchableOpacity>
                        </View>
                        <Text style={{
                            backgroundColor: 'tomato',
                            padding: 5,
                            color: 'white',
                            transform: [{ rotate: '0deg' }],
                            position: 'relative',
                            top: -155,
                            right: 15,
                            borderRadius: 5
                        }}>{item.deliveryCharges}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Ionicons name="md-timer" size={24} color="black" />
                            <Text style={{
                                marginLeft: 5,
                            }}>{item.deliveryTime}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </FadeIn>
    );
}

export default Card;