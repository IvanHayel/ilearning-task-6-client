import FakeDataStore from "./FakeDataStore";

export default class RootStore {
  constructor() {
    this.fakeDataStore = new FakeDataStore();
  }

  clearStores() {
    this.fakeDataStore.clearStore();
  }
}
