import { Stack } from "expo-router";
import { View } from "react-native";
import Navbar from "./dashboard patient/components/navigation/navigation";

export default function RootLayout() {
    return (
        <View style={{ flex: 1 }}>
            <Stack screenOptions={{ headerShown: false }} />
            <Navbar />
        </View>
    );
}
