import CardPhoto from "@/components/CardPhoto";
import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { IconButton } from "react-native-paper";
import { useLocalSearchParams, useRouter } from "expo-router";
import Footer from "@/components/Footer";
import { useQuery } from "react-query";
import { albums, user } from "@/services";
import { CardAlbum } from "@/components/CardAlbum";

interface PropsAlbum {
  id: number;
  title: string;
}

export default function AlbumScreen() {
  const router = useRouter();
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const handleBackPage = () => router.back();

  const handleViewPhotos = (albumId: number) =>
    router.push(`/photos?albumId=${albumId}`);

  const { data: searchUser } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => user(userId),
  });

  const { data: album, isLoading } = useQuery({
    queryKey: ["album", userId],
    queryFn: () => albums(userId),
  });

  const infoAboutUser = () => {
    const user = searchUser;

    return (
      <View>
        <Text style={styles.title}>{user?.name || "..."}</Text>
        <Text style={styles.text}>Username: {user?.username || "..."}</Text>
        <Text style={styles.text}>WebSite: {user?.website || "..."}</Text>
        <Text style={styles.text}>Email: {user?.email || "..."}</Text>
        <Text style={styles.text}>Telefone: {user?.phone || "..."}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <IconButton icon={"chevron-left"} onPress={() => handleBackPage()} />
      <View style={styles.containerContent}>
        {infoAboutUser()}
        {isLoading && !album ? (
          <CardAlbum title="..." />
        ) : (
          <FlatList
            data={album}
            renderItem={({ item }: { item: PropsAlbum }) => (
              <CardAlbum
                title={item.title}
                onPress={() => handleViewPhotos(item.id)}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerContent: {
    flex: 1,
    paddingBlockStart: 20,
    paddingInline: 10,
    gap: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
