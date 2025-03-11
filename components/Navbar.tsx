import { useLogin } from "@/hooks/useLoginUser";
import { Link } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, IconButton } from "react-native-paper";

export default function NavBar() {
  const { user, setUser } = useLogin();
  const [isVisible, setIsVisible] = useState(false);

  const logout = () => {
    setUser(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PixelGallery</Text>
      <View style={styles.containerLogin}>
        {user && <Text style={styles.greeting}>{`Olá, ${user.username}`}</Text>}
        <IconButton
          icon="account"
          mode="contained"
          size={30}
          onPress={() => setIsVisible((prev) => !prev)}
        />
        {isVisible &&
          (user ? (
            <View style={styles.login}>
              <Button mode="text" onPress={() => logout()}>
                <Text style={styles.loginText}>Log out</Text>
              </Button>
            </View>
          ) : (
            <Link href="/login" style={styles.login}>
              <Text style={styles.loginText}>Login</Text>
            </Link>
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 90,
    backgroundColor: "#60AA06",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    flex: 2,
    marginInlineStart: 10,
  },
  containerLogin: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
  },
  login: {
    position: "absolute",
    zIndex: 999,
    top: 45,
    right: 10,
    borderRadius: 8,
    backgroundColor: "#D9D9D9",
    width: 146,
    paddingBlock: 10,
    paddingInlineStart: 5,
  },
  loginText: {
    fontSize: 20,
    fontWeight: "bold",
    marginInlineStart: 10,
    color: "#fff",
  },
  greeting: {
    color: "#fff",
  },
});
