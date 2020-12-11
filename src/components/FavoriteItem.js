import React from 'react';
import { Fontisto } from '@expo/vector-icons';
import { removeFav } from '../actions';
import { useDispatch } from 'react-redux';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function FavoriteItem({ item }) {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('Details', { item: item })}
            style={{
                backgroundColor: 'white',
                margin: 15,
                borderRadius: 5,
                alignItems: 'center'
            }}>
            <View style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Image
                    style={{
                        width: '90%',
                        height: 150,
                        borderRadius: 5,
                    }}
                    source={item.image} />
            </View>
            <View style={{
                flexDirection: 'row',
                paddingTop: 10,
            }}>
                <View style={{
                    paddingBottom: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
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
                    <TouchableOpacity>
                        <Fontisto
                            onPress={async () => await dispatch(removeFav(item.id))}
                            name="trash" size={35} color="red" />
                    </TouchableOpacity>
                </View>

            </View>
        </TouchableOpacity>
    );
}

export default FavoriteItem;