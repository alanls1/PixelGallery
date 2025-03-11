import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLogin } from "@/hooks/useLoginUser";
import { useRouter } from "expo-router";

type user = {
  username: string;
  password: string;
};

export default function LoginScreen() {
  const { setUser } = useLogin();
  const router = useRouter();

  const [value, setValue] = React.useState<user>({
    password: "",
    username: "",
  });
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState<string | null>(null);

  //Se o usuário existe em "users" Executa o login, caso não, redireciona para tela de "register"
  const consultUser = async () => {
    try {
      const data = await AsyncStorage.getItem("users");

      if (data) {
        const users = JSON.parse(data);

        const userExisting = users.filter(
          (user: user) =>
            user.password === value.password && user.username === value.username
        );
        if (userExisting.length > 0) {
          setUser(userExisting[0]);
          setRedirect("/");
        } else {
          alert(
            "Usuário não encontrado.\nVocê será redirecionado para tela de cadastro"
          );
          setRedirect("/register");
        }
      } else {
        setRedirect("/register");
      }
    } catch (error: any) {
      //setError(error || "Erro desconhecido");
    }
  };

  useEffect(() => {
    if (redirect) {
      router.replace(redirect as any);
    }
  }, [redirect]);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>
          Seja bem-vindo de volta, {value.username || "usuário"}
        </Text>
        <View style={styles.textInput}>
          <View>
            <Text style={styles.label}>Username</Text>
            <Input
              isPassword={false}
              placeholder="Username"
              value={value.username}
              onChangeText={(text) =>
                setValue((prev) => ({ ...prev, username: text }))
              }
            />
          </View>
          <View>
            <Text style={styles.label}>Pasword</Text>
            <Input
              isPassword={true}
              placeholder="Pasword"
              value={value.password}
              onChangeText={(text) =>
                setValue((prev) => ({ ...prev, password: text }))
              }
            />
          </View>
        </View>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => consultUser()}
          disabled={value.password === "" || value.username === ""}>
          Login
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#60AA06",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    gap: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  textInput: {
    gap: 20,
  },
  label: {
    color: "#fff",
    marginBlockEnd: 5,
  },
  button: {
    backgroundColor: "#2C2C2C",
    width: 368,
    height: 58,
    borderRadius: 8,
    justifyContent: "center",
  },
});
