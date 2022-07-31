import stores     from "../Stores";
import {API_PATH} from "../Constants";
import {api}      from "../Config";

const {fakeDataStore, rootStore} = stores;

export const fetchFakeData = async (payload) => {
  console.log("FETCH", payload);
  try {
    const url = `${API_PATH.FAKE_DATA}`;
    rootStore.clearStores();
    fakeDataStore.setLoading(true);
    const response = await api.post(url, payload);
    fakeDataStore.setData(response.data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const fetchAdditionalFakeData = async (payload) => {
  console.log("ADD", payload);
  try {
    fakeDataStore.setLoading(true);
    const url = `${API_PATH.FAKE_DATA}`;
    const response = await api.post(url, payload);
    fakeDataStore.addData(response.data, payload.page);
    return response;
  } catch (error) {
    return error.response;
  }
}
