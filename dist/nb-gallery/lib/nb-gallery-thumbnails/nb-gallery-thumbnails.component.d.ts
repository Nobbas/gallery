import { EventEmitter, OnChanges, SimpleChanges, ElementRef } from '@angular/core';
import { DomSanitizer, SafeStyle, SafeResourceUrl } from '@angular/platform-browser';
import { NbGalleryHelperService } from '../nb-gallery-helper.service';
import { NbGalleryAction } from '../models/nb-gallery-action.model';
import { NbGalleryThumbnail } from '../models/nb-gallery-thumbnail.model';
export declare class NbGalleryThumbnailsComponent implements OnChanges {
    private sanitization;
    private elementRef;
    private helperService;
    thumbnailsLeft: string;
    thumbnailsMarginLeft: string;
    mouseenter: boolean;
    remainingCountValue: number;
    minStopIndex: number;
    items: NbGalleryThumbnail[];
    links: string[];
    labels: string[];
    linkTarget: string;
    columns: number;
    rows: number;
    arrows: boolean;
    arrowsAutoHide: boolean;
    margin: number;
    selectedIndex: number;
    clickable: boolean;
    swipe: boolean;
    size: string;
    arrowPrevIcon: string;
    arrowNextIcon: string;
    moveSize: number;
    order: number;
    remainingCount: boolean;
    lazyLoading: boolean;
    actions: NbGalleryAction[];
    onActiveChange: EventEmitter<{}>;
    private index;
    constructor(sanitization: DomSanitizer, elementRef: ElementRef, helperService: NbGalleryHelperService);
    ngOnChanges(changes: SimpleChanges): void;
    onMouseEnter(): void;
    onMouseLeave(): void;
    reset(index: number): void;
    getItems(): string[] | SafeResourceUrl[];
    handleClick(event: Event, index: number): void;
    hasLink(index: number): boolean;
    moveRight(): void;
    moveLeft(): void;
    canMoveRight(): boolean;
    canMoveLeft(): boolean;
    getThumbnailLeft(index: number): SafeStyle;
    getThumbnailTop(index: number): SafeStyle;
    getThumbnailWidth(): SafeStyle;
    getThumbnailHeight(): SafeStyle;
    setThumbnailsPosition(): void;
    setDefaultPosition(): void;
    canShowArrows(): boolean;
    validateIndex(): void;
    getSafeUrl(image: string): SafeStyle;
    private getThumbnailPosition;
    private getThumbnailDimension;
    private getMaxIndex;
    private getVisibleCount;
    private getSafeStyle;
}
