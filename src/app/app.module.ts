import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxMediaDevicesModule } from 'ngx-media-devices';

import { AppComponent } from './app.component';
import { UserMediaExampleComponent } from './user-media-example/user-media-example.component';
import { RoutingModule } from './routing.module';
import { IndexedDbExampleComponent } from './indexed-db-example/indexed-db-example.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    UserMediaExampleComponent,
    IndexedDbExampleComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    NgxMediaDevicesModule,
    RoutingModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
