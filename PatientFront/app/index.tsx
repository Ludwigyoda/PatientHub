import { Text, View } from "react-native";

export default function Index() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#007AFF",
            }
            }
        >
            <Text style={{ fontSize: 32, fontWeight: "bold", color: "white" }}>
                Patient Hub
            </Text>


        </View> // on fait sauté le titre on met une grille 2X 4 ou 6 avec les module actif 
        // même chose en dessous avec les outils 
        // catégorisé la data dans l'acceuil symptome => suivi de blessure + ajout catégori 


    );
}
