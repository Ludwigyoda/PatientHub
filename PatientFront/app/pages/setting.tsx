// dark mode
//personaliser l'acceuil 
// Gestionnaire de module
//déconnexion
import { useAuth } from "@/src/dashboardpatient/context/authContext";
import { useTheme } from "@react-navigation/native";
import { useNavigation, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
export default function settings() {
    const router = useRouter();
    const theme = useTheme();
    const [isDark, setIsDark] = useState(false);

    const SwitchDarkmode = () => setIsDark(!isDark);
    // darkmode pas mit => colorscheme
    const { logout } = useAuth();
    const handlelogout = async () => {
        try {
            await logout();
        } catch (err) {
            alert('Erreur lors de la déconnexion : ' + err);
        
        }}

    return (
        <>
        <View>
            <Text>Paramètre</Text>
        </View>
        
    <View>
        <View>
            <Text>Dark mode</Text>
            <Pressable onPress={SwitchDarkmode}>
                <Text>{isDark ? "Désactiver" : "Activer"}</Text>
             </Pressable>
        </View>
        <View>
            <Text>Personnaliser l'acceuil</Text>
        </View>
        <View>
             <Pressable onPress={() => router.push("../profilOption")}>
                <Text>Profil</Text>
             </Pressable>
        </View>
        <View>
            <Pressable onPress={handlelogout}>
                <Text>Se déconnecter</Text>
             </Pressable>
        </View>
    </View>
 
        </>
    );
}