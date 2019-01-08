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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmItZ2FsbGVyeS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uYi1nYWxsZXJ5LyIsInNvdXJjZXMiOlsibGliL25iLWdhbGxlcnkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUNoRCxXQUFXLEVBQVcsVUFBVSxFQUFpQixNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRy9GLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBQzlGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3JGLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLHlEQUF5RCxDQUFDO0FBQ3ZHLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBR3JFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNuRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQWU5RSxNQUFNOzs7O0lBcUNKLFlBQW9CLFNBQXFCO1FBQXJCLGNBQVMsR0FBVCxTQUFTLENBQVk7MEJBakNsQixJQUFJLFlBQVksRUFBRTtzQkFDdEIsSUFBSSxZQUFZLEVBQTJDOzJCQUN0RCxJQUFJLFlBQVksRUFBRTs0QkFDakIsSUFBSSxZQUFZLEVBQUU7NkJBQ2pCLElBQUksWUFBWSxFQUEyQzs4QkFVcEUsQ0FBQzs2QkFFRixDQUFDOzBCQUt3QixTQUFTOzhCQUNMLFNBQVM7S0FXVDs7OztJQUU3QyxRQUFRO1FBQ0osSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDckIsSUFBSSxDQUFDLGFBQWEscUJBQVcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUEsQ0FBQztTQUMvRDtLQUNKOzs7O0lBRUQsU0FBUztRQUNMLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsY0FBYyxDQUFDO2VBQ3BFLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDbkMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUN4QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDM0IsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUVoQixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7Z0JBQ2pDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDMUI7WUFFRCxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLG1CQUFTLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFDLENBQUM7YUFDM0Q7WUFFRCxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsa0JBQWtCLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVO21CQUNyRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztnQkFDdkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO2FBQzFDO1lBRUQsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQzFCO0tBQ0o7Ozs7SUFFRCxlQUFlO1FBQ1gsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0tBQ3pCOzs7O0lBRThCLFFBQVE7UUFDbkMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBRXJCLElBQUksSUFBSSxDQUFDLGNBQWMsS0FBSyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3pDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNsQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDMUI7UUFFRCxJQUFJLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUU7WUFFdEQsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQ3ZCLFlBQVksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzthQUN2QztZQUVELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNwQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7YUFDekIsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUNYO0tBQ0o7Ozs7SUFFRCxhQUFhO1FBQ1QsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQzVELElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0tBQ3REOzs7O0lBRUQsbUJBQW1CO1FBQ2YsSUFBSSxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFO1lBQ2pELE9BQU8sT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsaUJBQWlCLEdBQUcsTUFBTTtrQkFDN0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7U0FDbEQ7YUFBTTtZQUNILE9BQU8sTUFBTSxDQUFDO1NBQ2pCO0tBQ0o7Ozs7SUFFRCxzQkFBc0I7UUFDbEIsSUFBSSxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxLQUFLLGVBQWUsQ0FBQyxnQkFBZ0IsRUFBRTtZQUN4RixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1NBQ3REO2FBQU07WUFDSCxPQUFPLEtBQUssQ0FBQztTQUNoQjtLQUNKOzs7O0lBRUQseUJBQXlCO1FBQ3JCLElBQUksSUFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sS0FBSyxlQUFlLENBQUMsYUFBYSxFQUFFO1lBQ3JGLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7U0FDdEQ7YUFBTTtZQUNILE9BQU8sS0FBSyxDQUFDO1NBQ2hCO0tBQ0o7Ozs7O0lBRUQsV0FBVyxDQUFDLEtBQWE7UUFDckIsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsRUFBRTtZQUNuQyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM1QzthQUFNO1lBQ0gsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7WUFDM0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDNUI7S0FDSjs7OztJQUVELGFBQWE7UUFDVCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRXhCLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQzVCO0tBQ0o7Ozs7SUFFRCxjQUFjO1FBQ1YsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFDNUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUV6QixJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUM3QjtLQUNKOzs7OztJQUVELGNBQWMsQ0FBQyxLQUFhO1FBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDdEI7Ozs7O0lBRUQsb0JBQW9CLENBQUMsS0FBYTtRQUM5QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRW5CLElBQUksSUFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU87ZUFDakYsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsd0JBQXdCLENBQUMsRUFBRTtZQUNoRixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUN4QztLQUNKOzs7OztJQUVELElBQUksQ0FBQyxLQUFhO1FBQ2QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUN0Qjs7OztJQUVELFFBQVE7UUFDSixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQ3hCOzs7O0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDeEI7Ozs7SUFFRCxXQUFXO1FBQ1AsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDbkMsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLElBQUksSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7Z0JBQ3ZGLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztTQUN0QjthQUFNO1lBQ0gsT0FBTyxLQUFLLENBQUM7U0FDaEI7S0FDSjs7OztJQUVELFdBQVc7UUFDUCxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUNuQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztTQUMxRjthQUFNO1lBQ0gsT0FBTyxLQUFLLENBQUM7U0FDaEI7S0FDSjs7Ozs7SUFFRCxhQUFhLENBQUMsS0FBYTtRQUN2QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBQyxDQUFDLENBQUM7S0FDN0Q7Ozs7SUFFRCxtQkFBbUI7UUFDZixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxDQUFDO0tBQzlCOzs7O0lBRUQsa0JBQWtCO1FBQ2QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUM3Qjs7OztJQUVELHNCQUFzQjtRQUNsQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7S0FDeEM7Ozs7SUFFRCxxQkFBcUI7UUFDakIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3ZDOzs7O0lBRU8sZUFBZTtRQUNuQixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDaEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLG1CQUFTLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFDLENBQUM7U0FDaEU7Ozs7OztJQUdHLE1BQU0sQ0FBQyxLQUFhO1FBQ3hCLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBRTNCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2IsS0FBSztZQUNMLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztTQUMxQixDQUFDLENBQUM7Ozs7O0lBR0MsY0FBYztRQUNsQixJQUFJLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUU7WUFDdEQsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFDOUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVc7Z0JBQ3BDLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7U0FDdkU7Ozs7O0lBR0csUUFBUTtRQUNaLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLGtCQUFrQixDQUFDO1lBQ2pFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMseUJBQXlCO1NBQzFGLENBQUMsQ0FBQyxDQUFDO1FBQ0osSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksb0JBQW9CLENBQUM7WUFDckUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUc7WUFDbkQsS0FBSyxFQUFFLENBQUM7U0FDWCxDQUFDLENBQUMsQ0FBQztRQUNKLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLG9CQUFvQixDQUFDO1lBQ3JFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHO1lBQ2hELEtBQUssRUFBRSxDQUFDO1NBQ1gsQ0FBQyxDQUFDLENBQUM7UUFDSixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsbUJBQVMsSUFBSSxDQUFDLFdBQVcsQ0FBQSxDQUFDLENBQUM7UUFDdkUsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLG1CQUFTLElBQUksQ0FBQyxHQUFHLENBQUEsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxtQkFBUyxJQUFJLENBQUMsS0FBSyxDQUFBLENBQUMsQ0FBQzs7Ozs7SUFHdkQsYUFBYTtRQUNqQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7O1FBQ3RDLElBQUksV0FBVyxDQUFDO1FBRWhCLElBQUksT0FBTyxNQUFNLEtBQUssV0FBVyxFQUFFO1lBQy9CLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDO2lCQUMxRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNyQztRQUVELElBQUksV0FBVyxJQUFJLFdBQVcsQ0FBQyxNQUFNLEVBQUU7WUFDbkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDdkM7YUFBTTtZQUNILElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1NBQy9COzs7OztJQUdHLFdBQVc7UUFDZixJQUFJLENBQUMsT0FBTyxHQUFHO1lBQ1gsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsS0FBSyxTQUFTLENBQUM7WUFDekQsR0FBRyxJQUFJLENBQUMsT0FBTztpQkFDVixNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLEtBQUssU0FBUyxDQUFDO2lCQUN6QyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUM7U0FDbkQsQ0FBQzs7Ozs7SUFHRSxVQUFVO1FBQ2QsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRS9DLElBQUksQ0FBQyxPQUFPO2FBQ1AsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsVUFBVSxLQUFLLFNBQVMsSUFBSSxHQUFHLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUM7YUFDbEYsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUVqRSxJQUFJLENBQUMsS0FBSyxxQkFBVyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQSxDQUFDO1FBQy9DLElBQUksQ0FBQyxNQUFNLHFCQUFXLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFBLENBQUM7Ozs7Ozs7SUFHN0MsY0FBYyxDQUFDLEtBQXVCLEVBQUUsTUFBd0I7UUFDcEUsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDOzs7O1lBelR6RyxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLFFBQVEsRUFBRTs7Ozs7O0dBTVQ7Z0JBRUQsU0FBUyxFQUFFLENBQUMsc0JBQXNCLENBQUM7O2FBQ3BDOzs7O1lBMUJ1QixVQUFVOzs7c0JBNEIvQixLQUFLO29CQUNMLEtBQUs7eUJBRUwsTUFBTTtxQkFDTixNQUFNOzBCQUNOLE1BQU07MkJBQ04sTUFBTTs0QkFDTixNQUFNO3NCQXFCTixTQUFTLFNBQUMseUJBQXlCO21CQUNuQyxTQUFTLFNBQUMsc0JBQXNCO3dCQUNoQyxTQUFTLFNBQUMsNEJBQTRCO29CQUV0QyxXQUFXLFNBQUMsYUFBYTtxQkFDekIsV0FBVyxTQUFDLGNBQWM7bUJBQzFCLFdBQVcsU0FBQyxZQUFZO3VCQTZDeEIsWUFBWSxTQUFDLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBIb3N0TGlzdGVuZXIsIFZpZXdDaGlsZCwgT25Jbml0LFxuICBIb3N0QmluZGluZywgRG9DaGVjaywgRWxlbWVudFJlZiwgQWZ0ZXJWaWV3SW5pdCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNhZmVSZXNvdXJjZVVybCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5pbXBvcnQgeyBOYkdhbGxlcnlQcmV2aWV3Q29tcG9uZW50IH0gZnJvbSAnLi9uYi1nYWxsZXJ5LXByZXZpZXcvbmItZ2FsbGVyeS1wcmV2aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOYkdhbGxlcnlJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9uYi1nYWxsZXJ5LWl0ZW0vbmItZ2FsbGVyeS1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOYkdhbGxlcnlUaHVtYm5haWxzQ29tcG9uZW50IH0gZnJvbSAnLi9uYi1nYWxsZXJ5LXRodW1ibmFpbHMvbmItZ2FsbGVyeS10aHVtYm5haWxzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOYkdhbGxlcnlIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi9uYi1nYWxsZXJ5LWhlbHBlci5zZXJ2aWNlJztcblxuaW1wb3J0IHsgTmJHYWxsZXJ5SXRlbSB9IGZyb20gJy4vbW9kZWxzL25iLWdhbGxlcnktaXRlbS5tb2RlbCc7XG5pbXBvcnQgeyBOYkdhbGxlcnlPcHRpb25zIH0gZnJvbSAnLi9tb2RlbHMvbmItZ2FsbGVyeS1vcHRpb25zLm1vZGVsJztcbmltcG9ydCB7IE5iR2FsbGVyeVRodW1ibmFpbCB9IGZyb20gJy4vbW9kZWxzL25iLWdhbGxlcnktdGh1bWJuYWlsLm1vZGVsJztcbmltcG9ydCB7IE5iR2FsbGVyeUxheW91dCB9IGZyb20gJy4vbW9kZWxzL25iLWdhbGxlcnktbGF5b3V0Lm1vZGVsJztcbmltcG9ydCB7IE5iR2FsbGVyeU9yZGVyZWRJdGVtIH0gZnJvbSAnLi9tb2RlbHMvbmItZ2FsbGVyeS1vcmRlcmVkLWl0ZW0ubW9kZWwnO1xuaW1wb3J0IHsgTmJHYWxsZXJ5UHJldmlldyB9IGZyb20gJy4vbW9kZWxzL25iLWdhbGxlcnktcHJldmlldy5tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25iLWdhbGxlcnknLFxuICB0ZW1wbGF0ZTogYFxuICA8ZGl2IGNsYXNzPVwibmItZ2FsbGVyeS1sYXlvdXQge3tjdXJyZW50T3B0aW9ucz8ubGF5b3V0fX1cIj5cbiAgICAgIDxuYi1nYWxsZXJ5LWl0ZW0gICpuZ0lmPVwiY3VycmVudE9wdGlvbnM/Lml0ZW1cIiBbc3R5bGUuaGVpZ2h0XT1cImdldEl0ZW1IZWlnaHQoKVwiIFtpdGVtc109XCJnYWxsZXJ5SXRlbXNcIiBbY2xpY2thYmxlXT1cImN1cnJlbnRPcHRpb25zPy5wcmV2aWV3XCIgW3NlbGVjdGVkSW5kZXhdPVwic2VsZWN0ZWRJbmRleFwiIFthcnJvd3NdPVwiY3VycmVudE9wdGlvbnM/Lml0ZW1BcnJvd3NcIiBbYXJyb3dzQXV0b0hpZGVdPVwiY3VycmVudE9wdGlvbnM/Lml0ZW1BcnJvd3NBdXRvSGlkZVwiIFthcnJvd1ByZXZJY29uXT1cImN1cnJlbnRPcHRpb25zPy5hcnJvd1ByZXZJY29uXCIgW2Fycm93TmV4dEljb25dPVwiY3VycmVudE9wdGlvbnM/LmFycm93TmV4dEljb25cIiBbc3dpcGVdPVwiY3VycmVudE9wdGlvbnM/Lml0ZW1Td2lwZVwiIFthbmltYXRpb25dPVwiY3VycmVudE9wdGlvbnM/Lml0ZW1BbmltYXRpb25cIiBbc2l6ZV09XCJjdXJyZW50T3B0aW9ucz8uaXRlbVNpemVcIiBbYXV0b1BsYXldPVwiY3VycmVudE9wdGlvbnM/Lml0ZW1BdXRvUGxheVwiIFthdXRvUGxheUludGVydmFsXT1cImN1cnJlbnRPcHRpb25zPy5pdGVtQXV0b1BsYXlJbnRlcnZhbFwiIFthdXRvUGxheVBhdXNlT25Ib3Zlcl09XCJjdXJyZW50T3B0aW9ucz8uaXRlbUF1dG9QbGF5UGF1c2VPbkhvdmVyXCIgW2luZmluaXR5TW92ZV09XCJjdXJyZW50T3B0aW9ucz8uaXRlbUluZmluaXR5TW92ZVwiICBbbGF6eUxvYWRpbmddPVwiY3VycmVudE9wdGlvbnM/LmxhenlMb2FkaW5nXCIgW2FjdGlvbnNdPVwiY3VycmVudE9wdGlvbnM/Lml0ZW1BY3Rpb25zXCIgW2Rlc2NyaXB0aW9uc109XCJkZXNjcmlwdGlvbnNcIiBbc2hvd0Rlc2NyaXB0aW9uXT1cImN1cnJlbnRPcHRpb25zPy5pdGVtRGVzY3JpcHRpb25cIiBbYnVsbGV0c109XCJjdXJyZW50T3B0aW9ucz8uaXRlbUJ1bGxldHNcIiAob25DbGljayk9XCJvcGVuUHJldmlldygkZXZlbnQpXCIgKG9uQWN0aXZlQ2hhbmdlKT1cInNlbGVjdEZyb21JdGVtKCRldmVudClcIj48L25iLWdhbGxlcnktaXRlbT5cbiAgICAgIDxuYi1nYWxsZXJ5LXRodW1ibmFpbHMgKm5nSWY9XCJjdXJyZW50T3B0aW9ucz8udGh1bWJuYWlsc1wiIFtzdHlsZS5tYXJnaW5Ub3BdPVwiZ2V0VGh1bWJuYWlsc01hcmdpblRvcCgpXCIgW3N0eWxlLm1hcmdpbkJvdHRvbV09XCJnZXRUaHVtYm5haWxzTWFyZ2luQm90dG9tKClcIiBbc3R5bGUuaGVpZ2h0XT1cImdldFRodW1ibmFpbHNIZWlnaHQoKVwiIFtpdGVtc109XCJ0aHVtYm5haWxzXCIgW2xpbmtzXT1cImN1cnJlbnRPcHRpb25zPy50aHVtYm5haWxzQXNMaW5rcyA/IGxpbmtzIDogW11cIiBbbGFiZWxzXT1cImxhYmVsc1wiIFtsaW5rVGFyZ2V0XT1cImN1cnJlbnRPcHRpb25zPy5saW5rVGFyZ2V0XCIgW3NlbGVjdGVkSW5kZXhdPVwic2VsZWN0ZWRJbmRleFwiIFtjb2x1bW5zXT1cImN1cnJlbnRPcHRpb25zPy50aHVtYm5haWxzQ29sdW1uc1wiIFtyb3dzXT1cImN1cnJlbnRPcHRpb25zPy50aHVtYm5haWxzUm93c1wiIFttYXJnaW5dPVwiY3VycmVudE9wdGlvbnM/LnRodW1ibmFpbE1hcmdpblwiIFthcnJvd3NdPVwiY3VycmVudE9wdGlvbnM/LnRodW1ibmFpbHNBcnJvd3NcIiBbYXJyb3dzQXV0b0hpZGVdPVwiY3VycmVudE9wdGlvbnM/LnRodW1ibmFpbHNBcnJvd3NBdXRvSGlkZVwiIFthcnJvd1ByZXZJY29uXT1cImN1cnJlbnRPcHRpb25zPy5hcnJvd1ByZXZJY29uXCIgW2Fycm93TmV4dEljb25dPVwiY3VycmVudE9wdGlvbnM/LmFycm93TmV4dEljb25cIiBbY2xpY2thYmxlXT1cImN1cnJlbnRPcHRpb25zPy5pdGVtIHx8IGN1cnJlbnRPcHRpb25zPy5wcmV2aWV3XCIgW3N3aXBlXT1cImN1cnJlbnRPcHRpb25zPy50aHVtYm5haWxzU3dpcGVcIiBbc2l6ZV09XCJjdXJyZW50T3B0aW9ucz8udGh1bWJuYWlsU2l6ZVwiIFttb3ZlU2l6ZV09XCJjdXJyZW50T3B0aW9ucz8udGh1bWJuYWlsc01vdmVTaXplXCIgW29yZGVyXT1cImN1cnJlbnRPcHRpb25zPy50aHVtYm5haWxzT3JkZXJcIiBbcmVtYWluaW5nQ291bnRdPVwiY3VycmVudE9wdGlvbnM/LnRodW1ibmFpbHNSZW1haW5pbmdDb3VudFwiIFtsYXp5TG9hZGluZ109XCJjdXJyZW50T3B0aW9ucz8ubGF6eUxvYWRpbmdcIiBbYWN0aW9uc109XCJjdXJyZW50T3B0aW9ucz8udGh1bWJuYWlsQWN0aW9uc1wiICAob25BY3RpdmVDaGFuZ2UpPVwic2VsZWN0RnJvbVRodW1ibmFpbHMoJGV2ZW50KVwiPjwvbmItZ2FsbGVyeS10aHVtYm5haWxzPlxuICAgICAgPG5iLWdhbGxlcnktcHJldmlldyBbaXRlbXNdPVwicHJldmlld0l0ZW1zXCIgW2Rlc2NyaXB0aW9uc109XCJkZXNjcmlwdGlvbnNcIiBbc2hvd0Rlc2NyaXB0aW9uXT1cImN1cnJlbnRPcHRpb25zPy5wcmV2aWV3RGVzY3JpcHRpb25cIiBbYXJyb3dQcmV2SWNvbl09XCJjdXJyZW50T3B0aW9ucz8uYXJyb3dQcmV2SWNvblwiIFthcnJvd05leHRJY29uXT1cImN1cnJlbnRPcHRpb25zPy5hcnJvd05leHRJY29uXCIgW2Nsb3NlSWNvbl09XCJjdXJyZW50T3B0aW9ucz8uY2xvc2VJY29uXCIgW2Z1bGxzY3JlZW5JY29uXT1cImN1cnJlbnRPcHRpb25zPy5mdWxsc2NyZWVuSWNvblwiIFtzcGlubmVySWNvbl09XCJjdXJyZW50T3B0aW9ucz8uc3Bpbm5lckljb25cIiBbc3dpcGVdPVwiY3VycmVudE9wdGlvbnM/LnByZXZpZXdTd2lwZVwiIFtmdWxsc2NyZWVuXT1cImN1cnJlbnRPcHRpb25zPy5wcmV2aWV3RnVsbHNjcmVlblwiIFtmb3JjZUZ1bGxzY3JlZW5dPVwiY3VycmVudE9wdGlvbnM/LnByZXZpZXdGb3JjZUZ1bGxzY3JlZW5cIiBbY2xvc2VPbkNsaWNrXT1cImN1cnJlbnRPcHRpb25zPy5wcmV2aWV3Q2xvc2VPbkNsaWNrXCIgW2Nsb3NlT25Fc2NdPVwiY3VycmVudE9wdGlvbnM/LnByZXZpZXdDbG9zZU9uRXNjXCIgW2tleWJvYXJkTmF2aWdhdGlvbl09XCJjdXJyZW50T3B0aW9ucz8ucHJldmlld0tleWJvYXJkTmF2aWdhdGlvblwiIFthbmltYXRpb25dPVwiY3VycmVudE9wdGlvbnM/LnByZXZpZXdBbmltYXRpb25cIiBbYXV0b1BsYXldPVwiY3VycmVudE9wdGlvbnM/LnByZXZpZXdBdXRvUGxheVwiIFthdXRvUGxheUludGVydmFsXT1cImN1cnJlbnRPcHRpb25zPy5wcmV2aWV3QXV0b1BsYXlJbnRlcnZhbFwiIFthdXRvUGxheVBhdXNlT25Ib3Zlcl09XCJjdXJyZW50T3B0aW9ucz8ucHJldmlld0F1dG9QbGF5UGF1c2VPbkhvdmVyXCIgW2luZmluaXR5TW92ZV09XCJjdXJyZW50T3B0aW9ucz8ucHJldmlld0luZmluaXR5TW92ZVwiIFt6b29tXT1cImN1cnJlbnRPcHRpb25zPy5wcmV2aWV3Wm9vbVwiIFt6b29tU3RlcF09XCJjdXJyZW50T3B0aW9ucz8ucHJldmlld1pvb21TdGVwXCIgW3pvb21NYXhdPVwiY3VycmVudE9wdGlvbnM/LnByZXZpZXdab29tTWF4XCIgW3pvb21NaW5dPVwiY3VycmVudE9wdGlvbnM/LnByZXZpZXdab29tTWluXCIgW3pvb21Jbkljb25dPVwiY3VycmVudE9wdGlvbnM/Lnpvb21Jbkljb25cIiBbem9vbU91dEljb25dPVwiY3VycmVudE9wdGlvbnM/Lnpvb21PdXRJY29uXCIgW2FjdGlvbnNdPVwiY3VycmVudE9wdGlvbnM/LmFjdGlvbnNcIiBbcm90YXRlXT1cImN1cnJlbnRPcHRpb25zPy5wcmV2aWV3Um90YXRlXCIgW3JvdGF0ZUxlZnRJY29uXT1cImN1cnJlbnRPcHRpb25zPy5yb3RhdGVMZWZ0SWNvblwiIFtyb3RhdGVSaWdodEljb25dPVwiY3VycmVudE9wdGlvbnM/LnJvdGF0ZVJpZ2h0SWNvblwiIFtkb3dubG9hZF09XCJjdXJyZW50T3B0aW9ucz8ucHJldmlld0Rvd25sb2FkXCIgW2Rvd25sb2FkSWNvbl09XCJjdXJyZW50T3B0aW9ucz8uZG93bmxvYWRJY29uXCIgW2J1bGxldHNdPVwiY3VycmVudE9wdGlvbnM/LnByZXZpZXdCdWxsZXRzXCIgKG9uQ2xvc2UpPVwib25QcmV2aWV3Q2xvc2UoKVwiIChvbk9wZW4pPVwib25QcmV2aWV3T3BlbigpXCIgKG9uQWN0aXZlQ2hhbmdlKT1cInByZXZpZXdTZWxlY3QoJGV2ZW50KVwiIFtjbGFzcy5uYi1nYWxsZXJ5LWFjdGl2ZV09XCJwcmV2aWV3RW5hYmxlZFwiPjwvbmItZ2FsbGVyeS1wcmV2aWV3PlxuICA8L2Rpdj5cbiAgYCxcbiAgc3R5bGVVcmxzOiBbJy4vbmItZ2FsbGVyeS5jb21wb25lbnQuc2NzcyddLFxuICBwcm92aWRlcnM6IFtOYkdhbGxlcnlIZWxwZXJTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBOYkdhbGxlcnlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIERvQ2hlY2ssIEFmdGVyVmlld0luaXQgICB7XG4gIEBJbnB1dCgpIG9wdGlvbnM6IE5iR2FsbGVyeU9wdGlvbnNbXTtcbiAgQElucHV0KCkgaXRlbXM6IE5iR2FsbGVyeUl0ZW1bXTtcblxuICBAT3V0cHV0KCkgaXRlbXNSZWFkeSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8eyBpbmRleDogbnVtYmVyOyBpdGVtOiBOYkdhbGxlcnlJdGVtOyB9PigpO1xuICBAT3V0cHV0KCkgcHJldmlld09wZW4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBwcmV2aWV3Q2xvc2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBwcmV2aWV3Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjx7IGluZGV4OiBudW1iZXI7IGl0ZW06IE5iR2FsbGVyeUl0ZW07IH0+KCk7XG5cbiAgdGh1bWJuYWlsczogTmJHYWxsZXJ5VGh1bWJuYWlsW107XG4gIGdhbGxlcnlJdGVtczogTmJHYWxsZXJ5T3JkZXJlZEl0ZW1bXTtcbiAgcHJldmlld0l0ZW1zOiBOYkdhbGxlcnlPcmRlcmVkSXRlbVtdO1xuICBkZXNjcmlwdGlvbnM6IHN0cmluZ1tdO1xuICBsaW5rczogc3RyaW5nW107XG4gIGxhYmVsczogc3RyaW5nW107XG5cbiAgb2xkSXRlbXM6IE5iR2FsbGVyeUl0ZW1bXTtcbiAgb2xkSXRlbXNMZW5ndGggPSAwO1xuXG4gIHNlbGVjdGVkSW5kZXggPSAwO1xuICBwcmV2aWV3RW5hYmxlZDogYm9vbGVhbjtcblxuICBjdXJyZW50T3B0aW9uczogTmJHYWxsZXJ5T3B0aW9ucztcblxuICBwcml2YXRlIGJyZWFrcG9pbnQ6IG51bWJlciB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBwcmV2QnJlYWtwb2ludDogbnVtYmVyIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICBwcml2YXRlIGZ1bGxXaWR0aFRpbWVvdXQ6IGFueTtcblxuICBAVmlld0NoaWxkKE5iR2FsbGVyeVByZXZpZXdDb21wb25lbnQpIHByZXZpZXc6IE5iR2FsbGVyeVByZXZpZXdDb21wb25lbnQ7XG4gIEBWaWV3Q2hpbGQoTmJHYWxsZXJ5SXRlbUNvbXBvbmVudCkgaXRlbTogTmJHYWxsZXJ5SXRlbUNvbXBvbmVudDtcbiAgQFZpZXdDaGlsZChOYkdhbGxlcnlUaHVtYm5haWxzQ29tcG9uZW50KSB0aHVtYm5haWw6IE5iR2FsbGVyeVRodW1ibmFpbHNDb21wb25lbnQ7XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS53aWR0aCcpIHdpZHRoOiBzdHJpbmc7XG4gIEBIb3N0QmluZGluZygnc3R5bGUuaGVpZ2h0JykgaGVpZ2h0OiBzdHJpbmc7XG4gIEBIb3N0QmluZGluZygnc3R5bGUubGVmdCcpIGxlZnQ6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG15RWxlbWVudDogRWxlbWVudFJlZikge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICAgIHRoaXMub3B0aW9ucyA9IHRoaXMub3B0aW9ucy5tYXAoKG9wdCkgPT4gbmV3IE5iR2FsbGVyeU9wdGlvbnMob3B0KSk7XG4gICAgICB0aGlzLnNvcnRPcHRpb25zKCk7XG4gICAgICB0aGlzLnNldEJyZWFrcG9pbnQoKTtcbiAgICAgIHRoaXMuc2V0T3B0aW9ucygpO1xuICAgICAgdGhpcy5jaGVja0Z1bGxXaWR0aCgpO1xuICAgICAgaWYgKHRoaXMuY3VycmVudE9wdGlvbnMpIHtcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSA8bnVtYmVyPnRoaXMuY3VycmVudE9wdGlvbnMuc3RhcnRJbmRleDtcbiAgICAgIH1cbiAgfVxuXG4gIG5nRG9DaGVjaygpOiB2b2lkIHtcbiAgICAgIGlmICh0aGlzLml0ZW1zICE9PSB1bmRlZmluZWQgJiYgKHRoaXMuaXRlbXMubGVuZ3RoICE9PSB0aGlzLm9sZEl0ZW1zTGVuZ3RoKVxuICAgICAgICAgIHx8ICh0aGlzLml0ZW1zICE9PSB0aGlzLm9sZEl0ZW1zKSkge1xuICAgICAgICAgIHRoaXMub2xkSXRlbXNMZW5ndGggPSB0aGlzLml0ZW1zLmxlbmd0aDtcbiAgICAgICAgICB0aGlzLm9sZEl0ZW1zID0gdGhpcy5pdGVtcztcbiAgICAgICAgICB0aGlzLnNldE9wdGlvbnMoKTtcbiAgICAgICAgICB0aGlzLnNldEl0ZW1zKCk7XG5cbiAgICAgICAgICBpZiAodGhpcy5pdGVtcyAmJiB0aGlzLml0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgICB0aGlzLml0ZW1zUmVhZHkuZW1pdCgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0aGlzLml0ZW0pIHtcbiAgICAgICAgICAgICAgdGhpcy5pdGVtLnJlc2V0KDxudW1iZXI+dGhpcy5jdXJyZW50T3B0aW9ucy5zdGFydEluZGV4KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGhpcy5jdXJyZW50T3B0aW9ucy50aHVtYm5haWxzQXV0b0hpZGUgJiYgdGhpcy5jdXJyZW50T3B0aW9ucy50aHVtYm5haWxzXG4gICAgICAgICAgICAgICYmIHRoaXMuaXRlbXMubGVuZ3RoIDw9IDEpIHtcbiAgICAgICAgICAgICAgdGhpcy5jdXJyZW50T3B0aW9ucy50aHVtYm5haWxzID0gZmFsc2U7XG4gICAgICAgICAgICAgIHRoaXMuY3VycmVudE9wdGlvbnMuaXRlbUFycm93cyA9IGZhbHNlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMucmVzZXRUaHVtYm5haWxzKCk7XG4gICAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICB0aGlzLmNoZWNrRnVsbFdpZHRoKCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJykgb25SZXNpemUoKSB7XG4gICAgICB0aGlzLnNldEJyZWFrcG9pbnQoKTtcblxuICAgICAgaWYgKHRoaXMucHJldkJyZWFrcG9pbnQgIT09IHRoaXMuYnJlYWtwb2ludCkge1xuICAgICAgICAgIHRoaXMuc2V0T3B0aW9ucygpO1xuICAgICAgICAgIHRoaXMucmVzZXRUaHVtYm5haWxzKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmN1cnJlbnRPcHRpb25zICYmIHRoaXMuY3VycmVudE9wdGlvbnMuZnVsbFdpZHRoKSB7XG5cbiAgICAgICAgICBpZiAodGhpcy5mdWxsV2lkdGhUaW1lb3V0KSB7XG4gICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmZ1bGxXaWR0aFRpbWVvdXQpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuZnVsbFdpZHRoVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmNoZWNrRnVsbFdpZHRoKCk7XG4gICAgICAgICAgfSwgMjAwKTtcbiAgICAgIH1cbiAgfVxuXG4gIGdldEl0ZW1IZWlnaHQoKTogc3RyaW5nIHtcbiAgICAgIHJldHVybiAodGhpcy5jdXJyZW50T3B0aW9ucyAmJiB0aGlzLmN1cnJlbnRPcHRpb25zLnRodW1ibmFpbHMpID9cbiAgICAgICAgICB0aGlzLmN1cnJlbnRPcHRpb25zLml0ZW1QZXJjZW50ICsgJyUnIDogJzEwMCUnO1xuICB9XG5cbiAgZ2V0VGh1bWJuYWlsc0hlaWdodCgpOiBzdHJpbmcge1xuICAgICAgaWYgKHRoaXMuY3VycmVudE9wdGlvbnMgJiYgdGhpcy5jdXJyZW50T3B0aW9ucy5pdGVtKSB7XG4gICAgICAgICAgcmV0dXJuICdjYWxjKCcgKyB0aGlzLmN1cnJlbnRPcHRpb25zLnRodW1ibmFpbHNQZXJjZW50ICsgJyUgLSAnXG4gICAgICAgICAgKyB0aGlzLmN1cnJlbnRPcHRpb25zLnRodW1ibmFpbHNNYXJnaW4gKyAncHgpJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuICcxMDAlJztcbiAgICAgIH1cbiAgfVxuXG4gIGdldFRodW1ibmFpbHNNYXJnaW5Ub3AoKTogc3RyaW5nIHtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRPcHRpb25zICYmIHRoaXMuY3VycmVudE9wdGlvbnMubGF5b3V0ID09PSBOYkdhbGxlcnlMYXlvdXQuVGh1bWJuYWlsc0JvdHRvbSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRPcHRpb25zLnRodW1ibmFpbHNNYXJnaW4gKyAncHgnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gJzBweCc7XG4gICAgICB9XG4gIH1cblxuICBnZXRUaHVtYm5haWxzTWFyZ2luQm90dG9tKCk6IHN0cmluZyB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50T3B0aW9ucyAmJiB0aGlzLmN1cnJlbnRPcHRpb25zLmxheW91dCA9PT0gTmJHYWxsZXJ5TGF5b3V0LlRodW1ibmFpbHNUb3ApIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50T3B0aW9ucy50aHVtYm5haWxzTWFyZ2luICsgJ3B4JztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuICcwcHgnO1xuICAgICAgfVxuICB9XG5cbiAgb3BlblByZXZpZXcoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgICAgaWYgKHRoaXMuY3VycmVudE9wdGlvbnMucHJldmlld0N1c3RvbSkge1xuICAgICAgICAgIHRoaXMuY3VycmVudE9wdGlvbnMucHJldmlld0N1c3RvbShpbmRleCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucHJldmlld0VuYWJsZWQgPSB0cnVlO1xuICAgICAgICAgIHRoaXMucHJldmlldy5vcGVuKGluZGV4KTtcbiAgICAgIH1cbiAgfVxuXG4gIG9uUHJldmlld09wZW4oKTogdm9pZCB7XG4gICAgICB0aGlzLnByZXZpZXdPcGVuLmVtaXQoKTtcblxuICAgICAgaWYgKHRoaXMuaXRlbSAmJiB0aGlzLml0ZW0uYXV0b1BsYXkpIHtcbiAgICAgICAgICB0aGlzLml0ZW0uc3RvcEF1dG9QbGF5KCk7XG4gICAgICB9XG4gIH1cblxuICBvblByZXZpZXdDbG9zZSgpOiB2b2lkIHtcbiAgICAgIHRoaXMucHJldmlld0VuYWJsZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMucHJldmlld0Nsb3NlLmVtaXQoKTtcblxuICAgICAgaWYgKHRoaXMuaXRlbSAmJiB0aGlzLml0ZW0uYXV0b1BsYXkpIHtcbiAgICAgICAgICB0aGlzLml0ZW0uc3RhcnRBdXRvUGxheSgpO1xuICAgICAgfVxuICB9XG5cbiAgc2VsZWN0RnJvbUl0ZW0oaW5kZXg6IG51bWJlcikge1xuICAgICAgdGhpcy5zZWxlY3QoaW5kZXgpO1xuICB9XG5cbiAgc2VsZWN0RnJvbVRodW1ibmFpbHMoaW5kZXg6IG51bWJlcikge1xuICAgICAgdGhpcy5zZWxlY3QoaW5kZXgpO1xuXG4gICAgICBpZiAodGhpcy5jdXJyZW50T3B0aW9ucyAmJiB0aGlzLmN1cnJlbnRPcHRpb25zLnRodW1ibmFpbHMgJiYgdGhpcy5jdXJyZW50T3B0aW9ucy5wcmV2aWV3XG4gICAgICAgICAgJiYgKCF0aGlzLmN1cnJlbnRPcHRpb25zLml0ZW0gfHwgdGhpcy5jdXJyZW50T3B0aW9ucy50aHVtYm5haWxzUmVtYWluaW5nQ291bnQpKSB7XG4gICAgICAgICAgdGhpcy5vcGVuUHJldmlldyh0aGlzLnNlbGVjdGVkSW5kZXgpO1xuICAgICAgfVxuICB9XG5cbiAgc2hvdyhpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICB0aGlzLnNlbGVjdChpbmRleCk7XG4gIH1cblxuICBzaG93TmV4dCgpOiB2b2lkIHtcbiAgICAgIHRoaXMuaXRlbS5zaG93TmV4dCgpO1xuICB9XG5cbiAgc2hvd1ByZXYoKTogdm9pZCB7XG4gICAgICB0aGlzLml0ZW0uc2hvd1ByZXYoKTtcbiAgfVxuXG4gIGNhblNob3dOZXh0KCk6IGJvb2xlYW4ge1xuICAgICAgaWYgKHRoaXMuaXRlbXMgJiYgdGhpcy5jdXJyZW50T3B0aW9ucykge1xuICAgICAgICAgIHJldHVybiAodGhpcy5jdXJyZW50T3B0aW9ucy5pdGVtSW5maW5pdHlNb3ZlIHx8IHRoaXMuc2VsZWN0ZWRJbmRleCA8IHRoaXMuaXRlbXMubGVuZ3RoIC0gMSlcbiAgICAgICAgICAgICAgPyB0cnVlIDogZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgfVxuXG4gIGNhblNob3dQcmV2KCk6IGJvb2xlYW4ge1xuICAgICAgaWYgKHRoaXMuaXRlbXMgJiYgdGhpcy5jdXJyZW50T3B0aW9ucykge1xuICAgICAgICAgIHJldHVybiAodGhpcy5jdXJyZW50T3B0aW9ucy5pdGVtSW5maW5pdHlNb3ZlIHx8IHRoaXMuc2VsZWN0ZWRJbmRleCA+IDApID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gIH1cblxuICBwcmV2aWV3U2VsZWN0KGluZGV4OiBudW1iZXIpIHtcbiAgICAgIHRoaXMucHJldmlld0NoYW5nZS5lbWl0KHtpbmRleCwgaXRlbTogdGhpcy5pdGVtc1tpbmRleF19KTtcbiAgfVxuXG4gIG1vdmVUaHVtYm5haWxzUmlnaHQoKSB7XG4gICAgICB0aGlzLnRodW1ibmFpbC5tb3ZlUmlnaHQoKTtcbiAgfVxuXG4gIG1vdmVUaHVtYm5haWxzTGVmdCgpIHtcbiAgICAgIHRoaXMudGh1bWJuYWlsLm1vdmVMZWZ0KCk7XG4gIH1cblxuICBjYW5Nb3ZlVGh1bWJuYWlsc1JpZ2h0KCkge1xuICAgICAgcmV0dXJuIHRoaXMudGh1bWJuYWlsLmNhbk1vdmVSaWdodCgpO1xuICB9XG5cbiAgY2FuTW92ZVRodW1ibmFpbHNMZWZ0KCkge1xuICAgICAgcmV0dXJuIHRoaXMudGh1bWJuYWlsLmNhbk1vdmVMZWZ0KCk7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0VGh1bWJuYWlscygpIHtcbiAgICAgIGlmICh0aGlzLnRodW1ibmFpbCkge1xuICAgICAgICAgIHRoaXMudGh1bWJuYWlsLnJlc2V0KDxudW1iZXI+dGhpcy5jdXJyZW50T3B0aW9ucy5zdGFydEluZGV4KTtcbiAgICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2VsZWN0KGluZGV4OiBudW1iZXIpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IGluZGV4O1xuXG4gICAgICB0aGlzLmNoYW5nZS5lbWl0KHtcbiAgICAgICAgICBpbmRleCxcbiAgICAgICAgICBpdGVtOiB0aGlzLml0ZW1zW2luZGV4XVxuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGNoZWNrRnVsbFdpZHRoKCk6IHZvaWQge1xuICAgICAgaWYgKHRoaXMuY3VycmVudE9wdGlvbnMgJiYgdGhpcy5jdXJyZW50T3B0aW9ucy5mdWxsV2lkdGgpIHtcbiAgICAgICAgICB0aGlzLndpZHRoID0gZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCArICdweCc7XG4gICAgICAgICAgdGhpcy5sZWZ0ID0gKC0oZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCAtXG4gICAgICAgICAgICAgIHRoaXMubXlFbGVtZW50Lm5hdGl2ZUVsZW1lbnQucGFyZW50Tm9kZS5pbm5lcldpZHRoKSAvIDIpICsgJ3B4JztcbiAgICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0SXRlbXMoKTogdm9pZCB7XG4gICAgICB0aGlzLnRodW1ibmFpbHMgPSB0aGlzLml0ZW1zLm1hcCgoaXRlbSwgaSkgPT4gbmV3IE5iR2FsbGVyeVRodW1ibmFpbCh7XG4gICAgICAgICAgdHlwZTogaXRlbS50eXBlLFxuICAgICAgICAgIHNvdXJjZTogaXRlbS5zb3VyY2UsXG4gICAgICAgICAgdXJsOiBpdGVtLnR5cGUgPT09ICdpbWFnZScgPyBpdGVtLnNtYWxsIDogdGhpcy5jdXJyZW50T3B0aW9ucy5kZWZhdWx0VmlkZW9UaHVtYm5uYWlsVXJsXG4gICAgICB9KSk7XG4gICAgICB0aGlzLmdhbGxlcnlJdGVtcyA9IHRoaXMuaXRlbXMubWFwKChpdGVtLCBpKSA9PiBuZXcgTmJHYWxsZXJ5T3JkZXJlZEl0ZW0oe1xuICAgICAgICAgIHR5cGU6IGl0ZW0udHlwZSxcbiAgICAgICAgICBzb3VyY2U6IGl0ZW0uc291cmNlLFxuICAgICAgICAgIHVybDogaXRlbS50eXBlID09PSAnaW1hZ2UnID8gaXRlbS5tZWRpdW0gOiBpdGVtLnVybCxcbiAgICAgICAgICBpbmRleDogaVxuICAgICAgfSkpO1xuICAgICAgdGhpcy5wcmV2aWV3SXRlbXMgPSB0aGlzLml0ZW1zLm1hcCgoaXRlbSwgaSkgPT4gbmV3IE5iR2FsbGVyeU9yZGVyZWRJdGVtKHtcbiAgICAgICAgICB0eXBlOiBpdGVtLnR5cGUsXG4gICAgICAgICAgc291cmNlOiBpdGVtLnNvdXJjZSxcbiAgICAgICAgICB1cmw6IGl0ZW0udHlwZSA9PT0gJ2ltYWdlJyA/IGl0ZW0uYmlnIDogaXRlbS51cmwsXG4gICAgICAgICAgaW5kZXg6IGlcbiAgICAgIH0pKTtcbiAgICAgIHRoaXMuZGVzY3JpcHRpb25zID0gdGhpcy5pdGVtcy5tYXAoKGl0ZW0pID0+IDxzdHJpbmc+aXRlbS5kZXNjcmlwdGlvbik7XG4gICAgICB0aGlzLmxpbmtzID0gdGhpcy5pdGVtcy5tYXAoKGl0ZW0pID0+IDxzdHJpbmc+aXRlbS51cmwpO1xuICAgICAgdGhpcy5sYWJlbHMgPSB0aGlzLml0ZW1zLm1hcCgoaXRlbSkgPT4gPHN0cmluZz5pdGVtLmxhYmVsKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0QnJlYWtwb2ludCgpOiB2b2lkIHtcbiAgICAgIHRoaXMucHJldkJyZWFrcG9pbnQgPSB0aGlzLmJyZWFrcG9pbnQ7XG4gICAgICBsZXQgYnJlYWtwb2ludHM7XG5cbiAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGJyZWFrcG9pbnRzID0gdGhpcy5vcHRpb25zLmZpbHRlcigob3B0KSA9PiBvcHQuYnJlYWtwb2ludCA+PSB3aW5kb3cuaW5uZXJXaWR0aClcbiAgICAgICAgICAgICAgLm1hcCgob3B0KSA9PiBvcHQuYnJlYWtwb2ludCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChicmVha3BvaW50cyAmJiBicmVha3BvaW50cy5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLmJyZWFrcG9pbnQgPSBicmVha3BvaW50cy5wb3AoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5icmVha3BvaW50ID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzb3J0T3B0aW9ucygpOiB2b2lkIHtcbiAgICAgIHRoaXMub3B0aW9ucyA9IFtcbiAgICAgICAgICAuLi50aGlzLm9wdGlvbnMuZmlsdGVyKChhKSA9PiBhLmJyZWFrcG9pbnQgPT09IHVuZGVmaW5lZCksXG4gICAgICAgICAgLi4udGhpcy5vcHRpb25zXG4gICAgICAgICAgICAgIC5maWx0ZXIoKGEpID0+IGEuYnJlYWtwb2ludCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAuc29ydCgoYSwgYikgPT4gYi5icmVha3BvaW50IC0gYS5icmVha3BvaW50KVxuICAgICAgXTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0T3B0aW9ucygpOiB2b2lkIHtcbiAgICAgIHRoaXMuY3VycmVudE9wdGlvbnMgPSBuZXcgTmJHYWxsZXJ5T3B0aW9ucyh7fSk7XG5cbiAgICAgIHRoaXMub3B0aW9uc1xuICAgICAgICAgIC5maWx0ZXIoKG9wdCkgPT4gb3B0LmJyZWFrcG9pbnQgPT09IHVuZGVmaW5lZCB8fCBvcHQuYnJlYWtwb2ludCA+PSB0aGlzLmJyZWFrcG9pbnQpXG4gICAgICAgICAgLm1hcCgob3B0KSA9PiB0aGlzLmNvbWJpbmVPcHRpb25zKHRoaXMuY3VycmVudE9wdGlvbnMsIG9wdCkpO1xuXG4gICAgICB0aGlzLndpZHRoID0gPHN0cmluZz50aGlzLmN1cnJlbnRPcHRpb25zLndpZHRoO1xuICAgICAgdGhpcy5oZWlnaHQgPSA8c3RyaW5nPnRoaXMuY3VycmVudE9wdGlvbnMuaGVpZ2h0O1xuICB9XG5cbiAgcHJpdmF0ZSBjb21iaW5lT3B0aW9ucyhmaXJzdDogTmJHYWxsZXJ5T3B0aW9ucywgc2Vjb25kOiBOYkdhbGxlcnlPcHRpb25zKSB7XG4gICAgICBPYmplY3Qua2V5cyhzZWNvbmQpLm1hcCgodmFsKSA9PiBmaXJzdFt2YWxdID0gc2Vjb25kW3ZhbF0gIT09IHVuZGVmaW5lZCA/IHNlY29uZFt2YWxdIDogZmlyc3RbdmFsXSk7XG4gIH1cbn1cblxuIl19