import { ReactNode } from "react";
import { View, StyleSheet } from "react-native";
import { useAuth } from "../context/authContext";
import Navbar from "../navigation/NavBar";
import RegisterPage from "../../../app/pages/registerpage"; // Ensure correct relative import
import { Slot } from "expo-router";

interface AuthGuardProps {
    children?: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
    const { isAuthenticated } = useAuth();


    if (!isAuthenticated) {
        return <RegisterPage />;
    }

    return (
        <View style={styles.container}>
            <Navbar />
            <Slot />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
