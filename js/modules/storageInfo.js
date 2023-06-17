/* eslint-disable class-methods-use-this */
export default class StorageInfo {
  save(info) {
    localStorage.dates += info;
  }

  delete(id) {
    localStorage.dates.split('|').splice(id, 1);
  }

  set(info) {
    console.log(info);
    // localStorage.dates = info;
  }
}
