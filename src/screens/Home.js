import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import Card from '../components/Card';
import Header from '../components/Header';
import Popular from '../components/Popular';

function Home(props) {
    const [searchedText, setSearchedText] = useState()
    const data = useSelector(state => state.cart.data)
    const { colors } = useTheme()
    const popular = data?.filter(item => item.reviews > 100)

    const search = (term) => {
        data?.filter(dat => dat.title
            .toLowerCase()
            .indexOf(term.toLowerCase()) !== -1)
    }
    const handleSubmit = () => {
        search(searchedText)
    }

    return (
        <ScrollView style={{
            flex: 1,
            backgroundColor: colors.HeaderColor
        }}>
            <Header />
            <View>
                <Searchbar
                    placeholder='Serach...'
                    value={searchedText}
                    onSubmitEditing={handleSubmit}
                    onChangeText={(text) => setSearchedText(text)} />
            </View>
            <View>
                <Text
                    style={{
                        color: colors.TextColor,
                        fontSize: 25,
                        margin: 5,
                        fontWeight: 'bold'
                    }}>Popular This Week</Text>
                <ScrollView horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    style={{
                        borderColor: "#ccc",
                        borderBottomWidth: 1,
                        borderTopWidth: 1,
                        paddingTop: 5
                    }}
                >
                    <FlatList
                        contentContainerStyle={{
                            flexDirection: 'row',
                            marginBottom: 10
                        }}
                        data={popular}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => {
                            return (
                                <Popular item={item} />
                            )
                        }}
                    />
                </ScrollView>
            </View>
            <View>
                <Text style={{
                    fontSize: 25,
                    color: colors.TextColor,
                    margin: 5,
                    fontWeight: 'bold'
                }}>All Menu Items</Text>
                <FlatList
                    scrollEnabled={false}
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        return (
                            <Card item={item} />
                        )
                    }}
                />
            </View>
        </ScrollView >
    );
}

export default Home;