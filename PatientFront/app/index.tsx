import { Text, View, StyleSheet, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";



export default function Index() {
    const router = useRouter();

    return (
        <ScrollView style={styles.container}>


            <Text style={styles.pageTitle}>Patient Hub</Text>

            <View style={styles.section}>


                <Text style={styles.sectionTitle}>Modules Actifs</Text>


                <View style={styles.gridContainer}>
                    <View style={styles.gridItemPlaceholder}><Text style={styles.placeholderText}>Module 1</Text></View>
                    <View style={styles.gridItemPlaceholder}><Text style={styles.placeholderText}>Module 2</Text></View>
                    <View style={styles.gridItemPlaceholder}><Text style={styles.placeholderText}>Module 3</Text></View>
                    <View style={styles.gridItemPlaceholder}><Text style={styles.placeholderText}>Module 4</Text></View>
                </View>
            </View>

            {/* Fausse grille et module pour le moment il faut mtn implémenter ce Datadrive .... */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Mes Outils</Text>
                <View style={styles.gridContainer}>
                    <Pressable style={styles.toolCard} onPress={() => router.push("/pages/outils")}>
                        <Text style={styles.cardTitle}>Tous les Outils</Text>
                    </Pressable>
                    <Pressable style={styles.toolCard} onPress={() => router.push("/pages/historique")}>
                        <Text style={styles.cardTitle}>Historique</Text>
                    </Pressable>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Saisie Rapide</Text>
                <View style={styles.actionRow}>
                    <Pressable style={styles.actionButton}>
                        <Text style={styles.actionButtonText}>+ Symptôme</Text>
                    </Pressable>
                    <Pressable style={styles.actionButton}>
                        <Text style={styles.actionButtonText}>+ Catégorie</Text>
                    </Pressable>
                </View>
            </View>

            <View style={{ height: 40 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#F5F5F5",
    },
    pageTitle: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#2c2727ff",
        textAlign: "left",
    },
    section: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 10,
        color: "#383535ff",
    },
    gridContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },
    gridItemPlaceholder: {
        width: "50%", // 2 colonnes
        aspectRatio: 1.5,
        backgroundColor: "#E0E0E0",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    placeholderText: {
        color: "#888888ff",
    },
    toolCard: {
        width: "50%",
        aspectRatio: 1.5,
        backgroundColor: "#ffffffe6",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    cardTitle: {
        fontWeight: "600",
        color: "#2f2b2bff",
    },
    actionRow: {
        flexDirection: "row",
        gap: 15,
    },
    actionButton: {
        flex: 1,
        paddingVertical: 15,
        backgroundColor: "#52a6ffff",
        borderRadius: 12,
        alignItems: "center",
    },
    actionButtonText: {
        color: "#f3e6e6ff",
        fontWeight: "600",
    },
});
