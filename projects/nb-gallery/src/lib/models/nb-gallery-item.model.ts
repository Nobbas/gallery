import { SafeResourceUrl } from '@angular/platform-browser';

export interface INbGalleryItem {
    type ?: string; // video / image
    source ?: string; // youtube / vimeo / memory in case of video urls
    small?: string | SafeResourceUrl;
    medium?: string | SafeResourceUrl;
    big?: string | SafeResourceUrl;
    description?: string;
    url?: string; // video id in case of vimeo or youtube
    label?: string;
}

export class NbGalleryItem implements INbGalleryItem {
    type ?: string;
    source ?: string;
    small?: string | SafeResourceUrl;
    medium?: string | SafeResourceUrl;
    big?: string | SafeResourceUrl;
    description?: string;
    url?: string;
    label?: string;

    constructor(obj: INbGalleryItem) {
        this.type = obj.type;
        this.source = obj.source;
        this.small = obj.small;
        this.medium = obj.medium;
        this.big = obj.big;
        this.description = obj.description;
        this.url = obj.url;
        this.label = obj.label;
    }
}
