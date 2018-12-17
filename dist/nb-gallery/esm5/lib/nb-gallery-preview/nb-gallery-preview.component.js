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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmItZ2FsbGVyeS1wcmV2aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25iLWdhbGxlcnkvIiwic291cmNlcyI6WyJsaWIvbmItZ2FsbGVyeS1wcmV2aWV3L25iLWdhbGxlcnktcHJldmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQTRCLFVBQVUsRUFBZ0IsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuSyxPQUFPLEVBQW1CLFlBQVksRUFBc0IsTUFBTSwyQkFBMkIsQ0FBQztBQUc5RixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7SUFtR2xFLG1DQUFvQixZQUEwQixFQUFVLFVBQXNCLEVBQ2xFLGVBQStDLFFBQWtCLEVBQ2pFO1FBRlEsaUJBQVksR0FBWixZQUFZLENBQWM7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ2xFLGtCQUFhLEdBQWIsYUFBYTtRQUFrQyxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2pFLHNCQUFpQixHQUFqQixpQkFBaUI7MkJBNURmLEtBQUs7NEJBQ0osQ0FBQzsyQkFDRixDQUFDO3lCQUNILENBQUM7dUJBQ0gsS0FBSzsyQkFDRCxDQUFDO3FCQUNQLENBQUM7c0JBbUNVLElBQUksWUFBWSxFQUFFO3VCQUNqQixJQUFJLFlBQVksRUFBRTs4QkFDWCxJQUFJLFlBQVksRUFBVTtzQkFLcEMsS0FBSzt3QkFFSCxDQUFDO3dCQUNELENBQUM7MkJBQ0UsQ0FBQzswQkFDRixDQUFDO3NCQUNMLEtBQUs7S0FNOEI7Ozs7O0lBRXBELCtDQUFXOzs7O0lBQVgsVUFBWSxPQUFzQjtRQUFsQyxpQkFLQztRQUpHLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFD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QUNQLFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFFBQVEsRUFBRSx3Z0hBMkJUOztpQkFFSjs7OztnQkFyQ3lCLFlBQVk7Z0JBRHdELFVBQVU7Z0JBSS9GLHNCQUFzQjtnQkFKb0csUUFBUTtnQkFBbEksaUJBQWlCOzs7d0JBcURyQixLQUFLOytCQUNMLEtBQUs7a0NBQ0wsS0FBSzt3QkFDTCxLQUFLOzZCQUNMLEtBQUs7a0NBQ0wsS0FBSzsrQkFDTCxLQUFLOzZCQUNMLEtBQUs7cUNBQ0wsS0FBSztnQ0FDTCxLQUFLO2dDQUNMLEtBQUs7NEJBQ0wsS0FBSztpQ0FDTCxLQUFLOzhCQUNMLEtBQUs7MkJBQ0wsS0FBSzttQ0FDTCxLQUFLO3VDQUNMLEtBQUs7K0JBQ0wsS0FBSzt1QkFDTCxLQUFLOzJCQUNMLEtBQUs7MEJBQ0wsS0FBSzswQkFDTCxLQUFLOzZCQUNMLEtBQUs7OEJBQ0wsS0FBSzs0QkFDTCxLQUFLOzBCQUNMLEtBQUs7eUJBQ0wsS0FBSztpQ0FDTCxLQUFLO2tDQUNMLEtBQUs7MkJBQ0wsS0FBSzsrQkFDTCxLQUFLOzBCQUNMLEtBQUs7eUJBRUwsTUFBTTswQkFDTixNQUFNO2lDQUNOLE1BQU07K0JBRU4sU0FBUyxTQUFDLGNBQWM7O29DQTFGN0I7O1NBdUNhLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIFZpZXdDaGlsZCwgUmVuZGVyZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNhZmVSZXNvdXJjZVVybCwgRG9tU2FuaXRpemVyLCBTYWZlVXJsLCBTYWZlU3R5bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuaW1wb3J0IHsgTmJHYWxsZXJ5QWN0aW9uIH0gZnJvbSAnLi4vbW9kZWxzL25iLWdhbGxlcnktYWN0aW9uLm1vZGVsJztcbmltcG9ydCB7IE5iR2FsbGVyeUhlbHBlclNlcnZpY2UgfSBmcm9tICcuLi9uYi1nYWxsZXJ5LWhlbHBlci5zZXJ2aWNlJztcbmltcG9ydCB7IE5iR2FsbGVyeU9yZGVyZWRJdGVtIH0gZnJvbSAnLi4vbW9kZWxzL25iLWdhbGxlcnktb3JkZXJlZC1pdGVtLm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduYi1nYWxsZXJ5LXByZXZpZXcnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxuYi1nYWxsZXJ5LWFycm93cyAob25QcmV2Q2xpY2spPVwic2hvd1ByZXYoKVwiIChvbk5leHRDbGljayk9XCJzaG93TmV4dCgpXCIgW3ByZXZEaXNhYmxlZF09XCIhY2FuU2hvd1ByZXYoKVwiIFtuZXh0RGlzYWJsZWRdPVwiIWNhblNob3dOZXh0KClcIiBbYXJyb3dQcmV2SWNvbl09XCJhcnJvd1ByZXZJY29uXCIgW2Fycm93TmV4dEljb25dPVwiYXJyb3dOZXh0SWNvblwiPjwvbmItZ2FsbGVyeS1hcnJvd3M+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJuYi1nYWxsZXJ5LXByZXZpZXctdG9wXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibmItZ2FsbGVyeS1wcmV2aWV3LWljb25zXCI+XG4gICAgICAgICAgICAgICAgPG5iLWdhbGxlcnktYWN0aW9uICpuZ0Zvcj1cImxldCBhY3Rpb24gb2YgYWN0aW9uc1wiIFtpY29uXT1cImFjdGlvbi5pY29uXCIgW2Rpc2FibGVkXT1cImFjdGlvbi5kaXNhYmxlZFwiIFt0aXRsZVRleHRdPVwiYWN0aW9uLnRpdGxlVGV4dFwiIChvbkNsaWNrKT1cImFjdGlvbi5vbkNsaWNrKCRldmVudCwgaW5kZXgpXCI+PC9uYi1nYWxsZXJ5LWFjdGlvbj5cbiAgICAgICAgICAgICAgICA8YSAqbmdJZj1cImRvd25sb2FkICYmIHNyY1wiIFtocmVmXT1cInNyY1wiIGNsYXNzPVwibmItZ2FsbGVyeS1pY29uXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgZG93bmxvYWQ+XG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwibmItZ2FsbGVyeS1pY29uLWNvbnRlbnQge3sgZG93bmxvYWRJY29uIH19XCI+PC9pPlxuICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICA8bmItZ2FsbGVyeS1hY3Rpb24gKm5nSWY9XCJ6b29tXCIgW2ljb25dPVwiem9vbU91dEljb25cIiBbZGlzYWJsZWRdPVwiIWNhblpvb21PdXQoKVwiIChvbkNsaWNrKT1cInpvb21PdXQoKVwiPjwvbmItZ2FsbGVyeS1hY3Rpb24+XG4gICAgICAgICAgICAgICAgPG5iLWdhbGxlcnktYWN0aW9uICpuZ0lmPVwiem9vbVwiIFtpY29uXT1cInpvb21Jbkljb25cIiBbZGlzYWJsZWRdPVwiIWNhblpvb21JbigpXCIgKG9uQ2xpY2spPVwiem9vbUluKClcIj48L25iLWdhbGxlcnktYWN0aW9uPlxuICAgICAgICAgICAgICAgIDxuYi1nYWxsZXJ5LWFjdGlvbiAqbmdJZj1cInJvdGF0ZVwiIFtpY29uXT1cInJvdGF0ZUxlZnRJY29uXCIgKG9uQ2xpY2spPVwicm90YXRlTGVmdCgpXCI+PC9uYi1nYWxsZXJ5LWFjdGlvbj5cbiAgICAgICAgICAgICAgICA8bmItZ2FsbGVyeS1hY3Rpb24gKm5nSWY9XCJyb3RhdGVcIiBbaWNvbl09XCJyb3RhdGVSaWdodEljb25cIiAob25DbGljayk9XCJyb3RhdGVSaWdodCgpXCI+PC9uYi1nYWxsZXJ5LWFjdGlvbj5cbiAgICAgICAgICAgICAgICA8bmItZ2FsbGVyeS1hY3Rpb24gKm5nSWY9XCJmdWxsc2NyZWVuXCIgW2ljb25dPVwiJ25iLWdhbGxlcnktZnVsbHNjcmVlbiAnICsgZnVsbHNjcmVlbkljb25cIiAob25DbGljayk9XCJtYW5hZ2VGdWxsc2NyZWVuKClcIj48L25iLWdhbGxlcnktYWN0aW9uPlxuICAgICAgICAgICAgICAgIDxuYi1nYWxsZXJ5LWFjdGlvbiBbaWNvbl09XCInbmItZ2FsbGVyeS1jbG9zZSAnICsgY2xvc2VJY29uXCIgKG9uQ2xpY2spPVwiY2xvc2UoKVwiPjwvbmItZ2FsbGVyeS1hY3Rpb24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJuYi1zcGlubmVyLXdyYXBwZXIgbmItZ2FsbGVyeS1jZW50ZXJcIiBbY2xhc3MubmItZ2FsbGVyeS1hY3RpdmVdPVwic2hvd1NwaW5uZXJcIj5cbiAgICAgICAgICAgIDxpIGNsYXNzPVwibmItZ2FsbGVyeS1pY29uIG5iLWdhbGxlcnktc3Bpbm5lciB7e3NwaW5uZXJJY29ufX1cIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwibmItZ2FsbGVyeS1wcmV2aWV3LXdyYXBwZXJcIiAoY2xpY2spPVwiY2xvc2VPbkNsaWNrICYmIGNsb3NlKClcIiAobW91c2V1cCk9XCJtb3VzZVVwSGFuZGxlcigkZXZlbnQpXCIgKG1vdXNlbW92ZSk9XCJtb3VzZU1vdmVIYW5kbGVyKCRldmVudClcIiAodG91Y2hlbmQpPVwibW91c2VVcEhhbmRsZXIoJGV2ZW50KVwiICh0b3VjaG1vdmUpPVwibW91c2VNb3ZlSGFuZGxlcigkZXZlbnQpXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibmItZ2FsbGVyeS1wcmV2aWV3LWltZy13cmFwcGVyXCI+XG4gICAgICAgICAgICAgICAgPGltZyAqbmdJZj1cInNyYyAmJiBpdGVtICYmIGl0ZW0udHlwZSA9PT0gJ2ltYWdlJ1wiICNwcmV2aWV3SW1hZ2UgY2xhc3M9XCJuYi1nYWxsZXJ5LXByZXZpZXctaW1nIG5iLWdhbGxlcnktY2VudGVyXCIgW3NyY109XCJzcmNcIiAoY2xpY2spPVwiJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXCIgKG1vdXNlZW50ZXIpPVwiaW1hZ2VNb3VzZUVudGVyKClcIiAobW91c2VsZWF2ZSk9XCJpbWFnZU1vdXNlTGVhdmUoKVwiIChtb3VzZWRvd24pPVwibW91c2VEb3duSGFuZGxlcigkZXZlbnQpXCIgKHRvdWNoc3RhcnQpPVwibW91c2VEb3duSGFuZGxlcigkZXZlbnQpXCIgW2NsYXNzLm5iLWdhbGxlcnktYWN0aXZlXT1cIiFsb2FkaW5nXCIgW2NsYXNzLmFuaW1hdGlvbl09XCJhbmltYXRpb25cIiBbY2xhc3MubmItZ2FsbGVyeS1ncmFiXT1cImNhbkRyYWdPblpvb20oKVwiIFtzdHlsZS50cmFuc2Zvcm1dPVwiZ2V0VHJhbnNmb3JtKClcIiBbc3R5bGUubGVmdF09XCJwb3NpdGlvbkxlZnQgKyAncHgnXCIgW3N0eWxlLnRvcF09XCJwb3NpdGlvblRvcCArICdweCdcIi8+XG4gICAgICAgICAgICAgICAgPG5iLWdhbGxlcnktdmlkZW8gKm5nSWY9XCJpdGVtICYmIGl0ZW0udHlwZSA9PT0gJ3ZpZGVvJ1wiICNwcmV2aWV3VmlkZW8gW3ZpZGVvSXRlbV09XCJpdGVtXCIgW3BhdXNlXT1cImluZGV4ICE9PSBzcmNJbmRleFwiIGNsYXNzPVwibmItZ2FsbGVyeS1wcmV2aWV3LXZpZGVvIG5iLWdhbGxlcnktY2VudGVyXCIgKGNsaWNrKT1cIiRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiIFtjbGFzcy5uYi1nYWxsZXJ5LWFjdGl2ZV09XCIhbG9hZGluZ1wiIFtjbGFzcy5hbmltYXRpb25dPVwiYW5pbWF0aW9uXCIgW2NsYXNzLm5iLWdhbGxlcnktZ3JhYl09XCJjYW5EcmFnT25ab29tKClcIiBbc3R5bGUudHJhbnNmb3JtXT1cImdldFRyYW5zZm9ybSgpXCIgW3N0eWxlLmxlZnRdPVwicG9zaXRpb25MZWZ0ICsgJ3B4J1wiIFtzdHlsZS50b3BdPVwicG9zaXRpb25Ub3AgKyAncHgnXCIgPjwvbmItZ2FsbGVyeS12aWRlbz5cbiAgICAgICAgICAgICAgICA8bmItZ2FsbGVyeS1idWxsZXRzICpuZ0lmPVwiYnVsbGV0c1wiIFtjb3VudF09XCJpdGVtcy5sZW5ndGhcIiBbYWN0aXZlXT1cImluZGV4XCIgKG9uQ2hhbmdlKT1cInNob3dBdEluZGV4KCRldmVudClcIj48L25iLWdhbGxlcnktYnVsbGV0cz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5iLWdhbGxlcnktcHJldmlldy10ZXh0XCIgKm5nSWY9XCJzaG93RGVzY3JpcHRpb24gJiYgZGVzY3JpcHRpb25cIiBbaW5uZXJIVE1MXT1cImRlc2NyaXB0aW9uXCIgKGNsaWNrKT1cIiRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIHN0eWxlVXJsczogWycuL25iLWdhbGxlcnktcHJldmlldy5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIE5iR2FsbGVyeVByZXZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gICAgc3JjOiBTYWZlVXJsO1xuICAgIHNyY0luZGV4OiBudW1iZXI7XG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgICBpdGVtOiBOYkdhbGxlcnlPcmRlcmVkSXRlbTtcbiAgICBzaG93U3Bpbm5lciA9IGZhbHNlO1xuICAgIHBvc2l0aW9uTGVmdCA9IDA7XG4gICAgcG9zaXRpb25Ub3AgPSAwO1xuICAgIHpvb21WYWx1ZSA9IDE7XG4gICAgbG9hZGluZyA9IGZhbHNlO1xuICAgIHJvdGF0ZVZhbHVlID0gMDtcbiAgICBpbmRleCA9IDA7XG5cbiAgICBASW5wdXQoKSBpdGVtczogTmJHYWxsZXJ5T3JkZXJlZEl0ZW1bXTtcbiAgICBASW5wdXQoKSBkZXNjcmlwdGlvbnM6IHN0cmluZ1tdO1xuICAgIEBJbnB1dCgpIHNob3dEZXNjcmlwdGlvbjogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBzd2lwZTogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBmdWxsc2NyZWVuOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIGZvcmNlRnVsbHNjcmVlbjogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBjbG9zZU9uQ2xpY2s6IGJvb2xlYW47XG4gICAgQElucHV0KCkgY2xvc2VPbkVzYzogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBrZXlib2FyZE5hdmlnYXRpb246IGJvb2xlYW47XG4gICAgQElucHV0KCkgYXJyb3dQcmV2SWNvbjogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGFycm93TmV4dEljb246IHN0cmluZztcbiAgICBASW5wdXQoKSBjbG9zZUljb246IHN0cmluZztcbiAgICBASW5wdXQoKSBmdWxsc2NyZWVuSWNvbjogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHNwaW5uZXJJY29uOiBzdHJpbmc7XG4gICAgQElucHV0KCkgYXV0b1BsYXk6IGJvb2xlYW47XG4gICAgQElucHV0KCkgYXV0b1BsYXlJbnRlcnZhbDogbnVtYmVyO1xuICAgIEBJbnB1dCgpIGF1dG9QbGF5UGF1c2VPbkhvdmVyOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIGluZmluaXR5TW92ZTogYm9vbGVhbjtcbiAgICBASW5wdXQoKSB6b29tOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIHpvb21TdGVwOiBudW1iZXI7XG4gICAgQElucHV0KCkgem9vbU1heDogbnVtYmVyO1xuICAgIEBJbnB1dCgpIHpvb21NaW46IG51bWJlcjtcbiAgICBASW5wdXQoKSB6b29tSW5JY29uOiBzdHJpbmc7XG4gICAgQElucHV0KCkgem9vbU91dEljb246IHN0cmluZztcbiAgICBASW5wdXQoKSBhbmltYXRpb246IGJvb2xlYW47XG4gICAgQElucHV0KCkgYWN0aW9uczogTmJHYWxsZXJ5QWN0aW9uW107XG4gICAgQElucHV0KCkgcm90YXRlOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIHJvdGF0ZUxlZnRJY29uOiBzdHJpbmc7XG4gICAgQElucHV0KCkgcm90YXRlUmlnaHRJY29uOiBzdHJpbmc7XG4gICAgQElucHV0KCkgZG93bmxvYWQ6IGJvb2xlYW47XG4gICAgQElucHV0KCkgZG93bmxvYWRJY29uOiBzdHJpbmc7XG4gICAgQElucHV0KCkgYnVsbGV0czogc3RyaW5nO1xuXG4gICAgQE91dHB1dCgpIG9uT3BlbiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgb25DbG9zZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgb25BY3RpdmVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAgIEBWaWV3Q2hpbGQoJ3ByZXZpZXdJbWFnZScpIHByZXZpZXdJbWFnZTogRWxlbWVudFJlZjtcbiAgICAvLyBAVmlld0NoaWxkKCdwcmV2aWV3VmlkZW8nKSBwcmV2aWV3VmlkZW86IEVsZW1lbnRSZWY7XG5cbiAgICBwcml2YXRlIGlzT3BlbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgdGltZXI7XG4gICAgcHJpdmF0ZSBpbml0aWFsWCA9IDA7XG4gICAgcHJpdmF0ZSBpbml0aWFsWSA9IDA7XG4gICAgcHJpdmF0ZSBpbml0aWFsTGVmdCA9IDA7XG4gICAgcHJpdmF0ZSBpbml0aWFsVG9wID0gMDtcbiAgICBwcml2YXRlIGlzTW92ZSA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBrZXlEb3duTGlzdGVuZXI6IEZ1bmN0aW9uO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzYW5pdGl6YXRpb246IERvbVNhbml0aXplciwgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIGhlbHBlclNlcnZpY2U6IE5iR2FsbGVyeUhlbHBlclNlcnZpY2UsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyLFxuICAgICAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICAgICAgaWYgKGNoYW5nZXNbJ3N3aXBlJ10pIHtcbiAgICAgICAgICAgIHRoaXMuaGVscGVyU2VydmljZS5tYW5hZ2VTd2lwZSh0aGlzLnN3aXBlLCB0aGlzLmVsZW1lbnRSZWYsXG4gICAgICAgICAgICAncHJldmlldycsICgpID0+IHRoaXMuc2hvd05leHQoKSwgKCkgPT4gdGhpcy5zaG93UHJldigpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5rZXlEb3duTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMua2V5RG93bkxpc3RlbmVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbktleURvd24oZSkge1xuICAgICAgICBpZiAodGhpcy5pc09wZW4pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmtleWJvYXJkTmF2aWdhdGlvbikge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzS2V5Ym9hcmRQcmV2KGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1ByZXYoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNLZXlib2FyZE5leHQoZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93TmV4dCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmNsb3NlT25Fc2MgJiYgdGhpcy5pc0tleWJvYXJkRXNjKGUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb3BlbihpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25PcGVuLmVtaXQoKTtcblxuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gICAgICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zaG93KHRydWUpO1xuXG4gICAgICAgIGlmICh0aGlzLmZvcmNlRnVsbHNjcmVlbikge1xuICAgICAgICAgICAgdGhpcy5tYW5hZ2VGdWxsc2NyZWVuKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmtleURvd25MaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuR2xvYmFsKFwid2luZG93XCIsIFwia2V5ZG93blwiLCAoZSkgPT4gdGhpcy5vbktleURvd24oZSkpO1xuICAgIH1cblxuICAgIGNsb3NlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNsb3NlRnVsbHNjcmVlbigpO1xuICAgICAgICB0aGlzLm9uQ2xvc2UuZW1pdCgpO1xuXG4gICAgICAgIHRoaXMuc3RvcEF1dG9QbGF5KCk7XG5cbiAgICAgICAgaWYgKHRoaXMua2V5RG93bkxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmtleURvd25MaXN0ZW5lcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW1hZ2VNb3VzZUVudGVyKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5hdXRvUGxheSAmJiB0aGlzLmF1dG9QbGF5UGF1c2VPbkhvdmVyKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3BBdXRvUGxheSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW1hZ2VNb3VzZUxlYXZlKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5hdXRvUGxheSAmJiB0aGlzLmF1dG9QbGF5UGF1c2VPbkhvdmVyKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0QXV0b1BsYXkoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXJ0QXV0b1BsYXkoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmF1dG9QbGF5KSB7XG4gICAgICAgICAgICB0aGlzLnN0b3BBdXRvUGxheSgpO1xuXG4gICAgICAgICAgICB0aGlzLnRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnNob3dOZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmRleCA9IC0xO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dOZXh0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgdGhpcy5hdXRvUGxheUludGVydmFsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0b3BBdXRvUGxheSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMudGltZXIpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3dBdEluZGV4KGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgICAgICB0aGlzLnNob3coKTtcbiAgICB9XG5cbiAgICBzaG93TmV4dCgpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuY2FuU2hvd05leHQoKSkge1xuICAgICAgICAgICAgdGhpcy5pbmRleCsrO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5pbmRleCA9PT0gdGhpcy5pdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluZGV4ID0gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3dQcmV2KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5jYW5TaG93UHJldigpKSB7XG4gICAgICAgICAgICB0aGlzLmluZGV4LS07XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5kZXggPSB0aGlzLml0ZW1zLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FuU2hvd05leHQoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLmxvYWRpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLml0ZW1zKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbmZpbml0eU1vdmUgfHwgdGhpcy5pbmRleCA8IHRoaXMuaXRlbXMubGVuZ3RoIC0gMSA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNhblNob3dQcmV2KCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5sb2FkaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pdGVtcykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5maW5pdHlNb3ZlIHx8IHRoaXMuaW5kZXggPiAwID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbWFuYWdlRnVsbHNjcmVlbigpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZnVsbHNjcmVlbiB8fCB0aGlzLmZvcmNlRnVsbHNjcmVlbikge1xuICAgICAgICAgICAgY29uc3QgZG9jID0gPGFueT5kb2N1bWVudDtcblxuICAgICAgICAgICAgaWYgKCFkb2MuZnVsbHNjcmVlbkVsZW1lbnQgJiYgIWRvYy5tb3pGdWxsU2NyZWVuRWxlbWVudFxuICAgICAgICAgICAgICAgICYmICFkb2Mud2Via2l0RnVsbHNjcmVlbkVsZW1lbnQgJiYgIWRvYy5tc0Z1bGxzY3JlZW5FbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuRnVsbHNjcmVlbigpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlRnVsbHNjcmVlbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0U2FmZVVybChpbWFnZTogc3RyaW5nKTogU2FmZVVybCB7XG4gICAgICAgIHJldHVybiBpbWFnZS5zdWJzdHIoMCwgMTApID09PSAnZGF0YTppbWFnZScgP1xuICAgICAgICAgICAgaW1hZ2UgOiB0aGlzLnNhbml0aXphdGlvbi5ieXBhc3NTZWN1cml0eVRydXN0VXJsKGltYWdlKTtcbiAgICB9XG5cbiAgICB6b29tSW4oKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmNhblpvb21JbigpKSB7XG4gICAgICAgICAgICB0aGlzLnpvb21WYWx1ZSArPSB0aGlzLnpvb21TdGVwO1xuXG4gICAgICAgICAgICBpZiAodGhpcy56b29tVmFsdWUgPiB0aGlzLnpvb21NYXgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnpvb21WYWx1ZSA9IHRoaXMuem9vbU1heDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHpvb21PdXQoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmNhblpvb21PdXQoKSkge1xuICAgICAgICAgICAgdGhpcy56b29tVmFsdWUgLT0gdGhpcy56b29tU3RlcDtcblxuICAgICAgICAgICAgaWYgKHRoaXMuem9vbVZhbHVlIDwgdGhpcy56b29tTWluKSB7XG4gICAgICAgICAgICAgICAgdGhpcy56b29tVmFsdWUgPSB0aGlzLnpvb21NaW47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnpvb21WYWx1ZSA8PSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldFBvc2l0aW9uKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJvdGF0ZUxlZnQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucm90YXRlVmFsdWUgLT0gOTA7XG4gICAgfVxuXG4gICAgcm90YXRlUmlnaHQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucm90YXRlVmFsdWUgKz0gOTA7XG4gICAgfVxuXG4gICAgZ2V0VHJhbnNmb3JtKCk6IFNhZmVTdHlsZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNhbml0aXphdGlvbi5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUoJ3NjYWxlKCcgKyB0aGlzLnpvb21WYWx1ZSArICcpIHJvdGF0ZSgnICsgdGhpcy5yb3RhdGVWYWx1ZSArICdkZWcpJyk7XG4gICAgfVxuXG4gICAgY2FuWm9vbUluKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy56b29tVmFsdWUgPCB0aGlzLnpvb21NYXggPyB0cnVlIDogZmFsc2U7XG4gICAgfVxuXG4gICAgY2FuWm9vbU91dCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuem9vbVZhbHVlID4gdGhpcy56b29tTWluID8gdHJ1ZSA6IGZhbHNlO1xuICAgIH1cblxuICAgIGNhbkRyYWdPblpvb20oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnpvb20gJiYgdGhpcy56b29tVmFsdWUgPiAxO1xuICAgIH1cblxuICAgIG1vdXNlRG93bkhhbmRsZXIoZSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5jYW5EcmFnT25ab29tKCkpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbFggPSB0aGlzLmdldENsaWVudFgoZSk7XG4gICAgICAgICAgICB0aGlzLmluaXRpYWxZID0gdGhpcy5nZXRDbGllbnRZKGUpO1xuICAgICAgICAgICAgdGhpcy5pbml0aWFsTGVmdCA9IHRoaXMucG9zaXRpb25MZWZ0O1xuICAgICAgICAgICAgdGhpcy5pbml0aWFsVG9wID0gdGhpcy5wb3NpdGlvblRvcDtcbiAgICAgICAgICAgIHRoaXMuaXNNb3ZlID0gdHJ1ZTtcblxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW91c2VVcEhhbmRsZXIoZSk6IHZvaWQge1xuICAgICAgICB0aGlzLmlzTW92ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIG1vdXNlTW92ZUhhbmRsZXIoZSkge1xuICAgICAgICBpZiAodGhpcy5pc01vdmUpIHtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb25MZWZ0ID0gdGhpcy5pbml0aWFsTGVmdCArICh0aGlzLmdldENsaWVudFgoZSkgLSB0aGlzLmluaXRpYWxYKTtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb25Ub3AgPSB0aGlzLmluaXRpYWxUb3AgKyAodGhpcy5nZXRDbGllbnRZKGUpIC0gdGhpcy5pbml0aWFsWSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldENsaWVudFgoZSk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBlLnRvdWNoZXMgJiYgZS50b3VjaGVzLmxlbmd0aCA/IGUudG91Y2hlc1swXS5jbGllbnRYIDogZS5jbGllbnRYO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Q2xpZW50WShlKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIGUudG91Y2hlcyAmJiBlLnRvdWNoZXMubGVuZ3RoID8gZS50b3VjaGVzWzBdLmNsaWVudFkgOiBlLmNsaWVudFk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXNldFBvc2l0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy56b29tKSB7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uTGVmdCA9IDA7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uVG9wID0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaXNLZXlib2FyZE5leHQoZSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZS5rZXlDb2RlID09PSAzOSA/IHRydWUgOiBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzS2V5Ym9hcmRQcmV2KGUpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGUua2V5Q29kZSA9PT0gMzcgPyB0cnVlIDogZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc0tleWJvYXJkRXNjKGUpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGUua2V5Q29kZSA9PT0gMjcgPyB0cnVlIDogZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvcGVuRnVsbHNjcmVlbigpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IDxhbnk+ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG4gICAgICAgIGlmIChlbGVtZW50LnJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICBlbGVtZW50LnJlcXVlc3RGdWxsc2NyZWVuKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudC5tc1JlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICBlbGVtZW50Lm1zUmVxdWVzdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgfSBlbHNlIGlmIChlbGVtZW50Lm1velJlcXVlc3RGdWxsU2NyZWVuKSB7XG4gICAgICAgICAgICBlbGVtZW50Lm1velJlcXVlc3RGdWxsU2NyZWVuKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICAgICAgZWxlbWVudC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjbG9zZUZ1bGxzY3JlZW4oKTogdm9pZCB7XG5cbiAgICAgICAgY29uc3QgZG9jID0gPGFueT5kb2N1bWVudDtcblxuICAgICAgICBpZiAoZG9jLmV4aXRGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICBkb2MuZXhpdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgfSBlbHNlIGlmIChkb2MubXNFeGl0RnVsbHNjcmVlbikge1xuICAgICAgICAgICAgZG9jLm1zRXhpdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgfSBlbHNlIGlmIChkb2MubW96Q2FuY2VsRnVsbFNjcmVlbikge1xuICAgICAgICAgICAgZG9jLm1vekNhbmNlbEZ1bGxTY3JlZW4oKTtcbiAgICAgICAgfSBlbHNlIGlmIChkb2Mud2Via2l0RXhpdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgIGRvYy53ZWJraXRFeGl0RnVsbHNjcmVlbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaG93KGZpcnN0ID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zdG9wQXV0b1BsYXkoKTtcblxuICAgICAgICB0aGlzLm9uQWN0aXZlQ2hhbmdlLmVtaXQodGhpcy5pbmRleCk7XG5cbiAgICAgICAgaWYgKGZpcnN0IHx8ICF0aGlzLmFuaW1hdGlvbikge1xuICAgICAgICAgICAgdGhpcy5fc2hvdygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLl9zaG93KCksIDYwMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9zaG93KCkge1xuICAgICAgICB0aGlzLnpvb21WYWx1ZSA9IDE7XG4gICAgICAgIHRoaXMucm90YXRlVmFsdWUgPSAwO1xuICAgICAgICB0aGlzLnJlc2V0UG9zaXRpb24oKTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5pdGVtcyk7XG4gICAgICAgIHRoaXMuc3JjID0gdGhpcy5pdGVtc1t0aGlzLmluZGV4XS50eXBlID09PSAnaW1hZ2UnID8gdGhpcy5nZXRTYWZlVXJsKDxzdHJpbmc+dGhpcy5pdGVtc1t0aGlzLmluZGV4XS51cmwpIDogdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLml0ZW0gPSB0aGlzLml0ZW1zW3RoaXMuaW5kZXhdO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLml0ZW0pO1xuICAgICAgICB0aGlzLnNyY0luZGV4ID0gdGhpcy5pbmRleDtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IHRoaXMuZGVzY3JpcHRpb25zW3RoaXMuaW5kZXhdO1xuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXRlbXNbdGhpcy5pbmRleF0udHlwZSA9PT0gJ3ZpZGVvJykge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlT25WaWRlbygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU9uSW1hZ2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzSW1nTG9hZGVkKGltZyk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoIWltZy5jb21wbGV0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBpbWcubmF0dXJhbFdpZHRoICE9PSAndW5kZWZpbmVkJyAmJiBpbWcubmF0dXJhbFdpZHRoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZU9uSW1hZ2UoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzSW1nTG9hZGVkKHRoaXMucHJldmlld0ltYWdlLm5hdGl2ZUVsZW1lbnQpKSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRBdXRvUGxheSgpO1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxvYWRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93U3Bpbm5lciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMucHJldmlld0ltYWdlLm5hdGl2ZUVsZW1lbnQub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NwaW5uZXIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnByZXZpZXdJbWFnZS5uYXRpdmVFbGVtZW50Lm9ubG9hZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydEF1dG9QbGF5KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZU9uVmlkZW8oKSB7XG4gICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgIH1cbn1cbiJdfQ==