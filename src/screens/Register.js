import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button, Text } from 'react-native'
import { useAuth } from '../context/AuthContext'
function Register(props) {
    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [error, setError] = useState('')
    const { signup } = useAuth()
    const { colors } = useTheme()
    async function handleSubmit(e) {

        if (password !== passwordConfirm) {
            return setError("Passwords do not match")
        }

        try {
            setError("")
            await signup(email, password)
            navigation.navigate('Login')
            setEmail('')
            setPassword('')
            setPasswordConfirm('')
        } catch {
            setError("Failed to create an account")
        }
    }
    return (
        < View style={[styles.container,
        { backgroundColor: '#404040' }]}>
            <TextInput style={styles.styleInput}
                placeholder='Email'
                value={email}
                keyboardType='email-address'
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput style={styles.styleInput}
                value={password}
                placeholder='Password'
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
            />
            <TextInput style={styles.styleInput}
                placeholder='Password Confirm'
                value={passwordConfirm}
                secureTextEntry={true}
                onChangeText={(text) => setPasswordConfirm(text)}
            />
            <Text style={{ color: 'red' }}>{error}</Text>
            <Button
                style={styles.styleButton}
                title='Register'
                onPress={handleSubmit} />
            <Text style={[styles.signinlink, {
                color: colors.TextColor
            }]}
                onPress={() => props.navigation.navigate('Login')}>Login</Text>
        </ View>
    );
}

export default Register;

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
    signinlink: {
        textAlign: 'center',
        marginTop: 5,
        fontWeight: 'bold',
        fontSize: 18
    }
})