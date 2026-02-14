import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import LoginForms from "../../src/dashboardpatient/login/forms/loginforms";
import UserAddForm from "../../src/dashboardpatient/login/forms/registerform";
import { userAdd } from "../../src/dashboardpatient/login/modele/userAdd";

export default function RegisterPage() {
    const router = useRouter();
    const [user, setUser] = useState<userAdd>({ username: "", email: "", password: "" });
    const [isLogin, setIsLogin] = useState(false);

    const handleRegisterSuccess = async () => {
        router.replace("/");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {isLogin ? "Se connecter" : "Créer un compte"}
            </Text>

            {isLogin ? (
                <LoginForms />
            ) : (
                <UserAddForm user={user} setUser={setUser} onSuccess={handleRegisterSuccess} />
            )}

            <Pressable onPress={() => setIsLogin(!isLogin)}>
                <Text style={styles.linkText}>
                    {isLogin ? "Pas de compte ? S'inscrire" : "Déjà inscrit ? Se connecter"}
                </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20 },
    title: { fontSize: 28, fontWeight: "bold", marginBottom: 30 },
    linkText: { color: "#007AFF", fontWeight: "bold", marginTop: 20 },
});