import { ElementRef, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
export declare class NbGalleryIframeComponent implements OnInit {
    private _sanitizer;
    src: string;
    pauseVideo: boolean;
    iframeSrc: SafeResourceUrl;
    iframe: ElementRef;
    constructor(_sanitizer: DomSanitizer);
    ngOnInit(): void;
}
