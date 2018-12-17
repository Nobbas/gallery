import { Component, Input, Output, EventEmitter, HostListener,  ElementRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { NbGalleryItem } from '../models/nb-gallery-item.model';

//
@Component({
    selector: 'nb-gallery-video',
    template: `
    <nb-gallery-iframe
        *ngIf="(videoItem.source === 'youtube' ||videoItem.source === 'vimeo')"
        [pause]="pause" [src]="src">
    </nb-gallery-iframe>
    <nb-gallery-tag *ngIf="videoItem.source === 'memory'" [pause]="pause" [src]="src"></nb-gallery-tag>
        `,
    styleUrls: ['./nb-gallery-video.component.scss']
})
export class NbGalleryVideoComponent implements OnInit {
    @Input() videoItem: NbGalleryItem;
    @Input() pause: Boolean;

    src: string;

    constructor() {

    }

    ngOnInit() {
        switch (this.videoItem.source) {
            case 'youtube':
                this.src = "https://www.youtube.com/embed/" + this.videoItem.url;
                break;
            case 'vimeo':
                this.src = "https://player.vimeo.com/video/" + this.videoItem.url;
                break;
            case 'memory':
                this.src = this.videoItem.url;
                break;
        }
    }


}
