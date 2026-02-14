import { Stack } from "expo-router";
import { View } from "react-native";
import Navbar from "./dashboard patient/components/navigation/NavBar";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "expo-router";
import { useEffect } from "react";
// import Headers from "./dashboard patient/components/headers";

export default function RootLayout() {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {

        if (!isLoading) {
        if (isAuthenticated) {
            router.replace("/register");
        }else {
            router.replace("/pages/register");
        }}}, [isAuthenticated, isLoading]);

    return (
        <View style={{ flex: 1 }}>
            {/* <Headers /> */}
            <Stack screenOptions={{ headerShown: false }} />
            <Navbar />
        </View>
    );
}
