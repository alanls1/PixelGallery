import { StyleSheet, Text, View } from "react-native";

export default function Footer() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>©Code by Alan.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F2F2F2",
  },
  title: {
    fontSize: 15,
    textAlign: "center",
  },
});
