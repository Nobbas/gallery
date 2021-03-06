import { EventEmitter, ElementRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { NbGalleryHelperService } from '../nb-gallery-helper.service';
import { NbGalleryAction } from '../models/nb-gallery-action.model';
import { NbGalleryOrderedItem } from '../models/nb-gallery-ordered-item.model';
export declare class NbGalleryItemComponent implements OnInit, OnChanges {
    private sanitization;
    private elementRef;
    private helperService;
    items: NbGalleryOrderedItem[];
    clickable: boolean;
    selectedIndex: number;
    arrows: boolean;
    arrowsAutoHide: boolean;
    swipe: boolean;
    animation: string;
    size: string;
    arrowPrevIcon: string;
    arrowNextIcon: string;
    autoPlay: boolean;
    autoPlayInterval: number;
    autoPlayPauseOnHover: boolean;
    infinityMove: boolean;
    lazyLoading: boolean;
    actions: NbGalleryAction[];
    descriptions: string[];
    showDescription: boolean;
    bullets: boolean;
    bgColor: string;
    onClick: EventEmitter<{}>;
    onActiveChange: EventEmitter<{}>;
    canChangeImage: boolean;
    private timer;
    constructor(sanitization: DomSanitizer, elementRef: ElementRef, helperService: NbGalleryHelperService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    onMouseEnter(): void;
    onMouseLeave(): void;
    reset(index: number): void;
    getItems(): NbGalleryOrderedItem[];
    startAutoPlay(): void;
    stopAutoPlay(): void;
    handleClick(event: Event, index: number): void;
    show(index: number): void;
    showNext(): boolean;
    showPrev(): void;
    setChangeTimeout(): void;
    canShowNext(): boolean;
    canShowPrev(): boolean;
    getSafeUrl(image: string): SafeStyle;
}
