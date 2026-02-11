import { Link } from "expo-router";
import { Text, View } from "react-native";


function Navbar() {

    return (
        <View> <Link href="/accueil">
                <Text>Accueil</Text></Link>

         <Link href="/outils">
            <Text>Outils</Text> </Link>

            <Link href="/historique">
                <Text>Historique</Text> </Link>

            <Link href="/profil">
                <Text>Profil</Text> </Link> </View>
    )
}
export default Navbar;
