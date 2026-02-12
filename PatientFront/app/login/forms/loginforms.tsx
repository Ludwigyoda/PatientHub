import React, { useState} from "react";
import { useAuth } from "../../../hooks/useAuth";
import { Pressable, TextInput } from "react-native";
import { Button } from "@react-navigation/elements";


function LoginForms() {

    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');


    const {login} = useAuth();
    const handleLogin = async () => {
        try {
            await login(email, password);
        } catch (error) {
            alert('Erreur lors de la connexion : ' + error);
        }
}

return(
    <>
    <TextInput placeholder="Email" value={email} onChangeText={setemail} />
    <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
    <Pressable onPress={handleLogin}>
       Login</Pressable>
    
    </>   
)
}
export default LoginForms;