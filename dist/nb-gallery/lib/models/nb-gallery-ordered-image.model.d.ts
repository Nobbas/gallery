import { SafeResourceUrl } from '@angular/platform-browser';
export interface INbGalleryOrderedImage {
    src: string | SafeResourceUrl;
    index: number;
}
export declare class NbGalleryOrderedImage implements INbGalleryOrderedImage {
    src: string | SafeResourceUrl;
    index: number;
    constructor(obj: INbGalleryOrderedImage);
}
