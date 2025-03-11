import CardPhoto from "@/components/CardPhoto";
import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import { IconButton } from "react-native-paper";
import { useRouter } from "expo-router";
import Footer from "@/components/Footer";
import { useQuery } from "react-query";
import { photos } from "@/services";

interface PropsPhotos {
  albumId: number;
  id: number;
  thumbnailUrl: string;
  title: string;
  url: string;
}

export default function PhotosScreen() {
  const router = useRouter();
  const handleBackPage = () => router.back();

  const { data, isLoading } = useQuery({
    queryKey: ["photos"],
    queryFn: () => photos(),
  });

  return (
    <View style={styles.container}>
      <IconButton icon={"chevron-left"} onPress={() => handleBackPage()} />
      <View style={styles.containerContent}>
        {isLoading && !!data ? (
          <CardPhoto title="...carregando" thumbnailURL="..." />
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }: { item: PropsPhotos }) => (
              <CardPhoto title={item.title} thumbnailURL={item.thumbnailUrl} />
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
