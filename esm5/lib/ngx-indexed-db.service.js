/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
// rxjs
import { Observable } from 'rxjs/Observable';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWluZGV4ZWQtZGIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1pbmRleGVkLWRiLyIsInNvdXJjZXMiOlsibGliL25neC1pbmRleGVkLWRiLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBRTNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFHN0M7SUFXRTtJQUFnQixDQUFDO0lBRWpCOzs7T0FHRzs7Ozs7Ozs7O0lBRUgseUNBQVc7Ozs7Ozs7O0lBQVgsVUFBWSxNQUFjLEVBQUUsV0FBbUIsRUFBRSxPQUFlO1FBQWhFLGlCQTJCQztRQTFCQyxPQUFPLElBQUksVUFBVTs7OztRQUFDLFVBQUMsUUFBMEI7OztnQkFFekMsT0FBTyxHQUFxQixTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUM7WUFDakUsV0FBVztZQUNYLE9BQU8sQ0FBQyxTQUFTOzs7O1lBQUcsVUFBQyxLQUFZO2dCQUMvQixLQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsbUJBQWtCLEtBQUssQ0FBQyxNQUFNLEVBQUEsQ0FBQyxDQUFDLE1BQU0sQ0FBQztnQkFDbEQsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLG1CQUFrQixLQUFLLENBQUMsTUFBTSxFQUFBLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDM0QsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3RCLENBQUMsQ0FBQSxDQUFDO1lBQ0YsU0FBUztZQUNULE9BQU8sQ0FBQyxPQUFPOzs7O1lBQUcsVUFBQyxLQUFZO2dCQUM3QixPQUFPLENBQUMsS0FBSyxDQUFDLHFCQUFxQixFQUFFLENBQUMsbUJBQWtCLEtBQUssQ0FBQyxNQUFNLEVBQUEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbEYsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFD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QUFDLElBQUksQ0FBQyxDQUFDO1lBQzFELENBQUMsQ0FBQSxDQUFDO1FBQ04sQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7SUFFSCxxQ0FBTzs7Ozs7SUFBUDtRQUNFLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDbEIsQ0FBQzs7Z0JBN01GLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7OzhCQVBEO0NBb05DLEFBL01ELElBK01DO1NBNU1ZLG1CQUFtQjs7Ozs7OztJQU05QixpQ0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vLyByeGpzXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IE9ic2VydmVyIH0gZnJvbSAncnhqcy9PYnNlcnZlcic7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE5neEluZGV4ZWREYlNlcnZpY2Uge1xuXG4gIC8qKlxuICAgKiBUaGUgRGF0YWJhc2VcbiAgICpcbiAgICovXG4gIGRiOiBJREJEYXRhYmFzZTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIC8qKlxuICAgKiBPcGVucyB0aGUgZGF0YWJhc2UuXG4gICAqXG4gICAqL1xuXG4gIG9wZW5EQkFzeW5jKGRiTmFtZTogc3RyaW5nLCBvYmplY3RTdG9yZTogc3RyaW5nLCB2ZXJzaW9uOiBudW1iZXIpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXI6IE9ic2VydmVyPHN0cmluZz4pID0+IHtcbiAgICAgIC8vIE9wZW5zIERCLlxuICAgICAgY29uc3QgcmVxdWVzdDogSURCT3BlbkRCUmVxdWVzdCA9IGluZGV4ZWREQi5vcGVuKGRiTmFtZSwgdmVyc2lvbik7XG4gICAgICAvLyBTdWNjZXNzLlxuICAgICAgcmVxdWVzdC5vbnN1Y2Nlc3MgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMuZGIgPSAoPElEQk9wZW5EQlJlcXVlc3Q+ZXZlbnQudGFyZ2V0KS5yZXN1bHQ7XG4gICAgICAgIG9ic2VydmVyLm5leHQoKDxJREJPcGVuREJSZXF1ZXN0PmV2ZW50LnRhcmdldCkucmVhZHlTdGF0ZSk7XG4gICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICB9O1xuICAgICAgLy8gRXJyb3IuXG4gICAgICByZXF1ZXN0Lm9uZXJyb3IgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0luZGV4ZWREQiBzZXJ2aWNlOiAnLCAoPElEQk9wZW5EQlJlcXVlc3Q+ZXZlbnQudGFyZ2V0KS5lcnJvci5uYW1lKTtcbiAgICAgICAgb2JzZXJ2ZXIuZXJyb3IoKDxJREJPcGVuREJSZXF1ZXN0PmV2ZW50LnRhcmdldCkuZXJyb3IubmFtZSk7XG4gICAgICB9O1xuICAgICAgLy8gREIgZG9lcyBub3QgZXhpc3QsIGNyZWF0ZSBpdC5cbiAgICAgIHJlcXVlc3Qub251cGdyYWRlbmVlZGVkID0gKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgICB0aGlzLmRiID0gKDxJREJPcGVuREJSZXF1ZXN0PmV2ZW50LnRhcmdldCkucmVzdWx0O1xuICAgICAgICAvLyBPYmplY3RTdG9yZSBhbmQgY2FsbHMgdGhlIGNyZWF0ZVN0YXJlcyBtZXRob2RcbiAgICAgICAgY29uc3Qgb2JqZWN0OiBJREJPYmplY3RTdG9yZSA9IHRoaXMuZGIuY3JlYXRlT2JqZWN0U3RvcmUob2JqZWN0U3RvcmUsIHthdXRvSW5jcmVtZW50OiBmYWxzZX0pO1xuICAgICAgfTtcbiAgICAgIC8vIElEQk9wZW5EQlJlcXVlc3QgaXMgYmxvY2tlZFxuICAgICAgcmVxdWVzdC5vbmJsb2NrZWQgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0luZGV4ZWREQiBzZXJ2aWNlOiAnLCAoPElEQk9wZW5EQlJlcXVlc3Q+ZXZlbnQudGFyZ2V0KS5lcnJvci5uYW1lKTtcbiAgICAgICAgb2JzZXJ2ZXIuZXJyb3IoKDxJREJPcGVuREJSZXF1ZXN0PmV2ZW50LnRhcmdldCkuZXJyb3IubmFtZSk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIG9iamVjdCBzdG9yZS5cbiAgICpcbiAgICovXG5cbiAgcHJpdmF0ZSBnZXRPYmplY3RTdG9yZShzdG9yZU5hbWU6IHN0cmluZywgbW9kZTogSURCVHJhbnNhY3Rpb25Nb2RlKSB7XG4gICAgY29uc3QgdHg6IElEQlRyYW5zYWN0aW9uID0gdGhpcy5kYi50cmFuc2FjdGlvbihzdG9yZU5hbWUsIG1vZGUpO1xuICAgIHJldHVybiB0eC5vYmplY3RTdG9yZShzdG9yZU5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYWxsIHJlY29yZHMuXG4gICAqXG4gICAqL1xuXG4gIGdldEFsbFJlY29yZHNBc3luYyhzdG9yZU5hbWU6IHN0cmluZykge1xuICAgIC8vIEdldHMgb2JqZWN0IHN0b3JlLlxuICAgIGNvbnN0IHN0b3JlOiBJREJPYmplY3RTdG9yZSA9IHRoaXMuZ2V0T2JqZWN0U3RvcmUoc3RvcmVOYW1lLCAncmVhZG9ubHknKTtcblxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXI6IE9ic2VydmVyPGFueT4pID0+IHtcbiAgICAgIC8vIE9wZW4gY3Vyc29yXG4gICAgICBjb25zdCByZXF1ZXN0OiBJREJSZXF1ZXN0ID0gc3RvcmUub3BlbkN1cnNvcigpO1xuICAgICAgLy8gU3VjY2Vzcy5cbiAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgICBjb25zdCBjdXJzb3I6IElEQkN1cnNvcldpdGhWYWx1ZSA9ICg8SURCUmVxdWVzdD5ldmVudC50YXJnZXQpLnJlc3VsdDtcbiAgICAgICAgaWYgKGN1cnNvcikge1xuICAgICAgICAgIG9ic2VydmVyLm5leHQoe2tleTogY3Vyc29yLmtleSwgdmFsdWU6IGN1cnNvci52YWx1ZX0pO1xuICAgICAgICAgIGN1cnNvci5jb250aW51ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICAvLyBFcnJvci5cbiAgICAgIHJlcXVlc3Qub25lcnJvciA9IChldmVudDogRXZlbnQpID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcignSW5kZXhlZERCIHNlcnZpY2U6JywgKDxJREJSZXF1ZXN0PmV2ZW50LnRhcmdldCkuZXJyb3IubmFtZSk7XG4gICAgICAgIG9ic2VydmVyLmVycm9yKCg8SURCUmVxdWVzdD5ldmVudC50YXJnZXQpLmVycm9yLm5hbWUpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHJlY29yZCBieSBrZXkuXG4gICAqXG4gICAqL1xuXG4gIGdldFJlY29yZEFzeW5jKHN0b3JlTmFtZTogc3RyaW5nLCBrZXk6IHN0cmluZykge1xuICAgIC8vIEdldHMgdGhlIG9iamVjdCBzdG9yZS5cbiAgICBjb25zdCBzdG9yZTogSURCT2JqZWN0U3RvcmUgPSB0aGlzLmdldE9iamVjdFN0b3JlKHN0b3JlTmFtZSwgJ3JlYWRvbmx5Jyk7XG5cbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBPYnNlcnZlcjxhbnk+KSA9PiB7XG4gICAgICAvLyBHZXRzIHJlY29yZCBieSBrZXkuXG4gICAgICBjb25zdCByZXF1ZXN0OiBJREJSZXF1ZXN0ID0gc3RvcmUuZ2V0KGtleSk7XG4gICAgICAvLyBTdWNjZXNzLlxuICAgICAgcmVxdWVzdC5vbnN1Y2Nlc3MgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICAgIG9ic2VydmVyLm5leHQocmVxdWVzdC5yZXN1bHQpO1xuICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgfTtcbiAgICAgIC8vIEVycm9yLlxuICAgICAgcmVxdWVzdC5vbmVycm9yID0gKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdJbmRleGVkREIgc2VydmljZTonLCAoPElEQlJlcXVlc3Q+ZXZlbnQudGFyZ2V0KS5lcnJvci5uYW1lKTtcbiAgICAgICAgb2JzZXJ2ZXIuZXJyb3IoKDxJREJSZXF1ZXN0PmV2ZW50LnRhcmdldCkuZXJyb3IubmFtZSk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSByZWNvcmQuXG4gICAqXG4gICAqL1xuXG4gIGFkZFJlY29yZEFzeW5jKHN0b3JlTmFtZTogc3RyaW5nLCBrZXk6IHN0cmluZywgcmVjb3JkOiBhbnkpIHtcbiAgICAvLyBHZXRzIHRoZSBvYmplY3Qgc3RvcmUuXG4gICAgY29uc3Qgc3RvcmU6IElEQk9iamVjdFN0b3JlID0gdGhpcy5nZXRPYmplY3RTdG9yZShzdG9yZU5hbWUsICdyZWFkd3JpdGUnKTtcblxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXI6IE9ic2VydmVyPHN0cmluZz4pID0+IHtcbiAgICAgIC8vIEFkZHMgYSBuZXcgcmVjb3JkLlxuICAgICAgY29uc3QgcmVxdWVzdDogSURCUmVxdWVzdCA9IHN0b3JlLnB1dChyZWNvcmQsIGtleSk7IC8vIGluc2VydCBvciB1cGRhdGUgKHB1dCksIGRpZmZlcmVudCBmcm9tIChhZGQpXG4gICAgICAvLyBTdWNlc3MuXG4gICAgICByZXF1ZXN0Lm9uc3VjY2VzcyA9IChldmVudDogRXZlbnQpID0+IHtcbiAgICAgICAgb2JzZXJ2ZXIubmV4dCgoPElEQlJlcXVlc3Q+ZXZlbnQudGFyZ2V0KS5yZWFkeVN0YXRlKTtcbiAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgIH07XG4gICAgICAvLyBFcnJvci5cbiAgICAgIHJlcXVlc3Qub25lcnJvciA9IChldmVudDogRXZlbnQpID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcignSW5kZXhlZERCIFNlcnZpY2U6JywgKDxJREJSZXF1ZXN0PmV2ZW50LnRhcmdldCkuZXJyb3IubmFtZSk7XG4gICAgICAgIG9ic2VydmVyLmVycm9yKCg8SURCUmVxdWVzdD5ldmVudC50YXJnZXQpLmVycm9yLm5hbWUpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGVzIGEgcmVjb3JkLlxuICAgKlxuICAgKi9cblxuICBkZWxldGVSZWNvcmRBc3luYyhzdG9yZU5hbWU6IHN0cmluZywga2V5OiBzdHJpbmcpIHtcbiAgICAvLyBHZXRzIHRoZSBvYmplY3Qgc3RvcmUuXG4gICAgY29uc3Qgc3RvcmU6IElEQk9iamVjdFN0b3JlID0gdGhpcy5nZXRPYmplY3RTdG9yZShzdG9yZU5hbWUsICdyZWFkd3JpdGUnKTtcblxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXI6IE9ic2VydmVyPHN0cmluZz4pID0+IHtcbiAgICAgICAgY29uc3QgcmVxdWVzdDogSURCUmVxdWVzdCA9IHN0b3JlLmRlbGV0ZShrZXkpOyAvLyBEZWxldGVzIHRoZSByZWNvcmQgYnkgdGhlIGtleS5cbiAgICAgICAgLy8gU3VjY2Vzcy5cbiAgICAgICAgcmVxdWVzdC5vbnN1Y2Nlc3MgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnU1VDQ0VTUyBFVkVOVCcsIGV2ZW50KTtcbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQoKDxJREJSZXF1ZXN0PmV2ZW50LnRhcmdldCkucmVhZHlTdGF0ZSk7XG4gICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuXG4gICAgICAgIH07XG4gICAgICAgIC8vIEVycm9yLlxuICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdJbmRleGVkREIgc2VydmljZTonLCAoPElEQlJlcXVlc3Q+ZXZlbnQudGFyZ2V0KS5lcnJvci5uYW1lKTtcbiAgICAgICAgICAgIG9ic2VydmVyLmVycm9yKCg8SURCUmVxdWVzdD5ldmVudC50YXJnZXQpLmVycm9yLm5hbWUpO1xuICAgICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEVkaXRzIGEgcmVjb3JkLlxuICAgKlxuICAgKi9cblxuICBlZGl0UmVjb3JkQXN5bmMoc3RvcmVOYW1lOiBzdHJpbmcsIGtleTogc3RyaW5nLCByZWNvcmQ6IGFueSkge1xuICAgIC8vIHJlZHVuZGFudCAoYWRkUmVjb3JkQXN5bmMgdXNlIElEQk9iamVjdFN0b3JlLnB1dCBmdW5jdGlvbiB0byBhZGQgb3IgY2hhbmdlKVxuICAgIHJldHVybiB0aGlzLmFkZFJlY29yZEFzeW5jKHN0b3JlTmFtZSwga2V5LCByZWNvcmQpO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFycyBhbiBvYmplY3Qgc3RvcmVcbiAgICpcbiAgICovXG5cbiAgY2xlYXJPYmplY3RTdG9yZUFzeW5jKHN0b3JlTmFtZTogc3RyaW5nKSB7XG4gICAgLy8gR2V0cyB0aGUgb2JqZWN0IHN0b3JlLlxuICAgIGNvbnN0IHN0b3JlOiBJREJPYmplY3RTdG9yZSA9IHRoaXMuZ2V0T2JqZWN0U3RvcmUoc3RvcmVOYW1lLCAncmVhZHdyaXRlJyk7XG5cbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBPYnNlcnZlcjxzdHJpbmc+KSA9PiB7XG4gICAgICAvLyBDbGVhciAgc3RvcmUuXG4gICAgICBjb25zdCByZXF1ZXN0OiBJREJSZXF1ZXN0ID0gc3RvcmUuY2xlYXIoKTsgLy8gQ2xlYXJzIHRoZSBvYmplY3Qgc3RvcmUuXG4gICAgICAgIC8vIFN1Y2Nlc3MuXG4gICAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCgoPElEQlJlcXVlc3Q+ZXZlbnQudGFyZ2V0KS5yZWFkeVN0YXRlKTtcbiAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIH07XG4gICAgICAgIC8vIEVycm9yLlxuICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdJbmRleGVkREIgc2VydmljZTonLCAoPElEQlJlcXVlc3Q+ZXZlbnQudGFyZ2V0KS5lcnJvci5uYW1lKTtcbiAgICAgICAgICAgIG9ic2VydmVyLmVycm9yKCg8SURCUmVxdWVzdD5ldmVudC50YXJnZXQpLmVycm9yLm5hbWUpO1xuICAgICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlcyB0aGUgZGF0YWJhc2U7XG4gICAqXG4gICAqL1xuXG4gIGNsb3NlREIoKSB7XG4gICAgdGhpcy5kYi5jbG9zZSgpO1xuICB9XG5cbn1cbiJdfQ==