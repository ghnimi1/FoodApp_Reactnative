import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Header from '../components/Header';
import MapView, { Marker } from 'react-native-maps';
import { useTheme } from '@react-navigation/native';
import FadeIn from '../Animation/FadeIn';

function DetailsCard({ route }) {
    const { item } = route.params
    const { colors } = useTheme()
    return (
        <ScrollView style={{ backgroundColor: colors.HeaderColor }}>
            <Header name='Details' />
            <FadeIn>
                <View style={{ marginTop: 50 }}>
                    <View style={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',

                    }}>
                        <Image
                            style={{
                                width: '90%',
                                height: 200,
                                borderRadius: 5,
                            }}
                            source={item.image} />
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{
                            color: colors.TextColor,
                            fontWeight: 'bold',
                            fontSize: 25,
                            marginBottom: 5,
                            marginRight: 5
                        }}>
                            {item.title}
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                            {Array(item.rating)
                                .fill()
                                .map((_, index) => (
                                    <AntDesign key={index} name="star" size={24} color="orange" />
                                ))}
                            <Text style={{ color: colors.TextColor }}>({item.reviews})</Text>

                        </View>
                        <View>
                            <Text style={{
                                color: colors.TextColor,
                                fontSize: 18,
                                padding: 5,
                                textAlign: 'justify'
                            }}>{item.description}</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                        }}>
                            {item.categories.map((categorie, index) => (
                                <Text key={index} style={{
                                    backgroundColor: 'tomato',
                                    padding: 5,
                                    height: 40,
                                    margin: 5,
                                    textAlign: 'center',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    borderRadius: 10,
                                    fontSize: 17
                                }}>
                                    <AntDesign name="tags" size={24} color="black" />
                                    {categorie}</Text>
                            ))}
                        </View>
                    </View>
                    <View>
                        <MapView
                            style={styles.map}
                            region={{
                                latitude: item.coordinate.latitude,
                                longitude: item.coordinate.longitude,
                                latitudeDelta: 0.0121,
                                longitudeDelta: 0.0121,
                            }}
                        >
                            <Marker
                                coordinate={{
                                    latitude: item.coordinate.latitude,
                                    longitude: item.coordinate.longitude,
                                }}
                            >
                            </Marker>
                        </MapView>
                    </View>
                </View>
            </FadeIn>
        </ScrollView>
    );
}

export default DetailsCard;
const styles = StyleSheet.create({
    map: {
        height: 200,
        margin: 20,
    }
}); 