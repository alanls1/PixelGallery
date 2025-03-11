import * as React from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { IconButton } from "react-native-paper";
import { Image } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";

type modalPhoto = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  thumbnailURL: string;
  title: string;
};

export default function Photo({
  visible,
  setVisible,
  thumbnailURL,
  title,
}: modalPhoto) {
  const [isHorizontal, setIsHorizontal] = React.useState(false);

  React.useEffect(() => {
    const lockOrientation = async () => {
      if (isHorizontal) {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.LANDSCAPE
        );
      } else {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT
        );
      }
    };

    lockOrientation();
  }, [isHorizontal]);

  const closeModal = async () => {
    setIsHorizontal(false);
    setVisible(false);
  };

  const modal = () => {
    return (
      <View style={styles.container}>
        <Modal>
          <View style={styles.fullScreen}>
            <IconButton
              icon="close"
              size={20}
              style={styles.button}
              onPress={closeModal}
              iconColor="#fff"
            />
            <View style={styles.title}>
              <Text style={styles.text}>{title}</Text>
            </View>
          </View>
          <Image
            source={{
              uri: thumbnailURL,
            }}
            accessibilityLabel={title}
            style={{
              flex: 1,
              objectFit: isHorizontal ? "cover" : "contain",
            }}
          />

          <IconButton
            icon="crop-rotate"
            size={25}
            style={styles.buttonToSizeWidth}
            onPress={() => setIsHorizontal((prev) => !prev)}
            iconColor="#fff"
          />
        </Modal>
      </View>
    );
  };

  return visible && modal();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreen: {
    position: "absolute",
    zIndex: 99,
    width: "100%",
    backgroundColor: "rgba(20, 20, 20, 0.34)",
  },
  title: {
    height: 93,
    padding: 5,
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
    color: "#fff",
  },
  button: {
    position: "absolute",
    right: 0,
    zIndex: 999,
    alignContent: "center",
    justifyContent: "center",
  },
  buttonToSizeWidth: {
    position: "absolute",
    bottom: 20,
    right: 10,
    zIndex: 999,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
});
