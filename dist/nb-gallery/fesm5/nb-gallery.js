import { CommonModule } from '@angular/common';
import { DomSanitizer, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { __extends, __spread } from 'tslib';
import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, Injectable, Renderer, HostListener, ElementRef, ViewChild, ChangeDetectorRef, HostBinding, NgModule } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NbGalleryActionComponent = /** @class */ (function () {
    function NbGalleryActionComponent() {
        this.disabled = false;
        this.titleText = '';
        this.onClick = new EventEmitter();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    NbGalleryActionComponent.prototype.handleClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.disabled) {
            this.onClick.emit(event);
        }
        event.stopPropagation();
        event.preventDefault();
    };
    NbGalleryActionComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nb-gallery-action',
                    template: "\n        <div class=\"nb-gallery-icon\" [class.nb-gallery-icon-disabled]=\"disabled\"\n            aria-hidden=\"true\"\n            title=\"{{ titleText }}\"\n            (click)=\"handleClick($event)\">\n                <i class=\"nb-gallery-icon-content {{ icon }}\"></i>\n        </div>",
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    NbGalleryActionComponent.propDecorators = {
        icon: [{ type: Input }],
        disabled: [{ type: Input }],
        titleText: [{ type: Input }],
        onClick: [{ type: Output }]
    };
    return NbGalleryActionComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NbGalleryArrowsComponent = /** @class */ (function () {
    function NbGalleryArrowsComponent() {
        this.onPrevClick = new EventEmitter();
        this.onNextClick = new EventEmitter();
    }
    /**
     * @return {?}
     */
    NbGalleryArrowsComponent.prototype.handlePrevClick = /**
     * @return {?}
     */
    function () {
        this.onPrevClick.emit();
    };
    /**
     * @return {?}
     */
    NbGalleryArrowsComponent.prototype.handleNextClick = /**
     * @return {?}
     */
    function () {
        this.onNextClick.emit();
    };
    NbGalleryArrowsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nb-gallery-arrows',
                    template: "\n        <div class=\"nb-gallery-arrow-wrapper nb-gallery-arrow-left\">\n            <div class=\"nb-gallery-icon nb-gallery-arrow\" aria-hidden=\"true\" (click)=\"handlePrevClick()\" [class.nb-gallery-disabled]=\"prevDisabled\">\n                <i class=\"nb-gallery-icon-content {{arrowPrevIcon}}\"></i>\n            </div>\n        </div>\n        <div class=\"nb-gallery-arrow-wrapper nb-gallery-arrow-right\">\n            <div class=\"nb-gallery-icon nb-gallery-arrow\" aria-hidden=\"true\" (click)=\"handleNextClick()\" [class.nb-gallery-disabled]=\"nextDisabled\">\n                <i class=\"nb-gallery-icon-content {{arrowNextIcon}}\"></i>\n            </div>\n        </div>\n    ",
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
    return NbGalleryArrowsComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NbGalleryBulletsComponent = /** @class */ (function () {
    function NbGalleryBulletsComponent() {
        this.active = 0;
        this.onChange = new EventEmitter();
    }
    /**
     * @return {?}
     */
    NbGalleryBulletsComponent.prototype.getBullets = /**
     * @return {?}
     */
    function () {
        return Array(this.count);
    };
    /**
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    NbGalleryBulletsComponent.prototype.handleChange = /**
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    function (event, index) {
        this.onChange.emit(index);
    };
    NbGalleryBulletsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nb-gallery-bullets',
                    template: "\n        <div class=\"nb-gallery-bullet\" *ngFor=\"let bullet of getBullets(); let i = index;\" (click)=\"handleChange($event, i)\" [ngClass]=\"{ 'nb-gallery-active': i == active }\"></div>\n    ",
                    styles: [":host{position:absolute;z-index:2000;display:inline-flex;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);bottom:0;padding:10px}.nb-gallery-bullet{width:10px;height:10px;border-radius:50%;cursor:pointer;background:#fff}.nb-gallery-bullet:not(:first-child){margin-left:5px}.nb-gallery-bullet.nb-gallery-active,.nb-gallery-bullet:hover{background:#000}"]
                }] }
    ];
    NbGalleryBulletsComponent.propDecorators = {
        count: [{ type: Input }],
        active: [{ type: Input }],
        onChange: [{ type: Output }]
    };
    return NbGalleryBulletsComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NbGalleryHelperService = /** @class */ (function () {
    function NbGalleryHelperService(renderer) {
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
    NbGalleryHelperService.prototype.manageSwipe = /**
     * @param {?} status
     * @param {?} element
     * @param {?} id
     * @param {?} nextHandler
     * @param {?} prevHandler
     * @return {?}
     */
    function (status, element, id, nextHandler, prevHandler) {
        /** @type {?} */
        var handlers = this.getSwipeHandlers(id);
        // swipeleft and swiperight are available only if hammerjs is included
        try {
            if (status && !handlers) {
                this.swipeHandlers.set(id, [
                    this.renderer.listen(element.nativeElement, 'swipeleft', function () { return nextHandler(); }),
                    this.renderer.listen(element.nativeElement, 'swiperight', function () { return prevHandler(); }),
                    this.renderer.listen(element.nativeElement, 'swipeup', function () { return prevHandler(); }),
                    this.renderer.listen(element.nativeElement, 'swipedown', function () { return prevHandler(); }),
                ]);
            }
            else if (!status && handlers) {
                handlers.map(function (handler) { return handler(); });
                this.removeSwipeHandlers(id);
            }
        }
        catch (e) { }
    };
    /**
     * @param {?} url
     * @return {?}
     */
    NbGalleryHelperService.prototype.validateUrl = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        if (url.replace) {
            return url.replace(new RegExp(' ', 'g'), '%20')
                .replace(new RegExp('\'', 'g'), '%27');
        }
        else {
            return url;
        }
    };
    /**
     * @param {?} image
     * @return {?}
     */
    NbGalleryHelperService.prototype.getBackgroundUrl = /**
     * @param {?} image
     * @return {?}
     */
    function (image) {
        return 'url(\'' + this.validateUrl(image) + '\')';
    };
    /**
     * @param {?} id
     * @return {?}
     */
    NbGalleryHelperService.prototype.getSwipeHandlers = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        return this.swipeHandlers.get(id);
    };
    /**
     * @param {?} id
     * @return {?}
     */
    NbGalleryHelperService.prototype.removeSwipeHandlers = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        this.swipeHandlers.delete(id);
    };
    NbGalleryHelperService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    NbGalleryHelperService.ctorParameters = function () { return [
        { type: Renderer }
    ]; };
    return NbGalleryHelperService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NbGalleryAnimation = /** @class */ (function () {
    function NbGalleryAnimation() {
    }
    NbGalleryAnimation.Fade = 'fade';
    NbGalleryAnimation.Slide = 'slide';
    NbGalleryAnimation.Rotate = 'rotate';
    NbGalleryAnimation.Zoom = 'zoom';
    return NbGalleryAnimation;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NbGalleryItemComponent = /** @class */ (function () {
    function NbGalleryItemComponent(sanitization, elementRef, helperService) {
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
    NbGalleryItemComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.arrows && this.arrowsAutoHide) {
            this.arrows = false;
        }
        if (this.autoPlay) {
            this.startAutoPlay();
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NbGalleryItemComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        if (changes['swipe']) {
            this.helperService.manageSwipe(this.swipe, this.elementRef, 'image', function () { return _this.showNext(); }, function () { return _this.showPrev(); });
        }
    };
    /**
     * @return {?}
     */
    NbGalleryItemComponent.prototype.onMouseEnter = /**
     * @return {?}
     */
    function () {
        if (this.arrowsAutoHide && !this.arrows) {
            this.arrows = true;
        }
        if (this.autoPlay && this.autoPlayPauseOnHover) {
            this.stopAutoPlay();
        }
    };
    /**
     * @return {?}
     */
    NbGalleryItemComponent.prototype.onMouseLeave = /**
     * @return {?}
     */
    function () {
        if (this.arrowsAutoHide && this.arrows) {
            this.arrows = false;
        }
        if (this.autoPlay && this.autoPlayPauseOnHover) {
            this.startAutoPlay();
        }
    };
    /**
     * @param {?} index
     * @return {?}
     */
    NbGalleryItemComponent.prototype.reset = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this.selectedIndex = index;
    };
    /**
     * @return {?}
     */
    NbGalleryItemComponent.prototype.getItems = /**
     * @return {?}
     */
    function () {
        if (!this.items) {
            return [];
        }
        if (this.lazyLoading) {
            /** @type {?} */
            var indexes_1 = [this.selectedIndex];
            /** @type {?} */
            var prevIndex = this.selectedIndex - 1;
            if (prevIndex === -1 && this.infinityMove) {
                indexes_1.push(this.items.length - 1);
            }
            else if (prevIndex >= 0) {
                indexes_1.push(prevIndex);
            }
            /** @type {?} */
            var nextIndex = this.selectedIndex + 1;
            if (nextIndex === this.items.length && this.infinityMove) {
                indexes_1.push(0);
            }
            else if (nextIndex < this.items.length) {
                indexes_1.push(nextIndex);
            }
            return this.items.filter(function (img, i) { return indexes_1.indexOf(i) != -1; });
        }
        else {
            return this.items;
        }
    };
    /**
     * @return {?}
     */
    NbGalleryItemComponent.prototype.startAutoPlay = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.stopAutoPlay();
        this.timer = setInterval(function () {
            if (!_this.showNext()) {
                _this.selectedIndex = -1;
                _this.showNext();
            }
        }, this.autoPlayInterval);
    };
    /**
     * @return {?}
     */
    NbGalleryItemComponent.prototype.stopAutoPlay = /**
     * @return {?}
     */
    function () {
        if (this.timer) {
            clearInterval(this.timer);
        }
    };
    /**
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    NbGalleryItemComponent.prototype.handleClick = /**
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    function (event, index) {
        if (this.clickable) {
            this.onClick.emit(index);
            event.stopPropagation();
            event.preventDefault();
        }
    };
    /**
     * @param {?} index
     * @return {?}
     */
    NbGalleryItemComponent.prototype.show = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this.selectedIndex = index;
        this.onActiveChange.emit(this.selectedIndex);
        this.setChangeTimeout();
    };
    /**
     * @return {?}
     */
    NbGalleryItemComponent.prototype.showNext = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    NbGalleryItemComponent.prototype.showPrev = /**
     * @return {?}
     */
    function () {
        if (this.canShowPrev() && this.canChangeImage) {
            this.selectedIndex--;
            if (this.selectedIndex < 0) {
                this.selectedIndex = this.items.length - 1;
            }
            this.onActiveChange.emit(this.selectedIndex);
            this.setChangeTimeout();
        }
    };
    /**
     * @return {?}
     */
    NbGalleryItemComponent.prototype.setChangeTimeout = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.canChangeImage = false;
        /** @type {?} */
        var timeout = 1000;
        if (this.animation === NbGalleryAnimation.Slide
            || this.animation === NbGalleryAnimation.Fade) {
            timeout = 500;
        }
        setTimeout(function () {
            _this.canChangeImage = true;
        }, timeout);
    };
    /**
     * @return {?}
     */
    NbGalleryItemComponent.prototype.canShowNext = /**
     * @return {?}
     */
    function () {
        if (this.items) {
            return this.infinityMove || this.selectedIndex < this.items.length - 1
                ? true : false;
        }
        else {
            return false;
        }
    };
    /**
     * @return {?}
     */
    NbGalleryItemComponent.prototype.canShowPrev = /**
     * @return {?}
     */
    function () {
        if (this.items) {
            return this.infinityMove || this.selectedIndex > 0 ? true : false;
        }
        else {
            return false;
        }
    };
    /**
     * @param {?} image
     * @return {?}
     */
    NbGalleryItemComponent.prototype.getSafeUrl = /**
     * @param {?} image
     * @return {?}
     */
    function (image) {
        return this.sanitization.bypassSecurityTrustStyle(this.helperService.getBackgroundUrl(image));
    };
    NbGalleryItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nb-gallery-item',
                    template: "\n        <div class=\"nb-gallery-item-wrapper nb-gallery-animation-{{animation}} nb-gallery-item-size-{{size}}\">\n            <div class=\"nb-gallery-item\" *ngFor=\"let item of getItems(); let i = index;\" [ngClass]=\"{ 'nb-gallery-active': selectedIndex == item.index, 'nb-gallery-inactive-left': selectedIndex > item.index, 'nb-gallery-inactive-right': selectedIndex < item.index, 'nb-gallery-clickable': clickable }\" (click)=\"handleClick($event, item.index)\">\n                <div *ngIf=\"item.type === 'image'\" class=\"nb-gallery-item-image\" [style.background-image]=\"getSafeUrl(item.url)\"></div>\n                <nb-gallery-video *ngIf=\"item.type === 'video'\" [videoItem]=\"item\" [pause]=\"selectedIndex !== item.index\" class=\"nb-gallery-item-video\"></nb-gallery-video>\n                <div class=\"nb-gallery-icons-wrapper\">\n                    <nb-gallery-action *ngFor=\"let action of actions\" [icon]=\"action.icon\" [disabled]=\"action.disabled\" [titleText]=\"action.titleText\" (onClick)=\"action.onClick($event, item.index)\"></nb-gallery-action>\n                </div>\n                <div class=\"nb-gallery-item-text\" *ngIf=\"showDescription && descriptions[item.index]\" [innerHTML]=\"descriptions[item.index]\" (click)=\"$event.stopPropagation()\"></div>\n            </div>\n        </div>\n        <nb-gallery-bullets *ngIf=\"bullets\" [count]=\"items.length\" [active]=\"selectedIndex\" (onChange)=\"show($event)\"></nb-gallery-bullets>\n        <nb-gallery-arrows class=\"nb-gallery-item-size-{{size}}\" *ngIf=\"arrows\" (onPrevClick)=\"showPrev()\" (onNextClick)=\"showNext()\" [prevDisabled]=\"!canShowPrev()\" [nextDisabled]=\"!canShowNext()\" [arrowPrevIcon]=\"arrowPrevIcon\" [arrowNextIcon]=\"arrowNextIcon\"></nb-gallery-arrows>\n    ",
                    styles: [":host{width:100%;display:inline-block;position:relative}.nb-gallery-item-wrapper{width:100%;height:100%;position:absolute;left:0;top:0;overflow:hidden}.nb-gallery-item,.nb-gallery-item-image{background-position:center;background-repeat:no-repeat;height:100%;width:100%;position:absolute;top:0}.nb-gallery-item-image.nb-gallery-active,.nb-gallery-item.nb-gallery-active{z-index:1000}.nb-gallery-item-size-cover .nb-gallery-item .nb-gallery-item-image{background-size:cover}.nb-gallery-item-size-contain .nb-gallery-item .nb-gallery-item-image{background-size:contain}.nb-gallery-animation-fade .nb-gallery-item{left:0;opacity:0;transition:.5s ease-in-out}.nb-gallery-animation-fade .nb-gallery-item.nb-gallery-active{opacity:1}.nb-gallery-animation-slide .nb-gallery-item{transition:.5s ease-in-out}.nb-gallery-animation-slide .nb-gallery-item.nb-gallery-active{left:0}.nb-gallery-animation-slide .nb-gallery-item.nb-gallery-inactive-left{left:-100%}.nb-gallery-animation-slide .nb-gallery-item.nb-gallery-inactive-right{left:100%}.nb-gallery-animation-rotate .nb-gallery-item{transition:1s;-webkit-transform:scale(3.5,3.5) rotate(90deg);transform:scale(3.5,3.5) rotate(90deg);left:0;opacity:0}.nb-gallery-animation-rotate .nb-gallery-item.nb-gallery-active{-webkit-transform:scale(1,1) rotate(0);transform:scale(1,1) rotate(0);opacity:1}.nb-gallery-animation-zoom .nb-gallery-item{transition:1s;-webkit-transform:scale(2.5,2.5);transform:scale(2.5,2.5);left:0;opacity:0}.nb-gallery-animation-zoom .nb-gallery-item.nb-gallery-active{-webkit-transform:scale(1,1);transform:scale(1,1);opacity:1}.nb-gallery-item-text{width:100%;background:rgba(0,0,0,.7);padding:10px;text-align:center;color:#fff;font-size:16px;position:absolute;bottom:0;z-index:10}"]
                }] }
    ];
    /** @nocollapse */
    NbGalleryItemComponent.ctorParameters = function () { return [
        { type: DomSanitizer },
        { type: ElementRef },
        { type: NbGalleryHelperService }
    ]; };
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
    return NbGalleryItemComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NbGalleryItem = /** @class */ (function () {
    function NbGalleryItem(obj) {
        this.type = obj.type;
        this.source = obj.source;
        this.small = obj.small;
        this.medium = obj.medium;
        this.big = obj.big;
        this.description = obj.description;
        this.url = obj.url;
        this.label = obj.label;
    }
    return NbGalleryItem;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NbGalleryVideoComponent = /** @class */ (function () {
    function NbGalleryVideoComponent() {
    }
    /**
     * @return {?}
     */
    NbGalleryVideoComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
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
    };
    NbGalleryVideoComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nb-gallery-video',
                    template: "\n    <nb-gallery-iframe\n        *ngIf=\"(videoItem.source === 'youtube' ||videoItem.source === 'vimeo')\"\n        [pause]=\"pause\" [src]=\"src\">\n    </nb-gallery-iframe>\n    <nb-gallery-tag *ngIf=\"videoItem.source === 'memory'\" [pause]=\"pause\" [src]=\"src\"></nb-gallery-tag>\n        ",
                    styles: [".nb-gallery-video{width:100%;height:100%}"]
                }] }
    ];
    /** @nocollapse */
    NbGalleryVideoComponent.ctorParameters = function () { return []; };
    NbGalleryVideoComponent.propDecorators = {
        videoItem: [{ type: Input }],
        pause: [{ type: Input }]
    };
    return NbGalleryVideoComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NbGalleryIframeComponent = /** @class */ (function () {
    function NbGalleryIframeComponent(_sanitizer) {
        this._sanitizer = _sanitizer;
    }
    Object.defineProperty(NbGalleryIframeComponent.prototype, "pauseVideo", {
        set: /**
         * @param {?} shouldPause
         * @return {?}
         */
        function (shouldPause) {
            /** @type {?} */
            var iframe = this.iframe.nativeElement;
            if (shouldPause) {
                /** @type {?} */
                var src = iframe.src;
                iframe.src = src;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NbGalleryIframeComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.iframeSrc = this._sanitizer.bypassSecurityTrustResourceUrl(this.src);
    };
    NbGalleryIframeComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nb-gallery-iframe',
                    template: "\n    <iframe #iframe\n            frameborder=\"0\"\n            allowfullscreen\n            class=\"nb-gallery-video\"\n            [src]=\"iframeSrc\">\n    </iframe>\n        ",
                    styles: [".nb-gallery-video{width:100%;height:100%}"]
                }] }
    ];
    /** @nocollapse */
    NbGalleryIframeComponent.ctorParameters = function () { return [
        { type: DomSanitizer }
    ]; };
    NbGalleryIframeComponent.propDecorators = {
        src: [{ type: Input }],
        pauseVideo: [{ type: Input, args: ['pause',] }],
        iframe: [{ type: ViewChild, args: ['iframe',] }]
    };
    return NbGalleryIframeComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NbGalleryTagComponent = /** @class */ (function () {
    function NbGalleryTagComponent() {
        /**
         * Stream that emits when an error occurs
         */
        this.error = new EventEmitter();
    }
    Object.defineProperty(NbGalleryTagComponent.prototype, "pauseVideo", {
        set: /**
         * @param {?} shouldPause
         * @return {?}
         */
        function (shouldPause) {
            /** @type {?} */
            var video = this.video.nativeElement;
            if (shouldPause && !video.paused) {
                video.pause();
            }
        },
        enumerable: true,
        configurable: true
    });
    NbGalleryTagComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nb-gallery-tag',
                    template: "\n    <video #video class=\"nb-gallery-video\" controls (error)=\"error.emit($event)\">\n      <source src=\"{{src}}\"/>\n    </video>\n        ",
                    styles: [".nb-gallery-video{width:100%;height:100%}"]
                }] }
    ];
    NbGalleryTagComponent.propDecorators = {
        src: [{ type: Input }],
        pauseVideo: [{ type: Input, args: ['pause',] }],
        error: [{ type: Output }],
        video: [{ type: ViewChild, args: ['video',] }]
    };
    return NbGalleryTagComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NbGalleryOrder = /** @class */ (function () {
    function NbGalleryOrder() {
    }
    NbGalleryOrder.Column = 1;
    NbGalleryOrder.Row = 2;
    NbGalleryOrder.Page = 3;
    return NbGalleryOrder;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NbGalleryThumbnailsComponent = /** @class */ (function () {
    function NbGalleryThumbnailsComponent(sanitization, elementRef, helperService) {
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
    NbGalleryThumbnailsComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        if (changes['selectedIndex']) {
            this.validateIndex();
        }
        if (changes['swipe']) {
            this.helperService.manageSwipe(this.swipe, this.elementRef, 'thumbnails', function () { return _this.moveRight(); }, function () { return _this.moveLeft(); });
        }
        if (this.items) {
            this.remainingCountValue = this.items.length - (this.rows * this.columns);
        }
    };
    /**
     * @return {?}
     */
    NbGalleryThumbnailsComponent.prototype.onMouseEnter = /**
     * @return {?}
     */
    function () {
        this.mouseenter = true;
    };
    /**
     * @return {?}
     */
    NbGalleryThumbnailsComponent.prototype.onMouseLeave = /**
     * @return {?}
     */
    function () {
        this.mouseenter = false;
    };
    /**
     * @param {?} index
     * @return {?}
     */
    NbGalleryThumbnailsComponent.prototype.reset = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this.selectedIndex = index;
        this.setDefaultPosition();
        this.index = 0;
        this.validateIndex();
    };
    /**
     * @return {?}
     */
    NbGalleryThumbnailsComponent.prototype.getItems = /**
     * @return {?}
     */
    function () {
        if (!this.items) {
            return [];
        }
        if (this.remainingCount) {
            return this.items.slice(0, this.rows * this.columns);
        }
        else if (this.lazyLoading && this.order !== NbGalleryOrder.Row) {
            /** @type {?} */
            var stopIndex = 0;
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
    };
    /**
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    NbGalleryThumbnailsComponent.prototype.handleClick = /**
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    function (event, index) {
        if (!this.hasLink(index)) {
            this.selectedIndex = index;
            this.onActiveChange.emit(index);
            event.stopPropagation();
            event.preventDefault();
        }
    };
    /**
     * @param {?} index
     * @return {?}
     */
    NbGalleryThumbnailsComponent.prototype.hasLink = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        if (this.links && this.links.length && this.links[index])
            return true;
    };
    /**
     * @return {?}
     */
    NbGalleryThumbnailsComponent.prototype.moveRight = /**
     * @return {?}
     */
    function () {
        if (this.canMoveRight()) {
            this.index += this.moveSize;
            /** @type {?} */
            var maxIndex = this.getMaxIndex() - this.columns;
            if (this.index > maxIndex) {
                this.index = maxIndex;
            }
            this.setThumbnailsPosition();
        }
    };
    /**
     * @return {?}
     */
    NbGalleryThumbnailsComponent.prototype.moveLeft = /**
     * @return {?}
     */
    function () {
        if (this.canMoveLeft()) {
            this.index -= this.moveSize;
            if (this.index < 0) {
                this.index = 0;
            }
            this.setThumbnailsPosition();
        }
    };
    /**
     * @return {?}
     */
    NbGalleryThumbnailsComponent.prototype.canMoveRight = /**
     * @return {?}
     */
    function () {
        return this.index + this.columns < this.getMaxIndex() ? true : false;
    };
    /**
     * @return {?}
     */
    NbGalleryThumbnailsComponent.prototype.canMoveLeft = /**
     * @return {?}
     */
    function () {
        return this.index !== 0 ? true : false;
    };
    /**
     * @param {?} index
     * @return {?}
     */
    NbGalleryThumbnailsComponent.prototype.getThumbnailLeft = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        /** @type {?} */
        var calculatedIndex;
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
    };
    /**
     * @param {?} index
     * @return {?}
     */
    NbGalleryThumbnailsComponent.prototype.getThumbnailTop = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        /** @type {?} */
        var calculatedIndex;
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
    };
    /**
     * @return {?}
     */
    NbGalleryThumbnailsComponent.prototype.getThumbnailWidth = /**
     * @return {?}
     */
    function () {
        return this.getThumbnailDimension(this.columns);
    };
    /**
     * @return {?}
     */
    NbGalleryThumbnailsComponent.prototype.getThumbnailHeight = /**
     * @return {?}
     */
    function () {
        return this.getThumbnailDimension(this.rows);
    };
    /**
     * @return {?}
     */
    NbGalleryThumbnailsComponent.prototype.setThumbnailsPosition = /**
     * @return {?}
     */
    function () {
        this.thumbnailsLeft = -((100 / this.columns) * this.index) + '%';
        this.thumbnailsMarginLeft = -((this.margin - (((this.columns - 1)
            * this.margin) / this.columns)) * this.index) + 'px';
    };
    /**
     * @return {?}
     */
    NbGalleryThumbnailsComponent.prototype.setDefaultPosition = /**
     * @return {?}
     */
    function () {
        this.thumbnailsLeft = '0px';
        this.thumbnailsMarginLeft = '0px';
    };
    /**
     * @return {?}
     */
    NbGalleryThumbnailsComponent.prototype.canShowArrows = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    NbGalleryThumbnailsComponent.prototype.validateIndex = /**
     * @return {?}
     */
    function () {
        if (this.items) {
            /** @type {?} */
            var newIndex = void 0;
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
                var maxIndex = this.getMaxIndex() - this.columns;
                this.index = newIndex > maxIndex ? maxIndex : newIndex;
                this.setThumbnailsPosition();
            }
        }
    };
    /**
     * @param {?} image
     * @return {?}
     */
    NbGalleryThumbnailsComponent.prototype.getSafeUrl = /**
     * @param {?} image
     * @return {?}
     */
    function (image) {
        return this.sanitization.bypassSecurityTrustStyle(this.helperService.getBackgroundUrl(image));
    };
    /**
     * @param {?} index
     * @param {?} count
     * @return {?}
     */
    NbGalleryThumbnailsComponent.prototype.getThumbnailPosition = /**
     * @param {?} index
     * @param {?} count
     * @return {?}
     */
    function (index, count) {
        return this.getSafeStyle('calc(' + ((100 / count) * index) + '% + '
            + ((this.margin - (((count - 1) * this.margin) / count)) * index) + 'px)');
    };
    /**
     * @param {?} count
     * @return {?}
     */
    NbGalleryThumbnailsComponent.prototype.getThumbnailDimension = /**
     * @param {?} count
     * @return {?}
     */
    function (count) {
        if (this.margin !== 0) {
            return this.getSafeStyle('calc(' + (100 / count) + '% - '
                + (((count - 1) * this.margin) / count) + 'px)');
        }
        else {
            return this.getSafeStyle('calc(' + (100 / count) + '% + 1px)');
        }
    };
    /**
     * @return {?}
     */
    NbGalleryThumbnailsComponent.prototype.getMaxIndex = /**
     * @return {?}
     */
    function () {
        if (this.order === NbGalleryOrder.Page) {
            /** @type {?} */
            var maxIndex = (Math.floor(this.items.length / this.getVisibleCount()) * this.columns);
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
    };
    /**
     * @return {?}
     */
    NbGalleryThumbnailsComponent.prototype.getVisibleCount = /**
     * @return {?}
     */
    function () {
        return this.columns * this.rows;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NbGalleryThumbnailsComponent.prototype.getSafeStyle = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return this.sanitization.bypassSecurityTrustStyle(value);
    };
    NbGalleryThumbnailsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nb-gallery-thumbnails',
                    template: "\n    <div class=\"nb-gallery-thumbnails-wrapper nb-gallery-thumbnail-size-{{size}}\">\n        <div class=\"nb-gallery-thumbnails\" [style.transform]=\"'translateX(' + thumbnailsLeft + ')'\" [style.marginLeft]=\"thumbnailsMarginLeft\">\n            <a [href]=\"hasLink(i) ? links[i] : '#'\" [target]=\"linkTarget\" class=\"nb-gallery-thumbnail\" *ngFor=\"let item of getItems(); let i = index;\" [style.background-image]=\"getSafeUrl(item.url)\" (click)=\"handleClick($event, i)\" [style.width]=\"getThumbnailWidth()\" [style.height]=\"getThumbnailHeight()\" [style.left]=\"getThumbnailLeft(i)\" [style.top]=\"getThumbnailTop(i)\" [ngClass]=\"{ 'nb-gallery-active': i == selectedIndex, 'nb-gallery-clickable': clickable }\" [attr.aria-label]=\"labels[i]\">\n                <div class=\"nb-gallery-icons-wrapper\">\n                    <nb-gallery-action *ngFor=\"let action of actions\" [icon]=\"action.icon\" [disabled]=\"action.disabled\" [titleText]=\"action.titleText\" (onClick)=\"action.onClick($event, i)\"></nb-gallery-action>\n                </div>\n                <div class=\"nb-gallery-remaining-count-overlay\" *ngIf=\"remainingCount && remainingCountValue && (i == (rows * columns) - 1)\">\n                    <span class=\"nb-gallery-remaining-count\">+{{remainingCountValue}}</span>\n                </div>\n            </a>\n        </div>\n    </div>\n    <nb-gallery-arrows *ngIf=\"canShowArrows()\" (onPrevClick)=\"moveLeft()\" (onNextClick)=\"moveRight()\" [prevDisabled]=\"!canMoveLeft()\" [nextDisabled]=\"!canMoveRight()\" [arrowPrevIcon]=\"arrowPrevIcon\" [arrowNextIcon]=\"arrowNextIcon\"></nb-gallery-arrows>\n    ",
                    styles: [":host{width:100%;display:inline-block;position:relative}.nb-gallery-thumbnails-wrapper{width:100%;height:100%;position:absolute;overflow:hidden}.nb-gallery-thumbnails{height:100%;width:100%;position:absolute;left:0;-webkit-transform:translateX(0);transform:translateX(0);transition:transform .5s ease-in-out;transition:transform .5s ease-in-out,-webkit-transform .5s ease-in-out;will-change:transform}.nb-gallery-thumbnails .nb-gallery-thumbnail{position:absolute;height:100%;background-position:center;background-repeat:no-repeat;text-decoration:none}.nb-gallery-thumbnail-size-cover .nb-gallery-thumbnails .nb-gallery-thumbnail{background-size:cover}.nb-gallery-thumbnail-size-contain .nb-gallery-thumbnails .nb-gallery-thumbnail{background-size:contain}.nb-gallery-remaining-count-overlay{width:100%;height:100%;position:absolute;left:0;top:0;background-color:rgba(0,0,0,.4)}.nb-gallery-remaining-count{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);color:#fff;font-size:30px}"]
                }] }
    ];
    /** @nocollapse */
    NbGalleryThumbnailsComponent.ctorParameters = function () { return [
        { type: DomSanitizer },
        { type: ElementRef },
        { type: NbGalleryHelperService }
    ]; };
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
    return NbGalleryThumbnailsComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NbGalleryPreviewComponent = /** @class */ (function () {
    function NbGalleryPreviewComponent(sanitization, elementRef, helperService, renderer, changeDetectorRef) {
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
    NbGalleryPreviewComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        if (changes['swipe']) {
            this.helperService.manageSwipe(this.swipe, this.elementRef, 'preview', function () { return _this.showNext(); }, function () { return _this.showPrev(); });
        }
    };
    /**
     * @return {?}
     */
    NbGalleryPreviewComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.keyDownListener) {
            this.keyDownListener();
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NbGalleryPreviewComponent.prototype.onKeyDown = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
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
    };
    /**
     * @param {?} index
     * @return {?}
     */
    NbGalleryPreviewComponent.prototype.open = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        var _this = this;
        this.onOpen.emit();
        this.index = index;
        this.isOpen = true;
        this.show(true);
        if (this.forceFullscreen) {
            this.manageFullscreen();
        }
        this.keyDownListener = this.renderer.listenGlobal("window", "keydown", function (e) { return _this.onKeyDown(e); });
    };
    /**
     * @return {?}
     */
    NbGalleryPreviewComponent.prototype.close = /**
     * @return {?}
     */
    function () {
        this.isOpen = false;
        this.closeFullscreen();
        this.onClose.emit();
        this.stopAutoPlay();
        if (this.keyDownListener) {
            this.keyDownListener();
        }
    };
    /**
     * @return {?}
     */
    NbGalleryPreviewComponent.prototype.imageMouseEnter = /**
     * @return {?}
     */
    function () {
        if (this.autoPlay && this.autoPlayPauseOnHover) {
            this.stopAutoPlay();
        }
    };
    /**
     * @return {?}
     */
    NbGalleryPreviewComponent.prototype.imageMouseLeave = /**
     * @return {?}
     */
    function () {
        if (this.autoPlay && this.autoPlayPauseOnHover) {
            this.startAutoPlay();
        }
    };
    /**
     * @return {?}
     */
    NbGalleryPreviewComponent.prototype.startAutoPlay = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.autoPlay) {
            this.stopAutoPlay();
            this.timer = setTimeout(function () {
                if (!_this.showNext()) {
                    _this.index = -1;
                    _this.showNext();
                }
            }, this.autoPlayInterval);
        }
    };
    /**
     * @return {?}
     */
    NbGalleryPreviewComponent.prototype.stopAutoPlay = /**
     * @return {?}
     */
    function () {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    };
    /**
     * @param {?} index
     * @return {?}
     */
    NbGalleryPreviewComponent.prototype.showAtIndex = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this.index = index;
        this.show();
    };
    /**
     * @return {?}
     */
    NbGalleryPreviewComponent.prototype.showNext = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    NbGalleryPreviewComponent.prototype.showPrev = /**
     * @return {?}
     */
    function () {
        if (this.canShowPrev()) {
            this.index--;
            if (this.index < 0) {
                this.index = this.items.length - 1;
            }
            this.show();
        }
    };
    /**
     * @return {?}
     */
    NbGalleryPreviewComponent.prototype.canShowNext = /**
     * @return {?}
     */
    function () {
        if (this.loading) {
            return false;
        }
        else if (this.items) {
            return this.infinityMove || this.index < this.items.length - 1 ? true : false;
        }
        else {
            return false;
        }
    };
    /**
     * @return {?}
     */
    NbGalleryPreviewComponent.prototype.canShowPrev = /**
     * @return {?}
     */
    function () {
        if (this.loading) {
            return false;
        }
        else if (this.items) {
            return this.infinityMove || this.index > 0 ? true : false;
        }
        else {
            return false;
        }
    };
    /**
     * @return {?}
     */
    NbGalleryPreviewComponent.prototype.manageFullscreen = /**
     * @return {?}
     */
    function () {
        if (this.fullscreen || this.forceFullscreen) {
            /** @type {?} */
            var doc = /** @type {?} */ (document);
            if (!doc.fullscreenElement && !doc.mozFullScreenElement
                && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
                this.openFullscreen();
            }
            else {
                this.closeFullscreen();
            }
        }
    };
    /**
     * @param {?} image
     * @return {?}
     */
    NbGalleryPreviewComponent.prototype.getSafeUrl = /**
     * @param {?} image
     * @return {?}
     */
    function (image) {
        return image.substr(0, 10) === 'data:image' ?
            image : this.sanitization.bypassSecurityTrustUrl(image);
    };
    /**
     * @return {?}
     */
    NbGalleryPreviewComponent.prototype.zoomIn = /**
     * @return {?}
     */
    function () {
        if (this.canZoomIn()) {
            this.zoomValue += this.zoomStep;
            if (this.zoomValue > this.zoomMax) {
                this.zoomValue = this.zoomMax;
            }
        }
    };
    /**
     * @return {?}
     */
    NbGalleryPreviewComponent.prototype.zoomOut = /**
     * @return {?}
     */
    function () {
        if (this.canZoomOut()) {
            this.zoomValue -= this.zoomStep;
            if (this.zoomValue < this.zoomMin) {
                this.zoomValue = this.zoomMin;
            }
            if (this.zoomValue <= 1) {
                this.resetPosition();
            }
        }
    };
    /**
     * @return {?}
     */
    NbGalleryPreviewComponent.prototype.rotateLeft = /**
     * @return {?}
     */
    function () {
        this.rotateValue -= 90;
    };
    /**
     * @return {?}
     */
    NbGalleryPreviewComponent.prototype.rotateRight = /**
     * @return {?}
     */
    function () {
        this.rotateValue += 90;
    };
    /**
     * @return {?}
     */
    NbGalleryPreviewComponent.prototype.getTransform = /**
     * @return {?}
     */
    function () {
        return this.sanitization.bypassSecurityTrustStyle('scale(' + this.zoomValue + ') rotate(' + this.rotateValue + 'deg)');
    };
    /**
     * @return {?}
     */
    NbGalleryPreviewComponent.prototype.canZoomIn = /**
     * @return {?}
     */
    function () {
        return this.zoomValue < this.zoomMax ? true : false;
    };
    /**
     * @return {?}
     */
    NbGalleryPreviewComponent.prototype.canZoomOut = /**
     * @return {?}
     */
    function () {
        return this.zoomValue > this.zoomMin ? true : false;
    };
    /**
     * @return {?}
     */
    NbGalleryPreviewComponent.prototype.canDragOnZoom = /**
     * @return {?}
     */
    function () {
        return this.zoom && this.zoomValue > 1;
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NbGalleryPreviewComponent.prototype.mouseDownHandler = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (this.canDragOnZoom()) {
            this.initialX = this.getClientX(e);
            this.initialY = this.getClientY(e);
            this.initialLeft = this.positionLeft;
            this.initialTop = this.positionTop;
            this.isMove = true;
            e.preventDefault();
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NbGalleryPreviewComponent.prototype.mouseUpHandler = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        this.isMove = false;
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NbGalleryPreviewComponent.prototype.mouseMoveHandler = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (this.isMove) {
            this.positionLeft = this.initialLeft + (this.getClientX(e) - this.initialX);
            this.positionTop = this.initialTop + (this.getClientY(e) - this.initialY);
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NbGalleryPreviewComponent.prototype.getClientX = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        return e.touches && e.touches.length ? e.touches[0].clientX : e.clientX;
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NbGalleryPreviewComponent.prototype.getClientY = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        return e.touches && e.touches.length ? e.touches[0].clientY : e.clientY;
    };
    /**
     * @return {?}
     */
    NbGalleryPreviewComponent.prototype.resetPosition = /**
     * @return {?}
     */
    function () {
        if (this.zoom) {
            this.positionLeft = 0;
            this.positionTop = 0;
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NbGalleryPreviewComponent.prototype.isKeyboardNext = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        return e.keyCode === 39 ? true : false;
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NbGalleryPreviewComponent.prototype.isKeyboardPrev = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        return e.keyCode === 37 ? true : false;
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NbGalleryPreviewComponent.prototype.isKeyboardEsc = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        return e.keyCode === 27 ? true : false;
    };
    /**
     * @return {?}
     */
    NbGalleryPreviewComponent.prototype.openFullscreen = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var element = /** @type {?} */ (document.documentElement);
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
    };
    /**
     * @return {?}
     */
    NbGalleryPreviewComponent.prototype.closeFullscreen = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var doc = /** @type {?} */ (document);
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
    };
    /**
     * @param {?=} first
     * @return {?}
     */
    NbGalleryPreviewComponent.prototype.show = /**
     * @param {?=} first
     * @return {?}
     */
    function (first) {
        var _this = this;
        if (first === void 0) { first = false; }
        this.loading = true;
        this.stopAutoPlay();
        this.onActiveChange.emit(this.index);
        if (first || !this.animation) {
            this._show();
        }
        else {
            setTimeout(function () { return _this._show(); }, 600);
        }
    };
    /**
     * @return {?}
     */
    NbGalleryPreviewComponent.prototype._show = /**
     * @return {?}
     */
    function () {
        var _this = this;
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
        setTimeout(function () {
            if (_this.items[_this.index].type === 'video') {
                _this.updateOnVideo();
            }
            else {
                _this.updateOnImage();
            }
        });
    };
    /**
     * @param {?} img
     * @return {?}
     */
    NbGalleryPreviewComponent.prototype.isImgLoaded = /**
     * @param {?} img
     * @return {?}
     */
    function (img) {
        if (!img.complete) {
            return false;
        }
        if (typeof img.naturalWidth !== 'undefined' && img.naturalWidth === 0) {
            return false;
        }
        return true;
    };
    /**
     * @return {?}
     */
    NbGalleryPreviewComponent.prototype.updateOnImage = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.isImgLoaded(this.previewImage.nativeElement)) {
            this.loading = false;
            this.startAutoPlay();
            this.changeDetectorRef.markForCheck();
        }
        else {
            setTimeout(function () {
                if (_this.loading) {
                    _this.showSpinner = true;
                    _this.changeDetectorRef.markForCheck();
                }
            });
            this.previewImage.nativeElement.onload = function () {
                _this.loading = false;
                _this.showSpinner = false;
                _this.previewImage.nativeElement.onload = null;
                _this.startAutoPlay();
                _this.changeDetectorRef.markForCheck();
            };
        }
    };
    /**
     * @return {?}
     */
    NbGalleryPreviewComponent.prototype.updateOnVideo = /**
     * @return {?}
     */
    function () {
        this.loading = false;
    };
    NbGalleryPreviewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nb-gallery-preview',
                    template: "\n        <nb-gallery-arrows (onPrevClick)=\"showPrev()\" (onNextClick)=\"showNext()\" [prevDisabled]=\"!canShowPrev()\" [nextDisabled]=\"!canShowNext()\" [arrowPrevIcon]=\"arrowPrevIcon\" [arrowNextIcon]=\"arrowNextIcon\"></nb-gallery-arrows>\n        <div class=\"nb-gallery-preview-top\">\n            <div class=\"nb-gallery-preview-icons\">\n                <nb-gallery-action *ngFor=\"let action of actions\" [icon]=\"action.icon\" [disabled]=\"action.disabled\" [titleText]=\"action.titleText\" (onClick)=\"action.onClick($event, index)\"></nb-gallery-action>\n                <a *ngIf=\"download && src\" [href]=\"src\" class=\"nb-gallery-icon\" aria-hidden=\"true\" download>\n                    <i class=\"nb-gallery-icon-content {{ downloadIcon }}\"></i>\n                </a>\n                <nb-gallery-action *ngIf=\"zoom\" [icon]=\"zoomOutIcon\" [disabled]=\"!canZoomOut()\" (onClick)=\"zoomOut()\"></nb-gallery-action>\n                <nb-gallery-action *ngIf=\"zoom\" [icon]=\"zoomInIcon\" [disabled]=\"!canZoomIn()\" (onClick)=\"zoomIn()\"></nb-gallery-action>\n                <nb-gallery-action *ngIf=\"rotate\" [icon]=\"rotateLeftIcon\" (onClick)=\"rotateLeft()\"></nb-gallery-action>\n                <nb-gallery-action *ngIf=\"rotate\" [icon]=\"rotateRightIcon\" (onClick)=\"rotateRight()\"></nb-gallery-action>\n                <nb-gallery-action *ngIf=\"fullscreen\" [icon]=\"'nb-gallery-fullscreen ' + fullscreenIcon\" (onClick)=\"manageFullscreen()\"></nb-gallery-action>\n                <nb-gallery-action [icon]=\"'nb-gallery-close ' + closeIcon\" (onClick)=\"close()\"></nb-gallery-action>\n            </div>\n        </div>\n        <div class=\"nb-spinner-wrapper nb-gallery-center\" [class.nb-gallery-active]=\"showSpinner\">\n            <i class=\"nb-gallery-icon nb-gallery-spinner {{spinnerIcon}}\" aria-hidden=\"true\"></i>\n        </div>\n        <div class=\"nb-gallery-preview-wrapper\" (click)=\"closeOnClick && close()\" (mouseup)=\"mouseUpHandler($event)\" (mousemove)=\"mouseMoveHandler($event)\" (touchend)=\"mouseUpHandler($event)\" (touchmove)=\"mouseMoveHandler($event)\">\n            <div class=\"nb-gallery-preview-img-wrapper\">\n                <img *ngIf=\"src && item && item.type === 'image'\" #previewImage class=\"nb-gallery-preview-img nb-gallery-center\" [src]=\"src\" (click)=\"$event.stopPropagation()\" (mouseenter)=\"imageMouseEnter()\" (mouseleave)=\"imageMouseLeave()\" (mousedown)=\"mouseDownHandler($event)\" (touchstart)=\"mouseDownHandler($event)\" [class.nb-gallery-active]=\"!loading\" [class.animation]=\"animation\" [class.nb-gallery-grab]=\"canDragOnZoom()\" [style.transform]=\"getTransform()\" [style.left]=\"positionLeft + 'px'\" [style.top]=\"positionTop + 'px'\"/>\n                <nb-gallery-video *ngIf=\"item && item.type === 'video'\" #previewVideo [videoItem]=\"item\" [pause]=\"index !== srcIndex\" class=\"nb-gallery-preview-video nb-gallery-center\" (click)=\"$event.stopPropagation()\" [class.nb-gallery-active]=\"!loading\" [class.animation]=\"animation\" [class.nb-gallery-grab]=\"canDragOnZoom()\" [style.transform]=\"getTransform()\" [style.left]=\"positionLeft + 'px'\" [style.top]=\"positionTop + 'px'\" ></nb-gallery-video>\n                <nb-gallery-bullets *ngIf=\"bullets\" [count]=\"items.length\" [active]=\"index\" (onChange)=\"showAtIndex($event)\"></nb-gallery-bullets>\n            </div>\n            <div class=\"nb-gallery-preview-text\" *ngIf=\"showDescription && description\" [innerHTML]=\"description\" (click)=\"$event.stopPropagation()\"></div>\n        </div>\n    ",
                    styles: [":host(.nb-gallery-active){width:100%;height:100%;position:fixed;left:0;top:0;background:rgba(0,0,0,.7);z-index:10000;display:inline-block}:host{display:none}:host /deep/ .nb-gallery-arrow{font-size:50px}:host /deep/ nb-gallery-bullets{height:5%;align-items:center;padding:0}.nb-gallery-preview-video{max-width:90%;max-height:90%}.nb-gallery-preview-img{opacity:0;max-width:90%;max-height:90%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;transition:transform .5s;transition:transform .5s,-webkit-transform .5s}.nb-gallery-preview-img.animation{transition:opacity .5s linear,transform .5s,-webkit-transform .5s}.nb-gallery-preview-img.nb-gallery-active{opacity:1}.nb-gallery-preview-img.nb-gallery-grab{cursor:grab;cursor:-webkit-grab}.nb-gallery-icon.nb-gallery-spinner{font-size:50px;left:0;display:inline-block}:host /deep/ .nb-gallery-preview-top{position:absolute;width:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host /deep/ .nb-gallery-preview-icons{float:right}:host /deep/ .nb-gallery-preview-icons .nb-gallery-icon{position:relative;margin-right:10px;margin-top:10px;font-size:25px;cursor:pointer;text-decoration:none}:host /deep/ .nb-gallery-preview-icons .nb-gallery-icon.nb-gallery-icon-disabled{cursor:default;opacity:.4}.nb-spinner-wrapper{width:50px;height:50px;display:none}.nb-spinner-wrapper.nb-gallery-active{display:inline-block}.nb-gallery-center{position:absolute;left:0;right:0;bottom:0;margin:auto;top:0}.nb-gallery-preview-text{width:100%;background:rgba(0,0,0,.7);padding:10px;text-align:center;color:#fff;font-size:16px;flex:0 1 auto;z-index:10}.nb-gallery-preview-wrapper{width:100%;height:100%;display:flex;flex-flow:column}.nb-gallery-preview-img-wrapper{flex:1 1 auto;position:relative}"]
                }] }
    ];
    /** @nocollapse */
    NbGalleryPreviewComponent.ctorParameters = function () { return [
        { type: DomSanitizer },
        { type: ElementRef },
        { type: NbGalleryHelperService },
        { type: Renderer },
        { type: ChangeDetectorRef }
    ]; };
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
    return NbGalleryPreviewComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NbGalleryImageSize = /** @class */ (function () {
    function NbGalleryImageSize() {
    }
    NbGalleryImageSize.Cover = 'cover';
    NbGalleryImageSize.Contain = 'contain';
    return NbGalleryImageSize;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NbGalleryLayout = /** @class */ (function () {
    function NbGalleryLayout() {
    }
    NbGalleryLayout.ThumbnailsTop = 'thumbnails-top';
    NbGalleryLayout.ThumbnailsBottom = 'thumbnails-bottom';
    return NbGalleryLayout;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NbGalleryAction = /** @class */ (function () {
    function NbGalleryAction(action) {
        this.icon = action.icon;
        this.disabled = action.disabled ? action.disabled : false;
        this.titleText = action.titleText ? action.titleText : '';
        this.onClick = action.onClick;
    }
    return NbGalleryAction;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NbGalleryOptions = /** @class */ (function () {
    function NbGalleryOptions(obj) {
        /** @type {?} */
        var preventDefaults = obj.breakpoint === undefined ? false : true;
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
            obj.itemActions = obj.itemActions.map(function (action) { return new NbGalleryAction(action); });
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
            obj.thumbnailActions = obj.thumbnailActions.map(function (action) { return new NbGalleryAction(action); });
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
            obj.actions = obj.actions.map(function (action) { return new NbGalleryAction(action); });
        }
        this.actions = use(obj.actions, []);
    }
    return NbGalleryOptions;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NbGalleryThumbnail = /** @class */ (function () {
    function NbGalleryThumbnail(obj) {
        this.type = obj.type;
        this.source = obj.source;
        this.url = obj.url;
    }
    return NbGalleryThumbnail;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NbGalleryOrderedItem = /** @class */ (function () {
    function NbGalleryOrderedItem(obj) {
        this.type = obj.type;
        this.source = obj.source;
        this.url = obj.url;
        this.index = obj.index;
    }
    return NbGalleryOrderedItem;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NbGalleryComponent = /** @class */ (function () {
    function NbGalleryComponent(myElement) {
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
    NbGalleryComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.options = this.options.map(function (opt) { return new NbGalleryOptions(opt); });
        this.sortOptions();
        this.setBreakpoint();
        this.setOptions();
        this.checkFullWidth();
        if (this.currentOptions) {
            this.selectedIndex = /** @type {?} */ (this.currentOptions.startIndex);
        }
    };
    /**
     * @return {?}
     */
    NbGalleryComponent.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    NbGalleryComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.checkFullWidth();
    };
    /**
     * @return {?}
     */
    NbGalleryComponent.prototype.onResize = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.setBreakpoint();
        if (this.prevBreakpoint !== this.breakpoint) {
            this.setOptions();
            this.resetThumbnails();
        }
        if (this.currentOptions && this.currentOptions.fullWidth) {
            if (this.fullWidthTimeout) {
                clearTimeout(this.fullWidthTimeout);
            }
            this.fullWidthTimeout = setTimeout(function () {
                _this.checkFullWidth();
            }, 200);
        }
    };
    /**
     * @return {?}
     */
    NbGalleryComponent.prototype.getItemHeight = /**
     * @return {?}
     */
    function () {
        return (this.currentOptions && this.currentOptions.thumbnails) ?
            this.currentOptions.itemPercent + '%' : '100%';
    };
    /**
     * @return {?}
     */
    NbGalleryComponent.prototype.getThumbnailsHeight = /**
     * @return {?}
     */
    function () {
        if (this.currentOptions && this.currentOptions.item) {
            return 'calc(' + this.currentOptions.thumbnailsPercent + '% - '
                + this.currentOptions.thumbnailsMargin + 'px)';
        }
        else {
            return '100%';
        }
    };
    /**
     * @return {?}
     */
    NbGalleryComponent.prototype.getThumbnailsMarginTop = /**
     * @return {?}
     */
    function () {
        if (this.currentOptions && this.currentOptions.layout === NbGalleryLayout.ThumbnailsBottom) {
            return this.currentOptions.thumbnailsMargin + 'px';
        }
        else {
            return '0px';
        }
    };
    /**
     * @return {?}
     */
    NbGalleryComponent.prototype.getThumbnailsMarginBottom = /**
     * @return {?}
     */
    function () {
        if (this.currentOptions && this.currentOptions.layout === NbGalleryLayout.ThumbnailsTop) {
            return this.currentOptions.thumbnailsMargin + 'px';
        }
        else {
            return '0px';
        }
    };
    /**
     * @param {?} index
     * @return {?}
     */
    NbGalleryComponent.prototype.openPreview = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        if (this.currentOptions.previewCustom) {
            this.currentOptions.previewCustom(index);
        }
        else {
            this.previewEnabled = true;
            this.preview.open(index);
        }
        console.log(index);
    };
    /**
     * @return {?}
     */
    NbGalleryComponent.prototype.onPreviewOpen = /**
     * @return {?}
     */
    function () {
        this.previewOpen.emit();
        if (this.item && this.item.autoPlay) {
            this.item.stopAutoPlay();
        }
    };
    /**
     * @return {?}
     */
    NbGalleryComponent.prototype.onPreviewClose = /**
     * @return {?}
     */
    function () {
        this.previewEnabled = false;
        this.previewClose.emit();
        if (this.item && this.item.autoPlay) {
            this.item.startAutoPlay();
        }
    };
    /**
     * @param {?} index
     * @return {?}
     */
    NbGalleryComponent.prototype.selectFromItem = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this.select(index);
    };
    /**
     * @param {?} index
     * @return {?}
     */
    NbGalleryComponent.prototype.selectFromThumbnails = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this.select(index);
        if (this.currentOptions && this.currentOptions.thumbnails && this.currentOptions.preview
            && (!this.currentOptions.item || this.currentOptions.thumbnailsRemainingCount)) {
            this.openPreview(this.selectedIndex);
        }
    };
    /**
     * @param {?} index
     * @return {?}
     */
    NbGalleryComponent.prototype.show = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this.select(index);
    };
    /**
     * @return {?}
     */
    NbGalleryComponent.prototype.showNext = /**
     * @return {?}
     */
    function () {
        this.item.showNext();
    };
    /**
     * @return {?}
     */
    NbGalleryComponent.prototype.showPrev = /**
     * @return {?}
     */
    function () {
        this.item.showPrev();
    };
    /**
     * @return {?}
     */
    NbGalleryComponent.prototype.canShowNext = /**
     * @return {?}
     */
    function () {
        if (this.items && this.currentOptions) {
            return (this.currentOptions.itemInfinityMove || this.selectedIndex < this.items.length - 1)
                ? true : false;
        }
        else {
            return false;
        }
    };
    /**
     * @return {?}
     */
    NbGalleryComponent.prototype.canShowPrev = /**
     * @return {?}
     */
    function () {
        if (this.items && this.currentOptions) {
            return (this.currentOptions.itemInfinityMove || this.selectedIndex > 0) ? true : false;
        }
        else {
            return false;
        }
    };
    /**
     * @param {?} index
     * @return {?}
     */
    NbGalleryComponent.prototype.previewSelect = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this.previewChange.emit({ index: index, item: this.items[index] });
    };
    /**
     * @return {?}
     */
    NbGalleryComponent.prototype.moveThumbnailsRight = /**
     * @return {?}
     */
    function () {
        this.thumbnail.moveRight();
    };
    /**
     * @return {?}
     */
    NbGalleryComponent.prototype.moveThumbnailsLeft = /**
     * @return {?}
     */
    function () {
        this.thumbnail.moveLeft();
    };
    /**
     * @return {?}
     */
    NbGalleryComponent.prototype.canMoveThumbnailsRight = /**
     * @return {?}
     */
    function () {
        return this.thumbnail.canMoveRight();
    };
    /**
     * @return {?}
     */
    NbGalleryComponent.prototype.canMoveThumbnailsLeft = /**
     * @return {?}
     */
    function () {
        return this.thumbnail.canMoveLeft();
    };
    /**
     * @return {?}
     */
    NbGalleryComponent.prototype.resetThumbnails = /**
     * @return {?}
     */
    function () {
        if (this.thumbnail) {
            this.thumbnail.reset(/** @type {?} */ (this.currentOptions.startIndex));
        }
    };
    /**
     * @param {?} index
     * @return {?}
     */
    NbGalleryComponent.prototype.select = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this.selectedIndex = index;
        this.change.emit({
            index: index,
            item: this.items[index]
        });
    };
    /**
     * @return {?}
     */
    NbGalleryComponent.prototype.checkFullWidth = /**
     * @return {?}
     */
    function () {
        if (this.currentOptions && this.currentOptions.fullWidth) {
            this.width = document.body.clientWidth + 'px';
            this.left = (-(document.body.clientWidth -
                this.myElement.nativeElement.parentNode.innerWidth) / 2) + 'px';
        }
    };
    /**
     * @return {?}
     */
    NbGalleryComponent.prototype.setItems = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.thumbnails = this.items.map(function (item, i) { return new NbGalleryThumbnail({
            type: item.type,
            source: item.source,
            url: item.type === 'image' ? item.small : _this.currentOptions.defaultVideoThumbnnailUrl
        }); });
        this.galleryItems = this.items.map(function (item, i) { return new NbGalleryOrderedItem({
            type: item.type,
            source: item.source,
            url: item.type === 'image' ? item.medium : item.url,
            index: i
        }); });
        this.previewItems = this.items.map(function (item, i) { return new NbGalleryOrderedItem({
            type: item.type,
            source: item.source,
            url: item.type === 'image' ? item.big : item.url,
            index: i
        }); });
        this.descriptions = this.items.map(function (item) { return (item.description); });
        this.links = this.items.map(function (item) { return (item.url); });
        this.labels = this.items.map(function (item) { return (item.label); });
    };
    /**
     * @return {?}
     */
    NbGalleryComponent.prototype.setBreakpoint = /**
     * @return {?}
     */
    function () {
        this.prevBreakpoint = this.breakpoint;
        /** @type {?} */
        var breakpoints;
        if (typeof window !== 'undefined') {
            breakpoints = this.options.filter(function (opt) { return opt.breakpoint >= window.innerWidth; })
                .map(function (opt) { return opt.breakpoint; });
        }
        if (breakpoints && breakpoints.length) {
            this.breakpoint = breakpoints.pop();
        }
        else {
            this.breakpoint = undefined;
        }
    };
    /**
     * @return {?}
     */
    NbGalleryComponent.prototype.sortOptions = /**
     * @return {?}
     */
    function () {
        this.options = __spread(this.options.filter(function (a) { return a.breakpoint === undefined; }), this.options
            .filter(function (a) { return a.breakpoint !== undefined; })
            .sort(function (a, b) { return b.breakpoint - a.breakpoint; }));
    };
    /**
     * @return {?}
     */
    NbGalleryComponent.prototype.setOptions = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.currentOptions = new NbGalleryOptions({});
        this.options
            .filter(function (opt) { return opt.breakpoint === undefined || opt.breakpoint >= _this.breakpoint; })
            .map(function (opt) { return _this.combineOptions(_this.currentOptions, opt); });
        this.width = /** @type {?} */ (this.currentOptions.width);
        this.height = /** @type {?} */ (this.currentOptions.height);
    };
    /**
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    NbGalleryComponent.prototype.combineOptions = /**
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    function (first, second) {
        Object.keys(second).map(function (val) { return first[val] = second[val] !== undefined ? second[val] : first[val]; });
    };
    NbGalleryComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nb-gallery',
                    template: "\n  <div class=\"nb-gallery-layout {{currentOptions?.layout}}\">\n      <nb-gallery-item  *ngIf=\"currentOptions?.item\" [style.height]=\"getItemHeight()\" [items]=\"galleryItems\" [clickable]=\"currentOptions?.preview\" [selectedIndex]=\"selectedIndex\" [arrows]=\"currentOptions?.itemArrows\" [arrowsAutoHide]=\"currentOptions?.itemArrowsAutoHide\" [arrowPrevIcon]=\"currentOptions?.arrowPrevIcon\" [arrowNextIcon]=\"currentOptions?.arrowNextIcon\" [swipe]=\"currentOptions?.itemSwipe\" [animation]=\"currentOptions?.itemAnimation\" [size]=\"currentOptions?.itemSize\" [autoPlay]=\"currentOptions?.itemAutoPlay\" [autoPlayInterval]=\"currentOptions?.itemAutoPlayInterval\" [autoPlayPauseOnHover]=\"currentOptions?.itemAutoPlayPauseOnHover\" [infinityMove]=\"currentOptions?.itemInfinityMove\"  [lazyLoading]=\"currentOptions?.lazyLoading\" [actions]=\"currentOptions?.itemActions\" [descriptions]=\"descriptions\" [showDescription]=\"currentOptions?.itemDescription\" [bullets]=\"currentOptions?.itemBullets\" (onClick)=\"openPreview($event)\" (onActiveChange)=\"selectFromItem($event)\"></nb-gallery-item>\n      <nb-gallery-thumbnails *ngIf=\"currentOptions?.thumbnails\" [style.marginTop]=\"getThumbnailsMarginTop()\" [style.marginBottom]=\"getThumbnailsMarginBottom()\" [style.height]=\"getThumbnailsHeight()\" [items]=\"thumbnails\" [links]=\"currentOptions?.thumbnailsAsLinks ? links : []\" [labels]=\"labels\" [linkTarget]=\"currentOptions?.linkTarget\" [selectedIndex]=\"selectedIndex\" [columns]=\"currentOptions?.thumbnailsColumns\" [rows]=\"currentOptions?.thumbnailsRows\" [margin]=\"currentOptions?.thumbnailMargin\" [arrows]=\"currentOptions?.thumbnailsArrows\" [arrowsAutoHide]=\"currentOptions?.thumbnailsArrowsAutoHide\" [arrowPrevIcon]=\"currentOptions?.arrowPrevIcon\" [arrowNextIcon]=\"currentOptions?.arrowNextIcon\" [clickable]=\"currentOptions?.item || currentOptions?.preview\" [swipe]=\"currentOptions?.thumbnailsSwipe\" [size]=\"currentOptions?.thumbnailSize\" [moveSize]=\"currentOptions?.thumbnailsMoveSize\" [order]=\"currentOptions?.thumbnailsOrder\" [remainingCount]=\"currentOptions?.thumbnailsRemainingCount\" [lazyLoading]=\"currentOptions?.lazyLoading\" [actions]=\"currentOptions?.thumbnailActions\"  (onActiveChange)=\"selectFromThumbnails($event)\"></nb-gallery-thumbnails>\n      <nb-gallery-preview [items]=\"previewItems\" [descriptions]=\"descriptions\" [showDescription]=\"currentOptions?.previewDescription\" [arrowPrevIcon]=\"currentOptions?.arrowPrevIcon\" [arrowNextIcon]=\"currentOptions?.arrowNextIcon\" [closeIcon]=\"currentOptions?.closeIcon\" [fullscreenIcon]=\"currentOptions?.fullscreenIcon\" [spinnerIcon]=\"currentOptions?.spinnerIcon\" [swipe]=\"currentOptions?.previewSwipe\" [fullscreen]=\"currentOptions?.previewFullscreen\" [forceFullscreen]=\"currentOptions?.previewForceFullscreen\" [closeOnClick]=\"currentOptions?.previewCloseOnClick\" [closeOnEsc]=\"currentOptions?.previewCloseOnEsc\" [keyboardNavigation]=\"currentOptions?.previewKeyboardNavigation\" [animation]=\"currentOptions?.previewAnimation\" [autoPlay]=\"currentOptions?.previewAutoPlay\" [autoPlayInterval]=\"currentOptions?.previewAutoPlayInterval\" [autoPlayPauseOnHover]=\"currentOptions?.previewAutoPlayPauseOnHover\" [infinityMove]=\"currentOptions?.previewInfinityMove\" [zoom]=\"currentOptions?.previewZoom\" [zoomStep]=\"currentOptions?.previewZoomStep\" [zoomMax]=\"currentOptions?.previewZoomMax\" [zoomMin]=\"currentOptions?.previewZoomMin\" [zoomInIcon]=\"currentOptions?.zoomInIcon\" [zoomOutIcon]=\"currentOptions?.zoomOutIcon\" [actions]=\"currentOptions?.actions\" [rotate]=\"currentOptions?.previewRotate\" [rotateLeftIcon]=\"currentOptions?.rotateLeftIcon\" [rotateRightIcon]=\"currentOptions?.rotateRightIcon\" [download]=\"currentOptions?.previewDownload\" [downloadIcon]=\"currentOptions?.downloadIcon\" [bullets]=\"currentOptions?.previewBullets\" (onClose)=\"onPreviewClose()\" (onOpen)=\"onPreviewOpen()\" (onActiveChange)=\"previewSelect($event)\" [class.nb-gallery-active]=\"previewEnabled\"></nb-gallery-preview>\n  </div>\n  ",
                    providers: [NbGalleryHelperService],
                    styles: [":host{display:inline-block}:host>*{float:left}:host /deep/ *{box-sizing:border-box}:host /deep/ .nb-gallery-icon{color:#fff;font-size:25px;position:absolute;z-index:2000;display:inline-block}:host /deep/ .nb-gallery-icon .nb-gallery-icon-content{display:block}:host /deep/ .nb-gallery-clickable{cursor:pointer}:host /deep/ .nb-gallery-icons-wrapper .nb-gallery-icon{position:relative;margin-right:5px;margin-top:5px;font-size:20px;cursor:pointer}:host /deep/ .nb-gallery-icons-wrapper{float:right}:host .nb-gallery-layout{width:100%;height:100%;display:flex;flex-direction:column}:host .nb-gallery-layout.thumbnails-top nb-gallery-image{order:2}:host .nb-gallery-layout.thumbnails-top nb-gallery-thumbnails{order:1}:host .nb-gallery-layout.thumbnails-bottom nb-gallery-image{order:1}:host .nb-gallery-layout.thumbnails-bottom nb-gallery-thumbnails{order:2}"]
                }] }
    ];
    /** @nocollapse */
    NbGalleryComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
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
    return NbGalleryComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NbGalleryOrderedImage = /** @class */ (function () {
    function NbGalleryOrderedImage(obj) {
        this.src = obj.src;
        this.index = obj.index;
    }
    return NbGalleryOrderedImage;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var CustomHammerConfig = /** @class */ (function (_super) {
    __extends(CustomHammerConfig, _super);
    function CustomHammerConfig() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.overrides = /** @type {?} */ ({
            'pinch': { enable: false },
            'rotate': { enable: false }
        });
        return _this;
    }
    return CustomHammerConfig;
}(HammerGestureConfig));
var NbGalleryModule = /** @class */ (function () {
    function NbGalleryModule() {
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
    return NbGalleryModule;
}());

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