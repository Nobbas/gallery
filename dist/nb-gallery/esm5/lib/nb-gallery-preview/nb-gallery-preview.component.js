/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, Component, Input, Output, EventEmitter, ElementRef, ViewChild, Renderer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NbGalleryHelperService } from '../nb-gallery-helper.service';
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
        if (doc.fullscreenElement) {
            doc.exitFullscreen();
        }
        else if (doc.msFullscreenElement) {
            doc.msExitFullscreen();
        }
        else if (doc.mozCancelFullScreen) {
            doc.mozFullScreenElement();
        }
        else if (doc.webkitFullscreenElement) {
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
        this.src = this.items[this.index].type === 'image' ? this.getSafeUrl(/** @type {?} */ (this.items[this.index].url)) : undefined;
        this.item = this.items[this.index];
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
                    template: "\n        <nb-gallery-arrows (onPrevClick)=\"showPrev()\" (onNextClick)=\"showNext()\" [prevDisabled]=\"!canShowPrev()\" [nextDisabled]=\"!canShowNext()\" [arrowPrevIcon]=\"arrowPrevIcon\" [arrowNextIcon]=\"arrowNextIcon\"></nb-gallery-arrows>\n        <div class=\"nb-gallery-preview-top\">\n            <div class=\"nb-gallery-preview-icons\">\n                <nb-gallery-action *ngFor=\"let action of actions\" [icon]=\"action.icon\" [disabled]=\"action.disabled\" [titleText]=\"action.titleText\" (onClick)=\"action.onClick($event, index)\"></nb-gallery-action>\n                <a *ngIf=\"download && src\" [href]=\"src\" class=\"nb-gallery-icon\" aria-hidden=\"true\" download>\n                    <fa-icon class=\"nb-gallery-icon-content\" [icon]=\"downloadIcon\"></fa-icon>\n                </a>\n                <nb-gallery-action *ngIf=\"zoom\" [icon]=\"zoomOutIcon\" [disabled]=\"!canZoomOut()\" (onClick)=\"zoomOut()\"></nb-gallery-action>\n                <nb-gallery-action *ngIf=\"zoom\" [icon]=\"zoomInIcon\" [disabled]=\"!canZoomIn()\" (onClick)=\"zoomIn()\"></nb-gallery-action>\n                <nb-gallery-action *ngIf=\"rotate\" [icon]=\"rotateLeftIcon\" (onClick)=\"rotateLeft()\"></nb-gallery-action>\n                <nb-gallery-action *ngIf=\"rotate\" [icon]=\"rotateRightIcon\" (onClick)=\"rotateRight()\"></nb-gallery-action>\n                <nb-gallery-action *ngIf=\"fullscreen\" [icon]=\"fullscreenIcon\" (onClick)=\"manageFullscreen()\"></nb-gallery-action>\n                <nb-gallery-action [icon]=\"closeIcon\" (onClick)=\"close()\"></nb-gallery-action>\n            </div>\n        </div>\n        <div class=\"nb-spinner-wrapper nb-gallery-center\" [class.nb-gallery-active]=\"showSpinner\">\n            <fa-icon class=\"nb-gallery-icon nb-gallery-spinner\" [spin]=\"true\" size=\"xs\" [icon]=\"spinnerIcon\"></fa-icon>\n        </div>\n        <div class=\"nb-gallery-preview-wrapper\" (click)=\"closeOnClick && close()\" (mouseup)=\"mouseUpHandler($event)\" (mousemove)=\"mouseMoveHandler($event)\" (touchend)=\"mouseUpHandler($event)\" (touchmove)=\"mouseMoveHandler($event)\">\n            <div class=\"nb-gallery-preview-img-wrapper\">\n                <img *ngIf=\"src && item && item.type === 'image'\" #previewImage class=\"nb-gallery-preview-img nb-gallery-center\" [src]=\"src\" (click)=\"$event.stopPropagation()\" (mouseenter)=\"imageMouseEnter()\" (mouseleave)=\"imageMouseLeave()\" (mousedown)=\"mouseDownHandler($event)\" (touchstart)=\"mouseDownHandler($event)\" [class.nb-gallery-active]=\"!loading\" [class.animation]=\"animation\" [class.nb-gallery-grab]=\"canDragOnZoom()\" [style.transform]=\"getTransform()\" [style.left]=\"positionLeft + 'px'\" [style.top]=\"positionTop + 'px'\"/>\n                <nb-gallery-video *ngIf=\"item && item.type === 'video'\" #previewVideo [videoItem]=\"item\" [pause]=\"index !== srcIndex\" class=\"nb-gallery-preview-video nb-gallery-center\" (click)=\"$event.stopPropagation()\" [class.nb-gallery-active]=\"!loading\" [class.animation]=\"animation\" [class.nb-gallery-grab]=\"canDragOnZoom()\" [style.transform]=\"getTransform()\" [style.left]=\"positionLeft + 'px'\" [style.top]=\"positionTop + 'px'\" ></nb-gallery-video>\n                <nb-gallery-bullets *ngIf=\"bullets\" [count]=\"items.length\" [active]=\"index\" (onChange)=\"showAtIndex($event)\"></nb-gallery-bullets>\n            </div>\n            <div class=\"nb-gallery-preview-text\" *ngIf=\"showDescription && description\" [innerHTML]=\"description\" (click)=\"$event.stopPropagation()\"></div>\n        </div>\n    ",
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
export { NbGalleryPreviewComponent };
if (false) {
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.src;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.srcIndex;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.description;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.item;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.showSpinner;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.positionLeft;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.positionTop;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.zoomValue;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.loading;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.rotateValue;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.index;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.items;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.descriptions;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.showDescription;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.swipe;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.fullscreen;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.forceFullscreen;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.closeOnClick;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.closeOnEsc;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.keyboardNavigation;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.arrowPrevIcon;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.arrowNextIcon;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.closeIcon;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.fullscreenIcon;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.spinnerIcon;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.autoPlay;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.autoPlayInterval;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.autoPlayPauseOnHover;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.infinityMove;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.zoom;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.zoomStep;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.zoomMax;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.zoomMin;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.zoomInIcon;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.zoomOutIcon;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.animation;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.actions;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.rotate;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.rotateLeftIcon;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.rotateRightIcon;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.download;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.downloadIcon;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.bullets;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.onOpen;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.onClose;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.onActiveChange;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.previewImage;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.isOpen;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.timer;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.initialX;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.initialY;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.initialLeft;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.initialTop;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.isMove;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.keyDownListener;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.sanitization;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.elementRef;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.helperService;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.renderer;
    /** @type {?} */
    NbGalleryPreviewComponent.prototype.changeDetectorRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmItZ2FsbGVyeS1wcmV2aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25iLWdhbGxlcnkvIiwic291cmNlcyI6WyJsaWIvbmItZ2FsbGVyeS1wcmV2aWV3L25iLWdhbGxlcnktcHJldmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQTRCLFVBQVUsRUFBZ0IsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuSyxPQUFPLEVBQW1CLFlBQVksRUFBc0IsTUFBTSwyQkFBMkIsQ0FBQztBQUc5RixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7SUFtR2xFLG1DQUFvQixZQUEwQixFQUFVLFVBQXNCLEVBQ2xFLGVBQStDLFFBQWtCLEVBQ2pFO1FBRlEsaUJBQVksR0FBWixZQUFZLENBQWM7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ2xFLGtCQUFhLEdBQWIsYUFBYTtRQUFrQyxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2pFLHNCQUFpQixHQUFqQixpQkFBaUI7MkJBNURmLEtBQUs7NEJBQ0osQ0FBQzsyQkFDRixDQUFDO3lCQUNILENBQUM7dUJBQ0gsS0FBSzsyQkFDRCxDQUFDO3FCQUNQLENBQUM7c0JBbUNVLElBQUksWUFBWSxFQUFFO3VCQUNqQixJQUFJLFlBQVksRUFBRTs4QkFDWCxJQUFJLFlBQVksRUFBVTtzQkFLcEMsS0FBSzt3QkFFSCxDQUFDO3dCQUNELENBQUM7MkJBQ0UsQ0FBQzswQkFDRixDQUFDO3NCQUNMLEtBQUs7S0FNOEI7Ozs7O0lBRXBELCtDQUFXOzs7O0lBQVgsVUFBWSxPQUFzQjtRQUFsQyxpQkFLQztRQUpHLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFD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RyxRQUFRO2dCQUFsSSxpQkFBaUI7Ozt3QkFxRHJCLEtBQUs7K0JBQ0wsS0FBSztrQ0FDTCxLQUFLO3dCQUNMLEtBQUs7NkJBQ0wsS0FBSztrQ0FDTCxLQUFLOytCQUNMLEtBQUs7NkJBQ0wsS0FBSztxQ0FDTCxLQUFLO2dDQUNMLEtBQUs7Z0NBQ0wsS0FBSzs0QkFDTCxLQUFLO2lDQUNMLEtBQUs7OEJBQ0wsS0FBSzsyQkFDTCxLQUFLO21DQUNMLEtBQUs7dUNBQ0wsS0FBSzsrQkFDTCxLQUFLO3VCQUNMLEtBQUs7MkJBQ0wsS0FBSzswQkFDTCxLQUFLOzBCQUNMLEtBQUs7NkJBQ0wsS0FBSzs4QkFDTCxLQUFLOzRCQUNMLEtBQUs7MEJBQ0wsS0FBSzt5QkFDTCxLQUFLO2lDQUNMLEtBQUs7a0NBQ0wsS0FBSzsyQkFDTCxLQUFLOytCQUNMLEtBQUs7MEJBQ0wsS0FBSzt5QkFFTCxNQUFNOzBCQUNOLE1BQU07aUNBQ04sTUFBTTsrQkFFTixTQUFTLFNBQUMsY0FBYzs7b0NBMUY3Qjs7U0F1Q2EseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgVmlld0NoaWxkLCBSZW5kZXJlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2FmZVJlc291cmNlVXJsLCBEb21TYW5pdGl6ZXIsIFNhZmVVcmwsIFNhZmVTdHlsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5pbXBvcnQgeyBOYkdhbGxlcnlBY3Rpb24gfSBmcm9tICcuLi9tb2RlbHMvbmItZ2FsbGVyeS1hY3Rpb24ubW9kZWwnO1xuaW1wb3J0IHsgTmJHYWxsZXJ5SGVscGVyU2VydmljZSB9IGZyb20gJy4uL25iLWdhbGxlcnktaGVscGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgTmJHYWxsZXJ5T3JkZXJlZEl0ZW0gfSBmcm9tICcuLi9tb2RlbHMvbmItZ2FsbGVyeS1vcmRlcmVkLWl0ZW0ubW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ25iLWdhbGxlcnktcHJldmlldycsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPG5iLWdhbGxlcnktYXJyb3dzIChvblByZXZDbGljayk9XCJzaG93UHJldigpXCIgKG9uTmV4dENsaWNrKT1cInNob3dOZXh0KClcIiBbcHJldkRpc2FibGVkXT1cIiFjYW5TaG93UHJldigpXCIgW25leHREaXNhYmxlZF09XCIhY2FuU2hvd05leHQoKVwiIFthcnJvd1ByZXZJY29uXT1cImFycm93UHJldkljb25cIiBbYXJyb3dOZXh0SWNvbl09XCJhcnJvd05leHRJY29uXCI+PC9uYi1nYWxsZXJ5LWFycm93cz5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm5iLWdhbGxlcnktcHJldmlldy10b3BcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuYi1nYWxsZXJ5LXByZXZpZXctaWNvbnNcIj5cbiAgICAgICAgICAgICAgICA8bmItZ2FsbGVyeS1hY3Rpb24gKm5nRm9yPVwibGV0IGFjdGlvbiBvZiBhY3Rpb25zXCIgW2ljb25dPVwiYWN0aW9uLmljb25cIiBbZGlzYWJsZWRdPVwiYWN0aW9uLmRpc2FibGVkXCIgW3RpdGxlVGV4dF09XCJhY3Rpb24udGl0bGVUZXh0XCIgKG9uQ2xpY2spPVwiYWN0aW9uLm9uQ2xpY2soJGV2ZW50LCBpbmRleClcIj48L25iLWdhbGxlcnktYWN0aW9uPlxuICAgICAgICAgICAgICAgIDxhICpuZ0lmPVwiZG93bmxvYWQgJiYgc3JjXCIgW2hyZWZdPVwic3JjXCIgY2xhc3M9XCJuYi1nYWxsZXJ5LWljb25cIiBhcmlhLWhpZGRlbj1cInRydWVcIiBkb3dubG9hZD5cbiAgICAgICAgICAgICAgICAgICAgPGZhLWljb24gY2xhc3M9XCJuYi1nYWxsZXJ5LWljb24tY29udGVudFwiIFtpY29uXT1cImRvd25sb2FkSWNvblwiPjwvZmEtaWNvbj5cbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgPG5iLWdhbGxlcnktYWN0aW9uICpuZ0lmPVwiem9vbVwiIFtpY29uXT1cInpvb21PdXRJY29uXCIgW2Rpc2FibGVkXT1cIiFjYW5ab29tT3V0KClcIiAob25DbGljayk9XCJ6b29tT3V0KClcIj48L25iLWdhbGxlcnktYWN0aW9uPlxuICAgICAgICAgICAgICAgIDxuYi1nYWxsZXJ5LWFjdGlvbiAqbmdJZj1cInpvb21cIiBbaWNvbl09XCJ6b29tSW5JY29uXCIgW2Rpc2FibGVkXT1cIiFjYW5ab29tSW4oKVwiIChvbkNsaWNrKT1cInpvb21JbigpXCI+PC9uYi1nYWxsZXJ5LWFjdGlvbj5cbiAgICAgICAgICAgICAgICA8bmItZ2FsbGVyeS1hY3Rpb24gKm5nSWY9XCJyb3RhdGVcIiBbaWNvbl09XCJyb3RhdGVMZWZ0SWNvblwiIChvbkNsaWNrKT1cInJvdGF0ZUxlZnQoKVwiPjwvbmItZ2FsbGVyeS1hY3Rpb24+XG4gICAgICAgICAgICAgICAgPG5iLWdhbGxlcnktYWN0aW9uICpuZ0lmPVwicm90YXRlXCIgW2ljb25dPVwicm90YXRlUmlnaHRJY29uXCIgKG9uQ2xpY2spPVwicm90YXRlUmlnaHQoKVwiPjwvbmItZ2FsbGVyeS1hY3Rpb24+XG4gICAgICAgICAgICAgICAgPG5iLWdhbGxlcnktYWN0aW9uICpuZ0lmPVwiZnVsbHNjcmVlblwiIFtpY29uXT1cImZ1bGxzY3JlZW5JY29uXCIgKG9uQ2xpY2spPVwibWFuYWdlRnVsbHNjcmVlbigpXCI+PC9uYi1nYWxsZXJ5LWFjdGlvbj5cbiAgICAgICAgICAgICAgICA8bmItZ2FsbGVyeS1hY3Rpb24gW2ljb25dPVwiY2xvc2VJY29uXCIgKG9uQ2xpY2spPVwiY2xvc2UoKVwiPjwvbmItZ2FsbGVyeS1hY3Rpb24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJuYi1zcGlubmVyLXdyYXBwZXIgbmItZ2FsbGVyeS1jZW50ZXJcIiBbY2xhc3MubmItZ2FsbGVyeS1hY3RpdmVdPVwic2hvd1NwaW5uZXJcIj5cbiAgICAgICAgICAgIDxmYS1pY29uIGNsYXNzPVwibmItZ2FsbGVyeS1pY29uIG5iLWdhbGxlcnktc3Bpbm5lclwiIFtzcGluXT1cInRydWVcIiBzaXplPVwieHNcIiBbaWNvbl09XCJzcGlubmVySWNvblwiPjwvZmEtaWNvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJuYi1nYWxsZXJ5LXByZXZpZXctd3JhcHBlclwiIChjbGljayk9XCJjbG9zZU9uQ2xpY2sgJiYgY2xvc2UoKVwiIChtb3VzZXVwKT1cIm1vdXNlVXBIYW5kbGVyKCRldmVudClcIiAobW91c2Vtb3ZlKT1cIm1vdXNlTW92ZUhhbmRsZXIoJGV2ZW50KVwiICh0b3VjaGVuZCk9XCJtb3VzZVVwSGFuZGxlcigkZXZlbnQpXCIgKHRvdWNobW92ZSk9XCJtb3VzZU1vdmVIYW5kbGVyKCRldmVudClcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuYi1nYWxsZXJ5LXByZXZpZXctaW1nLXdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICA8aW1nICpuZ0lmPVwic3JjICYmIGl0ZW0gJiYgaXRlbS50eXBlID09PSAnaW1hZ2UnXCIgI3ByZXZpZXdJbWFnZSBjbGFzcz1cIm5iLWdhbGxlcnktcHJldmlldy1pbWcgbmItZ2FsbGVyeS1jZW50ZXJcIiBbc3JjXT1cInNyY1wiIChjbGljayk9XCIkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcIiAobW91c2VlbnRlcik9XCJpbWFnZU1vdXNlRW50ZXIoKVwiIChtb3VzZWxlYXZlKT1cImltYWdlTW91c2VMZWF2ZSgpXCIgKG1vdXNlZG93bik9XCJtb3VzZURvd25IYW5kbGVyKCRldmVudClcIiAodG91Y2hzdGFydCk9XCJtb3VzZURvd25IYW5kbGVyKCRldmVudClcIiBbY2xhc3MubmItZ2FsbGVyeS1hY3RpdmVdPVwiIWxvYWRpbmdcIiBbY2xhc3MuYW5pbWF0aW9uXT1cImFuaW1hdGlvblwiIFtjbGFzcy5uYi1nYWxsZXJ5LWdyYWJdPVwiY2FuRHJhZ09uWm9vbSgpXCIgW3N0eWxlLnRyYW5zZm9ybV09XCJnZXRUcmFuc2Zvcm0oKVwiIFtzdHlsZS5sZWZ0XT1cInBvc2l0aW9uTGVmdCArICdweCdcIiBbc3R5bGUudG9wXT1cInBvc2l0aW9uVG9wICsgJ3B4J1wiLz5cbiAgICAgICAgICAgICAgICA8bmItZ2FsbGVyeS12aWRlbyAqbmdJZj1cIml0ZW0gJiYgaXRlbS50eXBlID09PSAndmlkZW8nXCIgI3ByZXZpZXdWaWRlbyBbdmlkZW9JdGVtXT1cIml0ZW1cIiBbcGF1c2VdPVwiaW5kZXggIT09IHNyY0luZGV4XCIgY2xhc3M9XCJuYi1nYWxsZXJ5LXByZXZpZXctdmlkZW8gbmItZ2FsbGVyeS1jZW50ZXJcIiAoY2xpY2spPVwiJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXCIgW2NsYXNzLm5iLWdhbGxlcnktYWN0aXZlXT1cIiFsb2FkaW5nXCIgW2NsYXNzLmFuaW1hdGlvbl09XCJhbmltYXRpb25cIiBbY2xhc3MubmItZ2FsbGVyeS1ncmFiXT1cImNhbkRyYWdPblpvb20oKVwiIFtzdHlsZS50cmFuc2Zvcm1dPVwiZ2V0VHJhbnNmb3JtKClcIiBbc3R5bGUubGVmdF09XCJwb3NpdGlvbkxlZnQgKyAncHgnXCIgW3N0eWxlLnRvcF09XCJwb3NpdGlvblRvcCArICdweCdcIiA+PC9uYi1nYWxsZXJ5LXZpZGVvPlxuICAgICAgICAgICAgICAgIDxuYi1nYWxsZXJ5LWJ1bGxldHMgKm5nSWY9XCJidWxsZXRzXCIgW2NvdW50XT1cIml0ZW1zLmxlbmd0aFwiIFthY3RpdmVdPVwiaW5kZXhcIiAob25DaGFuZ2UpPVwic2hvd0F0SW5kZXgoJGV2ZW50KVwiPjwvbmItZ2FsbGVyeS1idWxsZXRzPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibmItZ2FsbGVyeS1wcmV2aWV3LXRleHRcIiAqbmdJZj1cInNob3dEZXNjcmlwdGlvbiAmJiBkZXNjcmlwdGlvblwiIFtpbm5lckhUTUxdPVwiZGVzY3JpcHRpb25cIiAoY2xpY2spPVwiJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgc3R5bGVVcmxzOiBbJy4vbmItZ2FsbGVyeS1wcmV2aWV3LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTmJHYWxsZXJ5UHJldmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgICBzcmM6IFNhZmVVcmw7XG4gICAgc3JjSW5kZXg6IG51bWJlcjtcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIGl0ZW06IE5iR2FsbGVyeU9yZGVyZWRJdGVtO1xuICAgIHNob3dTcGlubmVyID0gZmFsc2U7XG4gICAgcG9zaXRpb25MZWZ0ID0gMDtcbiAgICBwb3NpdGlvblRvcCA9IDA7XG4gICAgem9vbVZhbHVlID0gMTtcbiAgICBsb2FkaW5nID0gZmFsc2U7XG4gICAgcm90YXRlVmFsdWUgPSAwO1xuICAgIGluZGV4ID0gMDtcblxuICAgIEBJbnB1dCgpIGl0ZW1zOiBOYkdhbGxlcnlPcmRlcmVkSXRlbVtdO1xuICAgIEBJbnB1dCgpIGRlc2NyaXB0aW9uczogc3RyaW5nW107XG4gICAgQElucHV0KCkgc2hvd0Rlc2NyaXB0aW9uOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIHN3aXBlOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIGZ1bGxzY3JlZW46IGJvb2xlYW47XG4gICAgQElucHV0KCkgZm9yY2VGdWxsc2NyZWVuOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIGNsb3NlT25DbGljazogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBjbG9zZU9uRXNjOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIGtleWJvYXJkTmF2aWdhdGlvbjogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBhcnJvd1ByZXZJY29uOiBzdHJpbmc7XG4gICAgQElucHV0KCkgYXJyb3dOZXh0SWNvbjogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGNsb3NlSWNvbjogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGZ1bGxzY3JlZW5JY29uOiBzdHJpbmc7XG4gICAgQElucHV0KCkgc3Bpbm5lckljb246IHN0cmluZztcbiAgICBASW5wdXQoKSBhdXRvUGxheTogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBhdXRvUGxheUludGVydmFsOiBudW1iZXI7XG4gICAgQElucHV0KCkgYXV0b1BsYXlQYXVzZU9uSG92ZXI6IGJvb2xlYW47XG4gICAgQElucHV0KCkgaW5maW5pdHlNb3ZlOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIHpvb206IGJvb2xlYW47XG4gICAgQElucHV0KCkgem9vbVN0ZXA6IG51bWJlcjtcbiAgICBASW5wdXQoKSB6b29tTWF4OiBudW1iZXI7XG4gICAgQElucHV0KCkgem9vbU1pbjogbnVtYmVyO1xuICAgIEBJbnB1dCgpIHpvb21Jbkljb246IHN0cmluZztcbiAgICBASW5wdXQoKSB6b29tT3V0SWNvbjogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGFuaW1hdGlvbjogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBhY3Rpb25zOiBOYkdhbGxlcnlBY3Rpb25bXTtcbiAgICBASW5wdXQoKSByb3RhdGU6IGJvb2xlYW47XG4gICAgQElucHV0KCkgcm90YXRlTGVmdEljb246IHN0cmluZztcbiAgICBASW5wdXQoKSByb3RhdGVSaWdodEljb246IHN0cmluZztcbiAgICBASW5wdXQoKSBkb3dubG9hZDogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBkb3dubG9hZEljb246IHN0cmluZztcbiAgICBASW5wdXQoKSBidWxsZXRzOiBzdHJpbmc7XG5cbiAgICBAT3V0cHV0KCkgb25PcGVuID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBvbkNsb3NlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBvbkFjdGl2ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gICAgQFZpZXdDaGlsZCgncHJldmlld0ltYWdlJykgcHJldmlld0ltYWdlOiBFbGVtZW50UmVmO1xuICAgIC8vIEBWaWV3Q2hpbGQoJ3ByZXZpZXdWaWRlbycpIHByZXZpZXdWaWRlbzogRWxlbWVudFJlZjtcblxuICAgIHByaXZhdGUgaXNPcGVuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSB0aW1lcjtcbiAgICBwcml2YXRlIGluaXRpYWxYID0gMDtcbiAgICBwcml2YXRlIGluaXRpYWxZID0gMDtcbiAgICBwcml2YXRlIGluaXRpYWxMZWZ0ID0gMDtcbiAgICBwcml2YXRlIGluaXRpYWxUb3AgPSAwO1xuICAgIHByaXZhdGUgaXNNb3ZlID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIGtleURvd25MaXN0ZW5lcjogRnVuY3Rpb247XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNhbml0aXphdGlvbjogRG9tU2FuaXRpemVyLCBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgaGVscGVyU2VydmljZTogTmJHYWxsZXJ5SGVscGVyU2VydmljZSwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIsXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgICAgICBpZiAoY2hhbmdlc1snc3dpcGUnXSkge1xuICAgICAgICAgICAgdGhpcy5oZWxwZXJTZXJ2aWNlLm1hbmFnZVN3aXBlKHRoaXMuc3dpcGUsIHRoaXMuZWxlbWVudFJlZixcbiAgICAgICAgICAgICdwcmV2aWV3JywgKCkgPT4gdGhpcy5zaG93TmV4dCgpLCAoKSA9PiB0aGlzLnNob3dQcmV2KCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLmtleURvd25MaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5rZXlEb3duTGlzdGVuZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uS2V5RG93bihlKSB7XG4gICAgICAgIGlmICh0aGlzLmlzT3Blbikge1xuICAgICAgICAgICAgaWYgKHRoaXMua2V5Ym9hcmROYXZpZ2F0aW9uKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNLZXlib2FyZFByZXYoZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93UHJldigpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0tleWJvYXJkTmV4dChlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dOZXh0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuY2xvc2VPbkVzYyAmJiB0aGlzLmlzS2V5Ym9hcmRFc2MoZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvcGVuKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbk9wZW4uZW1pdCgpO1xuXG4gICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuICAgICAgICB0aGlzLnNob3codHJ1ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuZm9yY2VGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICB0aGlzLm1hbmFnZUZ1bGxzY3JlZW4oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMua2V5RG93bkxpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW5HbG9iYWwoXCJ3aW5kb3dcIiwgXCJrZXlkb3duXCIsIChlKSA9PiB0aGlzLm9uS2V5RG93bihlKSk7XG4gICAgfVxuXG4gICAgY2xvc2UoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2xvc2VGdWxsc2NyZWVuKCk7XG4gICAgICAgIHRoaXMub25DbG9zZS5lbWl0KCk7XG5cbiAgICAgICAgdGhpcy5zdG9wQXV0b1BsYXkoKTtcblxuICAgICAgICBpZiAodGhpcy5rZXlEb3duTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMua2V5RG93bkxpc3RlbmVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbWFnZU1vdXNlRW50ZXIoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmF1dG9QbGF5ICYmIHRoaXMuYXV0b1BsYXlQYXVzZU9uSG92ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcEF1dG9QbGF5KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbWFnZU1vdXNlTGVhdmUoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmF1dG9QbGF5ICYmIHRoaXMuYXV0b1BsYXlQYXVzZU9uSG92ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRBdXRvUGxheSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhcnRBdXRvUGxheSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuYXV0b1BsYXkpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcEF1dG9QbGF5KCk7XG5cbiAgICAgICAgICAgIHRoaXMudGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc2hvd05leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluZGV4ID0gLTE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd05leHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCB0aGlzLmF1dG9QbGF5SW50ZXJ2YWwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RvcEF1dG9QbGF5KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy50aW1lcikge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvd0F0SW5kZXgoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gICAgICAgIHRoaXMuc2hvdygpO1xuICAgIH1cblxuICAgIHNob3dOZXh0KCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5jYW5TaG93TmV4dCgpKSB7XG4gICAgICAgICAgICB0aGlzLmluZGV4Kys7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmluZGV4ID09PSB0aGlzLml0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5kZXggPSAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvd1ByZXYoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmNhblNob3dQcmV2KCkpIHtcbiAgICAgICAgICAgIHRoaXMuaW5kZXgtLTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleCA9IHRoaXMuaXRlbXMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjYW5TaG93TmV4dCgpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMubG9hZGluZykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXRlbXMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmluZmluaXR5TW92ZSB8fCB0aGlzLmluZGV4IDwgdGhpcy5pdGVtcy5sZW5ndGggLSAxID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FuU2hvd1ByZXYoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLmxvYWRpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLml0ZW1zKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbmZpbml0eU1vdmUgfHwgdGhpcy5pbmRleCA+IDAgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtYW5hZ2VGdWxsc2NyZWVuKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5mdWxsc2NyZWVuIHx8IHRoaXMuZm9yY2VGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICBjb25zdCBkb2MgPSA8YW55PmRvY3VtZW50O1xuXG4gICAgICAgICAgICBpZiAoIWRvYy5mdWxsc2NyZWVuRWxlbWVudCAmJiAhZG9jLm1vekZ1bGxTY3JlZW5FbGVtZW50XG4gICAgICAgICAgICAgICAgJiYgIWRvYy53ZWJraXRGdWxsc2NyZWVuRWxlbWVudCAmJiAhZG9jLm1zRnVsbHNjcmVlbkVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5GdWxsc2NyZWVuKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VGdWxsc2NyZWVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRTYWZlVXJsKGltYWdlOiBzdHJpbmcpOiBTYWZlVXJsIHtcbiAgICAgICAgcmV0dXJuIGltYWdlLnN1YnN0cigwLCAxMCkgPT09ICdkYXRhOmltYWdlJyA/XG4gICAgICAgICAgICBpbWFnZSA6IHRoaXMuc2FuaXRpemF0aW9uLmJ5cGFzc1NlY3VyaXR5VHJ1c3RVcmwoaW1hZ2UpO1xuICAgIH1cblxuICAgIHpvb21JbigpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuY2FuWm9vbUluKCkpIHtcbiAgICAgICAgICAgIHRoaXMuem9vbVZhbHVlICs9IHRoaXMuem9vbVN0ZXA7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnpvb21WYWx1ZSA+IHRoaXMuem9vbU1heCkge1xuICAgICAgICAgICAgICAgIHRoaXMuem9vbVZhbHVlID0gdGhpcy56b29tTWF4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgem9vbU91dCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuY2FuWm9vbU91dCgpKSB7XG4gICAgICAgICAgICB0aGlzLnpvb21WYWx1ZSAtPSB0aGlzLnpvb21TdGVwO1xuXG4gICAgICAgICAgICBpZiAodGhpcy56b29tVmFsdWUgPCB0aGlzLnpvb21NaW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnpvb21WYWx1ZSA9IHRoaXMuem9vbU1pbjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuem9vbVZhbHVlIDw9IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0UG9zaXRpb24oKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcm90YXRlTGVmdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yb3RhdGVWYWx1ZSAtPSA5MDtcbiAgICB9XG5cbiAgICByb3RhdGVSaWdodCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yb3RhdGVWYWx1ZSArPSA5MDtcbiAgICB9XG5cbiAgICBnZXRUcmFuc2Zvcm0oKTogU2FmZVN0eWxlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2FuaXRpemF0aW9uLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZSgnc2NhbGUoJyArIHRoaXMuem9vbVZhbHVlICsgJykgcm90YXRlKCcgKyB0aGlzLnJvdGF0ZVZhbHVlICsgJ2RlZyknKTtcbiAgICB9XG5cbiAgICBjYW5ab29tSW4oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnpvb21WYWx1ZSA8IHRoaXMuem9vbU1heCA/IHRydWUgOiBmYWxzZTtcbiAgICB9XG5cbiAgICBjYW5ab29tT3V0KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy56b29tVmFsdWUgPiB0aGlzLnpvb21NaW4gPyB0cnVlIDogZmFsc2U7XG4gICAgfVxuXG4gICAgY2FuRHJhZ09uWm9vbSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuem9vbSAmJiB0aGlzLnpvb21WYWx1ZSA+IDE7XG4gICAgfVxuXG4gICAgbW91c2VEb3duSGFuZGxlcihlKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmNhbkRyYWdPblpvb20oKSkge1xuICAgICAgICAgICAgdGhpcy5pbml0aWFsWCA9IHRoaXMuZ2V0Q2xpZW50WChlKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbFkgPSB0aGlzLmdldENsaWVudFkoZSk7XG4gICAgICAgICAgICB0aGlzLmluaXRpYWxMZWZ0ID0gdGhpcy5wb3NpdGlvbkxlZnQ7XG4gICAgICAgICAgICB0aGlzLmluaXRpYWxUb3AgPSB0aGlzLnBvc2l0aW9uVG9wO1xuICAgICAgICAgICAgdGhpcy5pc01vdmUgPSB0cnVlO1xuXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb3VzZVVwSGFuZGxlcihlKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaXNNb3ZlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgbW91c2VNb3ZlSGFuZGxlcihlKSB7XG4gICAgICAgIGlmICh0aGlzLmlzTW92ZSkge1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbkxlZnQgPSB0aGlzLmluaXRpYWxMZWZ0ICsgKHRoaXMuZ2V0Q2xpZW50WChlKSAtIHRoaXMuaW5pdGlhbFgpO1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvblRvcCA9IHRoaXMuaW5pdGlhbFRvcCArICh0aGlzLmdldENsaWVudFkoZSkgLSB0aGlzLmluaXRpYWxZKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Q2xpZW50WChlKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIGUudG91Y2hlcyAmJiBlLnRvdWNoZXMubGVuZ3RoID8gZS50b3VjaGVzWzBdLmNsaWVudFggOiBlLmNsaWVudFg7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRDbGllbnRZKGUpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gZS50b3VjaGVzICYmIGUudG91Y2hlcy5sZW5ndGggPyBlLnRvdWNoZXNbMF0uY2xpZW50WSA6IGUuY2xpZW50WTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc2V0UG9zaXRpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLnpvb20pIHtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb25MZWZ0ID0gMDtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb25Ub3AgPSAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc0tleWJvYXJkTmV4dChlKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBlLmtleUNvZGUgPT09IDM5ID8gdHJ1ZSA6IGZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNLZXlib2FyZFByZXYoZSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZS5rZXlDb2RlID09PSAzNyA/IHRydWUgOiBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzS2V5Ym9hcmRFc2MoZSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZS5rZXlDb2RlID09PSAyNyA/IHRydWUgOiBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9wZW5GdWxsc2NyZWVuKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gPGFueT5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cbiAgICAgICAgaWYgKGVsZW1lbnQucmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgIGVsZW1lbnQucmVxdWVzdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgfSBlbHNlIGlmIChlbGVtZW50Lm1zUmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgIGVsZW1lbnQubXNSZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgICAgICB9IGVsc2UgaWYgKGVsZW1lbnQubW96UmVxdWVzdEZ1bGxTY3JlZW4pIHtcbiAgICAgICAgICAgIGVsZW1lbnQubW96UmVxdWVzdEZ1bGxTY3JlZW4oKTtcbiAgICAgICAgfSBlbHNlIGlmIChlbGVtZW50LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICBlbGVtZW50LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNsb3NlRnVsbHNjcmVlbigpOiB2b2lkIHtcblxuICAgICAgICBjb25zdCBkb2MgPSA8YW55PmRvY3VtZW50O1xuICAgICAgICBpZiAoZG9jLmZ1bGxzY3JlZW5FbGVtZW50KSB7XG4gICAgICAgICAgICBkb2MuZXhpdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgfSBlbHNlIGlmIChkb2MubXNGdWxsc2NyZWVuRWxlbWVudCkge1xuICAgICAgICAgICAgZG9jLm1zRXhpdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgfSBlbHNlIGlmIChkb2MubW96Q2FuY2VsRnVsbFNjcmVlbikge1xuICAgICAgICAgICAgZG9jLm1vekZ1bGxTY3JlZW5FbGVtZW50KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZG9jLndlYmtpdEZ1bGxzY3JlZW5FbGVtZW50KSB7XG4gICAgICAgICAgICBkb2Mud2Via2l0RXhpdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc2hvdyhmaXJzdCA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuc3RvcEF1dG9QbGF5KCk7XG5cbiAgICAgICAgdGhpcy5vbkFjdGl2ZUNoYW5nZS5lbWl0KHRoaXMuaW5kZXgpO1xuXG4gICAgICAgIGlmIChmaXJzdCB8fCAhdGhpcy5hbmltYXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuX3Nob3coKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5fc2hvdygpLCA2MDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2hvdygpIHtcbiAgICAgICAgdGhpcy56b29tVmFsdWUgPSAxO1xuICAgICAgICB0aGlzLnJvdGF0ZVZhbHVlID0gMDtcbiAgICAgICAgdGhpcy5yZXNldFBvc2l0aW9uKCk7XG4gICAgICAgIHRoaXMuc3JjID0gdGhpcy5pdGVtc1t0aGlzLmluZGV4XS50eXBlID09PSAnaW1hZ2UnID8gdGhpcy5nZXRTYWZlVXJsKDxzdHJpbmc+dGhpcy5pdGVtc1t0aGlzLmluZGV4XS51cmwpIDogdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLml0ZW0gPSB0aGlzLml0ZW1zW3RoaXMuaW5kZXhdO1xuICAgICAgICB0aGlzLnNyY0luZGV4ID0gdGhpcy5pbmRleDtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IHRoaXMuZGVzY3JpcHRpb25zW3RoaXMuaW5kZXhdO1xuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXRlbXNbdGhpcy5pbmRleF0udHlwZSA9PT0gJ3ZpZGVvJykge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlT25WaWRlbygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU9uSW1hZ2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzSW1nTG9hZGVkKGltZyk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoIWltZy5jb21wbGV0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBpbWcubmF0dXJhbFdpZHRoICE9PSAndW5kZWZpbmVkJyAmJiBpbWcubmF0dXJhbFdpZHRoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZU9uSW1hZ2UoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzSW1nTG9hZGVkKHRoaXMucHJldmlld0ltYWdlLm5hdGl2ZUVsZW1lbnQpKSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRBdXRvUGxheSgpO1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxvYWRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93U3Bpbm5lciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMucHJldmlld0ltYWdlLm5hdGl2ZUVsZW1lbnQub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NwaW5uZXIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnByZXZpZXdJbWFnZS5uYXRpdmVFbGVtZW50Lm9ubG9hZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydEF1dG9QbGF5KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZU9uVmlkZW8oKSB7XG4gICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgIH1cbn1cbiJdfQ==