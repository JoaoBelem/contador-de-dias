export default class StorageInfo {
  save(info) {
    localStorage.dates += info;
  }

  delete(info){
    localStorage.dates -= info;
  }
}
