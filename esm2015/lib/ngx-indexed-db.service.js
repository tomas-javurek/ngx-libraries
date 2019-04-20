/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
// rxjs
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export class NgxIndexedDbService {
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
/** @nocollapse */ NgxIndexedDbService.ngInjectableDef = i0.defineInjectable({ factory: function NgxIndexedDbService_Factory() { return new NgxIndexedDbService(); }, token: NgxIndexedDbService, providedIn: "root" });
if (false) {
    /**
     * The Database
     *
     * @type {?}
     */
    NgxIndexedDbService.prototype.db;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWluZGV4ZWQtZGIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1pbmRleGVkLWRiLyIsInNvdXJjZXMiOlsibGliL25neC1pbmRleGVkLWRiLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBRTNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7O0FBTWxDLE1BQU0sT0FBTyxtQkFBbUI7SUFROUIsZ0JBQWdCLENBQUM7Ozs7Ozs7OztJQU9qQixXQUFXLENBQUMsTUFBYyxFQUFFLFdBQW1CLEVBQUUsT0FBZTtRQUM5RCxPQUFPLElBQUksVUFBVTs7OztRQUFDLENBQUMsUUFBMEIsRUFBRSxFQUFFOzs7a0JBRTdDLE9BQU8sR0FBcUIsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDO1lBQ2pFLFdBQVc7WUFDWCxPQUFPLENBQUMsU0FBUzs7OztZQUFHLENBQUMsS0FBWSxFQUFFLEVBQUU7Z0JBQ25DLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxtQkFBa0IsS0FBSyxDQUFDLE1BQU0sRUFBQSxDQUFDLENBQUMsTUFBTSxDQUFDO2dCQUNsRCxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsbUJBQWtCLEtBQUssQ0FBQyxNQUFNLEVBQUEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUMzRCxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDdEIsQ0FBQyxDQUFBLENBQUM7WUFDRixTQUFTO1lBQ1QsT0FBTyxDQUFDLE9BQU87Ozs7WUFBRyxDQUFDLEtBQVksRUFBRSxFQUFFO2dCQUNqQyxPQUFPLENBQUMsS0FBSyxDQUFDLHFCQUFxQixFQUFFLENBQUMsbUJBQWtCLEtBQUssQ0FBQyxNQUFNLEVBQUEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbEYsUUFBUSxDQUFDLEtBQUss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QUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxRCxDQUFDLENBQUEsQ0FBQztRQUNOLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7O0lBT0QsT0FBTztRQUNMLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDbEIsQ0FBQzs7O1lBN01GLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7Ozs7Ozs7Ozs7SUFPQyxpQ0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vLyByeGpzXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBPYnNlcnZlciB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBOZ3hJbmRleGVkRGJTZXJ2aWNlIHtcblxuICAvKipcbiAgICogVGhlIERhdGFiYXNlXG4gICAqXG4gICAqL1xuICBkYjogSURCRGF0YWJhc2U7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICAvKipcbiAgICogT3BlbnMgdGhlIGRhdGFiYXNlLlxuICAgKlxuICAgKi9cblxuICBvcGVuREJBc3luYyhkYk5hbWU6IHN0cmluZywgb2JqZWN0U3RvcmU6IHN0cmluZywgdmVyc2lvbjogbnVtYmVyKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBPYnNlcnZlcjxzdHJpbmc+KSA9PiB7XG4gICAgICAvLyBPcGVucyBEQi5cbiAgICAgIGNvbnN0IHJlcXVlc3Q6IElEQk9wZW5EQlJlcXVlc3QgPSBpbmRleGVkREIub3BlbihkYk5hbWUsIHZlcnNpb24pO1xuICAgICAgLy8gU3VjY2Vzcy5cbiAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgICB0aGlzLmRiID0gKDxJREJPcGVuREJSZXF1ZXN0PmV2ZW50LnRhcmdldCkucmVzdWx0O1xuICAgICAgICBvYnNlcnZlci5uZXh0KCg8SURCT3BlbkRCUmVxdWVzdD5ldmVudC50YXJnZXQpLnJlYWR5U3RhdGUpO1xuICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgfTtcbiAgICAgIC8vIEVycm9yLlxuICAgICAgcmVxdWVzdC5vbmVycm9yID0gKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdJbmRleGVkREIgc2VydmljZTogJywgKDxJREJPcGVuREJSZXF1ZXN0PmV2ZW50LnRhcmdldCkuZXJyb3IubmFtZSk7XG4gICAgICAgIG9ic2VydmVyLmVycm9yKCg8SURCT3BlbkRCUmVxdWVzdD5ldmVudC50YXJnZXQpLmVycm9yLm5hbWUpO1xuICAgICAgfTtcbiAgICAgIC8vIERCIGRvZXMgbm90IGV4aXN0LCBjcmVhdGUgaXQuXG4gICAgICByZXF1ZXN0Lm9udXBncmFkZW5lZWRlZCA9IChldmVudDogRXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5kYiA9ICg8SURCT3BlbkRCUmVxdWVzdD5ldmVudC50YXJnZXQpLnJlc3VsdDtcbiAgICAgICAgLy8gT2JqZWN0U3RvcmUgYW5kIGNhbGxzIHRoZSBjcmVhdGVTdGFyZXMgbWV0aG9kXG4gICAgICAgIGNvbnN0IG9iamVjdDogSURCT2JqZWN0U3RvcmUgPSB0aGlzLmRiLmNyZWF0ZU9iamVjdFN0b3JlKG9iamVjdFN0b3JlLCB7YXV0b0luY3JlbWVudDogZmFsc2V9KTtcbiAgICAgIH07XG4gICAgICAvLyBJREJPcGVuREJSZXF1ZXN0IGlzIGJsb2NrZWRcbiAgICAgIHJlcXVlc3Qub25ibG9ja2VkID0gKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdJbmRleGVkREIgc2VydmljZTogJywgKDxJREJPcGVuREJSZXF1ZXN0PmV2ZW50LnRhcmdldCkuZXJyb3IubmFtZSk7XG4gICAgICAgIG9ic2VydmVyLmVycm9yKCg8SURCT3BlbkRCUmVxdWVzdD5ldmVudC50YXJnZXQpLmVycm9yLm5hbWUpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBvYmplY3Qgc3RvcmUuXG4gICAqXG4gICAqL1xuXG4gIHByaXZhdGUgZ2V0T2JqZWN0U3RvcmUoc3RvcmVOYW1lOiBzdHJpbmcsIG1vZGU6IElEQlRyYW5zYWN0aW9uTW9kZSkge1xuICAgIGNvbnN0IHR4OiBJREJUcmFuc2FjdGlvbiA9IHRoaXMuZGIudHJhbnNhY3Rpb24oc3RvcmVOYW1lLCBtb2RlKTtcbiAgICByZXR1cm4gdHgub2JqZWN0U3RvcmUoc3RvcmVOYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFsbCByZWNvcmRzLlxuICAgKlxuICAgKi9cblxuICBnZXRBbGxSZWNvcmRzQXN5bmMoc3RvcmVOYW1lOiBzdHJpbmcpIHtcbiAgICAvLyBHZXRzIG9iamVjdCBzdG9yZS5cbiAgICBjb25zdCBzdG9yZTogSURCT2JqZWN0U3RvcmUgPSB0aGlzLmdldE9iamVjdFN0b3JlKHN0b3JlTmFtZSwgJ3JlYWRvbmx5Jyk7XG5cbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBPYnNlcnZlcjxhbnk+KSA9PiB7XG4gICAgICAvLyBPcGVuIGN1cnNvclxuICAgICAgY29uc3QgcmVxdWVzdDogSURCUmVxdWVzdCA9IHN0b3JlLm9wZW5DdXJzb3IoKTtcbiAgICAgIC8vIFN1Y2Nlc3MuXG4gICAgICByZXF1ZXN0Lm9uc3VjY2VzcyA9IChldmVudDogRXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgY3Vyc29yOiBJREJDdXJzb3JXaXRoVmFsdWUgPSAoPElEQlJlcXVlc3Q+ZXZlbnQudGFyZ2V0KS5yZXN1bHQ7XG4gICAgICAgIGlmIChjdXJzb3IpIHtcbiAgICAgICAgICBvYnNlcnZlci5uZXh0KHtrZXk6IGN1cnNvci5rZXksIHZhbHVlOiBjdXJzb3IudmFsdWV9KTtcbiAgICAgICAgICBjdXJzb3IuY29udGludWUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgLy8gRXJyb3IuXG4gICAgICByZXF1ZXN0Lm9uZXJyb3IgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0luZGV4ZWREQiBzZXJ2aWNlOicsICg8SURCUmVxdWVzdD5ldmVudC50YXJnZXQpLmVycm9yLm5hbWUpO1xuICAgICAgICBvYnNlcnZlci5lcnJvcigoPElEQlJlcXVlc3Q+ZXZlbnQudGFyZ2V0KS5lcnJvci5uYW1lKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyByZWNvcmQgYnkga2V5LlxuICAgKlxuICAgKi9cblxuICBnZXRSZWNvcmRBc3luYyhzdG9yZU5hbWU6IHN0cmluZywga2V5OiBzdHJpbmcpIHtcbiAgICAvLyBHZXRzIHRoZSBvYmplY3Qgc3RvcmUuXG4gICAgY29uc3Qgc3RvcmU6IElEQk9iamVjdFN0b3JlID0gdGhpcy5nZXRPYmplY3RTdG9yZShzdG9yZU5hbWUsICdyZWFkb25seScpO1xuXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogT2JzZXJ2ZXI8YW55PikgPT4ge1xuICAgICAgLy8gR2V0cyByZWNvcmQgYnkga2V5LlxuICAgICAgY29uc3QgcmVxdWVzdDogSURCUmVxdWVzdCA9IHN0b3JlLmdldChrZXkpO1xuICAgICAgLy8gU3VjY2Vzcy5cbiAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgICBvYnNlcnZlci5uZXh0KHJlcXVlc3QucmVzdWx0KTtcbiAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgIH07XG4gICAgICAvLyBFcnJvci5cbiAgICAgIHJlcXVlc3Qub25lcnJvciA9IChldmVudDogRXZlbnQpID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcignSW5kZXhlZERCIHNlcnZpY2U6JywgKDxJREJSZXF1ZXN0PmV2ZW50LnRhcmdldCkuZXJyb3IubmFtZSk7XG4gICAgICAgIG9ic2VydmVyLmVycm9yKCg8SURCUmVxdWVzdD5ldmVudC50YXJnZXQpLmVycm9yLm5hbWUpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgcmVjb3JkLlxuICAgKlxuICAgKi9cblxuICBhZGRSZWNvcmRBc3luYyhzdG9yZU5hbWU6IHN0cmluZywga2V5OiBzdHJpbmcsIHJlY29yZDogYW55KSB7XG4gICAgLy8gR2V0cyB0aGUgb2JqZWN0IHN0b3JlLlxuICAgIGNvbnN0IHN0b3JlOiBJREJPYmplY3RTdG9yZSA9IHRoaXMuZ2V0T2JqZWN0U3RvcmUoc3RvcmVOYW1lLCAncmVhZHdyaXRlJyk7XG5cbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBPYnNlcnZlcjxzdHJpbmc+KSA9PiB7XG4gICAgICAvLyBBZGRzIGEgbmV3IHJlY29yZC5cbiAgICAgIGNvbnN0IHJlcXVlc3Q6IElEQlJlcXVlc3QgPSBzdG9yZS5wdXQocmVjb3JkLCBrZXkpOyAvLyBpbnNlcnQgb3IgdXBkYXRlIChwdXQpLCBkaWZmZXJlbnQgZnJvbSAoYWRkKVxuICAgICAgLy8gU3VjZXNzLlxuICAgICAgcmVxdWVzdC5vbnN1Y2Nlc3MgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICAgIG9ic2VydmVyLm5leHQoKDxJREJSZXF1ZXN0PmV2ZW50LnRhcmdldCkucmVhZHlTdGF0ZSk7XG4gICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICB9O1xuICAgICAgLy8gRXJyb3IuXG4gICAgICByZXF1ZXN0Lm9uZXJyb3IgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0luZGV4ZWREQiBTZXJ2aWNlOicsICg8SURCUmVxdWVzdD5ldmVudC50YXJnZXQpLmVycm9yLm5hbWUpO1xuICAgICAgICBvYnNlcnZlci5lcnJvcigoPElEQlJlcXVlc3Q+ZXZlbnQudGFyZ2V0KS5lcnJvci5uYW1lKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlcyBhIHJlY29yZC5cbiAgICpcbiAgICovXG5cbiAgZGVsZXRlUmVjb3JkQXN5bmMoc3RvcmVOYW1lOiBzdHJpbmcsIGtleTogc3RyaW5nKSB7XG4gICAgLy8gR2V0cyB0aGUgb2JqZWN0IHN0b3JlLlxuICAgIGNvbnN0IHN0b3JlOiBJREJPYmplY3RTdG9yZSA9IHRoaXMuZ2V0T2JqZWN0U3RvcmUoc3RvcmVOYW1lLCAncmVhZHdyaXRlJyk7XG5cbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBPYnNlcnZlcjxzdHJpbmc+KSA9PiB7XG4gICAgICAgIGNvbnN0IHJlcXVlc3Q6IElEQlJlcXVlc3QgPSBzdG9yZS5kZWxldGUoa2V5KTsgLy8gRGVsZXRlcyB0aGUgcmVjb3JkIGJ5IHRoZSBrZXkuXG4gICAgICAgIC8vIFN1Y2Nlc3MuXG4gICAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ1NVQ0NFU1MgRVZFTlQnLCBldmVudCk7XG4gICAgICAgICAgICBvYnNlcnZlci5uZXh0KCg8SURCUmVxdWVzdD5ldmVudC50YXJnZXQpLnJlYWR5U3RhdGUpO1xuICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcblxuICAgICAgICB9O1xuICAgICAgICAvLyBFcnJvci5cbiAgICAgICAgcmVxdWVzdC5vbmVycm9yID0gKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignSW5kZXhlZERCIHNlcnZpY2U6JywgKDxJREJSZXF1ZXN0PmV2ZW50LnRhcmdldCkuZXJyb3IubmFtZSk7XG4gICAgICAgICAgICBvYnNlcnZlci5lcnJvcigoPElEQlJlcXVlc3Q+ZXZlbnQudGFyZ2V0KS5lcnJvci5uYW1lKTtcbiAgICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFZGl0cyBhIHJlY29yZC5cbiAgICpcbiAgICovXG5cbiAgZWRpdFJlY29yZEFzeW5jKHN0b3JlTmFtZTogc3RyaW5nLCBrZXk6IHN0cmluZywgcmVjb3JkOiBhbnkpIHtcbiAgICAvLyByZWR1bmRhbnQgKGFkZFJlY29yZEFzeW5jIHVzZSBJREJPYmplY3RTdG9yZS5wdXQgZnVuY3Rpb24gdG8gYWRkIG9yIGNoYW5nZSlcbiAgICByZXR1cm4gdGhpcy5hZGRSZWNvcmRBc3luYyhzdG9yZU5hbWUsIGtleSwgcmVjb3JkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgYW4gb2JqZWN0IHN0b3JlXG4gICAqXG4gICAqL1xuXG4gIGNsZWFyT2JqZWN0U3RvcmVBc3luYyhzdG9yZU5hbWU6IHN0cmluZykge1xuICAgIC8vIEdldHMgdGhlIG9iamVjdCBzdG9yZS5cbiAgICBjb25zdCBzdG9yZTogSURCT2JqZWN0U3RvcmUgPSB0aGlzLmdldE9iamVjdFN0b3JlKHN0b3JlTmFtZSwgJ3JlYWR3cml0ZScpO1xuXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogT2JzZXJ2ZXI8c3RyaW5nPikgPT4ge1xuICAgICAgLy8gQ2xlYXIgIHN0b3JlLlxuICAgICAgY29uc3QgcmVxdWVzdDogSURCUmVxdWVzdCA9IHN0b3JlLmNsZWFyKCk7IC8vIENsZWFycyB0aGUgb2JqZWN0IHN0b3JlLlxuICAgICAgICAvLyBTdWNjZXNzLlxuICAgICAgICByZXF1ZXN0Lm9uc3VjY2VzcyA9IChldmVudDogRXZlbnQpID0+IHtcbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQoKDxJREJSZXF1ZXN0PmV2ZW50LnRhcmdldCkucmVhZHlTdGF0ZSk7XG4gICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICB9O1xuICAgICAgICAvLyBFcnJvci5cbiAgICAgICAgcmVxdWVzdC5vbmVycm9yID0gKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignSW5kZXhlZERCIHNlcnZpY2U6JywgKDxJREJSZXF1ZXN0PmV2ZW50LnRhcmdldCkuZXJyb3IubmFtZSk7XG4gICAgICAgICAgICBvYnNlcnZlci5lcnJvcigoPElEQlJlcXVlc3Q+ZXZlbnQudGFyZ2V0KS5lcnJvci5uYW1lKTtcbiAgICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgdGhlIGRhdGFiYXNlO1xuICAgKlxuICAgKi9cblxuICBjbG9zZURCKCkge1xuICAgIHRoaXMuZGIuY2xvc2UoKTtcbiAgfVxuXG59XG4iXX0=