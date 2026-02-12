import { Stack } from "expo-router";
import { View } from "react-native";
import Navbar from "./dashboard patient/components/navigation/navigation";
// import Headers from "./dashboard patient/components/headers";

export default function RootLayout() {
    return (
        <View style={{ flex: 1 }}>
            {/* <Headers /> */}
            <Stack screenOptions={{ headerShown: false }} />
            <Navbar />
        </View>
    );
}
