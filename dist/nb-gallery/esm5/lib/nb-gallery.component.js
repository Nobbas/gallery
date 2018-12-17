/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, HostListener, ViewChild, HostBinding, ElementRef, Output, EventEmitter } from '@angular/core';
import { NbGalleryPreviewComponent } from './nb-gallery-preview/nb-gallery-preview.component';
import { NbGalleryItemComponent } from './nb-gallery-item/nb-gallery-item.component';
import { NbGalleryThumbnailsComponent } from './nb-gallery-thumbnails/nb-gallery-thumbnails.component';
import { NbGalleryHelperService } from './nb-gallery-helper.service';
import { NbGalleryOptions } from './models/nb-gallery-options.model';
import { NbGalleryThumbnail } from './models/nb-gallery-thumbnail.model';
import { NbGalleryLayout } from './models/nb-gallery-layout.model';
import { NbGalleryOrderedItem } from './models/nb-gallery-ordered-item.model';
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
        this.options = tslib_1.__spread(this.options.filter(function (a) { return a.breakpoint === undefined; }), this.options
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
export { NbGalleryComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmItZ2FsbGVyeS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uYi1nYWxsZXJ5LyIsInNvdXJjZXMiOlsibGliL25iLWdhbGxlcnkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFDaEQsV0FBVyxFQUFXLFVBQVUsRUFBaUIsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUcvRixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxtREFBbUQsQ0FBQztBQUM5RixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUNyRixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSx5REFBeUQsQ0FBQztBQUN2RyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUdyRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUN6RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDbkUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7O0lBb0Q1RSw0QkFBb0IsU0FBcUI7UUFBckIsY0FBUyxHQUFULFNBQVMsQ0FBWTswQkFqQ2xCLElBQUksWUFBWSxFQUFFO3NCQUN0QixJQUFJLFlBQVksRUFBMkM7MkJBQ3RELElBQUksWUFBWSxFQUFFOzRCQUNqQixJQUFJLFlBQVksRUFBRTs2QkFDakIsSUFBSSxZQUFZLEVBQTJDOzhCQVVwRSxDQUFDOzZCQUVGLENBQUM7MEJBS3dCLFNBQVM7OEJBQ0wsU0FBUztLQVdUOzs7O0lBRTdDLHFDQUFROzs7SUFBUjtRQUNJLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFH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QUFVOzs7MEJBNEIvQixLQUFLO3dCQUNMLEtBQUs7NkJBRUwsTUFBTTt5QkFDTixNQUFNOzhCQUNOLE1BQU07K0JBQ04sTUFBTTtnQ0FDTixNQUFNOzBCQXFCTixTQUFTLFNBQUMseUJBQXlCO3VCQUNuQyxTQUFTLFNBQUMsc0JBQXNCOzRCQUNoQyxTQUFTLFNBQUMsNEJBQTRCO3dCQUV0QyxXQUFXLFNBQUMsYUFBYTt5QkFDekIsV0FBVyxTQUFDLGNBQWM7dUJBQzFCLFdBQVcsU0FBQyxZQUFZOzJCQTZDeEIsWUFBWSxTQUFDLGVBQWU7OzZCQTVHL0I7O1NBNEJhLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIEhvc3RMaXN0ZW5lciwgVmlld0NoaWxkLCBPbkluaXQsXG4gIEhvc3RCaW5kaW5nLCBEb0NoZWNrLCBFbGVtZW50UmVmLCBBZnRlclZpZXdJbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2FmZVJlc291cmNlVXJsIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmltcG9ydCB7IE5iR2FsbGVyeVByZXZpZXdDb21wb25lbnQgfSBmcm9tICcuL25iLWdhbGxlcnktcHJldmlldy9uYi1nYWxsZXJ5LXByZXZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IE5iR2FsbGVyeUl0ZW1Db21wb25lbnQgfSBmcm9tICcuL25iLWdhbGxlcnktaXRlbS9uYi1nYWxsZXJ5LWl0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IE5iR2FsbGVyeVRodW1ibmFpbHNDb21wb25lbnQgfSBmcm9tICcuL25iLWdhbGxlcnktdGh1bWJuYWlscy9uYi1nYWxsZXJ5LXRodW1ibmFpbHMuY29tcG9uZW50JztcbmltcG9ydCB7IE5iR2FsbGVyeUhlbHBlclNlcnZpY2UgfSBmcm9tICcuL25iLWdhbGxlcnktaGVscGVyLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBOYkdhbGxlcnlJdGVtIH0gZnJvbSAnLi9tb2RlbHMvbmItZ2FsbGVyeS1pdGVtLm1vZGVsJztcbmltcG9ydCB7IE5iR2FsbGVyeU9wdGlvbnMgfSBmcm9tICcuL21vZGVscy9uYi1nYWxsZXJ5LW9wdGlvbnMubW9kZWwnO1xuaW1wb3J0IHsgTmJHYWxsZXJ5VGh1bWJuYWlsIH0gZnJvbSAnLi9tb2RlbHMvbmItZ2FsbGVyeS10aHVtYm5haWwubW9kZWwnO1xuaW1wb3J0IHsgTmJHYWxsZXJ5TGF5b3V0IH0gZnJvbSAnLi9tb2RlbHMvbmItZ2FsbGVyeS1sYXlvdXQubW9kZWwnO1xuaW1wb3J0IHsgTmJHYWxsZXJ5T3JkZXJlZEl0ZW0gfSBmcm9tICcuL21vZGVscy9uYi1nYWxsZXJ5LW9yZGVyZWQtaXRlbS5tb2RlbCc7XG5pbXBvcnQgeyBOYkdhbGxlcnlQcmV2aWV3IH0gZnJvbSAnLi9tb2RlbHMvbmItZ2FsbGVyeS1wcmV2aWV3Lm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmItZ2FsbGVyeScsXG4gIHRlbXBsYXRlOiBgXG4gIDxkaXYgY2xhc3M9XCJuYi1nYWxsZXJ5LWxheW91dCB7e2N1cnJlbnRPcHRpb25zPy5sYXlvdXR9fVwiPlxuICAgICAgPG5iLWdhbGxlcnktaXRlbSAgKm5nSWY9XCJjdXJyZW50T3B0aW9ucz8uaXRlbVwiIFtzdHlsZS5oZWlnaHRdPVwiZ2V0SXRlbUhlaWdodCgpXCIgW2l0ZW1zXT1cImdhbGxlcnlJdGVtc1wiIFtjbGlja2FibGVdPVwiY3VycmVudE9wdGlvbnM/LnByZXZpZXdcIiBbc2VsZWN0ZWRJbmRleF09XCJzZWxlY3RlZEluZGV4XCIgW2Fycm93c109XCJjdXJyZW50T3B0aW9ucz8uaXRlbUFycm93c1wiIFthcnJvd3NBdXRvSGlkZV09XCJjdXJyZW50T3B0aW9ucz8uaXRlbUFycm93c0F1dG9IaWRlXCIgW2Fycm93UHJldkljb25dPVwiY3VycmVudE9wdGlvbnM/LmFycm93UHJldkljb25cIiBbYXJyb3dOZXh0SWNvbl09XCJjdXJyZW50T3B0aW9ucz8uYXJyb3dOZXh0SWNvblwiIFtzd2lwZV09XCJjdXJyZW50T3B0aW9ucz8uaXRlbVN3aXBlXCIgW2FuaW1hdGlvbl09XCJjdXJyZW50T3B0aW9ucz8uaXRlbUFuaW1hdGlvblwiIFtzaXplXT1cImN1cnJlbnRPcHRpb25zPy5pdGVtU2l6ZVwiIFthdXRvUGxheV09XCJjdXJyZW50T3B0aW9ucz8uaXRlbUF1dG9QbGF5XCIgW2F1dG9QbGF5SW50ZXJ2YWxdPVwiY3VycmVudE9wdGlvbnM/Lml0ZW1BdXRvUGxheUludGVydmFsXCIgW2F1dG9QbGF5UGF1c2VPbkhvdmVyXT1cImN1cnJlbnRPcHRpb25zPy5pdGVtQXV0b1BsYXlQYXVzZU9uSG92ZXJcIiBbaW5maW5pdHlNb3ZlXT1cImN1cnJlbnRPcHRpb25zPy5pdGVtSW5maW5pdHlNb3ZlXCIgIFtsYXp5TG9hZGluZ109XCJjdXJyZW50T3B0aW9ucz8ubGF6eUxvYWRpbmdcIiBbYWN0aW9uc109XCJjdXJyZW50T3B0aW9ucz8uaXRlbUFjdGlvbnNcIiBbZGVzY3JpcHRpb25zXT1cImRlc2NyaXB0aW9uc1wiIFtzaG93RGVzY3JpcHRpb25dPVwiY3VycmVudE9wdGlvbnM/Lml0ZW1EZXNjcmlwdGlvblwiIFtidWxsZXRzXT1cImN1cnJlbnRPcHRpb25zPy5pdGVtQnVsbGV0c1wiIChvbkNsaWNrKT1cIm9wZW5QcmV2aWV3KCRldmVudClcIiAob25BY3RpdmVDaGFuZ2UpPVwic2VsZWN0RnJvbUl0ZW0oJGV2ZW50KVwiPjwvbmItZ2FsbGVyeS1pdGVtPlxuICAgICAgPG5iLWdhbGxlcnktdGh1bWJuYWlscyAqbmdJZj1cImN1cnJlbnRPcHRpb25zPy50aHVtYm5haWxzXCIgW3N0eWxlLm1hcmdpblRvcF09XCJnZXRUaHVtYm5haWxzTWFyZ2luVG9wKClcIiBbc3R5bGUubWFyZ2luQm90dG9tXT1cImdldFRodW1ibmFpbHNNYXJnaW5Cb3R0b20oKVwiIFtzdHlsZS5oZWlnaHRdPVwiZ2V0VGh1bWJuYWlsc0hlaWdodCgpXCIgW2l0ZW1zXT1cInRodW1ibmFpbHNcIiBbbGlua3NdPVwiY3VycmVudE9wdGlvbnM/LnRodW1ibmFpbHNBc0xpbmtzID8gbGlua3MgOiBbXVwiIFtsYWJlbHNdPVwibGFiZWxzXCIgW2xpbmtUYXJnZXRdPVwiY3VycmVudE9wdGlvbnM/LmxpbmtUYXJnZXRcIiBbc2VsZWN0ZWRJbmRleF09XCJzZWxlY3RlZEluZGV4XCIgW2NvbHVtbnNdPVwiY3VycmVudE9wdGlvbnM/LnRodW1ibmFpbHNDb2x1bW5zXCIgW3Jvd3NdPVwiY3VycmVudE9wdGlvbnM/LnRodW1ibmFpbHNSb3dzXCIgW21hcmdpbl09XCJjdXJyZW50T3B0aW9ucz8udGh1bWJuYWlsTWFyZ2luXCIgW2Fycm93c109XCJjdXJyZW50T3B0aW9ucz8udGh1bWJuYWlsc0Fycm93c1wiIFthcnJvd3NBdXRvSGlkZV09XCJjdXJyZW50T3B0aW9ucz8udGh1bWJuYWlsc0Fycm93c0F1dG9IaWRlXCIgW2Fycm93UHJldkljb25dPVwiY3VycmVudE9wdGlvbnM/LmFycm93UHJldkljb25cIiBbYXJyb3dOZXh0SWNvbl09XCJjdXJyZW50T3B0aW9ucz8uYXJyb3dOZXh0SWNvblwiIFtjbGlja2FibGVdPVwiY3VycmVudE9wdGlvbnM/Lml0ZW0gfHwgY3VycmVudE9wdGlvbnM/LnByZXZpZXdcIiBbc3dpcGVdPVwiY3VycmVudE9wdGlvbnM/LnRodW1ibmFpbHNTd2lwZVwiIFtzaXplXT1cImN1cnJlbnRPcHRpb25zPy50aHVtYm5haWxTaXplXCIgW21vdmVTaXplXT1cImN1cnJlbnRPcHRpb25zPy50aHVtYm5haWxzTW92ZVNpemVcIiBbb3JkZXJdPVwiY3VycmVudE9wdGlvbnM/LnRodW1ibmFpbHNPcmRlclwiIFtyZW1haW5pbmdDb3VudF09XCJjdXJyZW50T3B0aW9ucz8udGh1bWJuYWlsc1JlbWFpbmluZ0NvdW50XCIgW2xhenlMb2FkaW5nXT1cImN1cnJlbnRPcHRpb25zPy5sYXp5TG9hZGluZ1wiIFthY3Rpb25zXT1cImN1cnJlbnRPcHRpb25zPy50aHVtYm5haWxBY3Rpb25zXCIgIChvbkFjdGl2ZUNoYW5nZSk9XCJzZWxlY3RGcm9tVGh1bWJuYWlscygkZXZlbnQpXCI+PC9uYi1nYWxsZXJ5LXRodW1ibmFpbHM+XG4gICAgICA8bmItZ2FsbGVyeS1wcmV2aWV3IFtpdGVtc109XCJwcmV2aWV3SXRlbXNcIiBbZGVzY3JpcHRpb25zXT1cImRlc2NyaXB0aW9uc1wiIFtzaG93RGVzY3JpcHRpb25dPVwiY3VycmVudE9wdGlvbnM/LnByZXZpZXdEZXNjcmlwdGlvblwiIFthcnJvd1ByZXZJY29uXT1cImN1cnJlbnRPcHRpb25zPy5hcnJvd1ByZXZJY29uXCIgW2Fycm93TmV4dEljb25dPVwiY3VycmVudE9wdGlvbnM/LmFycm93TmV4dEljb25cIiBbY2xvc2VJY29uXT1cImN1cnJlbnRPcHRpb25zPy5jbG9zZUljb25cIiBbZnVsbHNjcmVlbkljb25dPVwiY3VycmVudE9wdGlvbnM/LmZ1bGxzY3JlZW5JY29uXCIgW3NwaW5uZXJJY29uXT1cImN1cnJlbnRPcHRpb25zPy5zcGlubmVySWNvblwiIFtzd2lwZV09XCJjdXJyZW50T3B0aW9ucz8ucHJldmlld1N3aXBlXCIgW2Z1bGxzY3JlZW5dPVwiY3VycmVudE9wdGlvbnM/LnByZXZpZXdGdWxsc2NyZWVuXCIgW2ZvcmNlRnVsbHNjcmVlbl09XCJjdXJyZW50T3B0aW9ucz8ucHJldmlld0ZvcmNlRnVsbHNjcmVlblwiIFtjbG9zZU9uQ2xpY2tdPVwiY3VycmVudE9wdGlvbnM/LnByZXZpZXdDbG9zZU9uQ2xpY2tcIiBbY2xvc2VPbkVzY109XCJjdXJyZW50T3B0aW9ucz8ucHJldmlld0Nsb3NlT25Fc2NcIiBba2V5Ym9hcmROYXZpZ2F0aW9uXT1cImN1cnJlbnRPcHRpb25zPy5wcmV2aWV3S2V5Ym9hcmROYXZpZ2F0aW9uXCIgW2FuaW1hdGlvbl09XCJjdXJyZW50T3B0aW9ucz8ucHJldmlld0FuaW1hdGlvblwiIFthdXRvUGxheV09XCJjdXJyZW50T3B0aW9ucz8ucHJldmlld0F1dG9QbGF5XCIgW2F1dG9QbGF5SW50ZXJ2YWxdPVwiY3VycmVudE9wdGlvbnM/LnByZXZpZXdBdXRvUGxheUludGVydmFsXCIgW2F1dG9QbGF5UGF1c2VPbkhvdmVyXT1cImN1cnJlbnRPcHRpb25zPy5wcmV2aWV3QXV0b1BsYXlQYXVzZU9uSG92ZXJcIiBbaW5maW5pdHlNb3ZlXT1cImN1cnJlbnRPcHRpb25zPy5wcmV2aWV3SW5maW5pdHlNb3ZlXCIgW3pvb21dPVwiY3VycmVudE9wdGlvbnM/LnByZXZpZXdab29tXCIgW3pvb21TdGVwXT1cImN1cnJlbnRPcHRpb25zPy5wcmV2aWV3Wm9vbVN0ZXBcIiBbem9vbU1heF09XCJjdXJyZW50T3B0aW9ucz8ucHJldmlld1pvb21NYXhcIiBbem9vbU1pbl09XCJjdXJyZW50T3B0aW9ucz8ucHJldmlld1pvb21NaW5cIiBbem9vbUluSWNvbl09XCJjdXJyZW50T3B0aW9ucz8uem9vbUluSWNvblwiIFt6b29tT3V0SWNvbl09XCJjdXJyZW50T3B0aW9ucz8uem9vbU91dEljb25cIiBbYWN0aW9uc109XCJjdXJyZW50T3B0aW9ucz8uYWN0aW9uc1wiIFtyb3RhdGVdPVwiY3VycmVudE9wdGlvbnM/LnByZXZpZXdSb3RhdGVcIiBbcm90YXRlTGVmdEljb25dPVwiY3VycmVudE9wdGlvbnM/LnJvdGF0ZUxlZnRJY29uXCIgW3JvdGF0ZVJpZ2h0SWNvbl09XCJjdXJyZW50T3B0aW9ucz8ucm90YXRlUmlnaHRJY29uXCIgW2Rvd25sb2FkXT1cImN1cnJlbnRPcHRpb25zPy5wcmV2aWV3RG93bmxvYWRcIiBbZG93bmxvYWRJY29uXT1cImN1cnJlbnRPcHRpb25zPy5kb3dubG9hZEljb25cIiBbYnVsbGV0c109XCJjdXJyZW50T3B0aW9ucz8ucHJldmlld0J1bGxldHNcIiAob25DbG9zZSk9XCJvblByZXZpZXdDbG9zZSgpXCIgKG9uT3Blbik9XCJvblByZXZpZXdPcGVuKClcIiAob25BY3RpdmVDaGFuZ2UpPVwicHJldmlld1NlbGVjdCgkZXZlbnQpXCIgW2NsYXNzLm5iLWdhbGxlcnktYWN0aXZlXT1cInByZXZpZXdFbmFibGVkXCI+PC9uYi1nYWxsZXJ5LXByZXZpZXc+XG4gIDwvZGl2PlxuICBgLFxuICBzdHlsZVVybHM6IFsnLi9uYi1nYWxsZXJ5LmNvbXBvbmVudC5zY3NzJ10sXG4gIHByb3ZpZGVyczogW05iR2FsbGVyeUhlbHBlclNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIE5iR2FsbGVyeUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgRG9DaGVjaywgQWZ0ZXJWaWV3SW5pdCAgIHtcbiAgQElucHV0KCkgb3B0aW9uczogTmJHYWxsZXJ5T3B0aW9uc1tdO1xuICBASW5wdXQoKSBpdGVtczogTmJHYWxsZXJ5SXRlbVtdO1xuXG4gIEBPdXRwdXQoKSBpdGVtc1JlYWR5ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjx7IGluZGV4OiBudW1iZXI7IGl0ZW06IE5iR2FsbGVyeUl0ZW07IH0+KCk7XG4gIEBPdXRwdXQoKSBwcmV2aWV3T3BlbiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHByZXZpZXdDbG9zZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHByZXZpZXdDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHsgaW5kZXg6IG51bWJlcjsgaXRlbTogTmJHYWxsZXJ5SXRlbTsgfT4oKTtcblxuICB0aHVtYm5haWxzOiBOYkdhbGxlcnlUaHVtYm5haWxbXTtcbiAgZ2FsbGVyeUl0ZW1zOiBOYkdhbGxlcnlPcmRlcmVkSXRlbVtdO1xuICBwcmV2aWV3SXRlbXM6IE5iR2FsbGVyeU9yZGVyZWRJdGVtW107XG4gIGRlc2NyaXB0aW9uczogc3RyaW5nW107XG4gIGxpbmtzOiBzdHJpbmdbXTtcbiAgbGFiZWxzOiBzdHJpbmdbXTtcblxuICBvbGRJdGVtczogTmJHYWxsZXJ5SXRlbVtdO1xuICBvbGRJdGVtc0xlbmd0aCA9IDA7XG5cbiAgc2VsZWN0ZWRJbmRleCA9IDA7XG4gIHByZXZpZXdFbmFibGVkOiBib29sZWFuO1xuXG4gIGN1cnJlbnRPcHRpb25zOiBOYkdhbGxlcnlPcHRpb25zO1xuXG4gIHByaXZhdGUgYnJlYWtwb2ludDogbnVtYmVyIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICBwcml2YXRlIHByZXZCcmVha3BvaW50OiBudW1iZXIgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gIHByaXZhdGUgZnVsbFdpZHRoVGltZW91dDogYW55O1xuXG4gIEBWaWV3Q2hpbGQoTmJHYWxsZXJ5UHJldmlld0NvbXBvbmVudCkgcHJldmlldzogTmJHYWxsZXJ5UHJldmlld0NvbXBvbmVudDtcbiAgQFZpZXdDaGlsZChOYkdhbGxlcnlJdGVtQ29tcG9uZW50KSBpdGVtOiBOYkdhbGxlcnlJdGVtQ29tcG9uZW50O1xuICBAVmlld0NoaWxkKE5iR2FsbGVyeVRodW1ibmFpbHNDb21wb25lbnQpIHRodW1ibmFpbDogTmJHYWxsZXJ5VGh1bWJuYWlsc0NvbXBvbmVudDtcblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLndpZHRoJykgd2lkdGg6IHN0cmluZztcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5oZWlnaHQnKSBoZWlnaHQ6IHN0cmluZztcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5sZWZ0JykgbGVmdDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbXlFbGVtZW50OiBFbGVtZW50UmVmKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgICAgdGhpcy5vcHRpb25zID0gdGhpcy5vcHRpb25zLm1hcCgob3B0KSA9PiBuZXcgTmJHYWxsZXJ5T3B0aW9ucyhvcHQpKTtcbiAgICAgIHRoaXMuc29ydE9wdGlvbnMoKTtcbiAgICAgIHRoaXMuc2V0QnJlYWtwb2ludCgpO1xuICAgICAgdGhpcy5zZXRPcHRpb25zKCk7XG4gICAgICB0aGlzLmNoZWNrRnVsbFdpZHRoKCk7XG4gICAgICBpZiAodGhpcy5jdXJyZW50T3B0aW9ucykge1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IDxudW1iZXI+dGhpcy5jdXJyZW50T3B0aW9ucy5zdGFydEluZGV4O1xuICAgICAgfVxuICB9XG5cbiAgbmdEb0NoZWNrKCk6IHZvaWQge1xuICAgICAgaWYgKHRoaXMuaXRlbXMgIT09IHVuZGVmaW5lZCAmJiAodGhpcy5pdGVtcy5sZW5ndGggIT09IHRoaXMub2xkSXRlbXNMZW5ndGgpXG4gICAgICAgICAgfHwgKHRoaXMuaXRlbXMgIT09IHRoaXMub2xkSXRlbXMpKSB7XG4gICAgICAgICAgdGhpcy5vbGRJdGVtc0xlbmd0aCA9IHRoaXMuaXRlbXMubGVuZ3RoO1xuICAgICAgICAgIHRoaXMub2xkSXRlbXMgPSB0aGlzLml0ZW1zO1xuICAgICAgICAgIHRoaXMuc2V0T3B0aW9ucygpO1xuICAgICAgICAgIHRoaXMuc2V0SXRlbXMoKTtcblxuICAgICAgICAgIGlmICh0aGlzLml0ZW1zICYmIHRoaXMuaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIHRoaXMuaXRlbXNSZWFkeS5lbWl0KCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRoaXMuaXRlbSkge1xuICAgICAgICAgICAgICB0aGlzLml0ZW0ucmVzZXQoPG51bWJlcj50aGlzLmN1cnJlbnRPcHRpb25zLnN0YXJ0SW5kZXgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRPcHRpb25zLnRodW1ibmFpbHNBdXRvSGlkZSAmJiB0aGlzLmN1cnJlbnRPcHRpb25zLnRodW1ibmFpbHNcbiAgICAgICAgICAgICAgJiYgdGhpcy5pdGVtcy5sZW5ndGggPD0gMSkge1xuICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRPcHRpb25zLnRodW1ibmFpbHMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgdGhpcy5jdXJyZW50T3B0aW9ucy5pdGVtQXJyb3dzID0gZmFsc2U7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5yZXNldFRodW1ibmFpbHMoKTtcbiAgICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgIHRoaXMuY2hlY2tGdWxsV2lkdGgoKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnKSBvblJlc2l6ZSgpIHtcbiAgICAgIHRoaXMuc2V0QnJlYWtwb2ludCgpO1xuXG4gICAgICBpZiAodGhpcy5wcmV2QnJlYWtwb2ludCAhPT0gdGhpcy5icmVha3BvaW50KSB7XG4gICAgICAgICAgdGhpcy5zZXRPcHRpb25zKCk7XG4gICAgICAgICAgdGhpcy5yZXNldFRodW1ibmFpbHMoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuY3VycmVudE9wdGlvbnMgJiYgdGhpcy5jdXJyZW50T3B0aW9ucy5mdWxsV2lkdGgpIHtcblxuICAgICAgICAgIGlmICh0aGlzLmZ1bGxXaWR0aFRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuZnVsbFdpZHRoVGltZW91dCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5mdWxsV2lkdGhUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuY2hlY2tGdWxsV2lkdGgoKTtcbiAgICAgICAgICB9LCAyMDApO1xuICAgICAgfVxuICB9XG5cbiAgZ2V0SXRlbUhlaWdodCgpOiBzdHJpbmcge1xuICAgICAgcmV0dXJuICh0aGlzLmN1cnJlbnRPcHRpb25zICYmIHRoaXMuY3VycmVudE9wdGlvbnMudGh1bWJuYWlscykgP1xuICAgICAgICAgIHRoaXMuY3VycmVudE9wdGlvbnMuaXRlbVBlcmNlbnQgKyAnJScgOiAnMTAwJSc7XG4gIH1cblxuICBnZXRUaHVtYm5haWxzSGVpZ2h0KCk6IHN0cmluZyB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50T3B0aW9ucyAmJiB0aGlzLmN1cnJlbnRPcHRpb25zLml0ZW0pIHtcbiAgICAgICAgICByZXR1cm4gJ2NhbGMoJyArIHRoaXMuY3VycmVudE9wdGlvbnMudGh1bWJuYWlsc1BlcmNlbnQgKyAnJSAtICdcbiAgICAgICAgICArIHRoaXMuY3VycmVudE9wdGlvbnMudGh1bWJuYWlsc01hcmdpbiArICdweCknO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gJzEwMCUnO1xuICAgICAgfVxuICB9XG5cbiAgZ2V0VGh1bWJuYWlsc01hcmdpblRvcCgpOiBzdHJpbmcge1xuICAgICAgaWYgKHRoaXMuY3VycmVudE9wdGlvbnMgJiYgdGhpcy5jdXJyZW50T3B0aW9ucy5sYXlvdXQgPT09IE5iR2FsbGVyeUxheW91dC5UaHVtYm5haWxzQm90dG9tKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudE9wdGlvbnMudGh1bWJuYWlsc01hcmdpbiArICdweCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiAnMHB4JztcbiAgICAgIH1cbiAgfVxuXG4gIGdldFRodW1ibmFpbHNNYXJnaW5Cb3R0b20oKTogc3RyaW5nIHtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRPcHRpb25zICYmIHRoaXMuY3VycmVudE9wdGlvbnMubGF5b3V0ID09PSBOYkdhbGxlcnlMYXlvdXQuVGh1bWJuYWlsc1RvcCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRPcHRpb25zLnRodW1ibmFpbHNNYXJnaW4gKyAncHgnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gJzBweCc7XG4gICAgICB9XG4gIH1cblxuICBvcGVuUHJldmlldyhpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50T3B0aW9ucy5wcmV2aWV3Q3VzdG9tKSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50T3B0aW9ucy5wcmV2aWV3Q3VzdG9tKGluZGV4KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5wcmV2aWV3RW5hYmxlZCA9IHRydWU7XG4gICAgICAgICAgdGhpcy5wcmV2aWV3Lm9wZW4oaW5kZXgpO1xuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coaW5kZXgpO1xuICB9XG5cbiAgb25QcmV2aWV3T3BlbigpOiB2b2lkIHtcbiAgICAgIHRoaXMucHJldmlld09wZW4uZW1pdCgpO1xuXG4gICAgICBpZiAodGhpcy5pdGVtICYmIHRoaXMuaXRlbS5hdXRvUGxheSkge1xuICAgICAgICAgIHRoaXMuaXRlbS5zdG9wQXV0b1BsYXkoKTtcbiAgICAgIH1cbiAgfVxuXG4gIG9uUHJldmlld0Nsb3NlKCk6IHZvaWQge1xuICAgICAgdGhpcy5wcmV2aWV3RW5hYmxlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5wcmV2aWV3Q2xvc2UuZW1pdCgpO1xuXG4gICAgICBpZiAodGhpcy5pdGVtICYmIHRoaXMuaXRlbS5hdXRvUGxheSkge1xuICAgICAgICAgIHRoaXMuaXRlbS5zdGFydEF1dG9QbGF5KCk7XG4gICAgICB9XG4gIH1cblxuICBzZWxlY3RGcm9tSXRlbShpbmRleDogbnVtYmVyKSB7XG4gICAgICB0aGlzLnNlbGVjdChpbmRleCk7XG4gIH1cblxuICBzZWxlY3RGcm9tVGh1bWJuYWlscyhpbmRleDogbnVtYmVyKSB7XG4gICAgICB0aGlzLnNlbGVjdChpbmRleCk7XG5cbiAgICAgIGlmICh0aGlzLmN1cnJlbnRPcHRpb25zICYmIHRoaXMuY3VycmVudE9wdGlvbnMudGh1bWJuYWlscyAmJiB0aGlzLmN1cnJlbnRPcHRpb25zLnByZXZpZXdcbiAgICAgICAgICAmJiAoIXRoaXMuY3VycmVudE9wdGlvbnMuaXRlbSB8fCB0aGlzLmN1cnJlbnRPcHRpb25zLnRodW1ibmFpbHNSZW1haW5pbmdDb3VudCkpIHtcbiAgICAgICAgICB0aGlzLm9wZW5QcmV2aWV3KHRoaXMuc2VsZWN0ZWRJbmRleCk7XG4gICAgICB9XG4gIH1cblxuICBzaG93KGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgIHRoaXMuc2VsZWN0KGluZGV4KTtcbiAgfVxuXG4gIHNob3dOZXh0KCk6IHZvaWQge1xuICAgICAgdGhpcy5pdGVtLnNob3dOZXh0KCk7XG4gIH1cblxuICBzaG93UHJldigpOiB2b2lkIHtcbiAgICAgIHRoaXMuaXRlbS5zaG93UHJldigpO1xuICB9XG5cbiAgY2FuU2hvd05leHQoKTogYm9vbGVhbiB7XG4gICAgICBpZiAodGhpcy5pdGVtcyAmJiB0aGlzLmN1cnJlbnRPcHRpb25zKSB7XG4gICAgICAgICAgcmV0dXJuICh0aGlzLmN1cnJlbnRPcHRpb25zLml0ZW1JbmZpbml0eU1vdmUgfHwgdGhpcy5zZWxlY3RlZEluZGV4IDwgdGhpcy5pdGVtcy5sZW5ndGggLSAxKVxuICAgICAgICAgICAgICA/IHRydWUgOiBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICB9XG5cbiAgY2FuU2hvd1ByZXYoKTogYm9vbGVhbiB7XG4gICAgICBpZiAodGhpcy5pdGVtcyAmJiB0aGlzLmN1cnJlbnRPcHRpb25zKSB7XG4gICAgICAgICAgcmV0dXJuICh0aGlzLmN1cnJlbnRPcHRpb25zLml0ZW1JbmZpbml0eU1vdmUgfHwgdGhpcy5zZWxlY3RlZEluZGV4ID4gMCkgPyB0cnVlIDogZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgfVxuXG4gIHByZXZpZXdTZWxlY3QoaW5kZXg6IG51bWJlcikge1xuICAgICAgdGhpcy5wcmV2aWV3Q2hhbmdlLmVtaXQoe2luZGV4LCBpdGVtOiB0aGlzLml0ZW1zW2luZGV4XX0pO1xuICB9XG5cbiAgbW92ZVRodW1ibmFpbHNSaWdodCgpIHtcbiAgICAgIHRoaXMudGh1bWJuYWlsLm1vdmVSaWdodCgpO1xuICB9XG5cbiAgbW92ZVRodW1ibmFpbHNMZWZ0KCkge1xuICAgICAgdGhpcy50aHVtYm5haWwubW92ZUxlZnQoKTtcbiAgfVxuXG4gIGNhbk1vdmVUaHVtYm5haWxzUmlnaHQoKSB7XG4gICAgICByZXR1cm4gdGhpcy50aHVtYm5haWwuY2FuTW92ZVJpZ2h0KCk7XG4gIH1cblxuICBjYW5Nb3ZlVGh1bWJuYWlsc0xlZnQoKSB7XG4gICAgICByZXR1cm4gdGhpcy50aHVtYm5haWwuY2FuTW92ZUxlZnQoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRUaHVtYm5haWxzKCkge1xuICAgICAgaWYgKHRoaXMudGh1bWJuYWlsKSB7XG4gICAgICAgICAgdGhpcy50aHVtYm5haWwucmVzZXQoPG51bWJlcj50aGlzLmN1cnJlbnRPcHRpb25zLnN0YXJ0SW5kZXgpO1xuICAgICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZWxlY3QoaW5kZXg6IG51bWJlcikge1xuICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gaW5kZXg7XG5cbiAgICAgIHRoaXMuY2hhbmdlLmVtaXQoe1xuICAgICAgICAgIGluZGV4LFxuICAgICAgICAgIGl0ZW06IHRoaXMuaXRlbXNbaW5kZXhdXG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tGdWxsV2lkdGgoKTogdm9pZCB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50T3B0aW9ucyAmJiB0aGlzLmN1cnJlbnRPcHRpb25zLmZ1bGxXaWR0aCkge1xuICAgICAgICAgIHRoaXMud2lkdGggPSBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoICsgJ3B4JztcbiAgICAgICAgICB0aGlzLmxlZnQgPSAoLShkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoIC1cbiAgICAgICAgICAgICAgdGhpcy5teUVsZW1lbnQubmF0aXZlRWxlbWVudC5wYXJlbnROb2RlLmlubmVyV2lkdGgpIC8gMikgKyAncHgnO1xuICAgICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRJdGVtcygpOiB2b2lkIHtcbiAgICAgIHRoaXMudGh1bWJuYWlscyA9IHRoaXMuaXRlbXMubWFwKChpdGVtLCBpKSA9PiBuZXcgTmJHYWxsZXJ5VGh1bWJuYWlsKHtcbiAgICAgICAgICB0eXBlOiBpdGVtLnR5cGUsXG4gICAgICAgICAgc291cmNlOiBpdGVtLnNvdXJjZSxcbiAgICAgICAgICB1cmw6IGl0ZW0udHlwZSA9PT0gJ2ltYWdlJyA/IGl0ZW0uc21hbGwgOiB0aGlzLmN1cnJlbnRPcHRpb25zLmRlZmF1bHRWaWRlb1RodW1ibm5haWxVcmxcbiAgICAgIH0pKTtcbiAgICAgIHRoaXMuZ2FsbGVyeUl0ZW1zID0gdGhpcy5pdGVtcy5tYXAoKGl0ZW0sIGkpID0+IG5ldyBOYkdhbGxlcnlPcmRlcmVkSXRlbSh7XG4gICAgICAgICAgdHlwZTogaXRlbS50eXBlLFxuICAgICAgICAgIHNvdXJjZTogaXRlbS5zb3VyY2UsXG4gICAgICAgICAgdXJsOiBpdGVtLnR5cGUgPT09ICdpbWFnZScgPyBpdGVtLm1lZGl1bSA6IGl0ZW0udXJsLFxuICAgICAgICAgIGluZGV4OiBpXG4gICAgICB9KSk7XG4gICAgICB0aGlzLnByZXZpZXdJdGVtcyA9IHRoaXMuaXRlbXMubWFwKChpdGVtLCBpKSA9PiBuZXcgTmJHYWxsZXJ5T3JkZXJlZEl0ZW0oe1xuICAgICAgICAgIHR5cGU6IGl0ZW0udHlwZSxcbiAgICAgICAgICBzb3VyY2U6IGl0ZW0uc291cmNlLFxuICAgICAgICAgIHVybDogaXRlbS50eXBlID09PSAnaW1hZ2UnID8gaXRlbS5iaWcgOiBpdGVtLnVybCxcbiAgICAgICAgICBpbmRleDogaVxuICAgICAgfSkpO1xuICAgICAgdGhpcy5kZXNjcmlwdGlvbnMgPSB0aGlzLml0ZW1zLm1hcCgoaXRlbSkgPT4gPHN0cmluZz5pdGVtLmRlc2NyaXB0aW9uKTtcbiAgICAgIHRoaXMubGlua3MgPSB0aGlzLml0ZW1zLm1hcCgoaXRlbSkgPT4gPHN0cmluZz5pdGVtLnVybCk7XG4gICAgICB0aGlzLmxhYmVscyA9IHRoaXMuaXRlbXMubWFwKChpdGVtKSA9PiA8c3RyaW5nPml0ZW0ubGFiZWwpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRCcmVha3BvaW50KCk6IHZvaWQge1xuICAgICAgdGhpcy5wcmV2QnJlYWtwb2ludCA9IHRoaXMuYnJlYWtwb2ludDtcbiAgICAgIGxldCBicmVha3BvaW50cztcblxuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgYnJlYWtwb2ludHMgPSB0aGlzLm9wdGlvbnMuZmlsdGVyKChvcHQpID0+IG9wdC5icmVha3BvaW50ID49IHdpbmRvdy5pbm5lcldpZHRoKVxuICAgICAgICAgICAgICAubWFwKChvcHQpID0+IG9wdC5icmVha3BvaW50KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGJyZWFrcG9pbnRzICYmIGJyZWFrcG9pbnRzLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuYnJlYWtwb2ludCA9IGJyZWFrcG9pbnRzLnBvcCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmJyZWFrcG9pbnQgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gIH1cblxuICBwcml2YXRlIHNvcnRPcHRpb25zKCk6IHZvaWQge1xuICAgICAgdGhpcy5vcHRpb25zID0gW1xuICAgICAgICAgIC4uLnRoaXMub3B0aW9ucy5maWx0ZXIoKGEpID0+IGEuYnJlYWtwb2ludCA9PT0gdW5kZWZpbmVkKSxcbiAgICAgICAgICAuLi50aGlzLm9wdGlvbnNcbiAgICAgICAgICAgICAgLmZpbHRlcigoYSkgPT4gYS5icmVha3BvaW50ICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgIC5zb3J0KChhLCBiKSA9PiBiLmJyZWFrcG9pbnQgLSBhLmJyZWFrcG9pbnQpXG4gICAgICBdO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRPcHRpb25zKCk6IHZvaWQge1xuICAgICAgdGhpcy5jdXJyZW50T3B0aW9ucyA9IG5ldyBOYkdhbGxlcnlPcHRpb25zKHt9KTtcblxuICAgICAgdGhpcy5vcHRpb25zXG4gICAgICAgICAgLmZpbHRlcigob3B0KSA9PiBvcHQuYnJlYWtwb2ludCA9PT0gdW5kZWZpbmVkIHx8IG9wdC5icmVha3BvaW50ID49IHRoaXMuYnJlYWtwb2ludClcbiAgICAgICAgICAubWFwKChvcHQpID0+IHRoaXMuY29tYmluZU9wdGlvbnModGhpcy5jdXJyZW50T3B0aW9ucywgb3B0KSk7XG5cbiAgICAgIHRoaXMud2lkdGggPSA8c3RyaW5nPnRoaXMuY3VycmVudE9wdGlvbnMud2lkdGg7XG4gICAgICB0aGlzLmhlaWdodCA9IDxzdHJpbmc+dGhpcy5jdXJyZW50T3B0aW9ucy5oZWlnaHQ7XG4gIH1cblxuICBwcml2YXRlIGNvbWJpbmVPcHRpb25zKGZpcnN0OiBOYkdhbGxlcnlPcHRpb25zLCBzZWNvbmQ6IE5iR2FsbGVyeU9wdGlvbnMpIHtcbiAgICAgIE9iamVjdC5rZXlzKHNlY29uZCkubWFwKCh2YWwpID0+IGZpcnN0W3ZhbF0gPSBzZWNvbmRbdmFsXSAhPT0gdW5kZWZpbmVkID8gc2Vjb25kW3ZhbF0gOiBmaXJzdFt2YWxdKTtcbiAgfVxufVxuXG4iXX0=