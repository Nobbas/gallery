import { SafeResourceUrl } from '@angular/platform-browser';

export interface INbGalleryPreview {
    type ?: string; // video / image
    source ?: string; // youtube / vimeo / memory in case of video urls
    url?: string | SafeResourceUrl;
}

export class NbGalleryPreview implements INbGalleryPreview {
    type ?: string;
    source ?: string;
    url?: string | SafeResourceUrl;

    constructor(obj: INbGalleryPreview) {
        this.type = obj.type;
        this.source = obj.source;
        this.url = obj.url;
    }
}
