import { AddReviews, selectReviewUser } from "@/hooks/redux";
import { useLogin } from "@/hooks/useLoginUser";
import { Link, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Icon, IconButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

interface PropsUser {
  userId: number;
  name: string;
  email: string;
  username: string;
  website: string;
}

export default function CardUser({
  userId,
  email,
  name,
  username,
  website,
}: PropsUser) {
  const { user } = useLogin();
  const router = useRouter();

  const dispatch = useDispatch();

  const reviews = useSelector((state) => selectReviewUser(state, userId));

  const handleNotLogin = () => router.push("/login");

  const handleClickRate = (index: number) => {
    if (!user) {
      handleNotLogin();
      return;
    }
    dispatch(AddReviews({ userId, rated: index, totalReviews: 0 }));
  };

  const rate = () => {
    return (
      <View style={styles.rate}>
        {Array.from({ length: 5 }, (_, i) => i + 1).map((value, index) => {
          const changeNumberStar =
            reviews?.userId === userId && reviews?.rated >= value
              ? "red"
              : "black";

          return (
            <IconButton
              icon="star-outline"
              key={index}
              size={16}
              onPress={() => handleClickRate(value)}
              style={{
                alignItems: "flex-start",
                width: "auto",
              }}
              iconColor={changeNumberStar}
            />
          );
        })}
        <Text
          style={{
            fontSize: 10,
          }}>{`(${reviews?.totalReviews || "Sem"} Avaliação)`}</Text>
      </View>
    );
  };

  const userName = () => {
    return (
      <View style={styles.infoAboutUser}>
        <View style={styles.avatar}>
          <Icon source="account" size={40} />
        </View>
        <View style={styles.userName}>
          <Text style={styles.title}>{name}</Text>
          <Text>{email}</Text>
        </View>
        <Link href={`/album?userId=${userId}`}>
          <Icon source="chevron-right" size={40} />
        </Link>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {rate()}
      <View>
        <Text style={styles.title}>{username}</Text>
        <Text>{website}</Text>
      </View>
      {userName()}
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
    marginBlockEnd: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  infoAboutUser: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "space-around",
    alignItems: "center",
  },
  rate: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: "#D9D9D9",
    borderRadius: 30,
    padding: 5,
  },
  userName: {
    flex: 1,
    textAlign: "left",
  },
});
