/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
// rxjs
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
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
    /** @nocollapse */ NgxIndexedDbService.ngInjectableDef = i0.defineInjectable({ factory: function NgxIndexedDbService_Factory() { return new NgxIndexedDbService(); }, token: NgxIndexedDbService, providedIn: "root" });
    return NgxIndexedDbService;
}());
export { NgxIndexedDbService };
if (false) {
    /**
     * The Database
     *
     * @type {?}
     */
    NgxIndexedDbService.prototype.db;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWluZGV4ZWQtZGIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1pbmRleGVkLWRiLyIsInNvdXJjZXMiOlsibGliL25neC1pbmRleGVkLWRiLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBRTNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7O0FBR2xDO0lBV0U7SUFBZ0IsQ0FBQztJQUVqQjs7O09BR0c7Ozs7Ozs7OztJQUVILHlDQUFXOzs7Ozs7OztJQUFYLFVBQVksTUFBYyxFQUFFLFdBQW1CLEVBQUUsT0FBZTtRQUFoRSxpQkEyQkM7UUExQkMsT0FBTyxJQUFJLFVBQVU7Ozs7UUFBQyxVQUFDLFFBQTBCOzs7Z0JBRXpDLE9BQU8sR0FBcUIsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDO1lBQ2pFLFdBQVc7WUFDWCxPQUFPLENBQUMsU0FBUzs7OztZQUFHLFVBQUMsS0FBWTtnQkFDL0IsS0FBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLG1CQUFrQixLQUFLLENBQUMsTUFBTSxFQUFBLENBQUMsQ0FBQyxNQUFNLENBQUM7Z0JBQ2xELFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxtQkFBa0IsS0FBSyxDQUFDLE1BQU0sRUFBQSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQzNELFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN0QixDQUFDLENBQUEsQ0FBQztZQUNGLFNBQVM7WUFDVCxPQUFPLENBQUMsT0FBTzs7OztZQUFHLFVBQUMsS0FBWTtnQkFDN0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLG1CQUFrQixLQUFLLENBQUMsTUFBTSxFQUFBLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xGLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxtQkFBa0IsS0FBSyxDQUFDLE1BQU0sRUFBQSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlELENBQUMsQ0FBQSxDQUFDO1lBQ0YsZ0NBQWdDO1lBQ2hDLE9BQU8sQ0FBQyxlQUFlOzs7O1lBQUcsVUFBQyxLQUFZO2dCQUNyQyxLQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsbUJBQWtCLEtBQUssQ0FBQyxNQUFNLEVBQUEsQ0FBQyxDQUFDLE1BQU0sQ0FBQzs7O29CQUU1QyxNQUFNLEdBQW1CLEtBQUksQ0FBQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLEVBQUMsYUFBYSxFQUFFLEtBQUssRUFBQyxDQUFDO1lBQy9GLENBQUMsQ0FBQSxDQUFDO1lBQ0YsOEJBQThCO1lBQzlCLE9BQU8sQ0FBQyxTQUFTOzs7O1lBQUcsVUFBQyxLQUFZO2dCQUMvQixPQUFPLENBQUMsS0FBSyxDQUFDLHFCQUFxQixFQUFFLENBQUMsbUJBQWtCLEtBQUssQ0FBQyxNQUFNLEVBQUEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbEYsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLG1CQUFrQixLQUFLLENBQUMsTUFBTSxFQUFBLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUQsQ0FBQyxDQUFBLENBQUM7UUFDSixDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7O09BR0c7Ozs7Ozs7OztJQUVLLDRDQUFjOzs7Ozs7OztJQUF0QixVQUF1QixTQUFpQixFQUFFLElBQXdCOztZQUMxRCxFQUFFLEdBQW1CLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUM7UUFDL0QsT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRDs7O09BR0c7Ozs7Ozs7SUFFSCxnREFBa0I7Ozs7OztJQUFsQixVQUFtQixTQUFpQjs7O1lBRTVCLEtBQUssR0FBbUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDO1FBRXhFLE9BQU8sSUFBSSxVQUFVOzs7O1FBQUMsVUFBQyxRQUF1Qjs7O2dCQUV0QyxPQUFPLEdBQWUsS0FBSyxDQUFDLFVBQVUsRUFBRTtZQUM5QyxXQUFXO1lBQ1gsT0FBTyxDQUFDLFNBQVM7Ozs7WUFBRyxVQUFDLEtBQVk7O29CQUN6QixNQUFNLEdBQXVCLENBQUMsbUJBQVksS0FBSyxDQUFDLE1BQU0sRUFBQSxDQUFDLENBQUMsTUFBTTtnQkFDcEUsSUFBSSxNQUFNLEVBQUU7b0JBQ1YsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQztvQkFDdEQsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO2lCQUNuQjtxQkFBTTtvQkFDTCxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7aUJBQ3JCO1lBQ0gsQ0FBQyxDQUFBLENBQUM7WUFDRixTQUFTO1lBQ1QsT0FBTyxDQUFDLE9BQU87Ozs7WUFBRyxVQUFDLEtBQVk7Z0JBQzdCLE9BQU8sQ0FBQyxLQUFLLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxtQkFBWSxLQUFLLENBQUMsTUFBTSxFQUFBLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzNFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxtQkFBWSxLQUFLLENBQUMsTUFBTSxFQUFBLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDeEQsQ0FBQyxDQUFBLENBQUM7UUFDSixDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7O09BR0c7Ozs7Ozs7O0lBRUgsNENBQWM7Ozs7Ozs7SUFBZCxVQUFlLFNBQWlCLEVBQUUsR0FBVzs7O1lBRXJDLEtBQUssR0FBbUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDO1FBRXhFLE9BQU8sSUFBSSxVQUFVOzs7O1FBQUMsVUFBQyxRQUF1Qjs7O2dCQUV0QyxPQUFPLEdBQWUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFDMUMsV0FBVztZQUNYLE9BQU8sQ0FBQyxTQUFTOzs7O1lBQUcsVUFBQyxLQUFZO2dCQUMvQixRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDOUIsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3RCLENBQUMsQ0FBQSxDQUFDO1lBQ0YsU0FBUztZQUNULE9BQU8sQ0FBQyxPQUFPOzs7O1lBQUcsVUFBQyxLQUFZO2dCQUM3QixPQUFPLENBQUMsS0FBSyxDQUFDLG9CQUFvQixFQUFFLENBQUMsbUJBQVksS0FBSyxDQUFDLE1BQU0sRUFBQSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMzRSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsbUJBQVksS0FBSyxDQUFDLE1BQU0sRUFBQSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hELENBQUMsQ0FBQSxDQUFDO1FBQ0osQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7Ozs7SUFFSCw0Q0FBYzs7Ozs7Ozs7SUFBZCxVQUFlLFNBQWlCLEVBQUUsR0FBVyxFQUFFLE1BQVc7OztZQUVsRCxLQUFLLEdBQW1CLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQztRQUV6RSxPQUFPLElBQUksVUFBVTs7OztRQUFDLFVBQUMsUUFBMEI7OztnQkFFekMsT0FBTyxHQUFlLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQztZQUNsRCxVQUFVO1lBQ1YsT0FBTyxDQUFDLFNBQVM7Ozs7WUFBRyxVQUFDLEtBQVk7Z0JBQy9CLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxtQkFBWSxLQUFLLENBQUMsTUFBTSxFQUFBLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDckQsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3RCLENBQUMsQ0FBQSxDQUFDO1lBQ0YsU0FBUztZQUNULE9BQU8sQ0FBQyxPQUFPOzs7O1lBQUcsVUFBQyxLQUFZO2dCQUM3QixPQUFPLENBQUMsS0FBSyxDQUFDLG9CQUFvQixFQUFFLENBQUMsbUJBQVksS0FBSyxDQUFDLE1BQU0sRUFBQSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMzRSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsbUJBQVksS0FBSyxDQUFDLE1BQU0sRUFBQSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hELENBQUMsQ0FBQSxDQUFDO1FBQ0osQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7OztJQUVILCtDQUFpQjs7Ozs7OztJQUFqQixVQUFrQixTQUFpQixFQUFFLEdBQVc7OztZQUV4QyxLQUFLLEdBQW1CLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQztRQUV6RSxPQUFPLElBQUksVUFBVTs7OztRQUFDLFVBQUMsUUFBMEI7O2dCQUN2QyxPQUFPLEdBQWUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7WUFDN0MsV0FBVztZQUNYLE9BQU8sQ0FBQyxTQUFTOzs7O1lBQUcsVUFBQyxLQUFZO2dCQUM3Qix1Q0FBdUM7Z0JBQ3ZDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxtQkFBWSxLQUFLLENBQUMsTUFBTSxFQUFBLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDckQsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBRXhCLENBQUMsQ0FBQSxDQUFDO1lBQ0YsU0FBUztZQUNULE9BQU8sQ0FBQyxPQUFPOzs7O1lBQUcsVUFBQyxLQUFZO2dCQUMzQixPQUFPLENBQUMsS0FBSyxDQUFDLG9CQUFvQixFQUFFLENBQUMsbUJBQVksS0FBSyxDQUFDLE1BQU0sRUFBQSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMzRSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsbUJBQVksS0FBSyxDQUFDLE1BQU0sRUFBQSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFELENBQUMsQ0FBQSxDQUFDO1FBQ04sQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7Ozs7SUFFSCw2Q0FBZTs7Ozs7Ozs7SUFBZixVQUFnQixTQUFpQixFQUFFLEdBQVcsRUFBRSxNQUFXO1FBQ3pELDhFQUE4RTtRQUM5RSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7O0lBRUgsbURBQXFCOzs7Ozs7SUFBckIsVUFBc0IsU0FBaUI7OztZQUUvQixLQUFLLEdBQW1CLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQztRQUV6RSxPQUFPLElBQUksVUFBVTs7OztRQUFDLFVBQUMsUUFBMEI7OztnQkFFekMsT0FBTyxHQUFlLEtBQUssQ0FBQyxLQUFLLEVBQUU7WUFDdkMsV0FBVztZQUNYLE9BQU8sQ0FBQyxTQUFTOzs7O1lBQUcsVUFBQyxLQUFZO2dCQUM3QixRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsbUJBQVksS0FBSyxDQUFDLE1BQU0sRUFBQSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3JELFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN4QixDQUFDLENBQUEsQ0FBQztZQUNGLFNBQVM7WUFDVCxPQUFPLENBQUMsT0FBTzs7OztZQUFHLFVBQUMsS0FBWTtnQkFDM0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLG1CQUFZLEtBQUssQ0FBQyxNQUFNLEVBQUEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDM0UsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLG1CQUFZLEtBQUssQ0FBQyxNQUFNLEVBQUEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxRCxDQUFDLENBQUEsQ0FBQztRQUNOLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7O0lBRUgscUNBQU87Ozs7O0lBQVA7UUFDRSxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2xCLENBQUM7O2dCQTdNRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7Ozs4QkFQRDtDQW9OQyxBQS9NRCxJQStNQztTQTVNWSxtQkFBbUI7Ozs7Ozs7SUFNOUIsaUNBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy8gcnhqc1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTmd4SW5kZXhlZERiU2VydmljZSB7XG5cbiAgLyoqXG4gICAqIFRoZSBEYXRhYmFzZVxuICAgKlxuICAgKi9cbiAgZGI6IElEQkRhdGFiYXNlO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgLyoqXG4gICAqIE9wZW5zIHRoZSBkYXRhYmFzZS5cbiAgICpcbiAgICovXG5cbiAgb3BlbkRCQXN5bmMoZGJOYW1lOiBzdHJpbmcsIG9iamVjdFN0b3JlOiBzdHJpbmcsIHZlcnNpb246IG51bWJlcik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogT2JzZXJ2ZXI8c3RyaW5nPikgPT4ge1xuICAgICAgLy8gT3BlbnMgREIuXG4gICAgICBjb25zdCByZXF1ZXN0OiBJREJPcGVuREJSZXF1ZXN0ID0gaW5kZXhlZERCLm9wZW4oZGJOYW1lLCB2ZXJzaW9uKTtcbiAgICAgIC8vIFN1Y2Nlc3MuXG4gICAgICByZXF1ZXN0Lm9uc3VjY2VzcyA9IChldmVudDogRXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5kYiA9ICg8SURCT3BlbkRCUmVxdWVzdD5ldmVudC50YXJnZXQpLnJlc3VsdDtcbiAgICAgICAgb2JzZXJ2ZXIubmV4dCgoPElEQk9wZW5EQlJlcXVlc3Q+ZXZlbnQudGFyZ2V0KS5yZWFkeVN0YXRlKTtcbiAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgIH07XG4gICAgICAvLyBFcnJvci5cbiAgICAgIHJlcXVlc3Qub25lcnJvciA9IChldmVudDogRXZlbnQpID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcignSW5kZXhlZERCIHNlcnZpY2U6ICcsICg8SURCT3BlbkRCUmVxdWVzdD5ldmVudC50YXJnZXQpLmVycm9yLm5hbWUpO1xuICAgICAgICBvYnNlcnZlci5lcnJvcigoPElEQk9wZW5EQlJlcXVlc3Q+ZXZlbnQudGFyZ2V0KS5lcnJvci5uYW1lKTtcbiAgICAgIH07XG4gICAgICAvLyBEQiBkb2VzIG5vdCBleGlzdCwgY3JlYXRlIGl0LlxuICAgICAgcmVxdWVzdC5vbnVwZ3JhZGVuZWVkZWQgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMuZGIgPSAoPElEQk9wZW5EQlJlcXVlc3Q+ZXZlbnQudGFyZ2V0KS5yZXN1bHQ7XG4gICAgICAgIC8vIE9iamVjdFN0b3JlIGFuZCBjYWxscyB0aGUgY3JlYXRlU3RhcmVzIG1ldGhvZFxuICAgICAgICBjb25zdCBvYmplY3Q6IElEQk9iamVjdFN0b3JlID0gdGhpcy5kYi5jcmVhdGVPYmplY3RTdG9yZShvYmplY3RTdG9yZSwge2F1dG9JbmNyZW1lbnQ6IGZhbHNlfSk7XG4gICAgICB9O1xuICAgICAgLy8gSURCT3BlbkRCUmVxdWVzdCBpcyBibG9ja2VkXG4gICAgICByZXF1ZXN0Lm9uYmxvY2tlZCA9IChldmVudDogRXZlbnQpID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcignSW5kZXhlZERCIHNlcnZpY2U6ICcsICg8SURCT3BlbkRCUmVxdWVzdD5ldmVudC50YXJnZXQpLmVycm9yLm5hbWUpO1xuICAgICAgICBvYnNlcnZlci5lcnJvcigoPElEQk9wZW5EQlJlcXVlc3Q+ZXZlbnQudGFyZ2V0KS5lcnJvci5uYW1lKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgb2JqZWN0IHN0b3JlLlxuICAgKlxuICAgKi9cblxuICBwcml2YXRlIGdldE9iamVjdFN0b3JlKHN0b3JlTmFtZTogc3RyaW5nLCBtb2RlOiBJREJUcmFuc2FjdGlvbk1vZGUpIHtcbiAgICBjb25zdCB0eDogSURCVHJhbnNhY3Rpb24gPSB0aGlzLmRiLnRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgbW9kZSk7XG4gICAgcmV0dXJuIHR4Lm9iamVjdFN0b3JlKHN0b3JlTmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbGwgcmVjb3Jkcy5cbiAgICpcbiAgICovXG5cbiAgZ2V0QWxsUmVjb3Jkc0FzeW5jKHN0b3JlTmFtZTogc3RyaW5nKSB7XG4gICAgLy8gR2V0cyBvYmplY3Qgc3RvcmUuXG4gICAgY29uc3Qgc3RvcmU6IElEQk9iamVjdFN0b3JlID0gdGhpcy5nZXRPYmplY3RTdG9yZShzdG9yZU5hbWUsICdyZWFkb25seScpO1xuXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogT2JzZXJ2ZXI8YW55PikgPT4ge1xuICAgICAgLy8gT3BlbiBjdXJzb3JcbiAgICAgIGNvbnN0IHJlcXVlc3Q6IElEQlJlcXVlc3QgPSBzdG9yZS5vcGVuQ3Vyc29yKCk7XG4gICAgICAvLyBTdWNjZXNzLlxuICAgICAgcmVxdWVzdC5vbnN1Y2Nlc3MgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGN1cnNvcjogSURCQ3Vyc29yV2l0aFZhbHVlID0gKDxJREJSZXF1ZXN0PmV2ZW50LnRhcmdldCkucmVzdWx0O1xuICAgICAgICBpZiAoY3Vyc29yKSB7XG4gICAgICAgICAgb2JzZXJ2ZXIubmV4dCh7a2V5OiBjdXJzb3Iua2V5LCB2YWx1ZTogY3Vyc29yLnZhbHVlfSk7XG4gICAgICAgICAgY3Vyc29yLmNvbnRpbnVlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIC8vIEVycm9yLlxuICAgICAgcmVxdWVzdC5vbmVycm9yID0gKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdJbmRleGVkREIgc2VydmljZTonLCAoPElEQlJlcXVlc3Q+ZXZlbnQudGFyZ2V0KS5lcnJvci5uYW1lKTtcbiAgICAgICAgb2JzZXJ2ZXIuZXJyb3IoKDxJREJSZXF1ZXN0PmV2ZW50LnRhcmdldCkuZXJyb3IubmFtZSk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgcmVjb3JkIGJ5IGtleS5cbiAgICpcbiAgICovXG5cbiAgZ2V0UmVjb3JkQXN5bmMoc3RvcmVOYW1lOiBzdHJpbmcsIGtleTogc3RyaW5nKSB7XG4gICAgLy8gR2V0cyB0aGUgb2JqZWN0IHN0b3JlLlxuICAgIGNvbnN0IHN0b3JlOiBJREJPYmplY3RTdG9yZSA9IHRoaXMuZ2V0T2JqZWN0U3RvcmUoc3RvcmVOYW1lLCAncmVhZG9ubHknKTtcblxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXI6IE9ic2VydmVyPGFueT4pID0+IHtcbiAgICAgIC8vIEdldHMgcmVjb3JkIGJ5IGtleS5cbiAgICAgIGNvbnN0IHJlcXVlc3Q6IElEQlJlcXVlc3QgPSBzdG9yZS5nZXQoa2V5KTtcbiAgICAgIC8vIFN1Y2Nlc3MuXG4gICAgICByZXF1ZXN0Lm9uc3VjY2VzcyA9IChldmVudDogRXZlbnQpID0+IHtcbiAgICAgICAgb2JzZXJ2ZXIubmV4dChyZXF1ZXN0LnJlc3VsdCk7XG4gICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICB9O1xuICAgICAgLy8gRXJyb3IuXG4gICAgICByZXF1ZXN0Lm9uZXJyb3IgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0luZGV4ZWREQiBzZXJ2aWNlOicsICg8SURCUmVxdWVzdD5ldmVudC50YXJnZXQpLmVycm9yLm5hbWUpO1xuICAgICAgICBvYnNlcnZlci5lcnJvcigoPElEQlJlcXVlc3Q+ZXZlbnQudGFyZ2V0KS5lcnJvci5uYW1lKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIHJlY29yZC5cbiAgICpcbiAgICovXG5cbiAgYWRkUmVjb3JkQXN5bmMoc3RvcmVOYW1lOiBzdHJpbmcsIGtleTogc3RyaW5nLCByZWNvcmQ6IGFueSkge1xuICAgIC8vIEdldHMgdGhlIG9iamVjdCBzdG9yZS5cbiAgICBjb25zdCBzdG9yZTogSURCT2JqZWN0U3RvcmUgPSB0aGlzLmdldE9iamVjdFN0b3JlKHN0b3JlTmFtZSwgJ3JlYWR3cml0ZScpO1xuXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogT2JzZXJ2ZXI8c3RyaW5nPikgPT4ge1xuICAgICAgLy8gQWRkcyBhIG5ldyByZWNvcmQuXG4gICAgICBjb25zdCByZXF1ZXN0OiBJREJSZXF1ZXN0ID0gc3RvcmUucHV0KHJlY29yZCwga2V5KTsgLy8gaW5zZXJ0IG9yIHVwZGF0ZSAocHV0KSwgZGlmZmVyZW50IGZyb20gKGFkZClcbiAgICAgIC8vIFN1Y2Vzcy5cbiAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgICBvYnNlcnZlci5uZXh0KCg8SURCUmVxdWVzdD5ldmVudC50YXJnZXQpLnJlYWR5U3RhdGUpO1xuICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgfTtcbiAgICAgIC8vIEVycm9yLlxuICAgICAgcmVxdWVzdC5vbmVycm9yID0gKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdJbmRleGVkREIgU2VydmljZTonLCAoPElEQlJlcXVlc3Q+ZXZlbnQudGFyZ2V0KS5lcnJvci5uYW1lKTtcbiAgICAgICAgb2JzZXJ2ZXIuZXJyb3IoKDxJREJSZXF1ZXN0PmV2ZW50LnRhcmdldCkuZXJyb3IubmFtZSk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZXMgYSByZWNvcmQuXG4gICAqXG4gICAqL1xuXG4gIGRlbGV0ZVJlY29yZEFzeW5jKHN0b3JlTmFtZTogc3RyaW5nLCBrZXk6IHN0cmluZykge1xuICAgIC8vIEdldHMgdGhlIG9iamVjdCBzdG9yZS5cbiAgICBjb25zdCBzdG9yZTogSURCT2JqZWN0U3RvcmUgPSB0aGlzLmdldE9iamVjdFN0b3JlKHN0b3JlTmFtZSwgJ3JlYWR3cml0ZScpO1xuXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogT2JzZXJ2ZXI8c3RyaW5nPikgPT4ge1xuICAgICAgICBjb25zdCByZXF1ZXN0OiBJREJSZXF1ZXN0ID0gc3RvcmUuZGVsZXRlKGtleSk7IC8vIERlbGV0ZXMgdGhlIHJlY29yZCBieSB0aGUga2V5LlxuICAgICAgICAvLyBTdWNjZXNzLlxuICAgICAgICByZXF1ZXN0Lm9uc3VjY2VzcyA9IChldmVudDogRXZlbnQpID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdTVUNDRVNTIEVWRU5UJywgZXZlbnQpO1xuICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCgoPElEQlJlcXVlc3Q+ZXZlbnQudGFyZ2V0KS5yZWFkeVN0YXRlKTtcbiAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG5cbiAgICAgICAgfTtcbiAgICAgICAgLy8gRXJyb3IuXG4gICAgICAgIHJlcXVlc3Qub25lcnJvciA9IChldmVudDogRXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0luZGV4ZWREQiBzZXJ2aWNlOicsICg8SURCUmVxdWVzdD5ldmVudC50YXJnZXQpLmVycm9yLm5hbWUpO1xuICAgICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IoKDxJREJSZXF1ZXN0PmV2ZW50LnRhcmdldCkuZXJyb3IubmFtZSk7XG4gICAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRWRpdHMgYSByZWNvcmQuXG4gICAqXG4gICAqL1xuXG4gIGVkaXRSZWNvcmRBc3luYyhzdG9yZU5hbWU6IHN0cmluZywga2V5OiBzdHJpbmcsIHJlY29yZDogYW55KSB7XG4gICAgLy8gcmVkdW5kYW50IChhZGRSZWNvcmRBc3luYyB1c2UgSURCT2JqZWN0U3RvcmUucHV0IGZ1bmN0aW9uIHRvIGFkZCBvciBjaGFuZ2UpXG4gICAgcmV0dXJuIHRoaXMuYWRkUmVjb3JkQXN5bmMoc3RvcmVOYW1lLCBrZXksIHJlY29yZCk7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXJzIGFuIG9iamVjdCBzdG9yZVxuICAgKlxuICAgKi9cblxuICBjbGVhck9iamVjdFN0b3JlQXN5bmMoc3RvcmVOYW1lOiBzdHJpbmcpIHtcbiAgICAvLyBHZXRzIHRoZSBvYmplY3Qgc3RvcmUuXG4gICAgY29uc3Qgc3RvcmU6IElEQk9iamVjdFN0b3JlID0gdGhpcy5nZXRPYmplY3RTdG9yZShzdG9yZU5hbWUsICdyZWFkd3JpdGUnKTtcblxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXI6IE9ic2VydmVyPHN0cmluZz4pID0+IHtcbiAgICAgIC8vIENsZWFyICBzdG9yZS5cbiAgICAgIGNvbnN0IHJlcXVlc3Q6IElEQlJlcXVlc3QgPSBzdG9yZS5jbGVhcigpOyAvLyBDbGVhcnMgdGhlIG9iamVjdCBzdG9yZS5cbiAgICAgICAgLy8gU3VjY2Vzcy5cbiAgICAgICAgcmVxdWVzdC5vbnN1Y2Nlc3MgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICAgICAgICBvYnNlcnZlci5uZXh0KCg8SURCUmVxdWVzdD5ldmVudC50YXJnZXQpLnJlYWR5U3RhdGUpO1xuICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gRXJyb3IuXG4gICAgICAgIHJlcXVlc3Qub25lcnJvciA9IChldmVudDogRXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0luZGV4ZWREQiBzZXJ2aWNlOicsICg8SURCUmVxdWVzdD5ldmVudC50YXJnZXQpLmVycm9yLm5hbWUpO1xuICAgICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IoKDxJREJSZXF1ZXN0PmV2ZW50LnRhcmdldCkuZXJyb3IubmFtZSk7XG4gICAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2VzIHRoZSBkYXRhYmFzZTtcbiAgICpcbiAgICovXG5cbiAgY2xvc2VEQigpIHtcbiAgICB0aGlzLmRiLmNsb3NlKCk7XG4gIH1cblxufVxuIl19