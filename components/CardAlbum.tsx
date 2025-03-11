import * as React from "react";
import { GestureResponderEvent, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

type CardPhotoProps = {
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  title: string;
};

export const CardAlbum = ({ title, onPress }: CardPhotoProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Button mode="contained" style={styles.button} onPress={onPress}>
        Visualizar Album
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    padding: 24,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 8,
    height: 150,
    width: "auto",
    marginBlockEnd: 10,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#A606AA",
    fontWeight: "bold",
    borderRadius: 8,
    fontSize: 24,
  },
});
