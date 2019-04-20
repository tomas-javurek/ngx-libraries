import { NgModule } from '@angular/core';
import { UserMediaModule } from './user-media/user-media.module';

@NgModule({
  imports: [
    UserMediaModule
  ],
  declarations: [],
  exports: [UserMediaModule]
})
export class NgxMediaDevicesModule { }
