import {makeAutoObservable} from "mobx";

export default class FakeDataStore {
  data = [];
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  getData() {
    return this.data
    .map((user) => {
      return {
        id: `${user.id.name} ${user.id.value}`,
        person: `${user.name.title} ${user.name.first} ${user.name.last}`,
        country: user.location.country,
        state: user.location.state,
        city: user.location.city,
        street: `${user.location.street.name} ${user.location.street.number}`,
        postcode: user.location.postcode,
        email: user.email,
        phone: user.phone,
        page: user.page,
      }
    })
    .sort((a, b) => a.email.localeCompare(b.email))
    .sort((a, b) => a.page - b.page);
  }

  setData(data) {
    this.data = [...data];
    this.data.forEach((user) => user.page = 1);
    this.isLoading = false;
  }

  addData(data, page) {
    data.forEach((user) => user.page = page);
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