import { Component, Input, Output, EventEmitter, ViewChild,  ElementRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
@Component({
    selector: 'nb-gallery-tag',
    template: `
    <video #video class="nb-gallery-video" controls (error)="error.emit($event)">
      <source src="{{src}}"/>
    </video>
        `,
    styleUrls: ['./nb-gallery-video.component.scss']
})
export class NbGalleryTagComponent {
    @Input() src: string;

  @Input('pause') set pauseVideo(shouldPause: boolean) {
    const video: HTMLVideoElement = this.video.nativeElement;
    if (shouldPause && !video.paused) {
      video.pause();
    }
  }

  /** Stream that emits when an error occurs */
  @Output() error = new EventEmitter<Error>();

  @ViewChild('video') video: ElementRef;
}
