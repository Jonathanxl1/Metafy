const BASE = "Metafy";
const table = "goals";
const config = "config";

function mountDb() {
  let request = indexedDB.open(BASE);

  request.onupgradeneeded = function() {
    let db = request.result;
    let goals = db.createObjectStore(table, {
      autoIncrement: true
    });
    goals.createIndex("by_title", "title");
    goals.createIndex("by_status", "status.value");
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
        console.info(store);
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
      alert("hi");
    };
  }
}

function retriveGoals() {
  return new Promise(function(resolve, reject) {
    let request = indexedDB.open("Metafy");
      request.onsuccess = function() {
      let db = request.result;
      let tx = db.transaction("goals", "readwrite");
      let store = tx.objectStore("goals");
      let values = store.getAll();
      var keys = store.getAllKeys();

      tx.oncomplete = function() {
        let k = keys.result;
        let v = values.result;
        let data = k.reduce((a, k, i) => ({ ...a, [`${k}`]: v[i] }), {});
        db.close();
        resolve(data);
        console.info(data);
      };

      tx.onerror = function(event) {
        reject(event);
      };
    };
  });
}

function retriveGoal(value) {
  return new Promise(function(resolve, reject) {
    let request = indexedDB.open("Metafy");
    request.onsuccess = function() {
      let db = request.result;
      let tx = db.transaction("goals", "readwrite");
      let store = tx.objectStore("goals");
      

      let data = store.get(Number(value));
      tx.oncomplete = function() {
        db.close();
        resolve(data.result);
      };

      tx.onerror = function(event) {
        reject(event);
      };
    };
  });
}

function updateGoal(value,key) {
  return new Promise(function(resolve, reject) {
    let request = indexedDB.open(BASE);
    request.onsuccess = function() {
      let db = request.result;

      let tx = db.transaction("goals", "readwrite");
      let store = tx.objectStore("goals");
      store.put(value,Number(key));

      tx.oncomplete = function() {
        db.close();
        resolve(true);
      };

      tx.onerror = function(e) {
        reject(false);
        console.error(e);
      };
    };
  });
}

function deleteGoal(value) {
  return new Promise(function(resolve, reject) {
    let request = indexedDB.open(BASE);
    request.onsuccess = function() {
      let db = request.result;
      let tx = db.transaction(table, "readwrite");
      let store = tx.objectStore(table);
      store.delete(value);
      tx.oncomplete = function() {
        db.close();
        resolve(true);
      };

      tx.onerror = function(e) {
        reject(false);
        console.error(e);
      };
    };
  });
}

export default {
  addGoal,
  updateGoal,
  deleteGoal,
  desmountDb,
  mountDb,
  retriveGoal,
  retriveGoals
};
