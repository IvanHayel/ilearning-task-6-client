import {configure} from "mobx";
import RootStore   from "./RootStore";

configure({
  enforceActions: "never",
});

const rootStore = new RootStore();

const stores = {
  rootStore,
  fakeDataStore: rootStore.fakeDataStore,
};

export default stores;
