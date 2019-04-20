import { Component, OnInit } from '@angular/core';
import { NgxIndexedDbService } from 'ngx-indexed-db';

@Component({
  selector: 'app-indexed-db-example',
  templateUrl: './indexed-db-example.component.html',
  styleUrls: ['./indexed-db-example.component.scss']
})
export class IndexedDbExampleComponent implements OnInit {

  dbName = 'indexedDbServiceExample';
  storeName = 'example';
  version = 1;
  messages: string;

  constructor(
    private indexedDb: NgxIndexedDbService
  ) { }

  ngOnInit() {
    this.indexedDb.openDBAsync(this.dbName, this.storeName, this.version).subscribe((opened: string) => {
      console.log('openDBAsync', opened);
      if (opened === 'done') {
        this.messages = 'DB is successfully opened.';
        this.indexedDb.getRecordAsync(this.storeName, 'saved').subscribe((visited: any) => {
          if (!visited) {
            // save visited
            this.indexedDb.addRecordAsync(this.storeName, 'saved', true).subscribe((res: any) => {
              this.messages = 'Testing value was successfully saved in db';
            });
          } else {
            this.messages = 'Testing value already saved in db';
          }
        });
        this.indexedDb.getAllRecordsAsync(this.storeName).subscribe((result: any) => {
          console.log('getAllRecordsAsync', result);
          this.messages += `\n ----> saved reulst: ${JSON.stringify(result)}`;
        });
      } else {
        this.messages = 'DB could not be opened.';
      }
    });
  }

}
