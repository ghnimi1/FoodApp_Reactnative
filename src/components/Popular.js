import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

function Popular({ item }) {
    const navigation = useNavigation()
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('Details', { item: item })}
            style={{
                margin: 5,
            }}>
            <Image
                style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                }}
                source={item.image} />
        </TouchableOpacity>
    );
}

export default Popular;