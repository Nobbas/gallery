/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, Component, Input, Output, EventEmitter, ElementRef, ViewChild, Renderer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NbGalleryHelperService } from '../nb-gallery-helper.service';
export class NbGalleryPreviewComponent {
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
        this.src = this.items[this.index].type === 'image' ? this.getSafeUrl(/** @type {?} */ (this.items[this.index].url)) : undefined;
        this.item = this.items[this.index];
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
                    <fa-icon class="nb-gallery-icon-content" [icon]="downloadIcon"></fa-icon>
                </a>
                <nb-gallery-action *ngIf="zoom" [icon]="zoomOutIcon" [disabled]="!canZoomOut()" (onClick)="zoomOut()"></nb-gallery-action>
                <nb-gallery-action *ngIf="zoom" [icon]="zoomInIcon" [disabled]="!canZoomIn()" (onClick)="zoomIn()"></nb-gallery-action>
                <nb-gallery-action *ngIf="rotate" [icon]="rotateLeftIcon" (onClick)="rotateLeft()"></nb-gallery-action>
                <nb-gallery-action *ngIf="rotate" [icon]="rotateRightIcon" (onClick)="rotateRight()"></nb-gallery-action>
                <nb-gallery-action *ngIf="fullscreen" [icon]="fullscreenIcon" (onClick)="manageFullscreen()"></nb-gallery-action>
                <nb-gallery-action [icon]="closeIcon" (onClick)="close()"></nb-gallery-action>
            </div>
        </div>
        <div class="nb-spinner-wrapper nb-gallery-center" [class.nb-gallery-active]="showSpinner">
            <fa-icon class="nb-gallery-icon nb-gallery-spinner" [spin]="true" size="xs" [icon]="spinnerIcon"></fa-icon>
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmItZ2FsbGVyeS1wcmV2aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25iLWdhbGxlcnkvIiwic291cmNlcyI6WyJsaWIvbmItZ2FsbGVyeS1wcmV2aWV3L25iLWdhbGxlcnktcHJldmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQTRCLFVBQVUsRUFBZ0IsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuSyxPQUFPLEVBQW1CLFlBQVksRUFBc0IsTUFBTSwyQkFBMkIsQ0FBQztBQUc5RixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQW1DdEUsTUFBTTs7Ozs7Ozs7SUFnRUYsWUFBb0IsWUFBMEIsRUFBVSxVQUFzQixFQUNsRSxlQUErQyxRQUFrQixFQUNqRTtRQUZRLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQVUsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUNsRSxrQkFBYSxHQUFiLGFBQWE7UUFBa0MsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNqRSxzQkFBaUIsR0FBakIsaUJBQWlCOzJCQTVEZixLQUFLOzRCQUNKLENBQUM7MkJBQ0YsQ0FBQzt5QkFDSCxDQUFDO3VCQUNILEtBQUs7MkJBQ0QsQ0FBQztxQkFDUCxDQUFDO3NCQW1DVSxJQUFJLFlBQVksRUFBRTt1QkFDakIsSUFBSSxZQUFZLEVBQUU7OEJBQ1gsSUFBSSxZQUFZLEVBQVU7c0JBS3BDLEtBQUs7d0JBRUgsQ0FBQzt3QkFDRCxDQUFDOzJCQUNFLENBQUM7MEJBQ0YsQ0FBQztzQkFDTCxLQUFLO0tBTThCOzs7OztJQUVwRCxXQUFXLENBQUMsT0FBc0I7UUFDOUIsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDbEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFB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QUFLOzBCQUNMLEtBQUs7d0JBQ0wsS0FBSztzQkFDTCxLQUFLO3FCQUNMLEtBQUs7NkJBQ0wsS0FBSzs4QkFDTCxLQUFLO3VCQUNMLEtBQUs7MkJBQ0wsS0FBSztzQkFDTCxLQUFLO3FCQUVMLE1BQU07c0JBQ04sTUFBTTs2QkFDTixNQUFNOzJCQUVOLFNBQVMsU0FBQyxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgVmlld0NoaWxkLCBSZW5kZXJlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2FmZVJlc291cmNlVXJsLCBEb21TYW5pdGl6ZXIsIFNhZmVVcmwsIFNhZmVTdHlsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5pbXBvcnQgeyBOYkdhbGxlcnlBY3Rpb24gfSBmcm9tICcuLi9tb2RlbHMvbmItZ2FsbGVyeS1hY3Rpb24ubW9kZWwnO1xuaW1wb3J0IHsgTmJHYWxsZXJ5SGVscGVyU2VydmljZSB9IGZyb20gJy4uL25iLWdhbGxlcnktaGVscGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgTmJHYWxsZXJ5T3JkZXJlZEl0ZW0gfSBmcm9tICcuLi9tb2RlbHMvbmItZ2FsbGVyeS1vcmRlcmVkLWl0ZW0ubW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ25iLWdhbGxlcnktcHJldmlldycsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPG5iLWdhbGxlcnktYXJyb3dzIChvblByZXZDbGljayk9XCJzaG93UHJldigpXCIgKG9uTmV4dENsaWNrKT1cInNob3dOZXh0KClcIiBbcHJldkRpc2FibGVkXT1cIiFjYW5TaG93UHJldigpXCIgW25leHREaXNhYmxlZF09XCIhY2FuU2hvd05leHQoKVwiIFthcnJvd1ByZXZJY29uXT1cImFycm93UHJldkljb25cIiBbYXJyb3dOZXh0SWNvbl09XCJhcnJvd05leHRJY29uXCI+PC9uYi1nYWxsZXJ5LWFycm93cz5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm5iLWdhbGxlcnktcHJldmlldy10b3BcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuYi1nYWxsZXJ5LXByZXZpZXctaWNvbnNcIj5cbiAgICAgICAgICAgICAgICA8bmItZ2FsbGVyeS1hY3Rpb24gKm5nRm9yPVwibGV0IGFjdGlvbiBvZiBhY3Rpb25zXCIgW2ljb25dPVwiYWN0aW9uLmljb25cIiBbZGlzYWJsZWRdPVwiYWN0aW9uLmRpc2FibGVkXCIgW3RpdGxlVGV4dF09XCJhY3Rpb24udGl0bGVUZXh0XCIgKG9uQ2xpY2spPVwiYWN0aW9uLm9uQ2xpY2soJGV2ZW50LCBpbmRleClcIj48L25iLWdhbGxlcnktYWN0aW9uPlxuICAgICAgICAgICAgICAgIDxhICpuZ0lmPVwiZG93bmxvYWQgJiYgc3JjXCIgW2hyZWZdPVwic3JjXCIgY2xhc3M9XCJuYi1nYWxsZXJ5LWljb25cIiBhcmlhLWhpZGRlbj1cInRydWVcIiBkb3dubG9hZD5cbiAgICAgICAgICAgICAgICAgICAgPGZhLWljb24gY2xhc3M9XCJuYi1nYWxsZXJ5LWljb24tY29udGVudFwiIFtpY29uXT1cImRvd25sb2FkSWNvblwiPjwvZmEtaWNvbj5cbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgPG5iLWdhbGxlcnktYWN0aW9uICpuZ0lmPVwiem9vbVwiIFtpY29uXT1cInpvb21PdXRJY29uXCIgW2Rpc2FibGVkXT1cIiFjYW5ab29tT3V0KClcIiAob25DbGljayk9XCJ6b29tT3V0KClcIj48L25iLWdhbGxlcnktYWN0aW9uPlxuICAgICAgICAgICAgICAgIDxuYi1nYWxsZXJ5LWFjdGlvbiAqbmdJZj1cInpvb21cIiBbaWNvbl09XCJ6b29tSW5JY29uXCIgW2Rpc2FibGVkXT1cIiFjYW5ab29tSW4oKVwiIChvbkNsaWNrKT1cInpvb21JbigpXCI+PC9uYi1nYWxsZXJ5LWFjdGlvbj5cbiAgICAgICAgICAgICAgICA8bmItZ2FsbGVyeS1hY3Rpb24gKm5nSWY9XCJyb3RhdGVcIiBbaWNvbl09XCJyb3RhdGVMZWZ0SWNvblwiIChvbkNsaWNrKT1cInJvdGF0ZUxlZnQoKVwiPjwvbmItZ2FsbGVyeS1hY3Rpb24+XG4gICAgICAgICAgICAgICAgPG5iLWdhbGxlcnktYWN0aW9uICpuZ0lmPVwicm90YXRlXCIgW2ljb25dPVwicm90YXRlUmlnaHRJY29uXCIgKG9uQ2xpY2spPVwicm90YXRlUmlnaHQoKVwiPjwvbmItZ2FsbGVyeS1hY3Rpb24+XG4gICAgICAgICAgICAgICAgPG5iLWdhbGxlcnktYWN0aW9uICpuZ0lmPVwiZnVsbHNjcmVlblwiIFtpY29uXT1cImZ1bGxzY3JlZW5JY29uXCIgKG9uQ2xpY2spPVwibWFuYWdlRnVsbHNjcmVlbigpXCI+PC9uYi1nYWxsZXJ5LWFjdGlvbj5cbiAgICAgICAgICAgICAgICA8bmItZ2FsbGVyeS1hY3Rpb24gW2ljb25dPVwiY2xvc2VJY29uXCIgKG9uQ2xpY2spPVwiY2xvc2UoKVwiPjwvbmItZ2FsbGVyeS1hY3Rpb24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJuYi1zcGlubmVyLXdyYXBwZXIgbmItZ2FsbGVyeS1jZW50ZXJcIiBbY2xhc3MubmItZ2FsbGVyeS1hY3RpdmVdPVwic2hvd1NwaW5uZXJcIj5cbiAgICAgICAgICAgIDxmYS1pY29uIGNsYXNzPVwibmItZ2FsbGVyeS1pY29uIG5iLWdhbGxlcnktc3Bpbm5lclwiIFtzcGluXT1cInRydWVcIiBzaXplPVwieHNcIiBbaWNvbl09XCJzcGlubmVySWNvblwiPjwvZmEtaWNvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJuYi1nYWxsZXJ5LXByZXZpZXctd3JhcHBlclwiIChjbGljayk9XCJjbG9zZU9uQ2xpY2sgJiYgY2xvc2UoKVwiIChtb3VzZXVwKT1cIm1vdXNlVXBIYW5kbGVyKCRldmVudClcIiAobW91c2Vtb3ZlKT1cIm1vdXNlTW92ZUhhbmRsZXIoJGV2ZW50KVwiICh0b3VjaGVuZCk9XCJtb3VzZVVwSGFuZGxlcigkZXZlbnQpXCIgKHRvdWNobW92ZSk9XCJtb3VzZU1vdmVIYW5kbGVyKCRldmVudClcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuYi1nYWxsZXJ5LXByZXZpZXctaW1nLXdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICA8aW1nICpuZ0lmPVwic3JjICYmIGl0ZW0gJiYgaXRlbS50eXBlID09PSAnaW1hZ2UnXCIgI3ByZXZpZXdJbWFnZSBjbGFzcz1cIm5iLWdhbGxlcnktcHJldmlldy1pbWcgbmItZ2FsbGVyeS1jZW50ZXJcIiBbc3JjXT1cInNyY1wiIChjbGljayk9XCIkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcIiAobW91c2VlbnRlcik9XCJpbWFnZU1vdXNlRW50ZXIoKVwiIChtb3VzZWxlYXZlKT1cImltYWdlTW91c2VMZWF2ZSgpXCIgKG1vdXNlZG93bik9XCJtb3VzZURvd25IYW5kbGVyKCRldmVudClcIiAodG91Y2hzdGFydCk9XCJtb3VzZURvd25IYW5kbGVyKCRldmVudClcIiBbY2xhc3MubmItZ2FsbGVyeS1hY3RpdmVdPVwiIWxvYWRpbmdcIiBbY2xhc3MuYW5pbWF0aW9uXT1cImFuaW1hdGlvblwiIFtjbGFzcy5uYi1nYWxsZXJ5LWdyYWJdPVwiY2FuRHJhZ09uWm9vbSgpXCIgW3N0eWxlLnRyYW5zZm9ybV09XCJnZXRUcmFuc2Zvcm0oKVwiIFtzdHlsZS5sZWZ0XT1cInBvc2l0aW9uTGVmdCArICdweCdcIiBbc3R5bGUudG9wXT1cInBvc2l0aW9uVG9wICsgJ3B4J1wiLz5cbiAgICAgICAgICAgICAgICA8bmItZ2FsbGVyeS12aWRlbyAqbmdJZj1cIml0ZW0gJiYgaXRlbS50eXBlID09PSAndmlkZW8nXCIgI3ByZXZpZXdWaWRlbyBbdmlkZW9JdGVtXT1cIml0ZW1cIiBbcGF1c2VdPVwiaW5kZXggIT09IHNyY0luZGV4XCIgY2xhc3M9XCJuYi1nYWxsZXJ5LXByZXZpZXctdmlkZW8gbmItZ2FsbGVyeS1jZW50ZXJcIiAoY2xpY2spPVwiJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXCIgW2NsYXNzLm5iLWdhbGxlcnktYWN0aXZlXT1cIiFsb2FkaW5nXCIgW2NsYXNzLmFuaW1hdGlvbl09XCJhbmltYXRpb25cIiBbY2xhc3MubmItZ2FsbGVyeS1ncmFiXT1cImNhbkRyYWdPblpvb20oKVwiIFtzdHlsZS50cmFuc2Zvcm1dPVwiZ2V0VHJhbnNmb3JtKClcIiBbc3R5bGUubGVmdF09XCJwb3NpdGlvbkxlZnQgKyAncHgnXCIgW3N0eWxlLnRvcF09XCJwb3NpdGlvblRvcCArICdweCdcIiA+PC9uYi1nYWxsZXJ5LXZpZGVvPlxuICAgICAgICAgICAgICAgIDxuYi1nYWxsZXJ5LWJ1bGxldHMgKm5nSWY9XCJidWxsZXRzXCIgW2NvdW50XT1cIml0ZW1zLmxlbmd0aFwiIFthY3RpdmVdPVwiaW5kZXhcIiAob25DaGFuZ2UpPVwic2hvd0F0SW5kZXgoJGV2ZW50KVwiPjwvbmItZ2FsbGVyeS1idWxsZXRzPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibmItZ2FsbGVyeS1wcmV2aWV3LXRleHRcIiAqbmdJZj1cInNob3dEZXNjcmlwdGlvbiAmJiBkZXNjcmlwdGlvblwiIFtpbm5lckhUTUxdPVwiZGVzY3JpcHRpb25cIiAoY2xpY2spPVwiJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgc3R5bGVVcmxzOiBbJy4vbmItZ2FsbGVyeS1wcmV2aWV3LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTmJHYWxsZXJ5UHJldmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgICBzcmM6IFNhZmVVcmw7XG4gICAgc3JjSW5kZXg6IG51bWJlcjtcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIGl0ZW06IE5iR2FsbGVyeU9yZGVyZWRJdGVtO1xuICAgIHNob3dTcGlubmVyID0gZmFsc2U7XG4gICAgcG9zaXRpb25MZWZ0ID0gMDtcbiAgICBwb3NpdGlvblRvcCA9IDA7XG4gICAgem9vbVZhbHVlID0gMTtcbiAgICBsb2FkaW5nID0gZmFsc2U7XG4gICAgcm90YXRlVmFsdWUgPSAwO1xuICAgIGluZGV4ID0gMDtcblxuICAgIEBJbnB1dCgpIGl0ZW1zOiBOYkdhbGxlcnlPcmRlcmVkSXRlbVtdO1xuICAgIEBJbnB1dCgpIGRlc2NyaXB0aW9uczogc3RyaW5nW107XG4gICAgQElucHV0KCkgc2hvd0Rlc2NyaXB0aW9uOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIHN3aXBlOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIGZ1bGxzY3JlZW46IGJvb2xlYW47XG4gICAgQElucHV0KCkgZm9yY2VGdWxsc2NyZWVuOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIGNsb3NlT25DbGljazogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBjbG9zZU9uRXNjOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIGtleWJvYXJkTmF2aWdhdGlvbjogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBhcnJvd1ByZXZJY29uOiBzdHJpbmc7XG4gICAgQElucHV0KCkgYXJyb3dOZXh0SWNvbjogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGNsb3NlSWNvbjogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGZ1bGxzY3JlZW5JY29uOiBzdHJpbmc7XG4gICAgQElucHV0KCkgc3Bpbm5lckljb246IHN0cmluZztcbiAgICBASW5wdXQoKSBhdXRvUGxheTogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBhdXRvUGxheUludGVydmFsOiBudW1iZXI7XG4gICAgQElucHV0KCkgYXV0b1BsYXlQYXVzZU9uSG92ZXI6IGJvb2xlYW47XG4gICAgQElucHV0KCkgaW5maW5pdHlNb3ZlOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIHpvb206IGJvb2xlYW47XG4gICAgQElucHV0KCkgem9vbVN0ZXA6IG51bWJlcjtcbiAgICBASW5wdXQoKSB6b29tTWF4OiBudW1iZXI7XG4gICAgQElucHV0KCkgem9vbU1pbjogbnVtYmVyO1xuICAgIEBJbnB1dCgpIHpvb21Jbkljb246IHN0cmluZztcbiAgICBASW5wdXQoKSB6b29tT3V0SWNvbjogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGFuaW1hdGlvbjogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBhY3Rpb25zOiBOYkdhbGxlcnlBY3Rpb25bXTtcbiAgICBASW5wdXQoKSByb3RhdGU6IGJvb2xlYW47XG4gICAgQElucHV0KCkgcm90YXRlTGVmdEljb246IHN0cmluZztcbiAgICBASW5wdXQoKSByb3RhdGVSaWdodEljb246IHN0cmluZztcbiAgICBASW5wdXQoKSBkb3dubG9hZDogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBkb3dubG9hZEljb246IHN0cmluZztcbiAgICBASW5wdXQoKSBidWxsZXRzOiBzdHJpbmc7XG5cbiAgICBAT3V0cHV0KCkgb25PcGVuID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBvbkNsb3NlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBvbkFjdGl2ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gICAgQFZpZXdDaGlsZCgncHJldmlld0ltYWdlJykgcHJldmlld0ltYWdlOiBFbGVtZW50UmVmO1xuICAgIC8vIEBWaWV3Q2hpbGQoJ3ByZXZpZXdWaWRlbycpIHByZXZpZXdWaWRlbzogRWxlbWVudFJlZjtcblxuICAgIHByaXZhdGUgaXNPcGVuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSB0aW1lcjtcbiAgICBwcml2YXRlIGluaXRpYWxYID0gMDtcbiAgICBwcml2YXRlIGluaXRpYWxZID0gMDtcbiAgICBwcml2YXRlIGluaXRpYWxMZWZ0ID0gMDtcbiAgICBwcml2YXRlIGluaXRpYWxUb3AgPSAwO1xuICAgIHByaXZhdGUgaXNNb3ZlID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIGtleURvd25MaXN0ZW5lcjogRnVuY3Rpb247XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNhbml0aXphdGlvbjogRG9tU2FuaXRpemVyLCBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgaGVscGVyU2VydmljZTogTmJHYWxsZXJ5SGVscGVyU2VydmljZSwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIsXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgICAgICBpZiAoY2hhbmdlc1snc3dpcGUnXSkge1xuICAgICAgICAgICAgdGhpcy5oZWxwZXJTZXJ2aWNlLm1hbmFnZVN3aXBlKHRoaXMuc3dpcGUsIHRoaXMuZWxlbWVudFJlZixcbiAgICAgICAgICAgICdwcmV2aWV3JywgKCkgPT4gdGhpcy5zaG93TmV4dCgpLCAoKSA9PiB0aGlzLnNob3dQcmV2KCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLmtleURvd25MaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5rZXlEb3duTGlzdGVuZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uS2V5RG93bihlKSB7XG4gICAgICAgIGlmICh0aGlzLmlzT3Blbikge1xuICAgICAgICAgICAgaWYgKHRoaXMua2V5Ym9hcmROYXZpZ2F0aW9uKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNLZXlib2FyZFByZXYoZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93UHJldigpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0tleWJvYXJkTmV4dChlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dOZXh0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuY2xvc2VPbkVzYyAmJiB0aGlzLmlzS2V5Ym9hcmRFc2MoZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvcGVuKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbk9wZW4uZW1pdCgpO1xuXG4gICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuICAgICAgICB0aGlzLnNob3codHJ1ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuZm9yY2VGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICB0aGlzLm1hbmFnZUZ1bGxzY3JlZW4oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMua2V5RG93bkxpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW5HbG9iYWwoXCJ3aW5kb3dcIiwgXCJrZXlkb3duXCIsIChlKSA9PiB0aGlzLm9uS2V5RG93bihlKSk7XG4gICAgfVxuXG4gICAgY2xvc2UoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2xvc2VGdWxsc2NyZWVuKCk7XG4gICAgICAgIHRoaXMub25DbG9zZS5lbWl0KCk7XG5cbiAgICAgICAgdGhpcy5zdG9wQXV0b1BsYXkoKTtcblxuICAgICAgICBpZiAodGhpcy5rZXlEb3duTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMua2V5RG93bkxpc3RlbmVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbWFnZU1vdXNlRW50ZXIoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmF1dG9QbGF5ICYmIHRoaXMuYXV0b1BsYXlQYXVzZU9uSG92ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcEF1dG9QbGF5KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbWFnZU1vdXNlTGVhdmUoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmF1dG9QbGF5ICYmIHRoaXMuYXV0b1BsYXlQYXVzZU9uSG92ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRBdXRvUGxheSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhcnRBdXRvUGxheSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuYXV0b1BsYXkpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcEF1dG9QbGF5KCk7XG5cbiAgICAgICAgICAgIHRoaXMudGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc2hvd05leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluZGV4ID0gLTE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd05leHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCB0aGlzLmF1dG9QbGF5SW50ZXJ2YWwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RvcEF1dG9QbGF5KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy50aW1lcikge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvd0F0SW5kZXgoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gICAgICAgIHRoaXMuc2hvdygpO1xuICAgIH1cblxuICAgIHNob3dOZXh0KCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5jYW5TaG93TmV4dCgpKSB7XG4gICAgICAgICAgICB0aGlzLmluZGV4Kys7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmluZGV4ID09PSB0aGlzLml0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5kZXggPSAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvd1ByZXYoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmNhblNob3dQcmV2KCkpIHtcbiAgICAgICAgICAgIHRoaXMuaW5kZXgtLTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleCA9IHRoaXMuaXRlbXMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjYW5TaG93TmV4dCgpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMubG9hZGluZykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXRlbXMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmluZmluaXR5TW92ZSB8fCB0aGlzLmluZGV4IDwgdGhpcy5pdGVtcy5sZW5ndGggLSAxID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FuU2hvd1ByZXYoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLmxvYWRpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLml0ZW1zKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbmZpbml0eU1vdmUgfHwgdGhpcy5pbmRleCA+IDAgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtYW5hZ2VGdWxsc2NyZWVuKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5mdWxsc2NyZWVuIHx8IHRoaXMuZm9yY2VGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICBjb25zdCBkb2MgPSA8YW55PmRvY3VtZW50O1xuXG4gICAgICAgICAgICBpZiAoIWRvYy5mdWxsc2NyZWVuRWxlbWVudCAmJiAhZG9jLm1vekZ1bGxTY3JlZW5FbGVtZW50XG4gICAgICAgICAgICAgICAgJiYgIWRvYy53ZWJraXRGdWxsc2NyZWVuRWxlbWVudCAmJiAhZG9jLm1zRnVsbHNjcmVlbkVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5GdWxsc2NyZWVuKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VGdWxsc2NyZWVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRTYWZlVXJsKGltYWdlOiBzdHJpbmcpOiBTYWZlVXJsIHtcbiAgICAgICAgcmV0dXJuIGltYWdlLnN1YnN0cigwLCAxMCkgPT09ICdkYXRhOmltYWdlJyA/XG4gICAgICAgICAgICBpbWFnZSA6IHRoaXMuc2FuaXRpemF0aW9uLmJ5cGFzc1NlY3VyaXR5VHJ1c3RVcmwoaW1hZ2UpO1xuICAgIH1cblxuICAgIHpvb21JbigpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuY2FuWm9vbUluKCkpIHtcbiAgICAgICAgICAgIHRoaXMuem9vbVZhbHVlICs9IHRoaXMuem9vbVN0ZXA7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnpvb21WYWx1ZSA+IHRoaXMuem9vbU1heCkge1xuICAgICAgICAgICAgICAgIHRoaXMuem9vbVZhbHVlID0gdGhpcy56b29tTWF4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgem9vbU91dCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuY2FuWm9vbU91dCgpKSB7XG4gICAgICAgICAgICB0aGlzLnpvb21WYWx1ZSAtPSB0aGlzLnpvb21TdGVwO1xuXG4gICAgICAgICAgICBpZiAodGhpcy56b29tVmFsdWUgPCB0aGlzLnpvb21NaW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnpvb21WYWx1ZSA9IHRoaXMuem9vbU1pbjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuem9vbVZhbHVlIDw9IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0UG9zaXRpb24oKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcm90YXRlTGVmdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yb3RhdGVWYWx1ZSAtPSA5MDtcbiAgICB9XG5cbiAgICByb3RhdGVSaWdodCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yb3RhdGVWYWx1ZSArPSA5MDtcbiAgICB9XG5cbiAgICBnZXRUcmFuc2Zvcm0oKTogU2FmZVN0eWxlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2FuaXRpemF0aW9uLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZSgnc2NhbGUoJyArIHRoaXMuem9vbVZhbHVlICsgJykgcm90YXRlKCcgKyB0aGlzLnJvdGF0ZVZhbHVlICsgJ2RlZyknKTtcbiAgICB9XG5cbiAgICBjYW5ab29tSW4oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnpvb21WYWx1ZSA8IHRoaXMuem9vbU1heCA/IHRydWUgOiBmYWxzZTtcbiAgICB9XG5cbiAgICBjYW5ab29tT3V0KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy56b29tVmFsdWUgPiB0aGlzLnpvb21NaW4gPyB0cnVlIDogZmFsc2U7XG4gICAgfVxuXG4gICAgY2FuRHJhZ09uWm9vbSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuem9vbSAmJiB0aGlzLnpvb21WYWx1ZSA+IDE7XG4gICAgfVxuXG4gICAgbW91c2VEb3duSGFuZGxlcihlKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmNhbkRyYWdPblpvb20oKSkge1xuICAgICAgICAgICAgdGhpcy5pbml0aWFsWCA9IHRoaXMuZ2V0Q2xpZW50WChlKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbFkgPSB0aGlzLmdldENsaWVudFkoZSk7XG4gICAgICAgICAgICB0aGlzLmluaXRpYWxMZWZ0ID0gdGhpcy5wb3NpdGlvbkxlZnQ7XG4gICAgICAgICAgICB0aGlzLmluaXRpYWxUb3AgPSB0aGlzLnBvc2l0aW9uVG9wO1xuICAgICAgICAgICAgdGhpcy5pc01vdmUgPSB0cnVlO1xuXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb3VzZVVwSGFuZGxlcihlKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaXNNb3ZlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgbW91c2VNb3ZlSGFuZGxlcihlKSB7XG4gICAgICAgIGlmICh0aGlzLmlzTW92ZSkge1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbkxlZnQgPSB0aGlzLmluaXRpYWxMZWZ0ICsgKHRoaXMuZ2V0Q2xpZW50WChlKSAtIHRoaXMuaW5pdGlhbFgpO1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvblRvcCA9IHRoaXMuaW5pdGlhbFRvcCArICh0aGlzLmdldENsaWVudFkoZSkgLSB0aGlzLmluaXRpYWxZKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Q2xpZW50WChlKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIGUudG91Y2hlcyAmJiBlLnRvdWNoZXMubGVuZ3RoID8gZS50b3VjaGVzWzBdLmNsaWVudFggOiBlLmNsaWVudFg7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRDbGllbnRZKGUpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gZS50b3VjaGVzICYmIGUudG91Y2hlcy5sZW5ndGggPyBlLnRvdWNoZXNbMF0uY2xpZW50WSA6IGUuY2xpZW50WTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc2V0UG9zaXRpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLnpvb20pIHtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb25MZWZ0ID0gMDtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb25Ub3AgPSAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc0tleWJvYXJkTmV4dChlKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBlLmtleUNvZGUgPT09IDM5ID8gdHJ1ZSA6IGZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNLZXlib2FyZFByZXYoZSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZS5rZXlDb2RlID09PSAzNyA/IHRydWUgOiBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzS2V5Ym9hcmRFc2MoZSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZS5rZXlDb2RlID09PSAyNyA/IHRydWUgOiBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9wZW5GdWxsc2NyZWVuKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gPGFueT5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cbiAgICAgICAgaWYgKGVsZW1lbnQucmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgIGVsZW1lbnQucmVxdWVzdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgfSBlbHNlIGlmIChlbGVtZW50Lm1zUmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgIGVsZW1lbnQubXNSZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgICAgICB9IGVsc2UgaWYgKGVsZW1lbnQubW96UmVxdWVzdEZ1bGxTY3JlZW4pIHtcbiAgICAgICAgICAgIGVsZW1lbnQubW96UmVxdWVzdEZ1bGxTY3JlZW4oKTtcbiAgICAgICAgfSBlbHNlIGlmIChlbGVtZW50LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICBlbGVtZW50LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNsb3NlRnVsbHNjcmVlbigpOiB2b2lkIHtcblxuICAgICAgICBjb25zdCBkb2MgPSA8YW55PmRvY3VtZW50O1xuICAgICAgICBpZiAoZG9jLmZ1bGxzY3JlZW5FbGVtZW50KSB7XG4gICAgICAgICAgICBkb2MuZXhpdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgfSBlbHNlIGlmIChkb2MubXNGdWxsc2NyZWVuRWxlbWVudCkge1xuICAgICAgICAgICAgZG9jLm1zRXhpdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgfSBlbHNlIGlmIChkb2MubW96Q2FuY2VsRnVsbFNjcmVlbikge1xuICAgICAgICAgICAgZG9jLm1vekZ1bGxTY3JlZW5FbGVtZW50KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZG9jLndlYmtpdEZ1bGxzY3JlZW5FbGVtZW50KSB7XG4gICAgICAgICAgICBkb2Mud2Via2l0RXhpdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc2hvdyhmaXJzdCA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuc3RvcEF1dG9QbGF5KCk7XG5cbiAgICAgICAgdGhpcy5vbkFjdGl2ZUNoYW5nZS5lbWl0KHRoaXMuaW5kZXgpO1xuXG4gICAgICAgIGlmIChmaXJzdCB8fCAhdGhpcy5hbmltYXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuX3Nob3coKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5fc2hvdygpLCA2MDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2hvdygpIHtcbiAgICAgICAgdGhpcy56b29tVmFsdWUgPSAxO1xuICAgICAgICB0aGlzLnJvdGF0ZVZhbHVlID0gMDtcbiAgICAgICAgdGhpcy5yZXNldFBvc2l0aW9uKCk7XG4gICAgICAgIHRoaXMuc3JjID0gdGhpcy5pdGVtc1t0aGlzLmluZGV4XS50eXBlID09PSAnaW1hZ2UnID8gdGhpcy5nZXRTYWZlVXJsKDxzdHJpbmc+dGhpcy5pdGVtc1t0aGlzLmluZGV4XS51cmwpIDogdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLml0ZW0gPSB0aGlzLml0ZW1zW3RoaXMuaW5kZXhdO1xuICAgICAgICB0aGlzLnNyY0luZGV4ID0gdGhpcy5pbmRleDtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IHRoaXMuZGVzY3JpcHRpb25zW3RoaXMuaW5kZXhdO1xuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXRlbXNbdGhpcy5pbmRleF0udHlwZSA9PT0gJ3ZpZGVvJykge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlT25WaWRlbygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU9uSW1hZ2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzSW1nTG9hZGVkKGltZyk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoIWltZy5jb21wbGV0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBpbWcubmF0dXJhbFdpZHRoICE9PSAndW5kZWZpbmVkJyAmJiBpbWcubmF0dXJhbFdpZHRoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZU9uSW1hZ2UoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzSW1nTG9hZGVkKHRoaXMucHJldmlld0ltYWdlLm5hdGl2ZUVsZW1lbnQpKSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRBdXRvUGxheSgpO1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxvYWRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93U3Bpbm5lciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMucHJldmlld0ltYWdlLm5hdGl2ZUVsZW1lbnQub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NwaW5uZXIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnByZXZpZXdJbWFnZS5uYXRpdmVFbGVtZW50Lm9ubG9hZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydEF1dG9QbGF5KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZU9uVmlkZW8oKSB7XG4gICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgIH1cbn1cbiJdfQ==