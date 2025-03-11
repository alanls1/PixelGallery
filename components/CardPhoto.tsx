import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button } from "react-native-paper";
import Photo from "./Photo";
import { useState } from "react";

type CardPhotoProps = {
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  title: string;
  thumbnailURL: string;
};

export default function CardPhoto({
  onPress,
  title,
  thumbnailURL,
}: CardPhotoProps) {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.thumbnail}>
        <Image
          source={{
            uri: thumbnailURL,
          }}
          accessibilityLabel={title}
          style={styles.tinyLogo}
        />
      </View>
      <View style={styles.description}>
        <Text style={styles.title}>{title}</Text>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => setVisible(true)}>
          Visualizar foto
        </Button>
      </View>
      <Photo
        visible={visible}
        setVisible={setVisible}
        thumbnailURL={thumbnailURL}
        title={title}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    padding: 24,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 8,
    flexDirection: "row",
    height: 208,
    width: "auto",
    marginBlockEnd: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  thumbnail: {
    flex: 1,
    height: "auto",
    maxWidth: 160,
  },
  description: {
    flex: 1,
    height: "auto",
    maxWidth: 160,
    justifyContent: "space-between",
  },
  button: {
    maxWidth: 160,
    backgroundColor: "#A606AA",
    fontWeight: "bold",
    borderRadius: 8,
    fontSize: 24,
  },
  tinyLogo: {
    maxWidth: 160,
    height: 160,
    borderRadius: 8,
  },
});
