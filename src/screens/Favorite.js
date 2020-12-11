import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import FavoriteItem from '../components/FavoriteItem';
import Header from '../components/Header';

function Favorite(props) {
    const favorite = useSelector(state => state.cart.favorite)
    return (
        <View>
            <Header name='Favorite' />
            <FlatList
                data={favorite}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                        <FavoriteItem item={item} />
                    )
                }}
            />
        </View>
    );
}

export default Favorite;