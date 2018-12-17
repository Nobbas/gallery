import { SafeResourceUrl } from '@angular/platform-browser';

export interface INbGalleryOrderedItem {
    type: string; // video / image
    source ?: string; // youtube / vimeo / memory in case of video urls
    url: string | SafeResourceUrl;
    index: number;
}

export class NbGalleryOrderedItem implements INbGalleryOrderedItem {
    type: string;
    source: string;
    url: string | SafeResourceUrl;
    index: number;

    constructor(obj: INbGalleryOrderedItem) {
        this.type = obj.type;
        this.source = obj.source;
        this.url = obj.url;
        this.index = obj.index;
    }
}
