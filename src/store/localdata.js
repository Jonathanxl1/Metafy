const BASE = "Metafy";
const table = "goals";
const config = "config";

function mountDb() {
  let request = indexedDB.open(BASE);

  request.onupgradeneeded = function() {
    let db = request.result;
    db.createObjectStore(table, { keyPath: "title", autoIncrement: true });
    db.createObjectStore(config, { autoIncrement: true });
  };
  request.onsuccess = function(event) {
    let db = request.result;
    db.close();
    console.info(event.type);
  };

  request.onerror = function(event) {
    console.error(event);
  };
}

function addGoal(value) {
  return new Promise(function(resolve, reject) {
    let request = indexedDB.open(BASE);
    request.onerror = function(event) {
      console.error(event);
    };
    request.onsuccess = function() {
      let db = request.result;
      let tx = db.transaction("goals", "readwrite");
      let store = tx.objectStore("goals");
      store.add(value);
      tx.oncomplete = function(event) {
        db.close();
        console.info(event);
        resolve(event.type.toString());
      };

      tx.onerror = function(event) {
        console.error(event);
        reject(event.type.toString());
      };
    };
  });
}

function desmountDb() {
  let request = indexedDB.open(BASE);
  let db = request.result;
  if (db.objectStoreNames.length == 0) {
    db.close();
    let del = indexedDB.deleteDatabase(BASE);
    del.onsuccess = function(event) {
      console.info(event);
      alert("hi")
    };
  }
}

export default {
  addGoal,
  mountDb,
  desmountDb
};
