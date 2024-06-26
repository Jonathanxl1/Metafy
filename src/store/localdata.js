const BASE = "Metafy";
const table = "goals";
const config = "config";

export function mountDb() {
  let request = indexedDB.open(BASE);

  request.onupgradeneeded = function() {
    let db = request.result;
    let goals = db.createObjectStore(table, {
      autoIncrement: true
    });
    goals.createIndex("by_title", "title");
    goals.createIndex("by_status", "status.value");
    let conf = db.createObjectStore(config, { autoIncrement: true });

    conf.createIndex("by_times", "time");
    conf.put({ time: "short", period: 1, value: 3 });
    conf.put({ time: "medium", period: 1, value: 6 });
    conf.put({ time: "long", period: 2, value: 1 });
  };

  request.onsuccess = function(event) {
    let db = request.result;
    db.close();
    console.info(event.type);
  };

  request.onerror = function(event) {
    let db = request.result;
    db.close();
    console.error(event);
  };
}

export function addGoal(value) {
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
        db.close();
        reject(event.type.toString());
      };
    };
  });
}

export function desmountDb() {
  let request = indexedDB.open(BASE);
  let db = request.result;
  if (db.objectStoreNames.length == 0) {
    db.close();
    let del = indexedDB.deleteDatabase(BASE);
    del.onsuccess = function(event) {
      console.info(event);
      // alert("hi");
    };
  }
}

export function resetAll() {
  return new Promise(function(resolve, reject) {
    let request = indexedDB.open(BASE);
    request.onsuccess = function() {
      let db = request.result;
      let tx = db.transaction("goals", "readwrite");
      let goals = tx.objectStore("goals");
      goals.clear();
      // let tx2 = db.transaction("config", "readwrite");
      // let config = tx2.objectStore("config");
      // config.clear();
      tx.oncomplete = function() {
        db.close();
        resolve(true);
      };

      tx.onerror = function() {
        db.close();
        reject(false);
      };
    };
  });
}

export function retriveGoals() {
  return new Promise(function(resolve, reject) {
    let request = indexedDB.open("Metafy");
    request.onsuccess = function() {
      let db = request.result;
      if (db.objectStoreNames.length > 0) {
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
      } else {
        db.close();
        console.log("No Goals");
      }
    };
  });
}

export function retriveGoal(value) {
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
        db.close();
        reject(event);
      };
    };
  });
}

export function retriveConfig() {
  return new Promise(function(resolve, reject) {
    let request = indexedDB.open("Metafy");
    request.onsuccess = function() {
      let db = request.result;
      let tx = db.transaction("config", "readwrite");
      let store = tx.objectStore("config");

      let index = store.index("by_times");
      let short = index.openCursor(IDBKeyRange.only("short"));
      let medium = index.openCursor(IDBKeyRange.only("medium"));
      let long = index.openCursor(IDBKeyRange.only("long"));

      tx.oncomplete = function() {
        let s = short.result;
        let l = long.result;
        let m = medium.result;

        let data = {
          short: s.value,
          medium: m.value,
          long: l.value
        };
        db.close();
        resolve(data);
      };

      tx.onerror = function(event) {
        reject(event);
      };
    };
  });
}

export function addConfig(short, medium, long) {
  return new Promise(function(resolve, reject) {
    let request = indexedDB.open(BASE);
    request.onerror = function(event) {
      console.error(event);
    };
    request.onsuccess = function() {
      let db = request.result;
      let tx = db.transaction("config", "readwrite");
      let store = tx.objectStore("config");
      store.put(short, 1);
      store.put(medium, 2);
      store.put(long, 3);
      tx.oncomplete = function(event) {
        db.close();
        console.info(store);
        resolve(event.type.toString());
      };

      tx.onerror = function(event) {
        console.error(event);
        db.close();
        reject(event.type.toString());
      };
    };
  });
}

export function updateGoal(value, key) {
  return new Promise(function(resolve, reject) {
    let request = indexedDB.open(BASE);
    request.onsuccess = function() {
      let db = request.result;

      let tx = db.transaction("goals", "readwrite");
      let store = tx.objectStore("goals");
      store.put(value, Number(key));

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

export function deleteGoal(value) {
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
