import { EventEmitter, ElementRef } from '@angular/core';
export declare class NbGalleryTagComponent {
    src: string;
    pauseVideo: boolean;
    /** Stream that emits when an error occurs */
    error: EventEmitter<Error>;
    video: ElementRef;
}
