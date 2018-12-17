import { Component, Input, Output, EventEmitter, ViewChild,  ElementRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'nb-gallery-iframe',
    template: `
    <iframe #iframe
            frameborder="0"
            allowfullscreen
            class="nb-gallery-video"
            [src]="iframeSrc">
    </iframe>
        `,
    styleUrls: ['./nb-gallery-video.component.scss']
})
export class NbGalleryIframeComponent implements OnInit {
    @Input() src: string;

    @Input('pause') set pauseVideo(shouldPause: boolean) {
        const iframe: HTMLIFrameElement = this.iframe.nativeElement;
        if (shouldPause) {
          const src = iframe.src;
          iframe.src = src;
        }
      }

    iframeSrc: SafeResourceUrl;

    @ViewChild('iframe') iframe: ElementRef;

  constructor(private _sanitizer: DomSanitizer) { }

    ngOnInit() {
        this.iframeSrc = this._sanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
}
