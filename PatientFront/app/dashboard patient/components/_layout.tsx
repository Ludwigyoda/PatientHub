import { Stack } from "expo-router";
import Navbar from "../navigation/navigation";
import { View } from "react-native";

export default function RootLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack />
      <Navbar />
    </View>
  );
}
