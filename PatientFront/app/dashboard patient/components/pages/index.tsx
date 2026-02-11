import { Text, View } from "react-native";

export default function Index() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#007AFF",
            }}
        >
            <Text style={{ fontSize: 32, fontWeight: "bold", color: "white" }}>
                Patient Hub
            </Text>
        </View>
    );
}
