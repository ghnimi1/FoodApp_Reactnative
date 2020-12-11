import React from 'react';
import { Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer, useNavigation, useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { changeTheme } from '../actions/index'
import { useDispatch, useSelector } from 'react-redux';

function Header({ name }) {
    const navigation = useNavigation()
    const { colors } = useTheme()
    const dispatch = useDispatch()
    const currentTheme = useSelector(state => state.myDarMode)
    return (
        <View style={{
            backgroundColor: colors.HeaderColor,
            elevation: 6,
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 50,
            flexDirection: 'row',
            padding: 5
        }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Ionicons
                    onPress={() => navigation.goBack()}
                    style={{ marginTop: 6 }}
                    name="md-arrow-back" size={32} color={colors.TextColor} />
                <Text style={{
                    color: colors.TextColor,
                    fontSize: 20,
                    marginLeft: 5,
                    marginTop: 5
                }}>{name}</Text>
            </View>
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
            }}>
                <MaterialCommunityIcons name="food" size={45} color="red" />
                <Text style={{
                    color: colors.TextColor,
                    fontSize: 25,
                    marginTop: 5,
                    fontWeight: 'bold'
                }}>Food</Text>
            </View>
            <MaterialCommunityIcons
                onPress={() => dispatch(changeTheme(currentTheme))}
                name="theme-light-dark" size={26}
                color={colors.TextColor} />
            <MaterialCommunityIcons
                onPress={() => navigation.navigate('Profile')}
                name="account-circle" size={26}
                color={colors.TextColor} />
        </View>
    );
}

export default Header;