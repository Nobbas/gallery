import { SafeResourceUrl } from '@angular/platform-browser';
export interface INbGalleryOrderedItem {
    type: string;
    source?: string;
    url: string | SafeResourceUrl;
    index: number;
}
export declare class NbGalleryOrderedItem implements INbGalleryOrderedItem {
    type: string;
    source: string;
    url: string | SafeResourceUrl;
    index: number;
    constructor(obj: INbGalleryOrderedItem);
}
