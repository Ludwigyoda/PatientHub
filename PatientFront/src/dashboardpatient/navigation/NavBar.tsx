import { useAuth } from "../context/authContext";
import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";

function Navbar() {
    const { user, logout, isAuthenticated } = useAuth();
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const toggleLogin = () => {
        setShowLogin((prev) => !prev);
        if (!showLogin) setShowRegister(false);
    };

    const toggleRegister = () => {
        setShowRegister((prev) => !prev);
        if (!showRegister) setShowLogin(false);
    };

    return (


        <View style={styles.navbar}>

            <View style={styles.header}>
                <Text style={styles.logoText}>Patient Hub</Text>
            </View>

            <View style={styles.navLinks}>
                <Link href="/" style={styles.link}>
                    <Text style={styles.linkText}>Accueil</Text>
                </Link>

                <Link href="/pages/outils" style={styles.link}>
                    <Text style={styles.linkText}>Outils</Text>
                </Link>

                <Link href="/pages/historique" style={styles.link}>
                    <Text style={styles.linkText}>Historique</Text>
                </Link>

                <Link href="/pages/profilOption" style={styles.link}>
                    <Text style={styles.linkText}>Profil</Text>
                </Link>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    navbar: {
        backgroundColor: '#1f6d8bff',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 16,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 15,
        borderBottomWidth: 2,
        borderBottomColor: '#16b5b7ff',
    },
    logoText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ffffffed',
        letterSpacing: 1,
    },
    navLinks: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
        flexWrap: 'wrap',
    },
    link: {
        paddingHorizontal: 18,
        paddingVertical: 10,
        backgroundColor: '#16b5b7ff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#0d4647ff',
    },
    linkText: {
        color: '#ffffffe2',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
});

export default Navbar;
