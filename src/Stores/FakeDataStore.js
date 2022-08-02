import {makeAutoObservable} from "mobx";

export default class FakeDataStore {
  data = [];
  isLoading = false;
  index = 1;

  constructor() {
    makeAutoObservable(this);
  }

  getData() {
    return [...this.data]
    .sort((a, b) => a.index - b.index);
  }

  setData(data) {
    this.data = [...data];
    this.index = 1;
    this.data.forEach((user) => {
      user.page = 1;
      user.index = this.index++;
    });
    this.isLoading = false;
  }

  addData(data, page) {
    data.forEach((user) => {
      user.page = page;
      user.index = this.index++;
    });
    this.data = [...this.data, ...data];
    this.isLoading = false;
  }

  isDataLoading() {
    return this.isLoading;
  }

  setLoading(status) {
    this.isLoading = status;
  }

  clearStore() {
    this.data = [];
  }
}