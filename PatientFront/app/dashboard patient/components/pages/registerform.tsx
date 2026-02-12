import { authService } from "@/app/login/service/AuthService";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { userAdd } from "@/app/login/modèle/userAdd";

function UserAddForm({user,setUser} : {user : userAdd  , setUser : React.Dispatch<React.SetStateAction<userAdd>>}) {

 const [error , setError] = useState<string>("")


    const updateForm  = (field : keyof userAdd, value : string) => {
console.log(field + " - " + value);

        setUser(
            prev => (
                {
                    ...prev,
                    [field] : value
                }));
    
    }
    
    async function sendForm(){
        console.log(user);
        
        if(!user) return;

        try {
                const NewUser = await authService.register(
                user.username,
                user.email, 
                user.password,

                )

   console.log('Register Ok', NewUser);
   alert("compte créé")
            }catch(e) {
                console.error('register error', e);
                setError('Errer')
            }
    
        
    
    }


    return (
            <>
            <View>
              

                <View>
                    <Text>Username</Text>
                    <TextInput
                    value={user.username}
                    onChangeText={(text) => updateForm('username', text)
                    }
                    />
                </View>
    
                <View>
                    <Text>Email</Text>
                    <TextInput
                    value={user.email}
                    onChangeText={(text) => updateForm("email", text)}
                    />
                </View>
    
                <View>
                    <Text>Password</Text>
                    <TextInput
                    value={user.password}
                    onChangeText={(text) => updateForm("password", text)}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                    textContentType="password"
                    placeholder="mot de Passe"
                    />
                </View>
                <View>
                <Pressable onPress={sendForm}>
                    <Text>Envoyer</Text>
                </Pressable>
                </View>
            </View>
            </>
        )
}

export default UserAddForm;