import { SafeResourceUrl } from '@angular/platform-browser';
export interface INbGalleryPreview {
    type?: string;
    source?: string;
    url?: string | SafeResourceUrl;
}
export declare class NbGalleryPreview implements INbGalleryPreview {
    type?: string;
    source?: string;
    url?: string | SafeResourceUrl;
    constructor(obj: INbGalleryPreview);
}
