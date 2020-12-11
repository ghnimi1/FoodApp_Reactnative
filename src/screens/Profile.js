import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';

function Profile(props) {
    const { colors } = useTheme()
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const handleLogout = async () => {
        setError("")
        try {
            await logout()
            props.navigation.navigate('Login')
        } catch {
            setError("Failed to log out")
        }
    }
    return (
        <View>
            <Header name='Profile' />
            <View style={{
                height: 200,
                backgroundColor: '#ddd'
            }}></View>
            <MaterialCommunityIcons style={{
                position: 'relative',
                textAlign: 'center',
                marginTop: -100
            }}
                name="account-circle" size={200}
                color={colors.TextColor} />
            <Text style={{
                color: colors.TextColor
            }}>Email : {currentUser?.email}</Text>
            <TouchableOpacity style={styles.container_logout}
                onPress={() => handleLogout()}>
                <MaterialCommunityIcons name="logout"
                    size={30} color={colors.TextColor} />
                <Text style={{
                    color: colors.TextColor,
                    fontSize: 20,
                    fontWeight: 'bold',
                }}>Log Out</Text>
            </TouchableOpacity>
        </View>
    );
}
export default Profile;
const styles = StyleSheet.create({
    container_logout: {
        marginTop: Dimensions.get('screen').height - 550,
        backgroundColor: 'blue',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        margin: 50
    }
})