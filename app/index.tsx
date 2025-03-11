import SearchBar from "@/components/SearchInput";
import CardUser from "@/components/CardUser";
import { FlatList, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { users } from "@/services";
import Footer from "@/components/Footer";

interface PropsData {
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
}

export default function IndexScreen() {
  const [usersFiltered, setUsersFiltered] = useState<PropsData[]>();

  const { data: dataUser, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => users(),
  });

  const [searchQuery, setSearchQuery] = useState("");

  //Filtrar os usuários por base no nome ou username
  const filterUsers = (users: PropsData[], searchQuery: string) => {
    return users.filter(
      (user) =>
        user.name.includes(searchQuery) || user.username.includes(searchQuery)
    );
  };

  const renderUserItem = ({ item }: { item: PropsData }) => {
    return (
      <CardUser
        key={item.id}
        userId={item.id}
        email={item.email}
        name={item.name}
        username={item.username}
        website={item.website}
      />
    );
  };

  useEffect(() => {
    if (dataUser) {
      setUsersFiltered(
        searchQuery ? filterUsers(dataUser, searchQuery) : dataUser
      );
    }
  }, [searchQuery, dataUser]);

  return (
    <View style={styles.container}>
      <SearchBar
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
      />
      {isLoading || !dataUser ? (
        <CardUser
          userId={0}
          email={"..."}
          name={"..."}
          username={"..."}
          website={"..."}
        />
      ) : (
        <FlatList
          data={usersFiltered}
          renderItem={renderUserItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBlockStart: 50,
    paddingInline: 10,
    gap: 50,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
