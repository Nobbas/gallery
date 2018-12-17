import { OnInit, DoCheck, ElementRef, AfterViewInit, EventEmitter } from '@angular/core';
import { NbGalleryPreviewComponent } from './nb-gallery-preview/nb-gallery-preview.component';
import { NbGalleryItemComponent } from './nb-gallery-item/nb-gallery-item.component';
import { NbGalleryThumbnailsComponent } from './nb-gallery-thumbnails/nb-gallery-thumbnails.component';
import { NbGalleryItem } from './models/nb-gallery-item.model';
import { NbGalleryOptions } from './models/nb-gallery-options.model';
import { NbGalleryThumbnail } from './models/nb-gallery-thumbnail.model';
import { NbGalleryOrderedItem } from './models/nb-gallery-ordered-item.model';
export declare class NbGalleryComponent implements OnInit, DoCheck, AfterViewInit {
    private myElement;
    options: NbGalleryOptions[];
    items: NbGalleryItem[];
    itemsReady: EventEmitter<{}>;
    change: EventEmitter<{
        index: number;
        item: NbGalleryItem;
    }>;
    previewOpen: EventEmitter<{}>;
    previewClose: EventEmitter<{}>;
    previewChange: EventEmitter<{
        index: number;
        item: NbGalleryItem;
    }>;
    thumbnails: NbGalleryThumbnail[];
    galleryItems: NbGalleryOrderedItem[];
    previewItems: NbGalleryOrderedItem[];
    descriptions: string[];
    links: string[];
    labels: string[];
    oldItems: NbGalleryItem[];
    oldItemsLength: number;
    selectedIndex: number;
    previewEnabled: boolean;
    currentOptions: NbGalleryOptions;
    private breakpoint;
    private prevBreakpoint;
    private fullWidthTimeout;
    preview: NbGalleryPreviewComponent;
    item: NbGalleryItemComponent;
    thumbnail: NbGalleryThumbnailsComponent;
    width: string;
    height: string;
    left: string;
    constructor(myElement: ElementRef);
    ngOnInit(): void;
    ngDoCheck(): void;
    ngAfterViewInit(): void;
    onResize(): void;
    getItemHeight(): string;
    getThumbnailsHeight(): string;
    getThumbnailsMarginTop(): string;
    getThumbnailsMarginBottom(): string;
    openPreview(index: number): void;
    onPreviewOpen(): void;
    onPreviewClose(): void;
    selectFromItem(index: number): void;
    selectFromThumbnails(index: number): void;
    show(index: number): void;
    showNext(): void;
    showPrev(): void;
    canShowNext(): boolean;
    canShowPrev(): boolean;
    previewSelect(index: number): void;
    moveThumbnailsRight(): void;
    moveThumbnailsLeft(): void;
    canMoveThumbnailsRight(): boolean;
    canMoveThumbnailsLeft(): boolean;
    private resetThumbnails;
    private select;
    private checkFullWidth;
    private setItems;
    private setBreakpoint;
    private sortOptions;
    private setOptions;
    private combineOptions;
}