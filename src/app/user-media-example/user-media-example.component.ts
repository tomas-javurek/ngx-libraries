import { Component, OnInit } from '@angular/core';
// rxjs
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-user-media-example',
  templateUrl: './user-media-example.component.html',
  styleUrls: ['./user-media-example.component.scss']
})
export class UserMediaExampleComponent implements OnInit {

  _constraints: any = {video: {facingMode: {exact: 'user'}}, audio: false};
  constraints: BehaviorSubject<any> =
  new BehaviorSubject<any>( this._constraints );

  _constraints2: any = {video: {facingMode: {exact: 'environment'}}, audio: false};
  constraints2: BehaviorSubject<any> =
  new BehaviorSubject<any>(this._constraints2 );
  constructor() { }

  ngOnInit() {
  }

  log(key: any, value: any) {
    console.log(key, value);
  }

  switchCameras() {
    console.log('.........SWITCH CAMERA in user-media-example.component........');
    // camera 1
    if (this._constraints.video.facingMode.exact === 'user') {
      this._constraints.video.facingMode.exact = 'environment';
    } else {
      this._constraints.video.facingMode.exact = 'user';
    }
    this.constraints.next(this._constraints);
    // camera 2
    if (this._constraints2.video.facingMode.exact === 'user') {
      this._constraints2.video.facingMode.exact = 'environment';
    } else {
      this._constraints2.video.facingMode.exact = 'user';
    }
    this.constraints2.next(this._constraints2);
  }

  processCanvasFrame(ctx: any) {
    // TEST PROCESSING CANVAS
    /* const frame = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    const l = frame.data.length / 4;

    for (let i = 0; i < l; i++) {
      const r = frame.data[i * 4 + 0];
      const g = frame.data[i * 4 + 1];
      const b = frame.data[i * 4 + 2];
      if (g > 130 && r > 198 && b < 139) {
        frame.data[i * 4 + 3] = 0;
      }
    }
    ctx.putImageData(frame, 0, 0);
    return; */
  }

}
