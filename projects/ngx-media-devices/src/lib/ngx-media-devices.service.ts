import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class NgxMediaDevicesService {

  private navigator: any = <any>navigator;

  constructor() {
    // console.log('navigator', this.navigator);
    // Older browsers might not implement mediaDevices at all, so we set an empty object first
    if (this.navigator.mediaDevices === undefined) {
      this.navigator.mediaDevices = {};
    }
    // Some browsers partially implement mediaDevices. We can't just assign an object
    // with getUserMedia as it would overwrite existing properties.
    // Here, we will just add the getUserMedia property if it's missing.
    if (this.navigator.mediaDevices.getUserMedia === undefined) {
      this.navigator.mediaDevices.getUserMedia = function(constraints) {
        // First get ahold of the legacy getUserMedia, if present
        const getUserMedia = this.navigator.webkitGetUserMedia || this.navigator.mozGetUserMedia;
        // Some browsers just don't implement it - return a rejected promise with an error
        // to keep a consistent interface
        if (!getUserMedia) {
          return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
        }
        // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
        return new Promise(function(resolve, reject) {
          getUserMedia.call(navigator, constraints, resolve, reject);
        });
      };
    }
  }

  enumerateDevices(): Promise<any> {
    if (!this.navigator.mediaDevices.enumerateDevices) {
      return Promise.reject(new Error('enumerateDevices is not implemented in this browser'));
    }
    return this.navigator.mediaDevices.enumerateDevices();
  }

  getSupportedConstraints(): MediaTrackSupportedConstraints {
    if (!this.navigator.mediaDevices.getSupportedConstraints) {
      return null;
    }
    return this.navigator.mediaDevices.getSupportedConstraints();
  }

  getUserMedia(constraints: MediaStreamConstraints): Promise<MediaStream> {
    return this.navigator.mediaDevices.getUserMedia(constraints);
  }
}
