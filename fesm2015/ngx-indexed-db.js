import { Injectable, defineInjectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxIndexedDbService {
    constructor() { }
    /**
     * Opens the database.
     *
     * @param {?} dbName
     * @param {?} objectStore
     * @param {?} version
     * @return {?}
     */
    openDBAsync(dbName, objectStore, version) {
        return new Observable((/**
         * @param {?} observer
         * @return {?}
         */
        (observer) => {
            // Opens DB.
            /** @type {?} */
            const request = indexedDB.open(dbName, version);
            // Success.
            request.onsuccess = (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                this.db = ((/** @type {?} */ (event.target))).result;
                observer.next(((/** @type {?} */ (event.target))).readyState);
                observer.complete();
            });
            // Error.
            request.onerror = (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                console.error('IndexedDB service: ', ((/** @type {?} */ (event.target))).error.name);
                observer.error(((/** @type {?} */ (event.target))).error.name);
            });
            // DB does not exist, create it.
            request.onupgradeneeded = (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                this.db = ((/** @type {?} */ (event.target))).result;
                // ObjectStore and calls the createStares method
                /** @type {?} */
                const object = this.db.createObjectStore(objectStore, { autoIncrement: false });
            });
            // IDBOpenDBRequest is blocked
            request.onblocked = (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                console.error('IndexedDB service: ', ((/** @type {?} */ (event.target))).error.name);
                observer.error(((/** @type {?} */ (event.target))).error.name);
            });
        }));
    }
    /**
     * Gets the object store.
     *
     * @private
     * @param {?} storeName
     * @param {?} mode
     * @return {?}
     */
    getObjectStore(storeName, mode) {
        /** @type {?} */
        const tx = this.db.transaction(storeName, mode);
        return tx.objectStore(storeName);
    }
    /**
     * Gets all records.
     *
     * @param {?} storeName
     * @return {?}
     */
    getAllRecordsAsync(storeName) {
        // Gets object store.
        /** @type {?} */
        const store = this.getObjectStore(storeName, 'readonly');
        return new Observable((/**
         * @param {?} observer
         * @return {?}
         */
        (observer) => {
            // Open cursor
            /** @type {?} */
            const request = store.openCursor();
            // Success.
            request.onsuccess = (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                /** @type {?} */
                const cursor = ((/** @type {?} */ (event.target))).result;
                if (cursor) {
                    observer.next({ key: cursor.key, value: cursor.value });
                    cursor.continue();
                }
                else {
                    observer.complete();
                }
            });
            // Error.
            request.onerror = (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                console.error('IndexedDB service:', ((/** @type {?} */ (event.target))).error.name);
                observer.error(((/** @type {?} */ (event.target))).error.name);
            });
        }));
    }
    /**
     * Gets record by key.
     *
     * @param {?} storeName
     * @param {?} key
     * @return {?}
     */
    getRecordAsync(storeName, key) {
        // Gets the object store.
        /** @type {?} */
        const store = this.getObjectStore(storeName, 'readonly');
        return new Observable((/**
         * @param {?} observer
         * @return {?}
         */
        (observer) => {
            // Gets record by key.
            /** @type {?} */
            const request = store.get(key);
            // Success.
            request.onsuccess = (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                observer.next(request.result);
                observer.complete();
            });
            // Error.
            request.onerror = (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                console.error('IndexedDB service:', ((/** @type {?} */ (event.target))).error.name);
                observer.error(((/** @type {?} */ (event.target))).error.name);
            });
        }));
    }
    /**
     * Adds a record.
     *
     * @param {?} storeName
     * @param {?} key
     * @param {?} record
     * @return {?}
     */
    addRecordAsync(storeName, key, record) {
        // Gets the object store.
        /** @type {?} */
        const store = this.getObjectStore(storeName, 'readwrite');
        return new Observable((/**
         * @param {?} observer
         * @return {?}
         */
        (observer) => {
            // Adds a new record.
            /** @type {?} */
            const request = store.put(record, key);
            // Sucess.
            request.onsuccess = (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                observer.next(((/** @type {?} */ (event.target))).readyState);
                observer.complete();
            });
            // Error.
            request.onerror = (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                console.error('IndexedDB Service:', ((/** @type {?} */ (event.target))).error.name);
                observer.error(((/** @type {?} */ (event.target))).error.name);
            });
        }));
    }
    /**
     * Deletes a record.
     *
     * @param {?} storeName
     * @param {?} key
     * @return {?}
     */
    deleteRecordAsync(storeName, key) {
        // Gets the object store.
        /** @type {?} */
        const store = this.getObjectStore(storeName, 'readwrite');
        return new Observable((/**
         * @param {?} observer
         * @return {?}
         */
        (observer) => {
            /** @type {?} */
            const request = store.delete(key);
            // Success.
            request.onsuccess = (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                // console.log('SUCCESS EVENT', event);
                observer.next(((/** @type {?} */ (event.target))).readyState);
                observer.complete();
            });
            // Error.
            request.onerror = (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                console.error('IndexedDB service:', ((/** @type {?} */ (event.target))).error.name);
                observer.error(((/** @type {?} */ (event.target))).error.name);
            });
        }));
    }
    /**
     * Edits a record.
     *
     * @param {?} storeName
     * @param {?} key
     * @param {?} record
     * @return {?}
     */
    editRecordAsync(storeName, key, record) {
        // redundant (addRecordAsync use IDBObjectStore.put function to add or change)
        return this.addRecordAsync(storeName, key, record);
    }
    /**
     * Clears an object store
     *
     * @param {?} storeName
     * @return {?}
     */
    clearObjectStoreAsync(storeName) {
        // Gets the object store.
        /** @type {?} */
        const store = this.getObjectStore(storeName, 'readwrite');
        return new Observable((/**
         * @param {?} observer
         * @return {?}
         */
        (observer) => {
            // Clear  store.
            /** @type {?} */
            const request = store.clear();
            // Success.
            request.onsuccess = (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                observer.next(((/** @type {?} */ (event.target))).readyState);
                observer.complete();
            });
            // Error.
            request.onerror = (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                console.error('IndexedDB service:', ((/** @type {?} */ (event.target))).error.name);
                observer.error(((/** @type {?} */ (event.target))).error.name);
            });
        }));
    }
    /**
     * Closes the database;
     *
     * @return {?}
     */
    closeDB() {
        this.db.close();
    }
}
NgxIndexedDbService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
NgxIndexedDbService.ctorParameters = () => [];
/** @nocollapse */ NgxIndexedDbService.ngInjectableDef = defineInjectable({ factory: function NgxIndexedDbService_Factory() { return new NgxIndexedDbService(); }, token: NgxIndexedDbService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxIndexedDbModule {
}
NgxIndexedDbModule.decorators = [
    { type: NgModule, args: [{
                declarations: [],
                imports: [],
                exports: []
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NgxIndexedDbModule, NgxIndexedDbService };
//# sourceMappingURL=ngx-indexed-db.js.map
