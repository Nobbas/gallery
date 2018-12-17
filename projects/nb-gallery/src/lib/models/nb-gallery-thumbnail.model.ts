import { SafeResourceUrl } from '@angular/platform-browser';

export interface INbGalleryThumbnail {
    type ?: string; // video / image
    source ?: string; // youtube / vimeo / memory in case of video urls
    url?: string | SafeResourceUrl;
}

export class NbGalleryThumbnail implements INbGalleryThumbnail {
    type ?: string;
    source ?: string;
    url?: string | SafeResourceUrl;

    constructor(obj: INbGalleryThumbnail) {
        this.type = obj.type;
        this.source = obj.source;
        this.url = obj.url;
    }
}
