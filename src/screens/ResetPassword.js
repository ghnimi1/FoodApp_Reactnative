import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet, Button, Text } from 'react-native'
import { useAuth } from '../context/AuthContext';

function ResetPassword(props) {
    const navigation = useNavigation()
    const { resetPassword } = useAuth()
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const { colors } = useTheme()

    async function handleSubmit(e) {
        try {
            setError("")
            await resetPassword(email)
            setEmail('')
        } catch {
            setError("Failed to reset password")
        }
    }

    return (
        < View style={[styles.container, { backgroundColor: '#404040' }]
        }>
            <TextInput style={styles.styleInput}
                placeholder='Email'
                value={email}
                keyboardType='email-address'
                onChangeText={(text) => setEmail(text)}
            />
            <Text style={{ color: 'red' }}>{error}</Text>
            <Button
                style={styles.styleButton}
                title='Reset Password'
                onPress={handleSubmit} />
            <Text style={[styles.signinlink, {
                color: colors.TextColor
            }]}
                onPress={() => navigation.navigate('Login')}>
                Login</Text>
        </ View >
    );
}

export default ResetPassword;
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