import { SafeResourceUrl } from '@angular/platform-browser';
export interface INbGalleryItem {
    type?: string;
    source?: string;
    small?: string | SafeResourceUrl;
    medium?: string | SafeResourceUrl;
    big?: string | SafeResourceUrl;
    description?: string;
    url?: string;
    label?: string;
}
export declare class NbGalleryItem implements INbGalleryItem {
    type?: string;
    source?: string;
    small?: string | SafeResourceUrl;
    medium?: string | SafeResourceUrl;
    big?: string | SafeResourceUrl;
    description?: string;
    url?: string;
    label?: string;
    constructor(obj: INbGalleryItem);
}
