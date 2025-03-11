import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Input from "@/components/ui/Input";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useLogin } from "@/hooks/useLoginUser";

export default function RegisterScreen() {
  const { setUser } = useLogin();

  const [value, setValue] = React.useState<{
    username: string;
    password: string;
  }>({ password: "", username: "" });

  const [error, setError] = useState("");
  const router = useRouter();

  //Adiciona um novo usuário caso o username não esteja em uso
  const addUser = async () => {
    try {
      const data = await AsyncStorage.getItem("users");
      const isUserExisting = data && userExisting(JSON.parse(data));

      if (isUserExisting) {
        setError("Esse username já está em uso");
        return;
      }
      const users = data ? JSON.parse(data) : [];
      users.push(value);

      await AsyncStorage.setItem("users", JSON.stringify(users));
      alert("Usuário adicionado");
      setUser(value);

      router.replace("/");
    } catch (error: any) {
      console.error(error || "Erro desconhecido");
    }
  };

  const userExisting = (data: { password: ""; username: "" }[]) => {
    return data.some((user) =>
      user.username.toLowerCase().includes(value?.username?.toLowerCase() || "")
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Olá, {value.username || "usuário"}</Text>
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
            {error && (
              <Text style={{ color: error && "red" }}>
                Esse username já está em uso
              </Text>
            )}
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
          onPress={() => addUser()}
          disabled={value.password === "" || value.username === ""}>
          Cadastrar
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
