import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button, Text } from 'react-native'
import { useAuth } from '../context/AuthContext';

function Login(props) {
    const navigation = useNavigation()
    const { login } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { colors } = useTheme()
    async function handleSubmit(e) {
        try {
            setError("")
            await login(email, password)
            navigation.navigate("Home")
            setEmail('')
            setPassword('')
        } catch {
            setError("Failed to log in")
        }

    }
    return (
        < View style={[styles.container, { backgroundColor: '#404040', }]
        }>
            <TextInput style={styles.styleInput}
                placeholder='Email'
                value={email}
                keyboardType='email-address'
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput style={styles.styleInput}
                placeholder='Password'
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <Text style={{ color: 'red' }}>{error}</Text>
            <Button
                style={styles.styleButton}
                title='Login'
                onPress={handleSubmit} />
            <Text style={[styles.signuplink, {
                color: colors.TextColor
            }]}
                onPress={() => props.navigation.navigate('ResetPass')}>Reset Password</Text>
            <Text style={[styles.signuplink, {
                color: colors.TextColor
            }]}
                onPress={() => props.navigation.navigate('Register')}>Create new account</Text>
        </ View >
    );
}

export default Login;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    styleInput: {
        borderWidth: 1.5,
        borderRadius: 5,
        backgroundColor: '#fff',
        borderColor: "#000",
        fontSize: 20,
        height: 50,
        marginTop: 25
    },
    signuplink: {
        textAlign: 'center',
        marginTop: 5,
        fontWeight: 'bold',
        fontSize: 18
    }
})