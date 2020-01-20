import utils from './utils.js';

const dbName = 'db1';
let dbBookmark;

function init () {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(dbName);
    request.onerror = function (event) {
      reject(event);
    };
    request.onsuccess = function (event) {
      resolve(request.result);
    };
    request.onupgradeneeded = function (event) {
      console.log('upgrade');
      const db = event.target.result;
      var objectStore;
      if (!db.objectStoreNames.contains('bookmark')) {
        objectStore = db.createObjectStore('bookmark', { keyPath: 'url'  });
      }
    }  
  })
}

function getDB() {
  return new Promise((resolve, reject) => {
    if (dbBookmark) {
      resolve(dbBookmark);
    } else {
      init().then((db)=>{
        dbBookmark = db;
        resolve(db);
      });
    }
  })
}

function saveBookmark(title, url) {
  return new Promise((resolve, reject)=>{
    const data = {title, url, timestamp: utils.currentTimestamp()};

    getDB().then(db=>{
      const getRequest = db.transaction(['bookmark']).objectStore('bookmark').get(url);
      
      getRequest.onsuccess = function(event) {
        if (getRequest.result) {
          const putReq = db.transaction(['bookmark'], 'readwrite').objectStore('bookmark').put(data);
          putReq.onsuccess = function(event) {
            console.log('db-update', event, data);
            resolve({type:'update', data});
          }
          putReq.onerror = function (event) {
            console.log('db-update-error: ', event);
            reject(event);
          }
        } else {
          const addReq = db.transaction(['bookmark'], 'readwrite').objectStore('bookmark').add(data);
          addReq.onsuccess = function(event) {
            console.log('db-save', event, data);
            resolve({type:'create', data});
          }
          addReq.onerror = function (event) {
            console.log('db-save-error: ', event);
            reject(event);
          }
        }
      };
      getRequest.onerror = function(event) {
        reject(event);
      }


    })
  })
};

function loadAllBookmark() {
  return new Promise((resolve, reject)=>{
    getDB().then((db)=>{
      let bookmarks = [];
      const objectStore = db.transaction('bookmark').objectStore('bookmark');
      objectStore.openCursor().onsuccess = function (event) {
        var cursor = event.target.result;
      
        if (cursor) {
          bookmarks.unshift(cursor.value);
          cursor.continue();
        } else {
          // timestamp DESC
          resolve(bookmarks.sort((b1,b2)=>{return b2.timestamp-b1.timestamp}));
        }
      };
    })
  })
}

function removeBookmarkByUrl(url) {
  getDB().then((db)=>{
    const request = db.transaction(['bookmark'], 'readwrite').objectStore('bookmark').delete(url);
    request.onsuccess = function(event) {
      console.log('db-delete', event);
    }
    request.onerror = function (event) {
    }
  });
}

export default {
  loadAllBookmark,
  saveBookmark,
  removeBookmarkByUrl
}