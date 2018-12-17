/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, HostListener, ViewChild, HostBinding, ElementRef, Output, EventEmitter } from '@angular/core';
import { NbGalleryPreviewComponent } from './nb-gallery-preview/nb-gallery-preview.component';
import { NbGalleryItemComponent } from './nb-gallery-item/nb-gallery-item.component';
import { NbGalleryThumbnailsComponent } from './nb-gallery-thumbnails/nb-gallery-thumbnails.component';
import { NbGalleryHelperService } from './nb-gallery-helper.service';
import { NbGalleryOptions } from './models/nb-gallery-options.model';
import { NbGalleryThumbnail } from './models/nb-gallery-thumbnail.model';
import { NbGalleryLayout } from './models/nb-gallery-layout.model';
import { NbGalleryOrderedItem } from './models/nb-gallery-ordered-item.model';
export class NbGalleryComponent {
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
if (false) {
    /** @type {?} */
    NbGalleryComponent.prototype.options;
    /** @type {?} */
    NbGalleryComponent.prototype.items;
    /** @type {?} */
    NbGalleryComponent.prototype.itemsReady;
    /** @type {?} */
    NbGalleryComponent.prototype.change;
    /** @type {?} */
    NbGalleryComponent.prototype.previewOpen;
    /** @type {?} */
    NbGalleryComponent.prototype.previewClose;
    /** @type {?} */
    NbGalleryComponent.prototype.previewChange;
    /** @type {?} */
    NbGalleryComponent.prototype.thumbnails;
    /** @type {?} */
    NbGalleryComponent.prototype.galleryItems;
    /** @type {?} */
    NbGalleryComponent.prototype.previewItems;
    /** @type {?} */
    NbGalleryComponent.prototype.descriptions;
    /** @type {?} */
    NbGalleryComponent.prototype.links;
    /** @type {?} */
    NbGalleryComponent.prototype.labels;
    /** @type {?} */
    NbGalleryComponent.prototype.oldItems;
    /** @type {?} */
    NbGalleryComponent.prototype.oldItemsLength;
    /** @type {?} */
    NbGalleryComponent.prototype.selectedIndex;
    /** @type {?} */
    NbGalleryComponent.prototype.previewEnabled;
    /** @type {?} */
    NbGalleryComponent.prototype.currentOptions;
    /** @type {?} */
    NbGalleryComponent.prototype.breakpoint;
    /** @type {?} */
    NbGalleryComponent.prototype.prevBreakpoint;
    /** @type {?} */
    NbGalleryComponent.prototype.fullWidthTimeout;
    /** @type {?} */
    NbGalleryComponent.prototype.preview;
    /** @type {?} */
    NbGalleryComponent.prototype.item;
    /** @type {?} */
    NbGalleryComponent.prototype.thumbnail;
    /** @type {?} */
    NbGalleryComponent.prototype.width;
    /** @type {?} */
    NbGalleryComponent.prototype.height;
    /** @type {?} */
    NbGalleryComponent.prototype.left;
    /** @type {?} */
    NbGalleryComponent.prototype.myElement;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmItZ2FsbGVyeS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uYi1nYWxsZXJ5LyIsInNvdXJjZXMiOlsibGliL25iLWdhbGxlcnkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUNoRCxXQUFXLEVBQVcsVUFBVSxFQUFpQixNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRy9GLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBQzlGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3JGLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLHlEQUF5RCxDQUFDO0FBQ3ZHLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBR3JFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNuRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQWU5RSxNQUFNOzs7O0lBcUNKLFlBQW9CLFNBQXFCO1FBQXJCLGNBQVMsR0FBVCxTQUFTLENBQVk7MEJBakNsQixJQUFJLFlBQVksRUFBRTtzQkFDdEIsSUFBSSxZQUFZLEVBQTJDOzJCQUN0RCxJQUFJLFlBQVksRUFBRTs0QkFDakIsSUFBSSxZQUFZLEVBQUU7NkJBQ2pCLElBQUksWUFBWSxFQUEyQzs4QkFVcEUsQ0FBQzs2QkFFRixDQUFDOzBCQUt3QixTQUFTOzhCQUNMLFNBQVM7S0FXVDs7OztJQUU3QyxRQUFRO1FBQ0osSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdB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b250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIEhvc3RMaXN0ZW5lciwgVmlld0NoaWxkLCBPbkluaXQsXG4gIEhvc3RCaW5kaW5nLCBEb0NoZWNrLCBFbGVtZW50UmVmLCBBZnRlclZpZXdJbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2FmZVJlc291cmNlVXJsIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmltcG9ydCB7IE5iR2FsbGVyeVByZXZpZXdDb21wb25lbnQgfSBmcm9tICcuL25iLWdhbGxlcnktcHJldmlldy9uYi1nYWxsZXJ5LXByZXZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IE5iR2FsbGVyeUl0ZW1Db21wb25lbnQgfSBmcm9tICcuL25iLWdhbGxlcnktaXRlbS9uYi1nYWxsZXJ5LWl0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IE5iR2FsbGVyeVRodW1ibmFpbHNDb21wb25lbnQgfSBmcm9tICcuL25iLWdhbGxlcnktdGh1bWJuYWlscy9uYi1nYWxsZXJ5LXRodW1ibmFpbHMuY29tcG9uZW50JztcbmltcG9ydCB7IE5iR2FsbGVyeUhlbHBlclNlcnZpY2UgfSBmcm9tICcuL25iLWdhbGxlcnktaGVscGVyLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBOYkdhbGxlcnlJdGVtIH0gZnJvbSAnLi9tb2RlbHMvbmItZ2FsbGVyeS1pdGVtLm1vZGVsJztcbmltcG9ydCB7IE5iR2FsbGVyeU9wdGlvbnMgfSBmcm9tICcuL21vZGVscy9uYi1nYWxsZXJ5LW9wdGlvbnMubW9kZWwnO1xuaW1wb3J0IHsgTmJHYWxsZXJ5VGh1bWJuYWlsIH0gZnJvbSAnLi9tb2RlbHMvbmItZ2FsbGVyeS10aHVtYm5haWwubW9kZWwnO1xuaW1wb3J0IHsgTmJHYWxsZXJ5TGF5b3V0IH0gZnJvbSAnLi9tb2RlbHMvbmItZ2FsbGVyeS1sYXlvdXQubW9kZWwnO1xuaW1wb3J0IHsgTmJHYWxsZXJ5T3JkZXJlZEl0ZW0gfSBmcm9tICcuL21vZGVscy9uYi1nYWxsZXJ5LW9yZGVyZWQtaXRlbS5tb2RlbCc7XG5pbXBvcnQgeyBOYkdhbGxlcnlQcmV2aWV3IH0gZnJvbSAnLi9tb2RlbHMvbmItZ2FsbGVyeS1wcmV2aWV3Lm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmItZ2FsbGVyeScsXG4gIHRlbXBsYXRlOiBgXG4gIDxkaXYgY2xhc3M9XCJuYi1nYWxsZXJ5LWxheW91dCB7e2N1cnJlbnRPcHRpb25zPy5sYXlvdXR9fVwiPlxuICAgICAgPG5iLWdhbGxlcnktaXRlbSAgKm5nSWY9XCJjdXJyZW50T3B0aW9ucz8uaXRlbVwiIFtzdHlsZS5oZWlnaHRdPVwiZ2V0SXRlbUhlaWdodCgpXCIgW2l0ZW1zXT1cImdhbGxlcnlJdGVtc1wiIFtjbGlja2FibGVdPVwiY3VycmVudE9wdGlvbnM/LnByZXZpZXdcIiBbc2VsZWN0ZWRJbmRleF09XCJzZWxlY3RlZEluZGV4XCIgW2Fycm93c109XCJjdXJyZW50T3B0aW9ucz8uaXRlbUFycm93c1wiIFthcnJvd3NBdXRvSGlkZV09XCJjdXJyZW50T3B0aW9ucz8uaXRlbUFycm93c0F1dG9IaWRlXCIgW2Fycm93UHJldkljb25dPVwiY3VycmVudE9wdGlvbnM/LmFycm93UHJldkljb25cIiBbYXJyb3dOZXh0SWNvbl09XCJjdXJyZW50T3B0aW9ucz8uYXJyb3dOZXh0SWNvblwiIFtzd2lwZV09XCJjdXJyZW50T3B0aW9ucz8uaXRlbVN3aXBlXCIgW2FuaW1hdGlvbl09XCJjdXJyZW50T3B0aW9ucz8uaXRlbUFuaW1hdGlvblwiIFtzaXplXT1cImN1cnJlbnRPcHRpb25zPy5pdGVtU2l6ZVwiIFthdXRvUGxheV09XCJjdXJyZW50T3B0aW9ucz8uaXRlbUF1dG9QbGF5XCIgW2F1dG9QbGF5SW50ZXJ2YWxdPVwiY3VycmVudE9wdGlvbnM/Lml0ZW1BdXRvUGxheUludGVydmFsXCIgW2F1dG9QbGF5UGF1c2VPbkhvdmVyXT1cImN1cnJlbnRPcHRpb25zPy5pdGVtQXV0b1BsYXlQYXVzZU9uSG92ZXJcIiBbaW5maW5pdHlNb3ZlXT1cImN1cnJlbnRPcHRpb25zPy5pdGVtSW5maW5pdHlNb3ZlXCIgIFtsYXp5TG9hZGluZ109XCJjdXJyZW50T3B0aW9ucz8ubGF6eUxvYWRpbmdcIiBbYWN0aW9uc109XCJjdXJyZW50T3B0aW9ucz8uaXRlbUFjdGlvbnNcIiBbZGVzY3JpcHRpb25zXT1cImRlc2NyaXB0aW9uc1wiIFtzaG93RGVzY3JpcHRpb25dPVwiY3VycmVudE9wdGlvbnM/Lml0ZW1EZXNjcmlwdGlvblwiIFtidWxsZXRzXT1cImN1cnJlbnRPcHRpb25zPy5pdGVtQnVsbGV0c1wiIChvbkNsaWNrKT1cIm9wZW5QcmV2aWV3KCRldmVudClcIiAob25BY3RpdmVDaGFuZ2UpPVwic2VsZWN0RnJvbUl0ZW0oJGV2ZW50KVwiPjwvbmItZ2FsbGVyeS1pdGVtPlxuICAgICAgPG5iLWdhbGxlcnktdGh1bWJuYWlscyAqbmdJZj1cImN1cnJlbnRPcHRpb25zPy50aHVtYm5haWxzXCIgW3N0eWxlLm1hcmdpblRvcF09XCJnZXRUaHVtYm5haWxzTWFyZ2luVG9wKClcIiBbc3R5bGUubWFyZ2luQm90dG9tXT1cImdldFRodW1ibmFpbHNNYXJnaW5Cb3R0b20oKVwiIFtzdHlsZS5oZWlnaHRdPVwiZ2V0VGh1bWJuYWlsc0hlaWdodCgpXCIgW2l0ZW1zXT1cInRodW1ibmFpbHNcIiBbbGlua3NdPVwiY3VycmVudE9wdGlvbnM/LnRodW1ibmFpbHNBc0xpbmtzID8gbGlua3MgOiBbXVwiIFtsYWJlbHNdPVwibGFiZWxzXCIgW2xpbmtUYXJnZXRdPVwiY3VycmVudE9wdGlvbnM/LmxpbmtUYXJnZXRcIiBbc2VsZWN0ZWRJbmRleF09XCJzZWxlY3RlZEluZGV4XCIgW2NvbHVtbnNdPVwiY3VycmVudE9wdGlvbnM/LnRodW1ibmFpbHNDb2x1bW5zXCIgW3Jvd3NdPVwiY3VycmVudE9wdGlvbnM/LnRodW1ibmFpbHNSb3dzXCIgW21hcmdpbl09XCJjdXJyZW50T3B0aW9ucz8udGh1bWJuYWlsTWFyZ2luXCIgW2Fycm93c109XCJjdXJyZW50T3B0aW9ucz8udGh1bWJuYWlsc0Fycm93c1wiIFthcnJvd3NBdXRvSGlkZV09XCJjdXJyZW50T3B0aW9ucz8udGh1bWJuYWlsc0Fycm93c0F1dG9IaWRlXCIgW2Fycm93UHJldkljb25dPVwiY3VycmVudE9wdGlvbnM/LmFycm93UHJldkljb25cIiBbYXJyb3dOZXh0SWNvbl09XCJjdXJyZW50T3B0aW9ucz8uYXJyb3dOZXh0SWNvblwiIFtjbGlja2FibGVdPVwiY3VycmVudE9wdGlvbnM/Lml0ZW0gfHwgY3VycmVudE9wdGlvbnM/LnByZXZpZXdcIiBbc3dpcGVdPVwiY3VycmVudE9wdGlvbnM/LnRodW1ibmFpbHNTd2lwZVwiIFtzaXplXT1cImN1cnJlbnRPcHRpb25zPy50aHVtYm5haWxTaXplXCIgW21vdmVTaXplXT1cImN1cnJlbnRPcHRpb25zPy50aHVtYm5haWxzTW92ZVNpemVcIiBbb3JkZXJdPVwiY3VycmVudE9wdGlvbnM/LnRodW1ibmFpbHNPcmRlclwiIFtyZW1haW5pbmdDb3VudF09XCJjdXJyZW50T3B0aW9ucz8udGh1bWJuYWlsc1JlbWFpbmluZ0NvdW50XCIgW2xhenlMb2FkaW5nXT1cImN1cnJlbnRPcHRpb25zPy5sYXp5TG9hZGluZ1wiIFthY3Rpb25zXT1cImN1cnJlbnRPcHRpb25zPy50aHVtYm5haWxBY3Rpb25zXCIgIChvbkFjdGl2ZUNoYW5nZSk9XCJzZWxlY3RGcm9tVGh1bWJuYWlscygkZXZlbnQpXCI+PC9uYi1nYWxsZXJ5LXRodW1ibmFpbHM+XG4gICAgICA8bmItZ2FsbGVyeS1wcmV2aWV3IFtpdGVtc109XCJwcmV2aWV3SXRlbXNcIiBbZGVzY3JpcHRpb25zXT1cImRlc2NyaXB0aW9uc1wiIFtzaG93RGVzY3JpcHRpb25dPVwiY3VycmVudE9wdGlvbnM/LnByZXZpZXdEZXNjcmlwdGlvblwiIFthcnJvd1ByZXZJY29uXT1cImN1cnJlbnRPcHRpb25zPy5hcnJvd1ByZXZJY29uXCIgW2Fycm93TmV4dEljb25dPVwiY3VycmVudE9wdGlvbnM/LmFycm93TmV4dEljb25cIiBbY2xvc2VJY29uXT1cImN1cnJlbnRPcHRpb25zPy5jbG9zZUljb25cIiBbZnVsbHNjcmVlbkljb25dPVwiY3VycmVudE9wdGlvbnM/LmZ1bGxzY3JlZW5JY29uXCIgW3NwaW5uZXJJY29uXT1cImN1cnJlbnRPcHRpb25zPy5zcGlubmVySWNvblwiIFtzd2lwZV09XCJjdXJyZW50T3B0aW9ucz8ucHJldmlld1N3aXBlXCIgW2Z1bGxzY3JlZW5dPVwiY3VycmVudE9wdGlvbnM/LnByZXZpZXdGdWxsc2NyZWVuXCIgW2ZvcmNlRnVsbHNjcmVlbl09XCJjdXJyZW50T3B0aW9ucz8ucHJldmlld0ZvcmNlRnVsbHNjcmVlblwiIFtjbG9zZU9uQ2xpY2tdPVwiY3VycmVudE9wdGlvbnM/LnByZXZpZXdDbG9zZU9uQ2xpY2tcIiBbY2xvc2VPbkVzY109XCJjdXJyZW50T3B0aW9ucz8ucHJldmlld0Nsb3NlT25Fc2NcIiBba2V5Ym9hcmROYXZpZ2F0aW9uXT1cImN1cnJlbnRPcHRpb25zPy5wcmV2aWV3S2V5Ym9hcmROYXZpZ2F0aW9uXCIgW2FuaW1hdGlvbl09XCJjdXJyZW50T3B0aW9ucz8ucHJldmlld0FuaW1hdGlvblwiIFthdXRvUGxheV09XCJjdXJyZW50T3B0aW9ucz8ucHJldmlld0F1dG9QbGF5XCIgW2F1dG9QbGF5SW50ZXJ2YWxdPVwiY3VycmVudE9wdGlvbnM/LnByZXZpZXdBdXRvUGxheUludGVydmFsXCIgW2F1dG9QbGF5UGF1c2VPbkhvdmVyXT1cImN1cnJlbnRPcHRpb25zPy5wcmV2aWV3QXV0b1BsYXlQYXVzZU9uSG92ZXJcIiBbaW5maW5pdHlNb3ZlXT1cImN1cnJlbnRPcHRpb25zPy5wcmV2aWV3SW5maW5pdHlNb3ZlXCIgW3pvb21dPVwiY3VycmVudE9wdGlvbnM/LnByZXZpZXdab29tXCIgW3pvb21TdGVwXT1cImN1cnJlbnRPcHRpb25zPy5wcmV2aWV3Wm9vbVN0ZXBcIiBbem9vbU1heF09XCJjdXJyZW50T3B0aW9ucz8ucHJldmlld1pvb21NYXhcIiBbem9vbU1pbl09XCJjdXJyZW50T3B0aW9ucz8ucHJldmlld1pvb21NaW5cIiBbem9vbUluSWNvbl09XCJjdXJyZW50T3B0aW9ucz8uem9vbUluSWNvblwiIFt6b29tT3V0SWNvbl09XCJjdXJyZW50T3B0aW9ucz8uem9vbU91dEljb25cIiBbYWN0aW9uc109XCJjdXJyZW50T3B0aW9ucz8uYWN0aW9uc1wiIFtyb3RhdGVdPVwiY3VycmVudE9wdGlvbnM/LnByZXZpZXdSb3RhdGVcIiBbcm90YXRlTGVmdEljb25dPVwiY3VycmVudE9wdGlvbnM/LnJvdGF0ZUxlZnRJY29uXCIgW3JvdGF0ZVJpZ2h0SWNvbl09XCJjdXJyZW50T3B0aW9ucz8ucm90YXRlUmlnaHRJY29uXCIgW2Rvd25sb2FkXT1cImN1cnJlbnRPcHRpb25zPy5wcmV2aWV3RG93bmxvYWRcIiBbZG93bmxvYWRJY29uXT1cImN1cnJlbnRPcHRpb25zPy5kb3dubG9hZEljb25cIiBbYnVsbGV0c109XCJjdXJyZW50T3B0aW9ucz8ucHJldmlld0J1bGxldHNcIiAob25DbG9zZSk9XCJvblByZXZpZXdDbG9zZSgpXCIgKG9uT3Blbik9XCJvblByZXZpZXdPcGVuKClcIiAob25BY3RpdmVDaGFuZ2UpPVwicHJldmlld1NlbGVjdCgkZXZlbnQpXCIgW2NsYXNzLm5iLWdhbGxlcnktYWN0aXZlXT1cInByZXZpZXdFbmFibGVkXCI+PC9uYi1nYWxsZXJ5LXByZXZpZXc+XG4gIDwvZGl2PlxuICBgLFxuICBzdHlsZVVybHM6IFsnLi9uYi1nYWxsZXJ5LmNvbXBvbmVudC5zY3NzJ10sXG4gIHByb3ZpZGVyczogW05iR2FsbGVyeUhlbHBlclNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIE5iR2FsbGVyeUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgRG9DaGVjaywgQWZ0ZXJWaWV3SW5pdCAgIHtcbiAgQElucHV0KCkgb3B0aW9uczogTmJHYWxsZXJ5T3B0aW9uc1tdO1xuICBASW5wdXQoKSBpdGVtczogTmJHYWxsZXJ5SXRlbVtdO1xuXG4gIEBPdXRwdXQoKSBpdGVtc1JlYWR5ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjx7IGluZGV4OiBudW1iZXI7IGl0ZW06IE5iR2FsbGVyeUl0ZW07IH0+KCk7XG4gIEBPdXRwdXQoKSBwcmV2aWV3T3BlbiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHByZXZpZXdDbG9zZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHByZXZpZXdDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHsgaW5kZXg6IG51bWJlcjsgaXRlbTogTmJHYWxsZXJ5SXRlbTsgfT4oKTtcblxuICB0aHVtYm5haWxzOiBOYkdhbGxlcnlUaHVtYm5haWxbXTtcbiAgZ2FsbGVyeUl0ZW1zOiBOYkdhbGxlcnlPcmRlcmVkSXRlbVtdO1xuICBwcmV2aWV3SXRlbXM6IE5iR2FsbGVyeU9yZGVyZWRJdGVtW107XG4gIGRlc2NyaXB0aW9uczogc3RyaW5nW107XG4gIGxpbmtzOiBzdHJpbmdbXTtcbiAgbGFiZWxzOiBzdHJpbmdbXTtcblxuICBvbGRJdGVtczogTmJHYWxsZXJ5SXRlbVtdO1xuICBvbGRJdGVtc0xlbmd0aCA9IDA7XG5cbiAgc2VsZWN0ZWRJbmRleCA9IDA7XG4gIHByZXZpZXdFbmFibGVkOiBib29sZWFuO1xuXG4gIGN1cnJlbnRPcHRpb25zOiBOYkdhbGxlcnlPcHRpb25zO1xuXG4gIHByaXZhdGUgYnJlYWtwb2ludDogbnVtYmVyIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICBwcml2YXRlIHByZXZCcmVha3BvaW50OiBudW1iZXIgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gIHByaXZhdGUgZnVsbFdpZHRoVGltZW91dDogYW55O1xuXG4gIEBWaWV3Q2hpbGQoTmJHYWxsZXJ5UHJldmlld0NvbXBvbmVudCkgcHJldmlldzogTmJHYWxsZXJ5UHJldmlld0NvbXBvbmVudDtcbiAgQFZpZXdDaGlsZChOYkdhbGxlcnlJdGVtQ29tcG9uZW50KSBpdGVtOiBOYkdhbGxlcnlJdGVtQ29tcG9uZW50O1xuICBAVmlld0NoaWxkKE5iR2FsbGVyeVRodW1ibmFpbHNDb21wb25lbnQpIHRodW1ibmFpbDogTmJHYWxsZXJ5VGh1bWJuYWlsc0NvbXBvbmVudDtcblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLndpZHRoJykgd2lkdGg6IHN0cmluZztcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5oZWlnaHQnKSBoZWlnaHQ6IHN0cmluZztcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5sZWZ0JykgbGVmdDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbXlFbGVtZW50OiBFbGVtZW50UmVmKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgICAgdGhpcy5vcHRpb25zID0gdGhpcy5vcHRpb25zLm1hcCgob3B0KSA9PiBuZXcgTmJHYWxsZXJ5T3B0aW9ucyhvcHQpKTtcbiAgICAgIHRoaXMuc29ydE9wdGlvbnMoKTtcbiAgICAgIHRoaXMuc2V0QnJlYWtwb2ludCgpO1xuICAgICAgdGhpcy5zZXRPcHRpb25zKCk7XG4gICAgICB0aGlzLmNoZWNrRnVsbFdpZHRoKCk7XG4gICAgICBpZiAodGhpcy5jdXJyZW50T3B0aW9ucykge1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IDxudW1iZXI+dGhpcy5jdXJyZW50T3B0aW9ucy5zdGFydEluZGV4O1xuICAgICAgfVxuICB9XG5cbiAgbmdEb0NoZWNrKCk6IHZvaWQge1xuICAgICAgaWYgKHRoaXMuaXRlbXMgIT09IHVuZGVmaW5lZCAmJiAodGhpcy5pdGVtcy5sZW5ndGggIT09IHRoaXMub2xkSXRlbXNMZW5ndGgpXG4gICAgICAgICAgfHwgKHRoaXMuaXRlbXMgIT09IHRoaXMub2xkSXRlbXMpKSB7XG4gICAgICAgICAgdGhpcy5vbGRJdGVtc0xlbmd0aCA9IHRoaXMuaXRlbXMubGVuZ3RoO1xuICAgICAgICAgIHRoaXMub2xkSXRlbXMgPSB0aGlzLml0ZW1zO1xuICAgICAgICAgIHRoaXMuc2V0T3B0aW9ucygpO1xuICAgICAgICAgIHRoaXMuc2V0SXRlbXMoKTtcblxuICAgICAgICAgIGlmICh0aGlzLml0ZW1zICYmIHRoaXMuaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIHRoaXMuaXRlbXNSZWFkeS5lbWl0KCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRoaXMuaXRlbSkge1xuICAgICAgICAgICAgICB0aGlzLml0ZW0ucmVzZXQoPG51bWJlcj50aGlzLmN1cnJlbnRPcHRpb25zLnN0YXJ0SW5kZXgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRPcHRpb25zLnRodW1ibmFpbHNBdXRvSGlkZSAmJiB0aGlzLmN1cnJlbnRPcHRpb25zLnRodW1ibmFpbHNcbiAgICAgICAgICAgICAgJiYgdGhpcy5pdGVtcy5sZW5ndGggPD0gMSkge1xuICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRPcHRpb25zLnRodW1ibmFpbHMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgdGhpcy5jdXJyZW50T3B0aW9ucy5pdGVtQXJyb3dzID0gZmFsc2U7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5yZXNldFRodW1ibmFpbHMoKTtcbiAgICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgIHRoaXMuY2hlY2tGdWxsV2lkdGgoKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnKSBvblJlc2l6ZSgpIHtcbiAgICAgIHRoaXMuc2V0QnJlYWtwb2ludCgpO1xuXG4gICAgICBpZiAodGhpcy5wcmV2QnJlYWtwb2ludCAhPT0gdGhpcy5icmVha3BvaW50KSB7XG4gICAgICAgICAgdGhpcy5zZXRPcHRpb25zKCk7XG4gICAgICAgICAgdGhpcy5yZXNldFRodW1ibmFpbHMoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuY3VycmVudE9wdGlvbnMgJiYgdGhpcy5jdXJyZW50T3B0aW9ucy5mdWxsV2lkdGgpIHtcblxuICAgICAgICAgIGlmICh0aGlzLmZ1bGxXaWR0aFRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuZnVsbFdpZHRoVGltZW91dCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5mdWxsV2lkdGhUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuY2hlY2tGdWxsV2lkdGgoKTtcbiAgICAgICAgICB9LCAyMDApO1xuICAgICAgfVxuICB9XG5cbiAgZ2V0SXRlbUhlaWdodCgpOiBzdHJpbmcge1xuICAgICAgcmV0dXJuICh0aGlzLmN1cnJlbnRPcHRpb25zICYmIHRoaXMuY3VycmVudE9wdGlvbnMudGh1bWJuYWlscykgP1xuICAgICAgICAgIHRoaXMuY3VycmVudE9wdGlvbnMuaXRlbVBlcmNlbnQgKyAnJScgOiAnMTAwJSc7XG4gIH1cblxuICBnZXRUaHVtYm5haWxzSGVpZ2h0KCk6IHN0cmluZyB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50T3B0aW9ucyAmJiB0aGlzLmN1cnJlbnRPcHRpb25zLml0ZW0pIHtcbiAgICAgICAgICByZXR1cm4gJ2NhbGMoJyArIHRoaXMuY3VycmVudE9wdGlvbnMudGh1bWJuYWlsc1BlcmNlbnQgKyAnJSAtICdcbiAgICAgICAgICArIHRoaXMuY3VycmVudE9wdGlvbnMudGh1bWJuYWlsc01hcmdpbiArICdweCknO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gJzEwMCUnO1xuICAgICAgfVxuICB9XG5cbiAgZ2V0VGh1bWJuYWlsc01hcmdpblRvcCgpOiBzdHJpbmcge1xuICAgICAgaWYgKHRoaXMuY3VycmVudE9wdGlvbnMgJiYgdGhpcy5jdXJyZW50T3B0aW9ucy5sYXlvdXQgPT09IE5iR2FsbGVyeUxheW91dC5UaHVtYm5haWxzQm90dG9tKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudE9wdGlvbnMudGh1bWJuYWlsc01hcmdpbiArICdweCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiAnMHB4JztcbiAgICAgIH1cbiAgfVxuXG4gIGdldFRodW1ibmFpbHNNYXJnaW5Cb3R0b20oKTogc3RyaW5nIHtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRPcHRpb25zICYmIHRoaXMuY3VycmVudE9wdGlvbnMubGF5b3V0ID09PSBOYkdhbGxlcnlMYXlvdXQuVGh1bWJuYWlsc1RvcCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRPcHRpb25zLnRodW1ibmFpbHNNYXJnaW4gKyAncHgnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gJzBweCc7XG4gICAgICB9XG4gIH1cblxuICBvcGVuUHJldmlldyhpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50T3B0aW9ucy5wcmV2aWV3Q3VzdG9tKSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50T3B0aW9ucy5wcmV2aWV3Q3VzdG9tKGluZGV4KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5wcmV2aWV3RW5hYmxlZCA9IHRydWU7XG4gICAgICAgICAgdGhpcy5wcmV2aWV3Lm9wZW4oaW5kZXgpO1xuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coaW5kZXgpO1xuICB9XG5cbiAgb25QcmV2aWV3T3BlbigpOiB2b2lkIHtcbiAgICAgIHRoaXMucHJldmlld09wZW4uZW1pdCgpO1xuXG4gICAgICBpZiAodGhpcy5pdGVtICYmIHRoaXMuaXRlbS5hdXRvUGxheSkge1xuICAgICAgICAgIHRoaXMuaXRlbS5zdG9wQXV0b1BsYXkoKTtcbiAgICAgIH1cbiAgfVxuXG4gIG9uUHJldmlld0Nsb3NlKCk6IHZvaWQge1xuICAgICAgdGhpcy5wcmV2aWV3RW5hYmxlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5wcmV2aWV3Q2xvc2UuZW1pdCgpO1xuXG4gICAgICBpZiAodGhpcy5pdGVtICYmIHRoaXMuaXRlbS5hdXRvUGxheSkge1xuICAgICAgICAgIHRoaXMuaXRlbS5zdGFydEF1dG9QbGF5KCk7XG4gICAgICB9XG4gIH1cblxuICBzZWxlY3RGcm9tSXRlbShpbmRleDogbnVtYmVyKSB7XG4gICAgICB0aGlzLnNlbGVjdChpbmRleCk7XG4gIH1cblxuICBzZWxlY3RGcm9tVGh1bWJuYWlscyhpbmRleDogbnVtYmVyKSB7XG4gICAgICB0aGlzLnNlbGVjdChpbmRleCk7XG5cbiAgICAgIGlmICh0aGlzLmN1cnJlbnRPcHRpb25zICYmIHRoaXMuY3VycmVudE9wdGlvbnMudGh1bWJuYWlscyAmJiB0aGlzLmN1cnJlbnRPcHRpb25zLnByZXZpZXdcbiAgICAgICAgICAmJiAoIXRoaXMuY3VycmVudE9wdGlvbnMuaXRlbSB8fCB0aGlzLmN1cnJlbnRPcHRpb25zLnRodW1ibmFpbHNSZW1haW5pbmdDb3VudCkpIHtcbiAgICAgICAgICB0aGlzLm9wZW5QcmV2aWV3KHRoaXMuc2VsZWN0ZWRJbmRleCk7XG4gICAgICB9XG4gIH1cblxuICBzaG93KGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgIHRoaXMuc2VsZWN0KGluZGV4KTtcbiAgfVxuXG4gIHNob3dOZXh0KCk6IHZvaWQge1xuICAgICAgdGhpcy5pdGVtLnNob3dOZXh0KCk7XG4gIH1cblxuICBzaG93UHJldigpOiB2b2lkIHtcbiAgICAgIHRoaXMuaXRlbS5zaG93UHJldigpO1xuICB9XG5cbiAgY2FuU2hvd05leHQoKTogYm9vbGVhbiB7XG4gICAgICBpZiAodGhpcy5pdGVtcyAmJiB0aGlzLmN1cnJlbnRPcHRpb25zKSB7XG4gICAgICAgICAgcmV0dXJuICh0aGlzLmN1cnJlbnRPcHRpb25zLml0ZW1JbmZpbml0eU1vdmUgfHwgdGhpcy5zZWxlY3RlZEluZGV4IDwgdGhpcy5pdGVtcy5sZW5ndGggLSAxKVxuICAgICAgICAgICAgICA/IHRydWUgOiBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICB9XG5cbiAgY2FuU2hvd1ByZXYoKTogYm9vbGVhbiB7XG4gICAgICBpZiAodGhpcy5pdGVtcyAmJiB0aGlzLmN1cnJlbnRPcHRpb25zKSB7XG4gICAgICAgICAgcmV0dXJuICh0aGlzLmN1cnJlbnRPcHRpb25zLml0ZW1JbmZpbml0eU1vdmUgfHwgdGhpcy5zZWxlY3RlZEluZGV4ID4gMCkgPyB0cnVlIDogZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgfVxuXG4gIHByZXZpZXdTZWxlY3QoaW5kZXg6IG51bWJlcikge1xuICAgICAgdGhpcy5wcmV2aWV3Q2hhbmdlLmVtaXQoe2luZGV4LCBpdGVtOiB0aGlzLml0ZW1zW2luZGV4XX0pO1xuICB9XG5cbiAgbW92ZVRodW1ibmFpbHNSaWdodCgpIHtcbiAgICAgIHRoaXMudGh1bWJuYWlsLm1vdmVSaWdodCgpO1xuICB9XG5cbiAgbW92ZVRodW1ibmFpbHNMZWZ0KCkge1xuICAgICAgdGhpcy50aHVtYm5haWwubW92ZUxlZnQoKTtcbiAgfVxuXG4gIGNhbk1vdmVUaHVtYm5haWxzUmlnaHQoKSB7XG4gICAgICByZXR1cm4gdGhpcy50aHVtYm5haWwuY2FuTW92ZVJpZ2h0KCk7XG4gIH1cblxuICBjYW5Nb3ZlVGh1bWJuYWlsc0xlZnQoKSB7XG4gICAgICByZXR1cm4gdGhpcy50aHVtYm5haWwuY2FuTW92ZUxlZnQoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRUaHVtYm5haWxzKCkge1xuICAgICAgaWYgKHRoaXMudGh1bWJuYWlsKSB7XG4gICAgICAgICAgdGhpcy50aHVtYm5haWwucmVzZXQoPG51bWJlcj50aGlzLmN1cnJlbnRPcHRpb25zLnN0YXJ0SW5kZXgpO1xuICAgICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZWxlY3QoaW5kZXg6IG51bWJlcikge1xuICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gaW5kZXg7XG5cbiAgICAgIHRoaXMuY2hhbmdlLmVtaXQoe1xuICAgICAgICAgIGluZGV4LFxuICAgICAgICAgIGl0ZW06IHRoaXMuaXRlbXNbaW5kZXhdXG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tGdWxsV2lkdGgoKTogdm9pZCB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50T3B0aW9ucyAmJiB0aGlzLmN1cnJlbnRPcHRpb25zLmZ1bGxXaWR0aCkge1xuICAgICAgICAgIHRoaXMud2lkdGggPSBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoICsgJ3B4JztcbiAgICAgICAgICB0aGlzLmxlZnQgPSAoLShkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoIC1cbiAgICAgICAgICAgICAgdGhpcy5teUVsZW1lbnQubmF0aXZlRWxlbWVudC5wYXJlbnROb2RlLmlubmVyV2lkdGgpIC8gMikgKyAncHgnO1xuICAgICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRJdGVtcygpOiB2b2lkIHtcbiAgICAgIHRoaXMudGh1bWJuYWlscyA9IHRoaXMuaXRlbXMubWFwKChpdGVtLCBpKSA9PiBuZXcgTmJHYWxsZXJ5VGh1bWJuYWlsKHtcbiAgICAgICAgICB0eXBlOiBpdGVtLnR5cGUsXG4gICAgICAgICAgc291cmNlOiBpdGVtLnNvdXJjZSxcbiAgICAgICAgICB1cmw6IGl0ZW0udHlwZSA9PT0gJ2ltYWdlJyA/IGl0ZW0uc21hbGwgOiB0aGlzLmN1cnJlbnRPcHRpb25zLmRlZmF1bHRWaWRlb1RodW1ibm5haWxVcmxcbiAgICAgIH0pKTtcbiAgICAgIHRoaXMuZ2FsbGVyeUl0ZW1zID0gdGhpcy5pdGVtcy5tYXAoKGl0ZW0sIGkpID0+IG5ldyBOYkdhbGxlcnlPcmRlcmVkSXRlbSh7XG4gICAgICAgICAgdHlwZTogaXRlbS50eXBlLFxuICAgICAgICAgIHNvdXJjZTogaXRlbS5zb3VyY2UsXG4gICAgICAgICAgdXJsOiBpdGVtLnR5cGUgPT09ICdpbWFnZScgPyBpdGVtLm1lZGl1bSA6IGl0ZW0udXJsLFxuICAgICAgICAgIGluZGV4OiBpXG4gICAgICB9KSk7XG4gICAgICB0aGlzLnByZXZpZXdJdGVtcyA9IHRoaXMuaXRlbXMubWFwKChpdGVtLCBpKSA9PiBuZXcgTmJHYWxsZXJ5T3JkZXJlZEl0ZW0oe1xuICAgICAgICAgIHR5cGU6IGl0ZW0udHlwZSxcbiAgICAgICAgICBzb3VyY2U6IGl0ZW0uc291cmNlLFxuICAgICAgICAgIHVybDogaXRlbS50eXBlID09PSAnaW1hZ2UnID8gaXRlbS5iaWcgOiBpdGVtLnVybCxcbiAgICAgICAgICBpbmRleDogaVxuICAgICAgfSkpO1xuICAgICAgdGhpcy5kZXNjcmlwdGlvbnMgPSB0aGlzLml0ZW1zLm1hcCgoaXRlbSkgPT4gPHN0cmluZz5pdGVtLmRlc2NyaXB0aW9uKTtcbiAgICAgIHRoaXMubGlua3MgPSB0aGlzLml0ZW1zLm1hcCgoaXRlbSkgPT4gPHN0cmluZz5pdGVtLnVybCk7XG4gICAgICB0aGlzLmxhYmVscyA9IHRoaXMuaXRlbXMubWFwKChpdGVtKSA9PiA8c3RyaW5nPml0ZW0ubGFiZWwpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRCcmVha3BvaW50KCk6IHZvaWQge1xuICAgICAgdGhpcy5wcmV2QnJlYWtwb2ludCA9IHRoaXMuYnJlYWtwb2ludDtcbiAgICAgIGxldCBicmVha3BvaW50cztcblxuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgYnJlYWtwb2ludHMgPSB0aGlzLm9wdGlvbnMuZmlsdGVyKChvcHQpID0+IG9wdC5icmVha3BvaW50ID49IHdpbmRvdy5pbm5lcldpZHRoKVxuICAgICAgICAgICAgICAubWFwKChvcHQpID0+IG9wdC5icmVha3BvaW50KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGJyZWFrcG9pbnRzICYmIGJyZWFrcG9pbnRzLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuYnJlYWtwb2ludCA9IGJyZWFrcG9pbnRzLnBvcCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmJyZWFrcG9pbnQgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gIH1cblxuICBwcml2YXRlIHNvcnRPcHRpb25zKCk6IHZvaWQge1xuICAgICAgdGhpcy5vcHRpb25zID0gW1xuICAgICAgICAgIC4uLnRoaXMub3B0aW9ucy5maWx0ZXIoKGEpID0+IGEuYnJlYWtwb2ludCA9PT0gdW5kZWZpbmVkKSxcbiAgICAgICAgICAuLi50aGlzLm9wdGlvbnNcbiAgICAgICAgICAgICAgLmZpbHRlcigoYSkgPT4gYS5icmVha3BvaW50ICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgIC5zb3J0KChhLCBiKSA9PiBiLmJyZWFrcG9pbnQgLSBhLmJyZWFrcG9pbnQpXG4gICAgICBdO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRPcHRpb25zKCk6IHZvaWQge1xuICAgICAgdGhpcy5jdXJyZW50T3B0aW9ucyA9IG5ldyBOYkdhbGxlcnlPcHRpb25zKHt9KTtcblxuICAgICAgdGhpcy5vcHRpb25zXG4gICAgICAgICAgLmZpbHRlcigob3B0KSA9PiBvcHQuYnJlYWtwb2ludCA9PT0gdW5kZWZpbmVkIHx8IG9wdC5icmVha3BvaW50ID49IHRoaXMuYnJlYWtwb2ludClcbiAgICAgICAgICAubWFwKChvcHQpID0+IHRoaXMuY29tYmluZU9wdGlvbnModGhpcy5jdXJyZW50T3B0aW9ucywgb3B0KSk7XG5cbiAgICAgIHRoaXMud2lkdGggPSA8c3RyaW5nPnRoaXMuY3VycmVudE9wdGlvbnMud2lkdGg7XG4gICAgICB0aGlzLmhlaWdodCA9IDxzdHJpbmc+dGhpcy5jdXJyZW50T3B0aW9ucy5oZWlnaHQ7XG4gIH1cblxuICBwcml2YXRlIGNvbWJpbmVPcHRpb25zKGZpcnN0OiBOYkdhbGxlcnlPcHRpb25zLCBzZWNvbmQ6IE5iR2FsbGVyeU9wdGlvbnMpIHtcbiAgICAgIE9iamVjdC5rZXlzKHNlY29uZCkubWFwKCh2YWwpID0+IGZpcnN0W3ZhbF0gPSBzZWNvbmRbdmFsXSAhPT0gdW5kZWZpbmVkID8gc2Vjb25kW3ZhbF0gOiBmaXJzdFt2YWxdKTtcbiAgfVxufVxuXG4iXX0=