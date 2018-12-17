import { CommonModule } from '@angular/common';
import { DomSanitizer, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, Injectable, Renderer, HostListener, ElementRef, ViewChild, ChangeDetectorRef, HostBinding, NgModule } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NbGalleryActionComponent {
    constructor() {
        this.disabled = false;
        this.titleText = '';
        this.onClick = new EventEmitter();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleClick(event) {
        if (!this.disabled) {
            this.onClick.emit(event);
        }
        event.stopPropagation();
        event.preventDefault();
    }
}
NbGalleryActionComponent.decorators = [
    { type: Component, args: [{
                selector: 'nb-gallery-action',
                template: `
        <div class="nb-gallery-icon" [class.nb-gallery-icon-disabled]="disabled"
            aria-hidden="true"
            title="{{ titleText }}"
            (click)="handleClick($event)">
                <i class="nb-gallery-icon-content {{ icon }}"></i>
        </div>`,
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
NbGalleryActionComponent.propDecorators = {
    icon: [{ type: Input }],
    disabled: [{ type: Input }],
    titleText: [{ type: Input }],
    onClick: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NbGalleryArrowsComponent {
    constructor() {
        this.onPrevClick = new EventEmitter();
        this.onNextClick = new EventEmitter();
    }
    /**
     * @return {?}
     */
    handlePrevClick() {
        this.onPrevClick.emit();
    }
    /**
     * @return {?}
     */
    handleNextClick() {
        this.onNextClick.emit();
    }
}
NbGalleryArrowsComponent.decorators = [
    { type: Component, args: [{
                selector: 'nb-gallery-arrows',
                template: `
        <div class="nb-gallery-arrow-wrapper nb-gallery-arrow-left">
            <div class="nb-gallery-icon nb-gallery-arrow" aria-hidden="true" (click)="handlePrevClick()" [class.nb-gallery-disabled]="prevDisabled">
                <i class="nb-gallery-icon-content {{arrowPrevIcon}}"></i>
            </div>
        </div>
        <div class="nb-gallery-arrow-wrapper nb-gallery-arrow-right">
            <div class="nb-gallery-icon nb-gallery-arrow" aria-hidden="true" (click)="handleNextClick()" [class.nb-gallery-disabled]="nextDisabled">
                <i class="nb-gallery-icon-content {{arrowNextIcon}}"></i>
            </div>
        </div>
    `,
                styles: [".nb-gallery-arrow-wrapper{position:absolute;height:100%;width:1px;display:table;z-index:2000;table-layout:fixed}.nb-gallery-arrow-left{left:0}.nb-gallery-arrow-right{right:0}.nb-gallery-arrow{top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);cursor:pointer}.nb-gallery-arrow.nb-gallery-disabled{opacity:.6;cursor:default}.nb-gallery-arrow-left .nb-gallery-arrow{left:10px}.nb-gallery-arrow-right .nb-gallery-arrow{right:10px}"]
            }] }
];
NbGalleryArrowsComponent.propDecorators = {
    prevDisabled: [{ type: Input }],
    nextDisabled: [{ type: Input }],
    arrowPrevIcon: [{ type: Input }],
    arrowNextIcon: [{ type: Input }],
    onPrevClick: [{ type: Output }],
    onNextClick: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NbGalleryBulletsComponent {
    constructor() {
        this.active = 0;
        this.onChange = new EventEmitter();
    }
    /**
     * @return {?}
     */
    getBullets() {
        return Array(this.count);
    }
    /**
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    handleChange(event, index) {
        this.onChange.emit(index);
    }
}
NbGalleryBulletsComponent.decorators = [
    { type: Component, args: [{
                selector: 'nb-gallery-bullets',
                template: `
        <div class="nb-gallery-bullet" *ngFor="let bullet of getBullets(); let i = index;" (click)="handleChange($event, i)" [ngClass]="{ 'nb-gallery-active': i == active }"></div>
    `,
                styles: [":host{position:absolute;z-index:2000;display:inline-flex;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);bottom:0;padding:10px}.nb-gallery-bullet{width:10px;height:10px;border-radius:50%;cursor:pointer;background:#fff}.nb-gallery-bullet:not(:first-child){margin-left:5px}.nb-gallery-bullet.nb-gallery-active,.nb-gallery-bullet:hover{background:#000}"]
            }] }
];
NbGalleryBulletsComponent.propDecorators = {
    count: [{ type: Input }],
    active: [{ type: Input }],
    onChange: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NbGalleryHelperService {
    /**
     * @param {?} renderer
     */
    constructor(renderer) {
        this.renderer = renderer;
        this.swipeHandlers = new Map();
    }
    /**
     * @param {?} status
     * @param {?} element
     * @param {?} id
     * @param {?} nextHandler
     * @param {?} prevHandler
     * @return {?}
     */
    manageSwipe(status, element, id, nextHandler, prevHandler) {
        /** @type {?} */
        const handlers = this.getSwipeHandlers(id);
        // swipeleft and swiperight are available only if hammerjs is included
        try {
            if (status && !handlers) {
                this.swipeHandlers.set(id, [
                    this.renderer.listen(element.nativeElement, 'swipeleft', () => nextHandler()),
                    this.renderer.listen(element.nativeElement, 'swiperight', () => prevHandler()),
                    this.renderer.listen(element.nativeElement, 'swipeup', () => prevHandler()),
                    this.renderer.listen(element.nativeElement, 'swipedown', () => prevHandler()),
                ]);
            }
            else if (!status && handlers) {
                handlers.map((handler) => handler());
                this.removeSwipeHandlers(id);
            }
        }
        catch (e) { }
    }
    /**
     * @param {?} url
     * @return {?}
     */
    validateUrl(url) {
        if (url.replace) {
            return url.replace(new RegExp(' ', 'g'), '%20')
                .replace(new RegExp('\'', 'g'), '%27');
        }
        else {
            return url;
        }
    }
    /**
     * @param {?} image
     * @return {?}
     */
    getBackgroundUrl(image) {
        return 'url(\'' + this.validateUrl(image) + '\')';
    }
    /**
     * @param {?} id
     * @return {?}
     */
    getSwipeHandlers(id) {
        return this.swipeHandlers.get(id);
    }
    /**
     * @param {?} id
     * @return {?}
     */
    removeSwipeHandlers(id) {
        this.swipeHandlers.delete(id);
    }
}
NbGalleryHelperService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
NbGalleryHelperService.ctorParameters = () => [
    { type: Renderer }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NbGalleryAnimation {
}
NbGalleryAnimation.Fade = 'fade';
NbGalleryAnimation.Slide = 'slide';
NbGalleryAnimation.Rotate = 'rotate';
NbGalleryAnimation.Zoom = 'zoom';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NbGalleryItemComponent {
    /**
     * @param {?} sanitization
     * @param {?} elementRef
     * @param {?} helperService
     */
    constructor(sanitization, elementRef, helperService) {
        this.sanitization = sanitization;
        this.elementRef = elementRef;
        this.helperService = helperService;
        this.onClick = new EventEmitter();
        this.onActiveChange = new EventEmitter();
        this.canChangeImage = true;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.arrows && this.arrowsAutoHide) {
            this.arrows = false;
        }
        if (this.autoPlay) {
            this.startAutoPlay();
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes['swipe']) {
            this.helperService.manageSwipe(this.swipe, this.elementRef, 'image', () => this.showNext(), () => this.showPrev());
        }
    }
    /**
     * @return {?}
     */
    onMouseEnter() {
        if (this.arrowsAutoHide && !this.arrows) {
            this.arrows = true;
        }
        if (this.autoPlay && this.autoPlayPauseOnHover) {
            this.stopAutoPlay();
        }
    }
    /**
     * @return {?}
     */
    onMouseLeave() {
        if (this.arrowsAutoHide && this.arrows) {
            this.arrows = false;
        }
        if (this.autoPlay && this.autoPlayPauseOnHover) {
            this.startAutoPlay();
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    reset(index) {
        this.selectedIndex = index;
    }
    /**
     * @return {?}
     */
    getItems() {
        if (!this.items) {
            return [];
        }
        if (this.lazyLoading) {
            /** @type {?} */
            const indexes = [this.selectedIndex];
            /** @type {?} */
            const prevIndex = this.selectedIndex - 1;
            if (prevIndex === -1 && this.infinityMove) {
                indexes.push(this.items.length - 1);
            }
            else if (prevIndex >= 0) {
                indexes.push(prevIndex);
            }
            /** @type {?} */
            const nextIndex = this.selectedIndex + 1;
            if (nextIndex === this.items.length && this.infinityMove) {
                indexes.push(0);
            }
            else if (nextIndex < this.items.length) {
                indexes.push(nextIndex);
            }
            return this.items.filter((img, i) => indexes.indexOf(i) != -1);
        }
        else {
            return this.items;
        }
    }
    /**
     * @return {?}
     */
    startAutoPlay() {
        this.stopAutoPlay();
        this.timer = setInterval(() => {
            if (!this.showNext()) {
                this.selectedIndex = -1;
                this.showNext();
            }
        }, this.autoPlayInterval);
    }
    /**
     * @return {?}
     */
    stopAutoPlay() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
    /**
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    handleClick(event, index) {
        if (this.clickable) {
            this.onClick.emit(index);
            event.stopPropagation();
            event.preventDefault();
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    show(index) {
        this.selectedIndex = index;
        this.onActiveChange.emit(this.selectedIndex);
        this.setChangeTimeout();
    }
    /**
     * @return {?}
     */
    showNext() {
        if (this.canShowNext() && this.canChangeImage) {
            this.selectedIndex++;
            if (this.selectedIndex === this.items.length) {
                this.selectedIndex = 0;
            }
            this.onActiveChange.emit(this.selectedIndex);
            this.setChangeTimeout();
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * @return {?}
     */
    showPrev() {
        if (this.canShowPrev() && this.canChangeImage) {
            this.selectedIndex--;
            if (this.selectedIndex < 0) {
                this.selectedIndex = this.items.length - 1;
            }
            this.onActiveChange.emit(this.selectedIndex);
            this.setChangeTimeout();
        }
    }
    /**
     * @return {?}
     */
    setChangeTimeout() {
        this.canChangeImage = false;
        /** @type {?} */
        let timeout = 1000;
        if (this.animation === NbGalleryAnimation.Slide
            || this.animation === NbGalleryAnimation.Fade) {
            timeout = 500;
        }
        setTimeout(() => {
            this.canChangeImage = true;
        }, timeout);
    }
    /**
     * @return {?}
     */
    canShowNext() {
        if (this.items) {
            return this.infinityMove || this.selectedIndex < this.items.length - 1
                ? true : false;
        }
        else {
            return false;
        }
    }
    /**
     * @return {?}
     */
    canShowPrev() {
        if (this.items) {
            return this.infinityMove || this.selectedIndex > 0 ? true : false;
        }
        else {
            return false;
        }
    }
    /**
     * @param {?} image
     * @return {?}
     */
    getSafeUrl(image) {
        return this.sanitization.bypassSecurityTrustStyle(this.helperService.getBackgroundUrl(image));
    }
}
NbGalleryItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'nb-gallery-item',
                template: `
        <div class="nb-gallery-item-wrapper nb-gallery-animation-{{animation}} nb-gallery-item-size-{{size}}">
            <div class="nb-gallery-item" *ngFor="let item of getItems(); let i = index;" [ngClass]="{ 'nb-gallery-active': selectedIndex == item.index, 'nb-gallery-inactive-left': selectedIndex > item.index, 'nb-gallery-inactive-right': selectedIndex < item.index, 'nb-gallery-clickable': clickable }" (click)="handleClick($event, item.index)">
                <div *ngIf="item.type === 'image'" class="nb-gallery-item-image" [style.background-image]="getSafeUrl(item.url)"></div>
                <nb-gallery-video *ngIf="item.type === 'video'" [videoItem]="item" [pause]="selectedIndex !== item.index" class="nb-gallery-item-video"></nb-gallery-video>
                <div class="nb-gallery-icons-wrapper">
                    <nb-gallery-action *ngFor="let action of actions" [icon]="action.icon" [disabled]="action.disabled" [titleText]="action.titleText" (onClick)="action.onClick($event, item.index)"></nb-gallery-action>
                </div>
                <div class="nb-gallery-item-text" *ngIf="showDescription && descriptions[item.index]" [innerHTML]="descriptions[item.index]" (click)="$event.stopPropagation()"></div>
            </div>
        </div>
        <nb-gallery-bullets *ngIf="bullets" [count]="items.length" [active]="selectedIndex" (onChange)="show($event)"></nb-gallery-bullets>
        <nb-gallery-arrows class="nb-gallery-item-size-{{size}}" *ngIf="arrows" (onPrevClick)="showPrev()" (onNextClick)="showNext()" [prevDisabled]="!canShowPrev()" [nextDisabled]="!canShowNext()" [arrowPrevIcon]="arrowPrevIcon" [arrowNextIcon]="arrowNextIcon"></nb-gallery-arrows>
    `,
                styles: [":host{width:100%;display:inline-block;position:relative}.nb-gallery-item-wrapper{width:100%;height:100%;position:absolute;left:0;top:0;overflow:hidden}.nb-gallery-item,.nb-gallery-item-image{background-position:center;background-repeat:no-repeat;height:100%;width:100%;position:absolute;top:0}.nb-gallery-item-image.nb-gallery-active,.nb-gallery-item.nb-gallery-active{z-index:1000}.nb-gallery-item-size-cover .nb-gallery-item .nb-gallery-item-image{background-size:cover}.nb-gallery-item-size-contain .nb-gallery-item .nb-gallery-item-image{background-size:contain}.nb-gallery-animation-fade .nb-gallery-item{left:0;opacity:0;transition:.5s ease-in-out}.nb-gallery-animation-fade .nb-gallery-item.nb-gallery-active{opacity:1}.nb-gallery-animation-slide .nb-gallery-item{transition:.5s ease-in-out}.nb-gallery-animation-slide .nb-gallery-item.nb-gallery-active{left:0}.nb-gallery-animation-slide .nb-gallery-item.nb-gallery-inactive-left{left:-100%}.nb-gallery-animation-slide .nb-gallery-item.nb-gallery-inactive-right{left:100%}.nb-gallery-animation-rotate .nb-gallery-item{transition:1s;-webkit-transform:scale(3.5,3.5) rotate(90deg);transform:scale(3.5,3.5) rotate(90deg);left:0;opacity:0}.nb-gallery-animation-rotate .nb-gallery-item.nb-gallery-active{-webkit-transform:scale(1,1) rotate(0);transform:scale(1,1) rotate(0);opacity:1}.nb-gallery-animation-zoom .nb-gallery-item{transition:1s;-webkit-transform:scale(2.5,2.5);transform:scale(2.5,2.5);left:0;opacity:0}.nb-gallery-animation-zoom .nb-gallery-item.nb-gallery-active{-webkit-transform:scale(1,1);transform:scale(1,1);opacity:1}.nb-gallery-item-text{width:100%;background:rgba(0,0,0,.7);padding:10px;text-align:center;color:#fff;font-size:16px;position:absolute;bottom:0;z-index:10}"]
            }] }
];
/** @nocollapse */
NbGalleryItemComponent.ctorParameters = () => [
    { type: DomSanitizer },
    { type: ElementRef },
    { type: NbGalleryHelperService }
];
NbGalleryItemComponent.propDecorators = {
    items: [{ type: Input }],
    clickable: [{ type: Input }],
    selectedIndex: [{ type: Input }],
    arrows: [{ type: Input }],
    arrowsAutoHide: [{ type: Input }],
    swipe: [{ type: Input }],
    animation: [{ type: Input }],
    size: [{ type: Input }],
    arrowPrevIcon: [{ type: Input }],
    arrowNextIcon: [{ type: Input }],
    autoPlay: [{ type: Input }],
    autoPlayInterval: [{ type: Input }],
    autoPlayPauseOnHover: [{ type: Input }],
    infinityMove: [{ type: Input }],
    lazyLoading: [{ type: Input }],
    actions: [{ type: Input }],
    descriptions: [{ type: Input }],
    showDescription: [{ type: Input }],
    bullets: [{ type: Input }],
    bgColor: [{ type: Input }],
    onClick: [{ type: Output }],
    onActiveChange: [{ type: Output }],
    onMouseEnter: [{ type: HostListener, args: ['mouseenter',] }],
    onMouseLeave: [{ type: HostListener, args: ['mouseleave',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NbGalleryItem {
    /**
     * @param {?} obj
     */
    constructor(obj) {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NbGalleryVideoComponent {
    constructor() {
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        switch (this.videoItem.source) {
            case 'youtube':
                this.src = "https://www.youtube.com/embed/" + this.videoItem.url;
                break;
            case 'vimeo':
                this.src = "https://player.vimeo.com/video/" + this.videoItem.url;
                break;
            case 'memory':
                this.src = this.videoItem.url;
                break;
        }
    }
}
NbGalleryVideoComponent.decorators = [
    { type: Component, args: [{
                selector: 'nb-gallery-video',
                template: `
    <nb-gallery-iframe
        *ngIf="(videoItem.source === 'youtube' ||videoItem.source === 'vimeo')"
        [pause]="pause" [src]="src">
    </nb-gallery-iframe>
    <nb-gallery-tag *ngIf="videoItem.source === 'memory'" [pause]="pause" [src]="src"></nb-gallery-tag>
        `,
                styles: [".nb-gallery-video{width:100%;height:100%}"]
            }] }
];
/** @nocollapse */
NbGalleryVideoComponent.ctorParameters = () => [];
NbGalleryVideoComponent.propDecorators = {
    videoItem: [{ type: Input }],
    pause: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NbGalleryIframeComponent {
    /**
     * @param {?} _sanitizer
     */
    constructor(_sanitizer) {
        this._sanitizer = _sanitizer;
    }
    /**
     * @param {?} shouldPause
     * @return {?}
     */
    set pauseVideo(shouldPause) {
        /** @type {?} */
        const iframe = this.iframe.nativeElement;
        if (shouldPause) {
            /** @type {?} */
            const src = iframe.src;
            iframe.src = src;
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.iframeSrc = this._sanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
}
NbGalleryIframeComponent.decorators = [
    { type: Component, args: [{
                selector: 'nb-gallery-iframe',
                template: `
    <iframe #iframe
            frameborder="0"
            allowfullscreen
            class="nb-gallery-video"
            [src]="iframeSrc">
    </iframe>
        `,
                styles: [".nb-gallery-video{width:100%;height:100%}"]
            }] }
];
/** @nocollapse */
NbGalleryIframeComponent.ctorParameters = () => [
    { type: DomSanitizer }
];
NbGalleryIframeComponent.propDecorators = {
    src: [{ type: Input }],
    pauseVideo: [{ type: Input, args: ['pause',] }],
    iframe: [{ type: ViewChild, args: ['iframe',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NbGalleryTagComponent {
    constructor() {
        /**
         * Stream that emits when an error occurs
         */
        this.error = new EventEmitter();
    }
    /**
     * @param {?} shouldPause
     * @return {?}
     */
    set pauseVideo(shouldPause) {
        /** @type {?} */
        const video = this.video.nativeElement;
        if (shouldPause && !video.paused) {
            video.pause();
        }
    }
}
NbGalleryTagComponent.decorators = [
    { type: Component, args: [{
                selector: 'nb-gallery-tag',
                template: `
    <video #video class="nb-gallery-video" controls (error)="error.emit($event)">
      <source src="{{src}}"/>
    </video>
        `,
                styles: [".nb-gallery-video{width:100%;height:100%}"]
            }] }
];
NbGalleryTagComponent.propDecorators = {
    src: [{ type: Input }],
    pauseVideo: [{ type: Input, args: ['pause',] }],
    error: [{ type: Output }],
    video: [{ type: ViewChild, args: ['video',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NbGalleryOrder {
}
NbGalleryOrder.Column = 1;
NbGalleryOrder.Row = 2;
NbGalleryOrder.Page = 3;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NbGalleryThumbnailsComponent {
    /**
     * @param {?} sanitization
     * @param {?} elementRef
     * @param {?} helperService
     */
    constructor(sanitization, elementRef, helperService) {
        this.sanitization = sanitization;
        this.elementRef = elementRef;
        this.helperService = helperService;
        this.minStopIndex = 0;
        this.onActiveChange = new EventEmitter();
        this.index = 0;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes['selectedIndex']) {
            this.validateIndex();
        }
        if (changes['swipe']) {
            this.helperService.manageSwipe(this.swipe, this.elementRef, 'thumbnails', () => this.moveRight(), () => this.moveLeft());
        }
        if (this.items) {
            this.remainingCountValue = this.items.length - (this.rows * this.columns);
        }
    }
    /**
     * @return {?}
     */
    onMouseEnter() {
        this.mouseenter = true;
    }
    /**
     * @return {?}
     */
    onMouseLeave() {
        this.mouseenter = false;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    reset(index) {
        this.selectedIndex = index;
        this.setDefaultPosition();
        this.index = 0;
        this.validateIndex();
    }
    /**
     * @return {?}
     */
    getItems() {
        if (!this.items) {
            return [];
        }
        if (this.remainingCount) {
            return this.items.slice(0, this.rows * this.columns);
        }
        else if (this.lazyLoading && this.order !== NbGalleryOrder.Row) {
            /** @type {?} */
            let stopIndex = 0;
            if (this.order === NbGalleryOrder.Column) {
                stopIndex = (this.index + this.columns + this.moveSize) * this.rows;
            }
            else if (this.order === NbGalleryOrder.Page) {
                stopIndex = this.index + ((this.columns * this.rows) * 2);
            }
            if (stopIndex <= this.minStopIndex) {
                stopIndex = this.minStopIndex;
            }
            else {
                this.minStopIndex = stopIndex;
            }
            return this.items.slice(0, stopIndex);
        }
        else {
            return this.items;
        }
    }
    /**
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    handleClick(event, index) {
        if (!this.hasLink(index)) {
            this.selectedIndex = index;
            this.onActiveChange.emit(index);
            event.stopPropagation();
            event.preventDefault();
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    hasLink(index) {
        if (this.links && this.links.length && this.links[index])
            return true;
    }
    /**
     * @return {?}
     */
    moveRight() {
        if (this.canMoveRight()) {
            this.index += this.moveSize;
            /** @type {?} */
            const maxIndex = this.getMaxIndex() - this.columns;
            if (this.index > maxIndex) {
                this.index = maxIndex;
            }
            this.setThumbnailsPosition();
        }
    }
    /**
     * @return {?}
     */
    moveLeft() {
        if (this.canMoveLeft()) {
            this.index -= this.moveSize;
            if (this.index < 0) {
                this.index = 0;
            }
            this.setThumbnailsPosition();
        }
    }
    /**
     * @return {?}
     */
    canMoveRight() {
        return this.index + this.columns < this.getMaxIndex() ? true : false;
    }
    /**
     * @return {?}
     */
    canMoveLeft() {
        return this.index !== 0 ? true : false;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    getThumbnailLeft(index) {
        /** @type {?} */
        let calculatedIndex;
        if (this.order === NbGalleryOrder.Column) {
            calculatedIndex = Math.floor(index / this.rows);
        }
        else if (this.order === NbGalleryOrder.Page) {
            calculatedIndex = (index % this.columns) + (Math.floor(index / (this.rows * this.columns)) * this.columns);
        }
        else if (this.order === NbGalleryOrder.Row && this.remainingCount) {
            calculatedIndex = index % this.columns;
        }
        else {
            calculatedIndex = index % Math.ceil(this.items.length / this.rows);
        }
        return this.getThumbnailPosition(calculatedIndex, this.columns);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    getThumbnailTop(index) {
        /** @type {?} */
        let calculatedIndex;
        if (this.order === NbGalleryOrder.Column) {
            calculatedIndex = index % this.rows;
        }
        else if (this.order === NbGalleryOrder.Page) {
            calculatedIndex = Math.floor(index / this.columns) - (Math.floor(index / (this.rows * this.columns)) * this.rows);
        }
        else if (this.order === NbGalleryOrder.Row && this.remainingCount) {
            calculatedIndex = Math.floor(index / this.columns);
        }
        else {
            calculatedIndex = Math.floor(index / Math.ceil(this.items.length / this.rows));
        }
        return this.getThumbnailPosition(calculatedIndex, this.rows);
    }
    /**
     * @return {?}
     */
    getThumbnailWidth() {
        return this.getThumbnailDimension(this.columns);
    }
    /**
     * @return {?}
     */
    getThumbnailHeight() {
        return this.getThumbnailDimension(this.rows);
    }
    /**
     * @return {?}
     */
    setThumbnailsPosition() {
        this.thumbnailsLeft = -((100 / this.columns) * this.index) + '%';
        this.thumbnailsMarginLeft = -((this.margin - (((this.columns - 1)
            * this.margin) / this.columns)) * this.index) + 'px';
    }
    /**
     * @return {?}
     */
    setDefaultPosition() {
        this.thumbnailsLeft = '0px';
        this.thumbnailsMarginLeft = '0px';
    }
    /**
     * @return {?}
     */
    canShowArrows() {
        if (this.remainingCount) {
            return false;
        }
        else if (this.arrows && this.items && this.items.length > this.getVisibleCount()
            && (!this.arrowsAutoHide || this.mouseenter)) {
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * @return {?}
     */
    validateIndex() {
        if (this.items) {
            /** @type {?} */
            let newIndex;
            if (this.order === NbGalleryOrder.Column) {
                newIndex = Math.floor(this.selectedIndex / this.rows);
            }
            else {
                newIndex = this.selectedIndex % Math.ceil(this.items.length / this.rows);
            }
            if (this.remainingCount) {
                newIndex = 0;
            }
            if (newIndex < this.index || newIndex >= this.index + this.columns) {
                /** @type {?} */
                const maxIndex = this.getMaxIndex() - this.columns;
                this.index = newIndex > maxIndex ? maxIndex : newIndex;
                this.setThumbnailsPosition();
            }
        }
    }
    /**
     * @param {?} image
     * @return {?}
     */
    getSafeUrl(image) {
        return this.sanitization.bypassSecurityTrustStyle(this.helperService.getBackgroundUrl(image));
    }
    /**
     * @param {?} index
     * @param {?} count
     * @return {?}
     */
    getThumbnailPosition(index, count) {
        return this.getSafeStyle('calc(' + ((100 / count) * index) + '% + '
            + ((this.margin - (((count - 1) * this.margin) / count)) * index) + 'px)');
    }
    /**
     * @param {?} count
     * @return {?}
     */
    getThumbnailDimension(count) {
        if (this.margin !== 0) {
            return this.getSafeStyle('calc(' + (100 / count) + '% - '
                + (((count - 1) * this.margin) / count) + 'px)');
        }
        else {
            return this.getSafeStyle('calc(' + (100 / count) + '% + 1px)');
        }
    }
    /**
     * @return {?}
     */
    getMaxIndex() {
        if (this.order === NbGalleryOrder.Page) {
            /** @type {?} */
            let maxIndex = (Math.floor(this.items.length / this.getVisibleCount()) * this.columns);
            if (this.items.length % this.getVisibleCount() > this.columns) {
                maxIndex += this.columns;
            }
            else {
                maxIndex += this.items.length % this.getVisibleCount();
            }
            return maxIndex;
        }
        else {
            return Math.ceil(this.items.length / this.rows);
        }
    }
    /**
     * @return {?}
     */
    getVisibleCount() {
        return this.columns * this.rows;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    getSafeStyle(value) {
        return this.sanitization.bypassSecurityTrustStyle(value);
    }
}
NbGalleryThumbnailsComponent.decorators = [
    { type: Component, args: [{
                selector: 'nb-gallery-thumbnails',
                template: `
    <div class="nb-gallery-thumbnails-wrapper nb-gallery-thumbnail-size-{{size}}">
        <div class="nb-gallery-thumbnails" [style.transform]="'translateX(' + thumbnailsLeft + ')'" [style.marginLeft]="thumbnailsMarginLeft">
            <a [href]="hasLink(i) ? links[i] : '#'" [target]="linkTarget" class="nb-gallery-thumbnail" *ngFor="let item of getItems(); let i = index;" [style.background-image]="getSafeUrl(item.url)" (click)="handleClick($event, i)" [style.width]="getThumbnailWidth()" [style.height]="getThumbnailHeight()" [style.left]="getThumbnailLeft(i)" [style.top]="getThumbnailTop(i)" [ngClass]="{ 'nb-gallery-active': i == selectedIndex, 'nb-gallery-clickable': clickable }" [attr.aria-label]="labels[i]">
                <div class="nb-gallery-icons-wrapper">
                    <nb-gallery-action *ngFor="let action of actions" [icon]="action.icon" [disabled]="action.disabled" [titleText]="action.titleText" (onClick)="action.onClick($event, i)"></nb-gallery-action>
                </div>
                <div class="nb-gallery-remaining-count-overlay" *ngIf="remainingCount && remainingCountValue && (i == (rows * columns) - 1)">
                    <span class="nb-gallery-remaining-count">+{{remainingCountValue}}</span>
                </div>
            </a>
        </div>
    </div>
    <nb-gallery-arrows *ngIf="canShowArrows()" (onPrevClick)="moveLeft()" (onNextClick)="moveRight()" [prevDisabled]="!canMoveLeft()" [nextDisabled]="!canMoveRight()" [arrowPrevIcon]="arrowPrevIcon" [arrowNextIcon]="arrowNextIcon"></nb-gallery-arrows>
    `,
                styles: [":host{width:100%;display:inline-block;position:relative}.nb-gallery-thumbnails-wrapper{width:100%;height:100%;position:absolute;overflow:hidden}.nb-gallery-thumbnails{height:100%;width:100%;position:absolute;left:0;-webkit-transform:translateX(0);transform:translateX(0);transition:transform .5s ease-in-out;transition:transform .5s ease-in-out,-webkit-transform .5s ease-in-out;will-change:transform}.nb-gallery-thumbnails .nb-gallery-thumbnail{position:absolute;height:100%;background-position:center;background-repeat:no-repeat;text-decoration:none}.nb-gallery-thumbnail-size-cover .nb-gallery-thumbnails .nb-gallery-thumbnail{background-size:cover}.nb-gallery-thumbnail-size-contain .nb-gallery-thumbnails .nb-gallery-thumbnail{background-size:contain}.nb-gallery-remaining-count-overlay{width:100%;height:100%;position:absolute;left:0;top:0;background-color:rgba(0,0,0,.4)}.nb-gallery-remaining-count{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);color:#fff;font-size:30px}"]
            }] }
];
/** @nocollapse */
NbGalleryThumbnailsComponent.ctorParameters = () => [
    { type: DomSanitizer },
    { type: ElementRef },
    { type: NbGalleryHelperService }
];
NbGalleryThumbnailsComponent.propDecorators = {
    items: [{ type: Input }],
    links: [{ type: Input }],
    labels: [{ type: Input }],
    linkTarget: [{ type: Input }],
    columns: [{ type: Input }],
    rows: [{ type: Input }],
    arrows: [{ type: Input }],
    arrowsAutoHide: [{ type: Input }],
    margin: [{ type: Input }],
    selectedIndex: [{ type: Input }],
    clickable: [{ type: Input }],
    swipe: [{ type: Input }],
    size: [{ type: Input }],
    arrowPrevIcon: [{ type: Input }],
    arrowNextIcon: [{ type: Input }],
    moveSize: [{ type: Input }],
    order: [{ type: Input }],
    remainingCount: [{ type: Input }],
    lazyLoading: [{ type: Input }],
    actions: [{ type: Input }],
    onActiveChange: [{ type: Output }],
    onMouseEnter: [{ type: HostListener, args: ['mouseenter',] }],
    onMouseLeave: [{ type: HostListener, args: ['mouseleave',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NbGalleryPreviewComponent {
    /**
     * @param {?} sanitization
     * @param {?} elementRef
     * @param {?} helperService
     * @param {?} renderer
     * @param {?} changeDetectorRef
     */
    constructor(sanitization, elementRef, helperService, renderer, changeDetectorRef) {
        this.sanitization = sanitization;
        this.elementRef = elementRef;
        this.helperService = helperService;
        this.renderer = renderer;
        this.changeDetectorRef = changeDetectorRef;
        this.showSpinner = false;
        this.positionLeft = 0;
        this.positionTop = 0;
        this.zoomValue = 1;
        this.loading = false;
        this.rotateValue = 0;
        this.index = 0;
        this.onOpen = new EventEmitter();
        this.onClose = new EventEmitter();
        this.onActiveChange = new EventEmitter();
        this.isOpen = false;
        this.initialX = 0;
        this.initialY = 0;
        this.initialLeft = 0;
        this.initialTop = 0;
        this.isMove = false;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes['swipe']) {
            this.helperService.manageSwipe(this.swipe, this.elementRef, 'preview', () => this.showNext(), () => this.showPrev());
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.keyDownListener) {
            this.keyDownListener();
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onKeyDown(e) {
        if (this.isOpen) {
            if (this.keyboardNavigation) {
                if (this.isKeyboardPrev(e)) {
                    this.showPrev();
                }
                else if (this.isKeyboardNext(e)) {
                    this.showNext();
                }
            }
            if (this.closeOnEsc && this.isKeyboardEsc(e)) {
                this.close();
            }
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    open(index) {
        this.onOpen.emit();
        this.index = index;
        this.isOpen = true;
        this.show(true);
        if (this.forceFullscreen) {
            this.manageFullscreen();
        }
        this.keyDownListener = this.renderer.listenGlobal("window", "keydown", (e) => this.onKeyDown(e));
    }
    /**
     * @return {?}
     */
    close() {
        this.isOpen = false;
        this.closeFullscreen();
        this.onClose.emit();
        this.stopAutoPlay();
        if (this.keyDownListener) {
            this.keyDownListener();
        }
    }
    /**
     * @return {?}
     */
    imageMouseEnter() {
        if (this.autoPlay && this.autoPlayPauseOnHover) {
            this.stopAutoPlay();
        }
    }
    /**
     * @return {?}
     */
    imageMouseLeave() {
        if (this.autoPlay && this.autoPlayPauseOnHover) {
            this.startAutoPlay();
        }
    }
    /**
     * @return {?}
     */
    startAutoPlay() {
        if (this.autoPlay) {
            this.stopAutoPlay();
            this.timer = setTimeout(() => {
                if (!this.showNext()) {
                    this.index = -1;
                    this.showNext();
                }
            }, this.autoPlayInterval);
        }
    }
    /**
     * @return {?}
     */
    stopAutoPlay() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    showAtIndex(index) {
        this.index = index;
        this.show();
    }
    /**
     * @return {?}
     */
    showNext() {
        if (this.canShowNext()) {
            this.index++;
            if (this.index === this.items.length) {
                this.index = 0;
            }
            this.show();
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * @return {?}
     */
    showPrev() {
        if (this.canShowPrev()) {
            this.index--;
            if (this.index < 0) {
                this.index = this.items.length - 1;
            }
            this.show();
        }
    }
    /**
     * @return {?}
     */
    canShowNext() {
        if (this.loading) {
            return false;
        }
        else if (this.items) {
            return this.infinityMove || this.index < this.items.length - 1 ? true : false;
        }
        else {
            return false;
        }
    }
    /**
     * @return {?}
     */
    canShowPrev() {
        if (this.loading) {
            return false;
        }
        else if (this.items) {
            return this.infinityMove || this.index > 0 ? true : false;
        }
        else {
            return false;
        }
    }
    /**
     * @return {?}
     */
    manageFullscreen() {
        if (this.fullscreen || this.forceFullscreen) {
            /** @type {?} */
            const doc = /** @type {?} */ (document);
            if (!doc.fullscreenElement && !doc.mozFullScreenElement
                && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
                this.openFullscreen();
            }
            else {
                this.closeFullscreen();
            }
        }
    }
    /**
     * @param {?} image
     * @return {?}
     */
    getSafeUrl(image) {
        return image.substr(0, 10) === 'data:image' ?
            image : this.sanitization.bypassSecurityTrustUrl(image);
    }
    /**
     * @return {?}
     */
    zoomIn() {
        if (this.canZoomIn()) {
            this.zoomValue += this.zoomStep;
            if (this.zoomValue > this.zoomMax) {
                this.zoomValue = this.zoomMax;
            }
        }
    }
    /**
     * @return {?}
     */
    zoomOut() {
        if (this.canZoomOut()) {
            this.zoomValue -= this.zoomStep;
            if (this.zoomValue < this.zoomMin) {
                this.zoomValue = this.zoomMin;
            }
            if (this.zoomValue <= 1) {
                this.resetPosition();
            }
        }
    }
    /**
     * @return {?}
     */
    rotateLeft() {
        this.rotateValue -= 90;
    }
    /**
     * @return {?}
     */
    rotateRight() {
        this.rotateValue += 90;
    }
    /**
     * @return {?}
     */
    getTransform() {
        return this.sanitization.bypassSecurityTrustStyle('scale(' + this.zoomValue + ') rotate(' + this.rotateValue + 'deg)');
    }
    /**
     * @return {?}
     */
    canZoomIn() {
        return this.zoomValue < this.zoomMax ? true : false;
    }
    /**
     * @return {?}
     */
    canZoomOut() {
        return this.zoomValue > this.zoomMin ? true : false;
    }
    /**
     * @return {?}
     */
    canDragOnZoom() {
        return this.zoom && this.zoomValue > 1;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    mouseDownHandler(e) {
        if (this.canDragOnZoom()) {
            this.initialX = this.getClientX(e);
            this.initialY = this.getClientY(e);
            this.initialLeft = this.positionLeft;
            this.initialTop = this.positionTop;
            this.isMove = true;
            e.preventDefault();
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    mouseUpHandler(e) {
        this.isMove = false;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    mouseMoveHandler(e) {
        if (this.isMove) {
            this.positionLeft = this.initialLeft + (this.getClientX(e) - this.initialX);
            this.positionTop = this.initialTop + (this.getClientY(e) - this.initialY);
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    getClientX(e) {
        return e.touches && e.touches.length ? e.touches[0].clientX : e.clientX;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    getClientY(e) {
        return e.touches && e.touches.length ? e.touches[0].clientY : e.clientY;
    }
    /**
     * @return {?}
     */
    resetPosition() {
        if (this.zoom) {
            this.positionLeft = 0;
            this.positionTop = 0;
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    isKeyboardNext(e) {
        return e.keyCode === 39 ? true : false;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    isKeyboardPrev(e) {
        return e.keyCode === 37 ? true : false;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    isKeyboardEsc(e) {
        return e.keyCode === 27 ? true : false;
    }
    /**
     * @return {?}
     */
    openFullscreen() {
        /** @type {?} */
        const element = /** @type {?} */ (document.documentElement);
        if (element.requestFullscreen) {
            element.requestFullscreen();
        }
        else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
        else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        }
        else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        }
    }
    /**
     * @return {?}
     */
    closeFullscreen() {
        /** @type {?} */
        const doc = /** @type {?} */ (document);
        if (doc.exitFullscreen) {
            doc.exitFullscreen();
        }
        else if (doc.msExitFullscreen) {
            doc.msExitFullscreen();
        }
        else if (doc.mozCancelFullScreen) {
            doc.mozCancelFullScreen();
        }
        else if (doc.webkitExitFullscreen) {
            doc.webkitExitFullscreen();
        }
    }
    /**
     * @param {?=} first
     * @return {?}
     */
    show(first = false) {
        this.loading = true;
        this.stopAutoPlay();
        this.onActiveChange.emit(this.index);
        if (first || !this.animation) {
            this._show();
        }
        else {
            setTimeout(() => this._show(), 600);
        }
    }
    /**
     * @return {?}
     */
    _show() {
        this.zoomValue = 1;
        this.rotateValue = 0;
        this.resetPosition();
        console.log(this.items);
        this.src = this.items[this.index].type === 'image' ? this.getSafeUrl(/** @type {?} */ (this.items[this.index].url)) : undefined;
        this.item = this.items[this.index];
        console.log(this.item);
        this.srcIndex = this.index;
        this.description = this.descriptions[this.index];
        this.changeDetectorRef.markForCheck();
        setTimeout(() => {
            if (this.items[this.index].type === 'video') {
                this.updateOnVideo();
            }
            else {
                this.updateOnImage();
            }
        });
    }
    /**
     * @param {?} img
     * @return {?}
     */
    isImgLoaded(img) {
        if (!img.complete) {
            return false;
        }
        if (typeof img.naturalWidth !== 'undefined' && img.naturalWidth === 0) {
            return false;
        }
        return true;
    }
    /**
     * @return {?}
     */
    updateOnImage() {
        if (this.isImgLoaded(this.previewImage.nativeElement)) {
            this.loading = false;
            this.startAutoPlay();
            this.changeDetectorRef.markForCheck();
        }
        else {
            setTimeout(() => {
                if (this.loading) {
                    this.showSpinner = true;
                    this.changeDetectorRef.markForCheck();
                }
            });
            this.previewImage.nativeElement.onload = () => {
                this.loading = false;
                this.showSpinner = false;
                this.previewImage.nativeElement.onload = null;
                this.startAutoPlay();
                this.changeDetectorRef.markForCheck();
            };
        }
    }
    /**
     * @return {?}
     */
    updateOnVideo() {
        this.loading = false;
    }
}
NbGalleryPreviewComponent.decorators = [
    { type: Component, args: [{
                selector: 'nb-gallery-preview',
                template: `
        <nb-gallery-arrows (onPrevClick)="showPrev()" (onNextClick)="showNext()" [prevDisabled]="!canShowPrev()" [nextDisabled]="!canShowNext()" [arrowPrevIcon]="arrowPrevIcon" [arrowNextIcon]="arrowNextIcon"></nb-gallery-arrows>
        <div class="nb-gallery-preview-top">
            <div class="nb-gallery-preview-icons">
                <nb-gallery-action *ngFor="let action of actions" [icon]="action.icon" [disabled]="action.disabled" [titleText]="action.titleText" (onClick)="action.onClick($event, index)"></nb-gallery-action>
                <a *ngIf="download && src" [href]="src" class="nb-gallery-icon" aria-hidden="true" download>
                    <i class="nb-gallery-icon-content {{ downloadIcon }}"></i>
                </a>
                <nb-gallery-action *ngIf="zoom" [icon]="zoomOutIcon" [disabled]="!canZoomOut()" (onClick)="zoomOut()"></nb-gallery-action>
                <nb-gallery-action *ngIf="zoom" [icon]="zoomInIcon" [disabled]="!canZoomIn()" (onClick)="zoomIn()"></nb-gallery-action>
                <nb-gallery-action *ngIf="rotate" [icon]="rotateLeftIcon" (onClick)="rotateLeft()"></nb-gallery-action>
                <nb-gallery-action *ngIf="rotate" [icon]="rotateRightIcon" (onClick)="rotateRight()"></nb-gallery-action>
                <nb-gallery-action *ngIf="fullscreen" [icon]="'nb-gallery-fullscreen ' + fullscreenIcon" (onClick)="manageFullscreen()"></nb-gallery-action>
                <nb-gallery-action [icon]="'nb-gallery-close ' + closeIcon" (onClick)="close()"></nb-gallery-action>
            </div>
        </div>
        <div class="nb-spinner-wrapper nb-gallery-center" [class.nb-gallery-active]="showSpinner">
            <i class="nb-gallery-icon nb-gallery-spinner {{spinnerIcon}}" aria-hidden="true"></i>
        </div>
        <div class="nb-gallery-preview-wrapper" (click)="closeOnClick && close()" (mouseup)="mouseUpHandler($event)" (mousemove)="mouseMoveHandler($event)" (touchend)="mouseUpHandler($event)" (touchmove)="mouseMoveHandler($event)">
            <div class="nb-gallery-preview-img-wrapper">
                <img *ngIf="src && item && item.type === 'image'" #previewImage class="nb-gallery-preview-img nb-gallery-center" [src]="src" (click)="$event.stopPropagation()" (mouseenter)="imageMouseEnter()" (mouseleave)="imageMouseLeave()" (mousedown)="mouseDownHandler($event)" (touchstart)="mouseDownHandler($event)" [class.nb-gallery-active]="!loading" [class.animation]="animation" [class.nb-gallery-grab]="canDragOnZoom()" [style.transform]="getTransform()" [style.left]="positionLeft + 'px'" [style.top]="positionTop + 'px'"/>
                <nb-gallery-video *ngIf="item && item.type === 'video'" #previewVideo [videoItem]="item" [pause]="index !== srcIndex" class="nb-gallery-preview-video nb-gallery-center" (click)="$event.stopPropagation()" [class.nb-gallery-active]="!loading" [class.animation]="animation" [class.nb-gallery-grab]="canDragOnZoom()" [style.transform]="getTransform()" [style.left]="positionLeft + 'px'" [style.top]="positionTop + 'px'" ></nb-gallery-video>
                <nb-gallery-bullets *ngIf="bullets" [count]="items.length" [active]="index" (onChange)="showAtIndex($event)"></nb-gallery-bullets>
            </div>
            <div class="nb-gallery-preview-text" *ngIf="showDescription && description" [innerHTML]="description" (click)="$event.stopPropagation()"></div>
        </div>
    `,
                styles: [":host(.nb-gallery-active){width:100%;height:100%;position:fixed;left:0;top:0;background:rgba(0,0,0,.7);z-index:10000;display:inline-block}:host{display:none}:host /deep/ .nb-gallery-arrow{font-size:50px}:host /deep/ nb-gallery-bullets{height:5%;align-items:center;padding:0}.nb-gallery-preview-video{max-width:90%;max-height:90%}.nb-gallery-preview-img{opacity:0;max-width:90%;max-height:90%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;transition:transform .5s;transition:transform .5s,-webkit-transform .5s}.nb-gallery-preview-img.animation{transition:opacity .5s linear,transform .5s,-webkit-transform .5s}.nb-gallery-preview-img.nb-gallery-active{opacity:1}.nb-gallery-preview-img.nb-gallery-grab{cursor:grab;cursor:-webkit-grab}.nb-gallery-icon.nb-gallery-spinner{font-size:50px;left:0;display:inline-block}:host /deep/ .nb-gallery-preview-top{position:absolute;width:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host /deep/ .nb-gallery-preview-icons{float:right}:host /deep/ .nb-gallery-preview-icons .nb-gallery-icon{position:relative;margin-right:10px;margin-top:10px;font-size:25px;cursor:pointer;text-decoration:none}:host /deep/ .nb-gallery-preview-icons .nb-gallery-icon.nb-gallery-icon-disabled{cursor:default;opacity:.4}.nb-spinner-wrapper{width:50px;height:50px;display:none}.nb-spinner-wrapper.nb-gallery-active{display:inline-block}.nb-gallery-center{position:absolute;left:0;right:0;bottom:0;margin:auto;top:0}.nb-gallery-preview-text{width:100%;background:rgba(0,0,0,.7);padding:10px;text-align:center;color:#fff;font-size:16px;flex:0 1 auto;z-index:10}.nb-gallery-preview-wrapper{width:100%;height:100%;display:flex;flex-flow:column}.nb-gallery-preview-img-wrapper{flex:1 1 auto;position:relative}"]
            }] }
];
/** @nocollapse */
NbGalleryPreviewComponent.ctorParameters = () => [
    { type: DomSanitizer },
    { type: ElementRef },
    { type: NbGalleryHelperService },
    { type: Renderer },
    { type: ChangeDetectorRef }
];
NbGalleryPreviewComponent.propDecorators = {
    items: [{ type: Input }],
    descriptions: [{ type: Input }],
    showDescription: [{ type: Input }],
    swipe: [{ type: Input }],
    fullscreen: [{ type: Input }],
    forceFullscreen: [{ type: Input }],
    closeOnClick: [{ type: Input }],
    closeOnEsc: [{ type: Input }],
    keyboardNavigation: [{ type: Input }],
    arrowPrevIcon: [{ type: Input }],
    arrowNextIcon: [{ type: Input }],
    closeIcon: [{ type: Input }],
    fullscreenIcon: [{ type: Input }],
    spinnerIcon: [{ type: Input }],
    autoPlay: [{ type: Input }],
    autoPlayInterval: [{ type: Input }],
    autoPlayPauseOnHover: [{ type: Input }],
    infinityMove: [{ type: Input }],
    zoom: [{ type: Input }],
    zoomStep: [{ type: Input }],
    zoomMax: [{ type: Input }],
    zoomMin: [{ type: Input }],
    zoomInIcon: [{ type: Input }],
    zoomOutIcon: [{ type: Input }],
    animation: [{ type: Input }],
    actions: [{ type: Input }],
    rotate: [{ type: Input }],
    rotateLeftIcon: [{ type: Input }],
    rotateRightIcon: [{ type: Input }],
    download: [{ type: Input }],
    downloadIcon: [{ type: Input }],
    bullets: [{ type: Input }],
    onOpen: [{ type: Output }],
    onClose: [{ type: Output }],
    onActiveChange: [{ type: Output }],
    previewImage: [{ type: ViewChild, args: ['previewImage',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NbGalleryImageSize {
}
NbGalleryImageSize.Cover = 'cover';
NbGalleryImageSize.Contain = 'contain';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NbGalleryLayout {
}
NbGalleryLayout.ThumbnailsTop = 'thumbnails-top';
NbGalleryLayout.ThumbnailsBottom = 'thumbnails-bottom';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NbGalleryAction {
    /**
     * @param {?} action
     */
    constructor(action) {
        this.icon = action.icon;
        this.disabled = action.disabled ? action.disabled : false;
        this.titleText = action.titleText ? action.titleText : '';
        this.onClick = action.onClick;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NbGalleryOptions {
    /**
     * @param {?} obj
     */
    constructor(obj) {
        /** @type {?} */
        const preventDefaults = obj.breakpoint === undefined ? false : true;
        /**
         * @template T
         * @param {?} source
         * @param {?} defaultValue
         * @return {?}
         */
        function use(source, defaultValue) {
            return obj && (source !== undefined || preventDefaults) ? source : defaultValue;
        }
        this.breakpoint = use(obj.breakpoint, undefined);
        this.width = use(obj.width, '500px');
        this.height = use(obj.height, '400px');
        this.fullWidth = use(obj.fullWidth, false);
        this.layout = use(obj.layout, NbGalleryLayout.ThumbnailsBottom);
        this.startIndex = use(obj.startIndex, 0);
        this.linkTarget = use(obj.linkTarget, '_blank');
        this.lazyLoading = use(obj.lazyLoading, true);
        this.item = use(obj.item, true);
        this.itemPercent = use(obj.itemPercent, 75);
        this.itemArrows = use(obj.itemArrows, true);
        this.itemArrowsAutoHide = use(obj.itemArrowsAutoHide, false);
        this.itemSwipe = use(obj.itemSwipe, false);
        this.itemAnimation = use(obj.itemAnimation, NbGalleryAnimation.Fade);
        this.itemSize = use(obj.itemSize, NbGalleryImageSize.Cover);
        this.itemAutoPlay = use(obj.itemAutoPlay, false);
        this.itemAutoPlayInterval = use(obj.itemAutoPlayInterval, 2000);
        this.itemAutoPlayPauseOnHover = use(obj.itemAutoPlayPauseOnHover, false);
        this.itemInfinityMove = use(obj.itemInfinityMove, false);
        if (obj && obj.itemActions && obj.itemActions.length) {
            obj.itemActions = obj.itemActions.map(action => new NbGalleryAction(action));
        }
        this.itemActions = use(obj.itemActions, []);
        this.itemDescription = use(obj.itemDescription, false);
        this.itemBullets = use(obj.itemBullets, false);
        this.thumbnails = use(obj.thumbnails, true);
        this.defaultVideoThumbnnailUrl = use(obj.defaultVideoThumbnnailUrl, undefined);
        this.thumbnailsColumns = use(obj.thumbnailsColumns, 4);
        this.thumbnailsRows = use(obj.thumbnailsRows, 1);
        this.thumbnailsPercent = use(obj.thumbnailsPercent, 25);
        this.thumbnailsMargin = use(obj.thumbnailsMargin, 10);
        this.thumbnailsArrows = use(obj.thumbnailsArrows, true);
        this.thumbnailsArrowsAutoHide = use(obj.thumbnailsArrowsAutoHide, false);
        this.thumbnailsSwipe = use(obj.thumbnailsSwipe, false);
        this.thumbnailsMoveSize = use(obj.thumbnailsMoveSize, 1);
        this.thumbnailsOrder = use(obj.thumbnailsOrder, NbGalleryOrder.Column);
        this.thumbnailsRemainingCount = use(obj.thumbnailsRemainingCount, false);
        this.thumbnailsAsLinks = use(obj.thumbnailsAsLinks, false);
        this.thumbnailsAutoHide = use(obj.thumbnailsAutoHide, false);
        this.thumbnailMargin = use(obj.thumbnailMargin, 10);
        this.thumbnailSize = use(obj.thumbnailSize, NbGalleryImageSize.Cover);
        if (obj && obj.thumbnailActions && obj.thumbnailActions.length) {
            obj.thumbnailActions = obj.thumbnailActions.map(action => new NbGalleryAction(action));
        }
        this.thumbnailActions = use(obj.thumbnailActions, []);
        this.preview = use(obj.preview, true);
        this.previewDescription = use(obj.previewDescription, true);
        this.previewSwipe = use(obj.previewSwipe, false);
        this.previewFullscreen = use(obj.previewFullscreen, false);
        this.previewForceFullscreen = use(obj.previewForceFullscreen, false);
        this.previewCloseOnClick = use(obj.previewCloseOnClick, false);
        this.previewCloseOnEsc = use(obj.previewCloseOnEsc, false);
        this.previewKeyboardNavigation = use(obj.previewKeyboardNavigation, false);
        this.previewAnimation = use(obj.previewAnimation, true);
        this.previewAutoPlay = use(obj.previewAutoPlay, false);
        this.previewAutoPlayInterval = use(obj.previewAutoPlayInterval, 2000);
        this.previewAutoPlayPauseOnHover = use(obj.previewAutoPlayPauseOnHover, false);
        this.previewInfinityMove = use(obj.previewInfinityMove, false);
        this.previewZoom = use(obj.previewZoom, false);
        this.previewZoomStep = use(obj.previewZoomStep, 0.1);
        this.previewZoomMax = use(obj.previewZoomMax, 2);
        this.previewZoomMin = use(obj.previewZoomMin, 0.5);
        this.previewRotate = use(obj.previewRotate, false);
        this.previewDownload = use(obj.previewDownload, false);
        this.previewCustom = use(obj.previewCustom, undefined);
        this.previewBullets = use(obj.previewBullets, false);
        this.arrowPrevIcon = use(obj.arrowPrevIcon, 'fa fa-arrow-circle-left');
        this.arrowNextIcon = use(obj.arrowNextIcon, 'fa fa-arrow-circle-right');
        this.closeIcon = use(obj.closeIcon, 'fa fa-times-circle');
        this.fullscreenIcon = use(obj.fullscreenIcon, 'fa fa-arrows-alt');
        this.spinnerIcon = use(obj.spinnerIcon, 'fa fa-spinner fa-pulse fa-3x fa-fw');
        this.zoomInIcon = use(obj.zoomInIcon, 'fa fa-search-plus');
        this.zoomOutIcon = use(obj.zoomOutIcon, 'fa fa-search-minus');
        this.rotateLeftIcon = use(obj.rotateLeftIcon, 'fa fa-undo');
        this.rotateRightIcon = use(obj.rotateRightIcon, 'fa fa-repeat');
        this.downloadIcon = use(obj.downloadIcon, 'fa fa-arrow-circle-down');
        if (obj && obj.actions && obj.actions.length) {
            obj.actions = obj.actions.map(action => new NbGalleryAction(action));
        }
        this.actions = use(obj.actions, []);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NbGalleryThumbnail {
    /**
     * @param {?} obj
     */
    constructor(obj) {
        this.type = obj.type;
        this.source = obj.source;
        this.url = obj.url;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NbGalleryOrderedItem {
    /**
     * @param {?} obj
     */
    constructor(obj) {
        this.type = obj.type;
        this.source = obj.source;
        this.url = obj.url;
        this.index = obj.index;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NbGalleryComponent {
    /**
     * @param {?} myElement
     */
    constructor(myElement) {
        this.myElement = myElement;
        this.itemsReady = new EventEmitter();
        this.change = new EventEmitter();
        this.previewOpen = new EventEmitter();
        this.previewClose = new EventEmitter();
        this.previewChange = new EventEmitter();
        this.oldItemsLength = 0;
        this.selectedIndex = 0;
        this.breakpoint = undefined;
        this.prevBreakpoint = undefined;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.options = this.options.map((opt) => new NbGalleryOptions(opt));
        this.sortOptions();
        this.setBreakpoint();
        this.setOptions();
        this.checkFullWidth();
        if (this.currentOptions) {
            this.selectedIndex = /** @type {?} */ (this.currentOptions.startIndex);
        }
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        if (this.items !== undefined && (this.items.length !== this.oldItemsLength)
            || (this.items !== this.oldItems)) {
            this.oldItemsLength = this.items.length;
            this.oldItems = this.items;
            this.setOptions();
            this.setItems();
            if (this.items && this.items.length) {
                this.itemsReady.emit();
            }
            if (this.item) {
                this.item.reset(/** @type {?} */ (this.currentOptions.startIndex));
            }
            if (this.currentOptions.thumbnailsAutoHide && this.currentOptions.thumbnails
                && this.items.length <= 1) {
                this.currentOptions.thumbnails = false;
                this.currentOptions.itemArrows = false;
            }
            this.resetThumbnails();
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.checkFullWidth();
    }
    /**
     * @return {?}
     */
    onResize() {
        this.setBreakpoint();
        if (this.prevBreakpoint !== this.breakpoint) {
            this.setOptions();
            this.resetThumbnails();
        }
        if (this.currentOptions && this.currentOptions.fullWidth) {
            if (this.fullWidthTimeout) {
                clearTimeout(this.fullWidthTimeout);
            }
            this.fullWidthTimeout = setTimeout(() => {
                this.checkFullWidth();
            }, 200);
        }
    }
    /**
     * @return {?}
     */
    getItemHeight() {
        return (this.currentOptions && this.currentOptions.thumbnails) ?
            this.currentOptions.itemPercent + '%' : '100%';
    }
    /**
     * @return {?}
     */
    getThumbnailsHeight() {
        if (this.currentOptions && this.currentOptions.item) {
            return 'calc(' + this.currentOptions.thumbnailsPercent + '% - '
                + this.currentOptions.thumbnailsMargin + 'px)';
        }
        else {
            return '100%';
        }
    }
    /**
     * @return {?}
     */
    getThumbnailsMarginTop() {
        if (this.currentOptions && this.currentOptions.layout === NbGalleryLayout.ThumbnailsBottom) {
            return this.currentOptions.thumbnailsMargin + 'px';
        }
        else {
            return '0px';
        }
    }
    /**
     * @return {?}
     */
    getThumbnailsMarginBottom() {
        if (this.currentOptions && this.currentOptions.layout === NbGalleryLayout.ThumbnailsTop) {
            return this.currentOptions.thumbnailsMargin + 'px';
        }
        else {
            return '0px';
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    openPreview(index) {
        if (this.currentOptions.previewCustom) {
            this.currentOptions.previewCustom(index);
        }
        else {
            this.previewEnabled = true;
            this.preview.open(index);
        }
        console.log(index);
    }
    /**
     * @return {?}
     */
    onPreviewOpen() {
        this.previewOpen.emit();
        if (this.item && this.item.autoPlay) {
            this.item.stopAutoPlay();
        }
    }
    /**
     * @return {?}
     */
    onPreviewClose() {
        this.previewEnabled = false;
        this.previewClose.emit();
        if (this.item && this.item.autoPlay) {
            this.item.startAutoPlay();
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    selectFromItem(index) {
        this.select(index);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    selectFromThumbnails(index) {
        this.select(index);
        if (this.currentOptions && this.currentOptions.thumbnails && this.currentOptions.preview
            && (!this.currentOptions.item || this.currentOptions.thumbnailsRemainingCount)) {
            this.openPreview(this.selectedIndex);
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    show(index) {
        this.select(index);
    }
    /**
     * @return {?}
     */
    showNext() {
        this.item.showNext();
    }
    /**
     * @return {?}
     */
    showPrev() {
        this.item.showPrev();
    }
    /**
     * @return {?}
     */
    canShowNext() {
        if (this.items && this.currentOptions) {
            return (this.currentOptions.itemInfinityMove || this.selectedIndex < this.items.length - 1)
                ? true : false;
        }
        else {
            return false;
        }
    }
    /**
     * @return {?}
     */
    canShowPrev() {
        if (this.items && this.currentOptions) {
            return (this.currentOptions.itemInfinityMove || this.selectedIndex > 0) ? true : false;
        }
        else {
            return false;
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    previewSelect(index) {
        this.previewChange.emit({ index, item: this.items[index] });
    }
    /**
     * @return {?}
     */
    moveThumbnailsRight() {
        this.thumbnail.moveRight();
    }
    /**
     * @return {?}
     */
    moveThumbnailsLeft() {
        this.thumbnail.moveLeft();
    }
    /**
     * @return {?}
     */
    canMoveThumbnailsRight() {
        return this.thumbnail.canMoveRight();
    }
    /**
     * @return {?}
     */
    canMoveThumbnailsLeft() {
        return this.thumbnail.canMoveLeft();
    }
    /**
     * @return {?}
     */
    resetThumbnails() {
        if (this.thumbnail) {
            this.thumbnail.reset(/** @type {?} */ (this.currentOptions.startIndex));
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    select(index) {
        this.selectedIndex = index;
        this.change.emit({
            index,
            item: this.items[index]
        });
    }
    /**
     * @return {?}
     */
    checkFullWidth() {
        if (this.currentOptions && this.currentOptions.fullWidth) {
            this.width = document.body.clientWidth + 'px';
            this.left = (-(document.body.clientWidth -
                this.myElement.nativeElement.parentNode.innerWidth) / 2) + 'px';
        }
    }
    /**
     * @return {?}
     */
    setItems() {
        this.thumbnails = this.items.map((item, i) => new NbGalleryThumbnail({
            type: item.type,
            source: item.source,
            url: item.type === 'image' ? item.small : this.currentOptions.defaultVideoThumbnnailUrl
        }));
        this.galleryItems = this.items.map((item, i) => new NbGalleryOrderedItem({
            type: item.type,
            source: item.source,
            url: item.type === 'image' ? item.medium : item.url,
            index: i
        }));
        this.previewItems = this.items.map((item, i) => new NbGalleryOrderedItem({
            type: item.type,
            source: item.source,
            url: item.type === 'image' ? item.big : item.url,
            index: i
        }));
        this.descriptions = this.items.map((item) => /** @type {?} */ (item.description));
        this.links = this.items.map((item) => /** @type {?} */ (item.url));
        this.labels = this.items.map((item) => /** @type {?} */ (item.label));
    }
    /**
     * @return {?}
     */
    setBreakpoint() {
        this.prevBreakpoint = this.breakpoint;
        /** @type {?} */
        let breakpoints;
        if (typeof window !== 'undefined') {
            breakpoints = this.options.filter((opt) => opt.breakpoint >= window.innerWidth)
                .map((opt) => opt.breakpoint);
        }
        if (breakpoints && breakpoints.length) {
            this.breakpoint = breakpoints.pop();
        }
        else {
            this.breakpoint = undefined;
        }
    }
    /**
     * @return {?}
     */
    sortOptions() {
        this.options = [
            ...this.options.filter((a) => a.breakpoint === undefined),
            ...this.options
                .filter((a) => a.breakpoint !== undefined)
                .sort((a, b) => b.breakpoint - a.breakpoint)
        ];
    }
    /**
     * @return {?}
     */
    setOptions() {
        this.currentOptions = new NbGalleryOptions({});
        this.options
            .filter((opt) => opt.breakpoint === undefined || opt.breakpoint >= this.breakpoint)
            .map((opt) => this.combineOptions(this.currentOptions, opt));
        this.width = /** @type {?} */ (this.currentOptions.width);
        this.height = /** @type {?} */ (this.currentOptions.height);
    }
    /**
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    combineOptions(first, second) {
        Object.keys(second).map((val) => first[val] = second[val] !== undefined ? second[val] : first[val]);
    }
}
NbGalleryComponent.decorators = [
    { type: Component, args: [{
                selector: 'nb-gallery',
                template: `
  <div class="nb-gallery-layout {{currentOptions?.layout}}">
      <nb-gallery-item  *ngIf="currentOptions?.item" [style.height]="getItemHeight()" [items]="galleryItems" [clickable]="currentOptions?.preview" [selectedIndex]="selectedIndex" [arrows]="currentOptions?.itemArrows" [arrowsAutoHide]="currentOptions?.itemArrowsAutoHide" [arrowPrevIcon]="currentOptions?.arrowPrevIcon" [arrowNextIcon]="currentOptions?.arrowNextIcon" [swipe]="currentOptions?.itemSwipe" [animation]="currentOptions?.itemAnimation" [size]="currentOptions?.itemSize" [autoPlay]="currentOptions?.itemAutoPlay" [autoPlayInterval]="currentOptions?.itemAutoPlayInterval" [autoPlayPauseOnHover]="currentOptions?.itemAutoPlayPauseOnHover" [infinityMove]="currentOptions?.itemInfinityMove"  [lazyLoading]="currentOptions?.lazyLoading" [actions]="currentOptions?.itemActions" [descriptions]="descriptions" [showDescription]="currentOptions?.itemDescription" [bullets]="currentOptions?.itemBullets" (onClick)="openPreview($event)" (onActiveChange)="selectFromItem($event)"></nb-gallery-item>
      <nb-gallery-thumbnails *ngIf="currentOptions?.thumbnails" [style.marginTop]="getThumbnailsMarginTop()" [style.marginBottom]="getThumbnailsMarginBottom()" [style.height]="getThumbnailsHeight()" [items]="thumbnails" [links]="currentOptions?.thumbnailsAsLinks ? links : []" [labels]="labels" [linkTarget]="currentOptions?.linkTarget" [selectedIndex]="selectedIndex" [columns]="currentOptions?.thumbnailsColumns" [rows]="currentOptions?.thumbnailsRows" [margin]="currentOptions?.thumbnailMargin" [arrows]="currentOptions?.thumbnailsArrows" [arrowsAutoHide]="currentOptions?.thumbnailsArrowsAutoHide" [arrowPrevIcon]="currentOptions?.arrowPrevIcon" [arrowNextIcon]="currentOptions?.arrowNextIcon" [clickable]="currentOptions?.item || currentOptions?.preview" [swipe]="currentOptions?.thumbnailsSwipe" [size]="currentOptions?.thumbnailSize" [moveSize]="currentOptions?.thumbnailsMoveSize" [order]="currentOptions?.thumbnailsOrder" [remainingCount]="currentOptions?.thumbnailsRemainingCount" [lazyLoading]="currentOptions?.lazyLoading" [actions]="currentOptions?.thumbnailActions"  (onActiveChange)="selectFromThumbnails($event)"></nb-gallery-thumbnails>
      <nb-gallery-preview [items]="previewItems" [descriptions]="descriptions" [showDescription]="currentOptions?.previewDescription" [arrowPrevIcon]="currentOptions?.arrowPrevIcon" [arrowNextIcon]="currentOptions?.arrowNextIcon" [closeIcon]="currentOptions?.closeIcon" [fullscreenIcon]="currentOptions?.fullscreenIcon" [spinnerIcon]="currentOptions?.spinnerIcon" [swipe]="currentOptions?.previewSwipe" [fullscreen]="currentOptions?.previewFullscreen" [forceFullscreen]="currentOptions?.previewForceFullscreen" [closeOnClick]="currentOptions?.previewCloseOnClick" [closeOnEsc]="currentOptions?.previewCloseOnEsc" [keyboardNavigation]="currentOptions?.previewKeyboardNavigation" [animation]="currentOptions?.previewAnimation" [autoPlay]="currentOptions?.previewAutoPlay" [autoPlayInterval]="currentOptions?.previewAutoPlayInterval" [autoPlayPauseOnHover]="currentOptions?.previewAutoPlayPauseOnHover" [infinityMove]="currentOptions?.previewInfinityMove" [zoom]="currentOptions?.previewZoom" [zoomStep]="currentOptions?.previewZoomStep" [zoomMax]="currentOptions?.previewZoomMax" [zoomMin]="currentOptions?.previewZoomMin" [zoomInIcon]="currentOptions?.zoomInIcon" [zoomOutIcon]="currentOptions?.zoomOutIcon" [actions]="currentOptions?.actions" [rotate]="currentOptions?.previewRotate" [rotateLeftIcon]="currentOptions?.rotateLeftIcon" [rotateRightIcon]="currentOptions?.rotateRightIcon" [download]="currentOptions?.previewDownload" [downloadIcon]="currentOptions?.downloadIcon" [bullets]="currentOptions?.previewBullets" (onClose)="onPreviewClose()" (onOpen)="onPreviewOpen()" (onActiveChange)="previewSelect($event)" [class.nb-gallery-active]="previewEnabled"></nb-gallery-preview>
  </div>
  `,
                providers: [NbGalleryHelperService],
                styles: [":host{display:inline-block}:host>*{float:left}:host /deep/ *{box-sizing:border-box}:host /deep/ .nb-gallery-icon{color:#fff;font-size:25px;position:absolute;z-index:2000;display:inline-block}:host /deep/ .nb-gallery-icon .nb-gallery-icon-content{display:block}:host /deep/ .nb-gallery-clickable{cursor:pointer}:host /deep/ .nb-gallery-icons-wrapper .nb-gallery-icon{position:relative;margin-right:5px;margin-top:5px;font-size:20px;cursor:pointer}:host /deep/ .nb-gallery-icons-wrapper{float:right}:host .nb-gallery-layout{width:100%;height:100%;display:flex;flex-direction:column}:host .nb-gallery-layout.thumbnails-top nb-gallery-image{order:2}:host .nb-gallery-layout.thumbnails-top nb-gallery-thumbnails{order:1}:host .nb-gallery-layout.thumbnails-bottom nb-gallery-image{order:1}:host .nb-gallery-layout.thumbnails-bottom nb-gallery-thumbnails{order:2}"]
            }] }
];
/** @nocollapse */
NbGalleryComponent.ctorParameters = () => [
    { type: ElementRef }
];
NbGalleryComponent.propDecorators = {
    options: [{ type: Input }],
    items: [{ type: Input }],
    itemsReady: [{ type: Output }],
    change: [{ type: Output }],
    previewOpen: [{ type: Output }],
    previewClose: [{ type: Output }],
    previewChange: [{ type: Output }],
    preview: [{ type: ViewChild, args: [NbGalleryPreviewComponent,] }],
    item: [{ type: ViewChild, args: [NbGalleryItemComponent,] }],
    thumbnail: [{ type: ViewChild, args: [NbGalleryThumbnailsComponent,] }],
    width: [{ type: HostBinding, args: ['style.width',] }],
    height: [{ type: HostBinding, args: ['style.height',] }],
    left: [{ type: HostBinding, args: ['style.left',] }],
    onResize: [{ type: HostListener, args: ['window:resize',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NbGalleryOrderedImage {
    /**
     * @param {?} obj
     */
    constructor(obj) {
        this.src = obj.src;
        this.index = obj.index;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class CustomHammerConfig extends HammerGestureConfig {
    constructor() {
        super(...arguments);
        this.overrides = /** @type {?} */ ({
            'pinch': { enable: false },
            'rotate': { enable: false }
        });
    }
}
class NbGalleryModule {
}
NbGalleryModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [
                    NbGalleryActionComponent,
                    NbGalleryArrowsComponent,
                    NbGalleryBulletsComponent,
                    NbGalleryItemComponent,
                    NbGalleryThumbnailsComponent,
                    NbGalleryPreviewComponent,
                    NbGalleryComponent,
                    NbGalleryVideoComponent,
                    NbGalleryIframeComponent,
                    NbGalleryTagComponent
                ],
                exports: [
                    NbGalleryComponent
                ],
                providers: [
                    { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig }
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { CustomHammerConfig, NbGalleryModule, NbGalleryComponent, NbGalleryActionComponent, NbGalleryItemComponent, NbGalleryVideoComponent, NbGalleryIframeComponent, NbGalleryTagComponent, NbGalleryThumbnailsComponent, NbGalleryPreviewComponent, NbGalleryArrowsComponent, NbGalleryBulletsComponent, NbGalleryOptions, NbGalleryItem, NbGalleryAnimation, NbGalleryHelperService, NbGalleryImageSize, NbGalleryLayout, NbGalleryOrder, NbGalleryOrderedImage, NbGalleryAction };

//# sourceMappingURL=nb-gallery.js.map