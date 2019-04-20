import { Observable } from 'rxjs';
export declare class NgxIndexedDbService {
    /**
     * The Database
     *
     */
    db: IDBDatabase;
    constructor();
    /**
     * Opens the database.
     *
     */
    openDBAsync(dbName: string, objectStore: string, version: number): Observable<any>;
    /**
     * Gets the object store.
     *
     */
    private getObjectStore;
    /**
     * Gets all records.
     *
     */
    getAllRecordsAsync(storeName: string): Observable<any>;
    /**
     * Gets record by key.
     *
     */
    getRecordAsync(storeName: string, key: string): Observable<any>;
    /**
     * Adds a record.
     *
     */
    addRecordAsync(storeName: string, key: string, record: any): Observable<string>;
    /**
     * Deletes a record.
     *
     */
    deleteRecordAsync(storeName: string, key: string): Observable<string>;
    /**
     * Edits a record.
     *
     */
    editRecordAsync(storeName: string, key: string, record: any): Observable<string>;
    /**
     * Clears an object store
     *
     */
    clearObjectStoreAsync(storeName: string): Observable<string>;
    /**
     * Closes the database;
     *
     */
    closeDB(): void;
}
