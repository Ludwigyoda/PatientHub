import { authService } from "../service/AuthService";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { userAdd } from "../modele/userAdd";

function UserAddForm({ user, setUser, onSuccess }: { user: userAdd, setUser: React.Dispatch<React.SetStateAction<userAdd>>, onSuccess?: () => void }) {

    const [error, setError] = useState<string>("")


    const getErrorName = (field: keyof userAdd, value: string): boolean => {
        console.log('getErrorName Soucis')
        return false;

    }

    const getPasswordError = (field: keyof userAdd, value: string): boolean => {
        if (field === 'password' && value.length < 5) {
            return true
        }
        return false
    }


    const updateForm = (field: keyof userAdd, value: string) => {
        console.log(field + " - " + value);

        setUser(
            prev => (
                {
                    ...prev,
                    [field]: value
                }));

    }

    async function sendForm() {
        console.log(user);


        if (!user) return;


        try {
            const NewUser = await authService.register(
                user.username,
                user.email,
                user.password
            )

            console.log('Register Ok', NewUser);
            alert("compte créé")
            onSuccess?.();
        } catch (e) {
            console.error('register error', e);
            setError('Errer')
        }



        // if(user && !getErrorName("nom", user.nom)){
        //    alert(`${user?.nom} ${user?.prénom} ${user?.email} ${user?.password}`);
        // }
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