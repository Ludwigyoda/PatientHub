import { Slot } from "expo-router";
import { View } from "react-native";
import Navbar from "../src/dashboardpatient/navigation/NavBar";
import { AuthProvider } from "../src/dashboardpatient/context/authContext";
import { useRouter } from "expo-router";
import { useEffect } from "react";
// import Headers from "./dashboard patient/components/headers";
import AuthGuard from "../src/dashboardpatient/components/AuthGuard";
export default function RootLayout() {
    return (
        <AuthProvider>
            <View style={{ flex: 1 }}>
                <AuthGuard />
            </View>
        </AuthProvider>
    );
}


