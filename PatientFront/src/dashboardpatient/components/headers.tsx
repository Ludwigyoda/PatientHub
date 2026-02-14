import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Modal, ScrollView } from 'react-native';
import { useAuth } from '../context/authContext';
import RegisterForm from '../login/forms/registerform';
import { userAdd } from '../login/modele/userAdd';
import LoginForms from '../login/forms/loginforms';

export default function Headers() {
    const { user, logout, isAuthenticated } = useAuth();
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [newUser, setNewUser] = useState<userAdd>({
        username: "",
        email: "",
        password: ""
    });

    const toggleLogin = () => {
        setShowLogin((prev) => !prev);
        if (!showLogin) setShowRegister(false);
    };

    const toggleRegister = () => {
        setShowRegister((prev) => !prev);
        if (!showRegister) setShowLogin(false);
    };
    return (
        <View>
            <View>
                <Text>PatientHub</Text>
            </View>
            {isAuthenticated && user ? (
                <View>
                    <Text>{user.username}</Text>
                    <Pressable onPress={logout}>
                        <Text>Déconnexion</Text>
                    </Pressable>
                </View>
            ) : (
                <View>
                    <Pressable onPress={toggleLogin}>
                        <Text>Connexion</Text>
                    </Pressable>
                    <Pressable onPress={toggleRegister}>
                        <Text>Inscription</Text>
                    </Pressable>
                </View>
            )}

            {showLogin && <LoginForms />}
            {showRegister && <RegisterForm user={newUser} setUser={setNewUser} />}
        </View>
    );
}