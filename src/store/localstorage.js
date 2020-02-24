import AsyncStorage from '@react-native-community/async-storage';

const storeKey = '@thevinelabs_shoppinglist_products';
export async function addProductsToLocalStore(products) {
  try {
    await AsyncStorage.setItem(storeKey, JSON.stringify(products));
  } catch (e) {
    console.log(e);
  }
}

export async function getProductsFromLocalStore() {
  try {
    const products = await AsyncStorage.getItem(storeKey);

    if (!!products) {
      return JSON.parse(products);
    } else {
      return [];
    }
  } catch (e) {
    console.log(e);
  }
}
