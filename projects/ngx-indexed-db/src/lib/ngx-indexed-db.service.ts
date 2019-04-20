import { Injectable } from '@angular/core';
// rxjs
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable({
  providedIn: 'root'
})
export class NgxIndexedDbService {

  /**
   * The Database
   *
   */
  db: IDBDatabase;

  constructor() { }

  /**
   * Opens the database.
   *
   */

  openDBAsync(dbName: string, objectStore: string, version: number): Observable<any> {
    return new Observable((observer: Observer<string>) => {
      // Opens DB.
      const request: IDBOpenDBRequest = indexedDB.open(dbName, version);
      // Success.
      request.onsuccess = (event: Event) => {
        this.db = (<IDBOpenDBRequest>event.target).result;
        observer.next((<IDBOpenDBRequest>event.target).readyState);
        observer.complete();
      };
      // Error.
      request.onerror = (event: Event) => {
        console.error('IndexedDB service: ', (<IDBOpenDBRequest>event.target).error.name);
        observer.error((<IDBOpenDBRequest>event.target).error.name);
      };
      // DB does not exist, create it.
      request.onupgradeneeded = (event: Event) => {
        this.db = (<IDBOpenDBRequest>event.target).result;
        // ObjectStore and calls the createStares method
        const object: IDBObjectStore = this.db.createObjectStore(objectStore, {autoIncrement: false});
      };
      // IDBOpenDBRequest is blocked
      request.onblocked = (event: Event) => {
        console.error('IndexedDB service: ', (<IDBOpenDBRequest>event.target).error.name);
        observer.error((<IDBOpenDBRequest>event.target).error.name);
      };
    });
  }

  /**
   * Gets the object store.
   *
   */

  private getObjectStore(storeName: string, mode: IDBTransactionMode) {
    const tx: IDBTransaction = this.db.transaction(storeName, mode);
    return tx.objectStore(storeName);
  }

  /**
   * Gets all records.
   *
   */

  getAllRecordsAsync(storeName: string) {
    // Gets object store.
    const store: IDBObjectStore = this.getObjectStore(storeName, 'readonly');

    return new Observable((observer: Observer<any>) => {
      // Open cursor
      const request: IDBRequest = store.openCursor();
      // Success.
      request.onsuccess = (event: Event) => {
        const cursor: IDBCursorWithValue = (<IDBRequest>event.target).result;
        if (cursor) {
          observer.next({key: cursor.key, value: cursor.value});
          cursor.continue();
        } else {
          observer.complete();
        }
      };
      // Error.
      request.onerror = (event: Event) => {
        console.error('IndexedDB service:', (<IDBRequest>event.target).error.name);
        observer.error((<IDBRequest>event.target).error.name);
      };
    });
  }

  /**
   * Gets record by key.
   *
   */

  getRecordAsync(storeName: string, key: string) {
    // Gets the object store.
    const store: IDBObjectStore = this.getObjectStore(storeName, 'readonly');

    return new Observable((observer: Observer<any>) => {
      // Gets record by key.
      const request: IDBRequest = store.get(key);
      // Success.
      request.onsuccess = (event: Event) => {
        observer.next(request.result);
        observer.complete();
      };
      // Error.
      request.onerror = (event: Event) => {
        console.error('IndexedDB service:', (<IDBRequest>event.target).error.name);
        observer.error((<IDBRequest>event.target).error.name);
      };
    });
  }

  /**
   * Adds a record.
   *
   */

  addRecordAsync(storeName: string, key: string, record: any) {
    // Gets the object store.
    const store: IDBObjectStore = this.getObjectStore(storeName, 'readwrite');

    return new Observable((observer: Observer<string>) => {
      // Adds a new record.
      const request: IDBRequest = store.put(record, key); // insert or update (put), different from (add)
      // Sucess.
      request.onsuccess = (event: Event) => {
        observer.next((<IDBRequest>event.target).readyState);
        observer.complete();
      };
      // Error.
      request.onerror = (event: Event) => {
        console.error('IndexedDB Service:', (<IDBRequest>event.target).error.name);
        observer.error((<IDBRequest>event.target).error.name);
      };
    });
  }

  /**
   * Deletes a record.
   *
   */

  deleteRecordAsync(storeName: string, key: string) {
    // Gets the object store.
    const store: IDBObjectStore = this.getObjectStore(storeName, 'readwrite');

    return new Observable((observer: Observer<string>) => {
        const request: IDBRequest = store.delete(key); // Deletes the record by the key.
        // Success.
        request.onsuccess = (event: Event) => {
            // console.log('SUCCESS EVENT', event);
            observer.next((<IDBRequest>event.target).readyState);
            observer.complete();

        };
        // Error.
        request.onerror = (event: Event) => {
            console.error('IndexedDB service:', (<IDBRequest>event.target).error.name);
            observer.error((<IDBRequest>event.target).error.name);
        };
    });
  }

  /**
   * Edits a record.
   *
   */

  editRecordAsync(storeName: string, key: string, record: any) {
    // redundant (addRecordAsync use IDBObjectStore.put function to add or change)
    return this.addRecordAsync(storeName, key, record);
  }

  /**
   * Clears an object store
   *
   */

  clearObjectStoreAsync(storeName: string) {
    // Gets the object store.
    const store: IDBObjectStore = this.getObjectStore(storeName, 'readwrite');

    return new Observable((observer: Observer<string>) => {
      // Clear  store.
      const request: IDBRequest = store.clear(); // Clears the object store.
        // Success.
        request.onsuccess = (event: Event) => {
            observer.next((<IDBRequest>event.target).readyState);
            observer.complete();
        };
        // Error.
        request.onerror = (event: Event) => {
            console.error('IndexedDB service:', (<IDBRequest>event.target).error.name);
            observer.error((<IDBRequest>event.target).error.name);
        };
    });
  }

  /**
   * Closes the database;
   *
   */

  closeDB() {
    this.db.close();
  }

}
