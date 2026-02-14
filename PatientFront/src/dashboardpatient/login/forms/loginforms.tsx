import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { Pressable, TextInput, Text, StyleSheet, View } from "react-native";

function LoginForms() {

    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');


    const { login } = useAuth();
    const handleLogin = async () => {
        try {
            await login(email, password);
        } catch (error) {
            alert('Erreur lors de la connexion : ' + error);
        }
    }

    return (


        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setemail}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Pressable onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Se connecter</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    }
});

export default LoginForms;