import { SafeResourceUrl } from '@angular/platform-browser';

export interface INbGalleryOrderedImage {
    src: string | SafeResourceUrl;
    index: number;
}

export class NbGalleryOrderedImage implements INbGalleryOrderedImage {
    src: string | SafeResourceUrl;
    index: number;

    constructor(obj: INbGalleryOrderedImage) {
        this.src = obj.src;
        this.index = obj.index;
    }
}
