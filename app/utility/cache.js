import * as SecureStore from "expo-secure-store";

const prefix = "cache";

const setItemAsync = async (key, value) => {
  try {
    await SecureStore.setItemAsync(prefix + key, JSON.stringify(value));
  } catch (error) {
    console.log("cache store", error);
  }
};

const getItemAsync = async (key) => {
  try {
    const value = await SecureStore.getItemAsync(prefix + key);
    const item = JSON.parse(value);

    if (!item) return null;

    return item;
  } catch (error) {
    console.log("get cache:", error);
  }
};

export default { setItemAsync, getItemAsync };
