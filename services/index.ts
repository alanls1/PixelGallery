import axios from "axios";

const baseUrl = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

export const users = async () => {
  try {
    const res = await baseUrl.get("users");

    return res.data;
  } catch (error: any) {
    throw error;
  }
};

export const albums = async (userId: string) => {
  try {
    const res = await baseUrl.get("albums", { params: { userId } });

    return res.data;
  } catch (error: any) {
    throw error;
  }
};

export const photos = async () => {
  try {
    const res = await axios.get(
      "https://my-json-server.typicode.com/alanls1/photos_to_app/photos"
    );

    return res.data;
  } catch (error: any) {
    throw error;
  }
};

export const user = async (userId: string) => {
  try {
    const res = await baseUrl.get("users/" + userId);

    return res.data;
  } catch (error: any) {
    throw error;
  }
};
