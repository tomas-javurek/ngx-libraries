/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
// rxjs
import { Observable } from 'rxjs/Observable';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWluZGV4ZWQtZGIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1pbmRleGVkLWRiLyIsInNvdXJjZXMiOlsibGliL25neC1pbmRleGVkLWRiLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBRTNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFNN0MsTUFBTSxPQUFPLG1CQUFtQjtJQVE5QixnQkFBZ0IsQ0FBQzs7Ozs7Ozs7O0lBT2pCLFdBQVcsQ0FBQyxNQUFjLEVBQUUsV0FBbUIsRUFBRSxPQUFlO1FBQzlELE9BQU8sSUFBSSxVQUFVOzs7O1FBQUMsQ0FBQyxRQUEwQixFQUFFLEVBQUU7OztrQkFFN0MsT0FBTyxHQUFxQixTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUM7WUFDakUsV0FBVztZQUNYLE9BQU8sQ0FBQyxTQUFTOzs7O1lBQUcsQ0FBQyxLQUFZLEVBQUUsRUFBRTtnQkFDbkMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLG1CQUFrQixLQUFLLENBQUMsTUFBTSxFQUFBLENBQUMsQ0FBQyxNQUFNLENBQUM7Z0JBQ2xELFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxtQkFBa0IsS0FBSyxDQUFDLE1BQU0sRUFBQSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQzNELFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN0QixDQUFDLENBQUEsQ0FBQztZQUNGLFNBQVM7WUFDVCxPQUFPLENBQUMsT0FBTzs7OztZQUFHLENBQUMsS0FBWSxFQUFFLEVBQUU7Z0JBQ2pDLE9BQU8sQ0FBQyxLQUFLLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxtQkFBa0IsS0FBSyxDQUFDLE1BQU0sRUFBQSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNsRixRQUFRLENBQUMsS0FB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S0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFELENBQUMsQ0FBQSxDQUFDO1FBQ04sQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7Ozs7SUFPRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNsQixDQUFDOzs7WUE3TUYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7Ozs7Ozs7OztJQU9DLGlDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIHJ4anNcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzL09ic2VydmVyJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTmd4SW5kZXhlZERiU2VydmljZSB7XG5cbiAgLyoqXG4gICAqIFRoZSBEYXRhYmFzZVxuICAgKlxuICAgKi9cbiAgZGI6IElEQkRhdGFiYXNlO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgLyoqXG4gICAqIE9wZW5zIHRoZSBkYXRhYmFzZS5cbiAgICpcbiAgICovXG5cbiAgb3BlbkRCQXN5bmMoZGJOYW1lOiBzdHJpbmcsIG9iamVjdFN0b3JlOiBzdHJpbmcsIHZlcnNpb246IG51bWJlcik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogT2JzZXJ2ZXI8c3RyaW5nPikgPT4ge1xuICAgICAgLy8gT3BlbnMgREIuXG4gICAgICBjb25zdCByZXF1ZXN0OiBJREJPcGVuREJSZXF1ZXN0ID0gaW5kZXhlZERCLm9wZW4oZGJOYW1lLCB2ZXJzaW9uKTtcbiAgICAgIC8vIFN1Y2Nlc3MuXG4gICAgICByZXF1ZXN0Lm9uc3VjY2VzcyA9IChldmVudDogRXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5kYiA9ICg8SURCT3BlbkRCUmVxdWVzdD5ldmVudC50YXJnZXQpLnJlc3VsdDtcbiAgICAgICAgb2JzZXJ2ZXIubmV4dCgoPElEQk9wZW5EQlJlcXVlc3Q+ZXZlbnQudGFyZ2V0KS5yZWFkeVN0YXRlKTtcbiAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgIH07XG4gICAgICAvLyBFcnJvci5cbiAgICAgIHJlcXVlc3Qub25lcnJvciA9IChldmVudDogRXZlbnQpID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcignSW5kZXhlZERCIHNlcnZpY2U6ICcsICg8SURCT3BlbkRCUmVxdWVzdD5ldmVudC50YXJnZXQpLmVycm9yLm5hbWUpO1xuICAgICAgICBvYnNlcnZlci5lcnJvcigoPElEQk9wZW5EQlJlcXVlc3Q+ZXZlbnQudGFyZ2V0KS5lcnJvci5uYW1lKTtcbiAgICAgIH07XG4gICAgICAvLyBEQiBkb2VzIG5vdCBleGlzdCwgY3JlYXRlIGl0LlxuICAgICAgcmVxdWVzdC5vbnVwZ3JhZGVuZWVkZWQgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMuZGIgPSAoPElEQk9wZW5EQlJlcXVlc3Q+ZXZlbnQudGFyZ2V0KS5yZXN1bHQ7XG4gICAgICAgIC8vIE9iamVjdFN0b3JlIGFuZCBjYWxscyB0aGUgY3JlYXRlU3RhcmVzIG1ldGhvZFxuICAgICAgICBjb25zdCBvYmplY3Q6IElEQk9iamVjdFN0b3JlID0gdGhpcy5kYi5jcmVhdGVPYmplY3RTdG9yZShvYmplY3RTdG9yZSwge2F1dG9JbmNyZW1lbnQ6IGZhbHNlfSk7XG4gICAgICB9O1xuICAgICAgLy8gSURCT3BlbkRCUmVxdWVzdCBpcyBibG9ja2VkXG4gICAgICByZXF1ZXN0Lm9uYmxvY2tlZCA9IChldmVudDogRXZlbnQpID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcignSW5kZXhlZERCIHNlcnZpY2U6ICcsICg8SURCT3BlbkRCUmVxdWVzdD5ldmVudC50YXJnZXQpLmVycm9yLm5hbWUpO1xuICAgICAgICBvYnNlcnZlci5lcnJvcigoPElEQk9wZW5EQlJlcXVlc3Q+ZXZlbnQudGFyZ2V0KS5lcnJvci5uYW1lKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgb2JqZWN0IHN0b3JlLlxuICAgKlxuICAgKi9cblxuICBwcml2YXRlIGdldE9iamVjdFN0b3JlKHN0b3JlTmFtZTogc3RyaW5nLCBtb2RlOiBJREJUcmFuc2FjdGlvbk1vZGUpIHtcbiAgICBjb25zdCB0eDogSURCVHJhbnNhY3Rpb24gPSB0aGlzLmRiLnRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgbW9kZSk7XG4gICAgcmV0dXJuIHR4Lm9iamVjdFN0b3JlKHN0b3JlTmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbGwgcmVjb3Jkcy5cbiAgICpcbiAgICovXG5cbiAgZ2V0QWxsUmVjb3Jkc0FzeW5jKHN0b3JlTmFtZTogc3RyaW5nKSB7XG4gICAgLy8gR2V0cyBvYmplY3Qgc3RvcmUuXG4gICAgY29uc3Qgc3RvcmU6IElEQk9iamVjdFN0b3JlID0gdGhpcy5nZXRPYmplY3RTdG9yZShzdG9yZU5hbWUsICdyZWFkb25seScpO1xuXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogT2JzZXJ2ZXI8YW55PikgPT4ge1xuICAgICAgLy8gT3BlbiBjdXJzb3JcbiAgICAgIGNvbnN0IHJlcXVlc3Q6IElEQlJlcXVlc3QgPSBzdG9yZS5vcGVuQ3Vyc29yKCk7XG4gICAgICAvLyBTdWNjZXNzLlxuICAgICAgcmVxdWVzdC5vbnN1Y2Nlc3MgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGN1cnNvcjogSURCQ3Vyc29yV2l0aFZhbHVlID0gKDxJREJSZXF1ZXN0PmV2ZW50LnRhcmdldCkucmVzdWx0O1xuICAgICAgICBpZiAoY3Vyc29yKSB7XG4gICAgICAgICAgb2JzZXJ2ZXIubmV4dCh7a2V5OiBjdXJzb3Iua2V5LCB2YWx1ZTogY3Vyc29yLnZhbHVlfSk7XG4gICAgICAgICAgY3Vyc29yLmNvbnRpbnVlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIC8vIEVycm9yLlxuICAgICAgcmVxdWVzdC5vbmVycm9yID0gKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdJbmRleGVkREIgc2VydmljZTonLCAoPElEQlJlcXVlc3Q+ZXZlbnQudGFyZ2V0KS5lcnJvci5uYW1lKTtcbiAgICAgICAgb2JzZXJ2ZXIuZXJyb3IoKDxJREJSZXF1ZXN0PmV2ZW50LnRhcmdldCkuZXJyb3IubmFtZSk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgcmVjb3JkIGJ5IGtleS5cbiAgICpcbiAgICovXG5cbiAgZ2V0UmVjb3JkQXN5bmMoc3RvcmVOYW1lOiBzdHJpbmcsIGtleTogc3RyaW5nKSB7XG4gICAgLy8gR2V0cyB0aGUgb2JqZWN0IHN0b3JlLlxuICAgIGNvbnN0IHN0b3JlOiBJREJPYmplY3RTdG9yZSA9IHRoaXMuZ2V0T2JqZWN0U3RvcmUoc3RvcmVOYW1lLCAncmVhZG9ubHknKTtcblxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXI6IE9ic2VydmVyPGFueT4pID0+IHtcbiAgICAgIC8vIEdldHMgcmVjb3JkIGJ5IGtleS5cbiAgICAgIGNvbnN0IHJlcXVlc3Q6IElEQlJlcXVlc3QgPSBzdG9yZS5nZXQoa2V5KTtcbiAgICAgIC8vIFN1Y2Nlc3MuXG4gICAgICByZXF1ZXN0Lm9uc3VjY2VzcyA9IChldmVudDogRXZlbnQpID0+IHtcbiAgICAgICAgb2JzZXJ2ZXIubmV4dChyZXF1ZXN0LnJlc3VsdCk7XG4gICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICB9O1xuICAgICAgLy8gRXJyb3IuXG4gICAgICByZXF1ZXN0Lm9uZXJyb3IgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0luZGV4ZWREQiBzZXJ2aWNlOicsICg8SURCUmVxdWVzdD5ldmVudC50YXJnZXQpLmVycm9yLm5hbWUpO1xuICAgICAgICBvYnNlcnZlci5lcnJvcigoPElEQlJlcXVlc3Q+ZXZlbnQudGFyZ2V0KS5lcnJvci5uYW1lKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIHJlY29yZC5cbiAgICpcbiAgICovXG5cbiAgYWRkUmVjb3JkQXN5bmMoc3RvcmVOYW1lOiBzdHJpbmcsIGtleTogc3RyaW5nLCByZWNvcmQ6IGFueSkge1xuICAgIC8vIEdldHMgdGhlIG9iamVjdCBzdG9yZS5cbiAgICBjb25zdCBzdG9yZTogSURCT2JqZWN0U3RvcmUgPSB0aGlzLmdldE9iamVjdFN0b3JlKHN0b3JlTmFtZSwgJ3JlYWR3cml0ZScpO1xuXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogT2JzZXJ2ZXI8c3RyaW5nPikgPT4ge1xuICAgICAgLy8gQWRkcyBhIG5ldyByZWNvcmQuXG4gICAgICBjb25zdCByZXF1ZXN0OiBJREJSZXF1ZXN0ID0gc3RvcmUucHV0KHJlY29yZCwga2V5KTsgLy8gaW5zZXJ0IG9yIHVwZGF0ZSAocHV0KSwgZGlmZmVyZW50IGZyb20gKGFkZClcbiAgICAgIC8vIFN1Y2Vzcy5cbiAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgICBvYnNlcnZlci5uZXh0KCg8SURCUmVxdWVzdD5ldmVudC50YXJnZXQpLnJlYWR5U3RhdGUpO1xuICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgfTtcbiAgICAgIC8vIEVycm9yLlxuICAgICAgcmVxdWVzdC5vbmVycm9yID0gKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdJbmRleGVkREIgU2VydmljZTonLCAoPElEQlJlcXVlc3Q+ZXZlbnQudGFyZ2V0KS5lcnJvci5uYW1lKTtcbiAgICAgICAgb2JzZXJ2ZXIuZXJyb3IoKDxJREJSZXF1ZXN0PmV2ZW50LnRhcmdldCkuZXJyb3IubmFtZSk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZXMgYSByZWNvcmQuXG4gICAqXG4gICAqL1xuXG4gIGRlbGV0ZVJlY29yZEFzeW5jKHN0b3JlTmFtZTogc3RyaW5nLCBrZXk6IHN0cmluZykge1xuICAgIC8vIEdldHMgdGhlIG9iamVjdCBzdG9yZS5cbiAgICBjb25zdCBzdG9yZTogSURCT2JqZWN0U3RvcmUgPSB0aGlzLmdldE9iamVjdFN0b3JlKHN0b3JlTmFtZSwgJ3JlYWR3cml0ZScpO1xuXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogT2JzZXJ2ZXI8c3RyaW5nPikgPT4ge1xuICAgICAgICBjb25zdCByZXF1ZXN0OiBJREJSZXF1ZXN0ID0gc3RvcmUuZGVsZXRlKGtleSk7IC8vIERlbGV0ZXMgdGhlIHJlY29yZCBieSB0aGUga2V5LlxuICAgICAgICAvLyBTdWNjZXNzLlxuICAgICAgICByZXF1ZXN0Lm9uc3VjY2VzcyA9IChldmVudDogRXZlbnQpID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdTVUNDRVNTIEVWRU5UJywgZXZlbnQpO1xuICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCgoPElEQlJlcXVlc3Q+ZXZlbnQudGFyZ2V0KS5yZWFkeVN0YXRlKTtcbiAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG5cbiAgICAgICAgfTtcbiAgICAgICAgLy8gRXJyb3IuXG4gICAgICAgIHJlcXVlc3Qub25lcnJvciA9IChldmVudDogRXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0luZGV4ZWREQiBzZXJ2aWNlOicsICg8SURCUmVxdWVzdD5ldmVudC50YXJnZXQpLmVycm9yLm5hbWUpO1xuICAgICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IoKDxJREJSZXF1ZXN0PmV2ZW50LnRhcmdldCkuZXJyb3IubmFtZSk7XG4gICAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRWRpdHMgYSByZWNvcmQuXG4gICAqXG4gICAqL1xuXG4gIGVkaXRSZWNvcmRBc3luYyhzdG9yZU5hbWU6IHN0cmluZywga2V5OiBzdHJpbmcsIHJlY29yZDogYW55KSB7XG4gICAgLy8gcmVkdW5kYW50IChhZGRSZWNvcmRBc3luYyB1c2UgSURCT2JqZWN0U3RvcmUucHV0IGZ1bmN0aW9uIHRvIGFkZCBvciBjaGFuZ2UpXG4gICAgcmV0dXJuIHRoaXMuYWRkUmVjb3JkQXN5bmMoc3RvcmVOYW1lLCBrZXksIHJlY29yZCk7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXJzIGFuIG9iamVjdCBzdG9yZVxuICAgKlxuICAgKi9cblxuICBjbGVhck9iamVjdFN0b3JlQXN5bmMoc3RvcmVOYW1lOiBzdHJpbmcpIHtcbiAgICAvLyBHZXRzIHRoZSBvYmplY3Qgc3RvcmUuXG4gICAgY29uc3Qgc3RvcmU6IElEQk9iamVjdFN0b3JlID0gdGhpcy5nZXRPYmplY3RTdG9yZShzdG9yZU5hbWUsICdyZWFkd3JpdGUnKTtcblxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXI6IE9ic2VydmVyPHN0cmluZz4pID0+IHtcbiAgICAgIC8vIENsZWFyICBzdG9yZS5cbiAgICAgIGNvbnN0IHJlcXVlc3Q6IElEQlJlcXVlc3QgPSBzdG9yZS5jbGVhcigpOyAvLyBDbGVhcnMgdGhlIG9iamVjdCBzdG9yZS5cbiAgICAgICAgLy8gU3VjY2Vzcy5cbiAgICAgICAgcmVxdWVzdC5vbnN1Y2Nlc3MgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICAgICAgICBvYnNlcnZlci5uZXh0KCg8SURCUmVxdWVzdD5ldmVudC50YXJnZXQpLnJlYWR5U3RhdGUpO1xuICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gRXJyb3IuXG4gICAgICAgIHJlcXVlc3Qub25lcnJvciA9IChldmVudDogRXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0luZGV4ZWREQiBzZXJ2aWNlOicsICg8SURCUmVxdWVzdD5ldmVudC50YXJnZXQpLmVycm9yLm5hbWUpO1xuICAgICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IoKDxJREJSZXF1ZXN0PmV2ZW50LnRhcmdldCkuZXJyb3IubmFtZSk7XG4gICAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2VzIHRoZSBkYXRhYmFzZTtcbiAgICpcbiAgICovXG5cbiAgY2xvc2VEQigpIHtcbiAgICB0aGlzLmRiLmNsb3NlKCk7XG4gIH1cblxufVxuIl19