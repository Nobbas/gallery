import { ChangeDetectorRef, Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ElementRef, HostListener, ViewChild, Renderer } from '@angular/core';
import { SafeResourceUrl, DomSanitizer, SafeUrl, SafeStyle } from '@angular/platform-browser';

import { NbGalleryAction } from '../models/nb-gallery-action.model';
import { NbGalleryHelperService } from '../nb-gallery-helper.service';
import { NbGalleryOrderedItem } from '../models/nb-gallery-ordered-item.model';

@Component({
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
    styleUrls: ['./nb-gallery-preview.component.scss']
})
export class NbGalleryPreviewComponent implements OnChanges {

    src: SafeUrl;
    srcIndex: number;
    description: string;
    item: NbGalleryOrderedItem;
    showSpinner = false;
    positionLeft = 0;
    positionTop = 0;
    zoomValue = 1;
    loading = false;
    rotateValue = 0;
    index = 0;

    @Input() items: NbGalleryOrderedItem[];
    @Input() descriptions: string[];
    @Input() showDescription: boolean;
    @Input() swipe: boolean;
    @Input() fullscreen: boolean;
    @Input() forceFullscreen: boolean;
    @Input() closeOnClick: boolean;
    @Input() closeOnEsc: boolean;
    @Input() keyboardNavigation: boolean;
    @Input() arrowPrevIcon: string;
    @Input() arrowNextIcon: string;
    @Input() closeIcon: string;
    @Input() fullscreenIcon: string;
    @Input() spinnerIcon: string;
    @Input() autoPlay: boolean;
    @Input() autoPlayInterval: number;
    @Input() autoPlayPauseOnHover: boolean;
    @Input() infinityMove: boolean;
    @Input() zoom: boolean;
    @Input() zoomStep: number;
    @Input() zoomMax: number;
    @Input() zoomMin: number;
    @Input() zoomInIcon: string;
    @Input() zoomOutIcon: string;
    @Input() animation: boolean;
    @Input() actions: NbGalleryAction[];
    @Input() rotate: boolean;
    @Input() rotateLeftIcon: string;
    @Input() rotateRightIcon: string;
    @Input() download: boolean;
    @Input() downloadIcon: string;
    @Input() bullets: string;

    @Output() onOpen = new EventEmitter();
    @Output() onClose = new EventEmitter();
    @Output() onActiveChange = new EventEmitter<number>();

    @ViewChild('previewImage') previewImage: ElementRef;
    // @ViewChild('previewVideo') previewVideo: ElementRef;

    private isOpen = false;
    private timer;
    private initialX = 0;
    private initialY = 0;
    private initialLeft = 0;
    private initialTop = 0;
    private isMove = false;

    private keyDownListener: Function;

    constructor(private sanitization: DomSanitizer, private elementRef: ElementRef,
        private helperService: NbGalleryHelperService, private renderer: Renderer,
        private changeDetectorRef: ChangeDetectorRef) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['swipe']) {
            this.helperService.manageSwipe(this.swipe, this.elementRef,
            'preview', () => this.showNext(), () => this.showPrev());
        }
    }

    ngOnDestroy() {
        if (this.keyDownListener) {
            this.keyDownListener();
        }
    }

    onKeyDown(e) {
        if (this.isOpen) {
            if (this.keyboardNavigation) {
                if (this.isKeyboardPrev(e)) {
                    this.showPrev();
                } else if (this.isKeyboardNext(e)) {
                    this.showNext();
                }
            }
            if (this.closeOnEsc && this.isKeyboardEsc(e)) {
                this.close();
            }
        }
    }

    open(index: number): void {
        this.onOpen.emit();

        this.index = index;
        this.isOpen = true;
        this.show(true);

        if (this.forceFullscreen) {
            this.manageFullscreen();
        }

        this.keyDownListener = this.renderer.listenGlobal("window", "keydown", (e) => this.onKeyDown(e));
    }

    close(): void {
        this.isOpen = false;
        this.closeFullscreen();
        this.onClose.emit();

        this.stopAutoPlay();

        if (this.keyDownListener) {
            this.keyDownListener();
        }
    }

    imageMouseEnter(): void {
        if (this.autoPlay && this.autoPlayPauseOnHover) {
            this.stopAutoPlay();
        }
    }

    imageMouseLeave(): void {
        if (this.autoPlay && this.autoPlayPauseOnHover) {
            this.startAutoPlay();
        }
    }

    startAutoPlay(): void {
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

    stopAutoPlay(): void {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }

    showAtIndex(index: number): void {
        this.index = index;
        this.show();
    }

    showNext(): boolean {
        if (this.canShowNext()) {
            this.index++;

            if (this.index === this.items.length) {
                this.index = 0;
            }

            this.show();
            return true;
        } else {
            return false;
        }
    }

    showPrev(): void {
        if (this.canShowPrev()) {
            this.index--;

            if (this.index < 0) {
                this.index = this.items.length - 1;
            }

            this.show();
        }
    }

    canShowNext(): boolean {
        if (this.loading) {
            return false;
        } else if (this.items) {
            return this.infinityMove || this.index < this.items.length - 1 ? true : false;
        } else {
            return false;
        }
    }

    canShowPrev(): boolean {
        if (this.loading) {
            return false;
        } else if (this.items) {
            return this.infinityMove || this.index > 0 ? true : false;
        } else {
            return false;
        }
    }

    manageFullscreen(): void {
        if (this.fullscreen || this.forceFullscreen) {
            const doc = <any>document;

            if (!doc.fullscreenElement && !doc.mozFullScreenElement
                && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
                this.openFullscreen();
            } else {
                this.closeFullscreen();
            }
        }
    }

    getSafeUrl(image: string): SafeUrl {
        return image.substr(0, 10) === 'data:image' ?
            image : this.sanitization.bypassSecurityTrustUrl(image);
    }

    zoomIn(): void {
        if (this.canZoomIn()) {
            this.zoomValue += this.zoomStep;

            if (this.zoomValue > this.zoomMax) {
                this.zoomValue = this.zoomMax;
            }
        }
    }

    zoomOut(): void {
        if (this.canZoomOut()) {
            this.zoomValue -= this.zoomStep;

            if (this.zoomValue < this.zoomMin) {
                this.zoomValue = this.zoomMin;
            }

            if (this.zoomValue <= 1) {
                this.resetPosition()
            }
        }
    }

    rotateLeft(): void {
        this.rotateValue -= 90;
    }

    rotateRight(): void {
        this.rotateValue += 90;
    }

    getTransform(): SafeStyle {
        return this.sanitization.bypassSecurityTrustStyle('scale(' + this.zoomValue + ') rotate(' + this.rotateValue + 'deg)');
    }

    canZoomIn(): boolean {
        return this.zoomValue < this.zoomMax ? true : false;
    }

    canZoomOut(): boolean {
        return this.zoomValue > this.zoomMin ? true : false;
    }

    canDragOnZoom() {
        return this.zoom && this.zoomValue > 1;
    }

    mouseDownHandler(e): void {
        if (this.canDragOnZoom()) {
            this.initialX = this.getClientX(e);
            this.initialY = this.getClientY(e);
            this.initialLeft = this.positionLeft;
            this.initialTop = this.positionTop;
            this.isMove = true;

            e.preventDefault();
        }
    }

    mouseUpHandler(e): void {
        this.isMove = false;
    }

    mouseMoveHandler(e) {
        if (this.isMove) {
            this.positionLeft = this.initialLeft + (this.getClientX(e) - this.initialX);
            this.positionTop = this.initialTop + (this.getClientY(e) - this.initialY);
        }
    }

    private getClientX(e): number {
        return e.touches && e.touches.length ? e.touches[0].clientX : e.clientX;
    }

    private getClientY(e): number {
        return e.touches && e.touches.length ? e.touches[0].clientY : e.clientY;
    }

    private resetPosition() {
        if (this.zoom) {
            this.positionLeft = 0;
            this.positionTop = 0;
        }
    }

    private isKeyboardNext(e): boolean {
        return e.keyCode === 39 ? true : false;
    }

    private isKeyboardPrev(e): boolean {
        return e.keyCode === 37 ? true : false;
    }

    private isKeyboardEsc(e): boolean {
        return e.keyCode === 27 ? true : false;
    }

    private openFullscreen(): void {
        const element = <any>document.documentElement;

        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        }
    }

    private closeFullscreen(): void {

        const doc = <any>document;
        if (doc.fullscreenElement) {
            doc.exitFullscreen();
        } else if (doc.msFullscreenElement) {
            doc.msExitFullscreen();
        } else if (doc.mozCancelFullScreen) {
            doc.mozFullScreenElement();
        } else if (doc.webkitFullscreenElement) {
            doc.webkitExitFullscreen();
        }
    }

    private show(first = false) {
        this.loading = true;
        this.stopAutoPlay();

        this.onActiveChange.emit(this.index);

        if (first || !this.animation) {
            this._show();
        } else {
            setTimeout(() => this._show(), 600);
        }
    }

    private _show() {
        this.zoomValue = 1;
        this.rotateValue = 0;
        this.resetPosition();
        this.src = this.items[this.index].type === 'image' ? this.getSafeUrl(<string>this.items[this.index].url) : undefined;
        this.item = this.items[this.index];
        this.srcIndex = this.index;
        this.description = this.descriptions[this.index];
        this.changeDetectorRef.markForCheck();

        setTimeout(() => {
            if (this.items[this.index].type === 'video') {
                this.updateOnVideo();
            } else {
                this.updateOnImage();
            }
        })
    }

    private isImgLoaded(img): boolean {
        if (!img.complete) {
            return false;
        }

        if (typeof img.naturalWidth !== 'undefined' && img.naturalWidth === 0) {
            return false;
        }

        return true;
    }

    private updateOnImage() {
        if (this.isImgLoaded(this.previewImage.nativeElement)) {
            this.loading = false;
            this.startAutoPlay();
            this.changeDetectorRef.markForCheck();
        } else {
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

    private updateOnVideo() {
        this.loading = false;
    }
}
