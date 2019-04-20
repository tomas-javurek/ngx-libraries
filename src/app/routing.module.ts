import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// components
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserMediaExampleComponent } from './user-media-example/user-media-example.component';
import { IndexedDbExampleComponent } from './indexed-db-example/indexed-db-example.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'user-media', component: UserMediaExampleComponent },
  { path: 'indexed-db', component: IndexedDbExampleComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class RoutingModule { }
