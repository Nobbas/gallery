import { OnInit } from '@angular/core';
import { NbGalleryItem } from '../models/nb-gallery-item.model';
export declare class NbGalleryVideoComponent implements OnInit {
    videoItem: NbGalleryItem;
    pause: Boolean;
    src: string;
    constructor();
    ngOnInit(): void;
}
