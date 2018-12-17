import { SafeResourceUrl } from '@angular/platform-browser';
export interface INbGalleryThumbnail {
    type?: string;
    source?: string;
    url?: string | SafeResourceUrl;
}
export declare class NbGalleryThumbnail implements INbGalleryThumbnail {
    type?: string;
    source?: string;
    url?: string | SafeResourceUrl;
    constructor(obj: INbGalleryThumbnail);
}
