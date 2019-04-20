import { Injectable, defineInjectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxIndexedDbService = /** @class */ (function () {
    function NgxIndexedDbService() {
    }
    /**
     * Opens the database.
     *
     */
    /**
     * Opens the database.
     *
     * @param {?} dbName
     * @param {?} objectStore
     * @param {?} version
     * @return {?}
     */
    NgxIndexedDbService.prototype.openDBAsync = /**
     * Opens the database.
     *
     * @param {?} dbName
     * @param {?} objectStore
     * @param {?} version
     * @return {?}
     */
    function (dbName, objectStore, version) {
        var _this = this;
        return new Observable((/**
         * @param {?} observer
         * @return {?}
         */
        function (observer) {
            // Opens DB.
            /** @type {?} */
            var request = indexedDB.open(dbName, version);
            // Success.
            request.onsuccess = (/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                _this.db = ((/** @type {?} */ (event.target))).result;
                observer.next(((/** @type {?} */ (event.target))).readyState);
                observer.complete();
            });
            // Error.
            request.onerror = (/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                console.error('IndexedDB service: ', ((/** @type {?} */ (event.target))).error.name);
                observer.error(((/** @type {?} */ (event.target))).error.name);
            });
            // DB does not exist, create it.
            request.onupgradeneeded = (/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                _this.db = ((/** @type {?} */ (event.target))).result;
                // ObjectStore and calls the createStares method
                /** @type {?} */
                var object = _this.db.createObjectStore(objectStore, { autoIncrement: false });
            });
            // IDBOpenDBRequest is blocked
            request.onblocked = (/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                console.error('IndexedDB service: ', ((/** @type {?} */ (event.target))).error.name);
                observer.error(((/** @type {?} */ (event.target))).error.name);
            });
        }));
    };
    /**
     * Gets the object store.
     *
     */
    /**
     * Gets the object store.
     *
     * @private
     * @param {?} storeName
     * @param {?} mode
     * @return {?}
     */
    NgxIndexedDbService.prototype.getObjectStore = /**
     * Gets the object store.
     *
     * @private
     * @param {?} storeName
     * @param {?} mode
     * @return {?}
     */
    function (storeName, mode) {
        /** @type {?} */
        var tx = this.db.transaction(storeName, mode);
        return tx.objectStore(storeName);
    };
    /**
     * Gets all records.
     *
     */
    /**
     * Gets all records.
     *
     * @param {?} storeName
     * @return {?}
     */
    NgxIndexedDbService.prototype.getAllRecordsAsync = /**
     * Gets all records.
     *
     * @param {?} storeName
     * @return {?}
     */
    function (storeName) {
        // Gets object store.
        /** @type {?} */
        var store = this.getObjectStore(storeName, 'readonly');
        return new Observable((/**
         * @param {?} observer
         * @return {?}
         */
        function (observer) {
            // Open cursor
            /** @type {?} */
            var request = store.openCursor();
            // Success.
            request.onsuccess = (/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                /** @type {?} */
                var cursor = ((/** @type {?} */ (event.target))).result;
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
            function (event) {
                console.error('IndexedDB service:', ((/** @type {?} */ (event.target))).error.name);
                observer.error(((/** @type {?} */ (event.target))).error.name);
            });
        }));
    };
    /**
     * Gets record by key.
     *
     */
    /**
     * Gets record by key.
     *
     * @param {?} storeName
     * @param {?} key
     * @return {?}
     */
    NgxIndexedDbService.prototype.getRecordAsync = /**
     * Gets record by key.
     *
     * @param {?} storeName
     * @param {?} key
     * @return {?}
     */
    function (storeName, key) {
        // Gets the object store.
        /** @type {?} */
        var store = this.getObjectStore(storeName, 'readonly');
        return new Observable((/**
         * @param {?} observer
         * @return {?}
         */
        function (observer) {
            // Gets record by key.
            /** @type {?} */
            var request = store.get(key);
            // Success.
            request.onsuccess = (/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                observer.next(request.result);
                observer.complete();
            });
            // Error.
            request.onerror = (/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                console.error('IndexedDB service:', ((/** @type {?} */ (event.target))).error.name);
                observer.error(((/** @type {?} */ (event.target))).error.name);
            });
        }));
    };
    /**
     * Adds a record.
     *
     */
    /**
     * Adds a record.
     *
     * @param {?} storeName
     * @param {?} key
     * @param {?} record
     * @return {?}
     */
    NgxIndexedDbService.prototype.addRecordAsync = /**
     * Adds a record.
     *
     * @param {?} storeName
     * @param {?} key
     * @param {?} record
     * @return {?}
     */
    function (storeName, key, record) {
        // Gets the object store.
        /** @type {?} */
        var store = this.getObjectStore(storeName, 'readwrite');
        return new Observable((/**
         * @param {?} observer
         * @return {?}
         */
        function (observer) {
            // Adds a new record.
            /** @type {?} */
            var request = store.put(record, key);
            // Sucess.
            request.onsuccess = (/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                observer.next(((/** @type {?} */ (event.target))).readyState);
                observer.complete();
            });
            // Error.
            request.onerror = (/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                console.error('IndexedDB Service:', ((/** @type {?} */ (event.target))).error.name);
                observer.error(((/** @type {?} */ (event.target))).error.name);
            });
        }));
    };
    /**
     * Deletes a record.
     *
     */
    /**
     * Deletes a record.
     *
     * @param {?} storeName
     * @param {?} key
     * @return {?}
     */
    NgxIndexedDbService.prototype.deleteRecordAsync = /**
     * Deletes a record.
     *
     * @param {?} storeName
     * @param {?} key
     * @return {?}
     */
    function (storeName, key) {
        // Gets the object store.
        /** @type {?} */
        var store = this.getObjectStore(storeName, 'readwrite');
        return new Observable((/**
         * @param {?} observer
         * @return {?}
         */
        function (observer) {
            /** @type {?} */
            var request = store.delete(key);
            // Success.
            request.onsuccess = (/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                // console.log('SUCCESS EVENT', event);
                observer.next(((/** @type {?} */ (event.target))).readyState);
                observer.complete();
            });
            // Error.
            request.onerror = (/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                console.error('IndexedDB service:', ((/** @type {?} */ (event.target))).error.name);
                observer.error(((/** @type {?} */ (event.target))).error.name);
            });
        }));
    };
    /**
     * Edits a record.
     *
     */
    /**
     * Edits a record.
     *
     * @param {?} storeName
     * @param {?} key
     * @param {?} record
     * @return {?}
     */
    NgxIndexedDbService.prototype.editRecordAsync = /**
     * Edits a record.
     *
     * @param {?} storeName
     * @param {?} key
     * @param {?} record
     * @return {?}
     */
    function (storeName, key, record) {
        // redundant (addRecordAsync use IDBObjectStore.put function to add or change)
        return this.addRecordAsync(storeName, key, record);
    };
    /**
     * Clears an object store
     *
     */
    /**
     * Clears an object store
     *
     * @param {?} storeName
     * @return {?}
     */
    NgxIndexedDbService.prototype.clearObjectStoreAsync = /**
     * Clears an object store
     *
     * @param {?} storeName
     * @return {?}
     */
    function (storeName) {
        // Gets the object store.
        /** @type {?} */
        var store = this.getObjectStore(storeName, 'readwrite');
        return new Observable((/**
         * @param {?} observer
         * @return {?}
         */
        function (observer) {
            // Clear  store.
            /** @type {?} */
            var request = store.clear();
            // Success.
            request.onsuccess = (/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                observer.next(((/** @type {?} */ (event.target))).readyState);
                observer.complete();
            });
            // Error.
            request.onerror = (/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                console.error('IndexedDB service:', ((/** @type {?} */ (event.target))).error.name);
                observer.error(((/** @type {?} */ (event.target))).error.name);
            });
        }));
    };
    /**
     * Closes the database;
     *
     */
    /**
     * Closes the database;
     *
     * @return {?}
     */
    NgxIndexedDbService.prototype.closeDB = /**
     * Closes the database;
     *
     * @return {?}
     */
    function () {
        this.db.close();
    };
    NgxIndexedDbService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    NgxIndexedDbService.ctorParameters = function () { return []; };
    /** @nocollapse */ NgxIndexedDbService.ngInjectableDef = defineInjectable({ factory: function NgxIndexedDbService_Factory() { return new NgxIndexedDbService(); }, token: NgxIndexedDbService, providedIn: "root" });
    return NgxIndexedDbService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxIndexedDbModule = /** @class */ (function () {
    function NgxIndexedDbModule() {
    }
    NgxIndexedDbModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [],
                    imports: [],
                    exports: []
                },] }
    ];
    return NgxIndexedDbModule;
}());

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
