import { Link } from "expo-router";
import { Text, View } from "react-native";


function Navbar() {

    return (
        <View> <Link href="/">
            <Text>Accueil</Text></Link>

            <Link href="/dashboard patient/components/pages/outils">
                <Text>Outils</Text> </Link>

            <Link href="/dashboard patient/components/pages/historique">
                <Text>Historique</Text> </Link>

            <Link href="/dashboard patient/components/pages/profil">
                <Text>Profil</Text> </Link> </View>
    )
}
export default Navbar;
