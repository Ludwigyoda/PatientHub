import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePathname } from 'expo-router';

export default function Headers() {
    const [name, setName] = useState<string | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userJson = await AsyncStorage.getItem('user');
                if (userJson) {
                    const user = JSON.parse(userJson);
                    if (user && user.name) {
                        setName(user.name);
                    }
                } else {
                    setName(null);
                }
            } catch (e) {
                // ignore error
            }
        };

        fetchUser();
    }, [pathname]);

    if (!name) return null;

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Bonjour, {name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 40) + 10 : 50,
        paddingBottom: 15,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    }
});
