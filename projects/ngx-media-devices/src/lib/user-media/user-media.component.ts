import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  ElementRef,
  EventEmitter
} from '@angular/core';

// services
import { NgxMediaDevicesService } from '../ngx-media-devices.service';

// rxjs
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'lib-user-media',
  templateUrl: './user-media.component.html',
  styleUrls: ['./user-media.component.css']
})
export class UserMediaComponent implements OnInit {
  // childrens
  @ViewChild('audioElement') audioElement: ElementRef;
  audio: any;
  @ViewChild('videoElement') videoElement: ElementRef;
  video: any;
  @ViewChild('canvasElement') canvasElement: ElementRef;
  canvas: any;

  // COMPONENT API
  // inputs
  @Input() nativeMediaControls: boolean;
  // constraints
  @Input() constraints: BehaviorSubject<any> =
  new BehaviorSubject(
    {
      video: {
        facingMode: 'environtment' // default
      },
      audio: false
    }
  );
  _constraints: any;
  // use canvas instead of video?
  @Input() useCanvas: boolean;

  // TODO: CAMERA CHANGE

  // outputs
  @Output() error: EventEmitter<any> = new EventEmitter<any>();
  @Output() autoplayed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() componentInitialised: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() deviceInitialised: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() facingMode: EventEmitter<string> = new EventEmitter<string>(); // user | environment
  @Output() canvasFrame: EventEmitter<any> = new EventEmitter<any>();
  @Output() stateChanged: EventEmitter<string> = new EventEmitter<string>();
  @Output() devices: EventEmitter<any> = new EventEmitter<any>();
  _devices: any;
  @Output() supportedConstraints: EventEmitter<any> = new EventEmitter<any>();
  _supportedConstraints: any;
  @Output() mediaStream: EventEmitter<MediaStream> = new EventEmitter<MediaStream>();

  // public variables
  canSwitchCamera = false;

  // private variables
  private _componentInitialised = false;
  private _deviceInitialised = false;
  private mediaIsPlaying = false;
  private displayMediaControls = false;
  private mediaElement: any;
  private mediaElementListener: number;

  constructor(
    private mediaDevicesService: NgxMediaDevicesService
  ) {
    // default inputs
    this.nativeMediaControls = false;
    this.useCanvas = false;
  }

  ngOnInit() {
    // on init
    const scope = this;
    // audio native element
    scope.audio = scope.audioElement.nativeElement;
    // video native element
    scope.video = scope.videoElement.nativeElement;
    // canvas native element (if used)
    if (scope.useCanvas) {
      scope.canvas = scope.canvasElement.nativeElement;
      scope.drawVideoToCanvas();
    }
    // get and emit devices
    scope.mediaDevicesService.enumerateDevices()
    .then((devices: any) => {
      scope._devices = devices;
      scope.devices.emit(devices);
    })
    .catch((error: any) => {
      scope._devices = null;
      scope.error.emit(error);
    });
    // get and emit supported constraints
    scope._supportedConstraints = scope.mediaDevicesService.getSupportedConstraints();
    scope.supportedConstraints.emit(scope._supportedConstraints);
    // autoplay
    // native media controls
    if (scope.nativeMediaControls) {
      scope.displayMediaControls = scope.nativeMediaControls;
      scope.toggleMediaControls();
    }
    // subscribe to constraints
    scope.constraints.subscribe((constraints: any) => {
      // console.log('constraints recieved at user-media.component', constraints);
      scope._constraints = constraints;
      scope.processConstraints();
    });
    // component initialised event
    this.componentInitialised.emit(true);
    this._componentInitialised = true;
  }

  private processConstraints() {
    // use & show proper media element
    // USE VIDEO
    if (this._constraints.video && !this.useCanvas) {
      this.video.parentElement.removeAttribute('hidden');
      this.video.parentElement.classList.add('active');
      this.mediaElement = this.video;
    }
    // USE CANVAS
    if (this.useCanvas && this._constraints.video) {
      this.canvas.parentElement.removeAttribute('hidden');
      this.canvas.parentElement.classList.add('active');
      this.mediaElement = this.video;
    }
    // USE AUDIO
    if (!this._constraints.video && this._constraints.audio) {
      this.audio.parentElement.removeAttribute('hidden');
      this.audio.parentElement.classList.add('active');
      this.mediaElement = this.audio;
    }
    // init device
    this.initDevice(this._constraints);
  }

  // PUBLIC METHODS
  // play
  play() {
    // console.log(' –––––––––––––– play() in user-media.component –––––––––––––– ');
    if (!this._deviceInitialised) {
      this.initDevice(this._constraints);
    }
    if (this.mediaIsPlaying) {
      this.pause();
    } else {
      this.resume();
    }
  }

  // toggle native media controls
  toggleMediaControls() {
    this.mediaElement.controls = this.displayMediaControls;
    this.displayMediaControls = !this.displayMediaControls;
  }


  /// PRIVATE METHODS
  private pause() {
    this.mediaElement.pause();
    this.mediaIsPlaying = false;
    this.stateChanged.emit('paused');
  }

  private resume() {
    this.mediaElement.play()
    .then((playing: any) => {
      if (playing) {
        this.mediaIsPlaying = true;
        this.stateChanged.emit('playing');
      }
    })
    .catch((error: any) => {
      this.error.emit(error);
    });
  }


  private initDevice(_constraints: any) {
    const scope = this;
    // getUserMedia
    scope.mediaDevicesService.getUserMedia(_constraints)
    .then((mediaStream: MediaStream) => { // mediaStream recieved
      // emit mediaStream
      scope.mediaStream.emit(mediaStream);
      scope.mediaElement.srcObject = mediaStream; // add mediaStream as src to mediaElement
      scope.mediaElement.addEventListener('loadedmetadata', scope.metadataLoaded, true);
      scope.mediaElement.userMediaScope = scope;
    })
    .catch((error: any) => {
      scope.error.emit(error);
    });
  }

  private metadataLoaded(event) {
    const scope = event.target.userMediaScope;
    if (scope.useCanvas && scope._constraints.video) {
      scope.canvas.width = scope.video.videoWidth;
      scope.canvas.height = scope.video.videoHeight;
    }
    // play stream
    scope.mediaElement.play()
      .then((playing: any) => {
        scope.autoplayed.emit(true);
      })
      .catch((error: any) => {
        scope.autoplayed.emit(false);
      });
    // media stream recieved
    scope._deviceInitialised = true;
    // emit init
    scope.deviceInitialised.emit(true);
    // remove listener
    // console.log('remove mediaElement listener number in user-media.component', scope.metadataLoaded);
    scope.mediaElement.removeEventListener('loadedmetadata', scope.metadataLoaded, true);
  }

  private drawVideoToCanvas() {
    const self = this;
    const ctx = this.canvas.getContext('2d');
    this.video.addEventListener('play', function () {
      const selfVideo = this;
      (function loop() {
        if (!selfVideo.paused && !selfVideo.ended) {
          ctx.drawImage(selfVideo, 0, 0);
          // emit canvasFrame each iteration
          self.canvasFrame.emit(ctx);
          requestAnimationFrame(loop);
        }
      })();
    });
  }

}
