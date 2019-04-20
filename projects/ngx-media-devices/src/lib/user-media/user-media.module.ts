import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserMediaComponent } from './user-media.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [UserMediaComponent],
  declarations: [UserMediaComponent]
})
export class UserMediaModule { }
