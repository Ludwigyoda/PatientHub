import { useAuth } from "@/app/context/authContext";
import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";


function Navbar() {
const {user, logout, isAuthenticated} = useAuth();
const [showLogin, setShowLogin] = useState(false);
const [showRegister, setShowRegister] = useState(false);
     const toggleLogin = () => {
    setShowLogin((prev) => !prev);
    if (!showLogin) setShowRegister(false);
  };

  const toggleRegister = () => {
    setShowRegister((prev) => !prev);
    if (!showRegister) setShowLogin(false);
  };
    return (

        
        <View>
            {isAuthenticated && user ? (
  <View>
    <Text>{user.username}</Text>
    <Pressable onPress={logout}>
      <Text>Déconnexion</Text>
    </Pressable>
  </View>
) : (
  <View>
    <Pressable onPress={toggleLogin}>
      <Text>Connexion</Text>
    </Pressable>
    <Pressable onPress={toggleRegister}>
      <Text>Inscription</Text>
    </Pressable>
  </View>
)}
            
            
             <Link href="/">
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
