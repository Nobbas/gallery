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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmItZ2FsbGVyeS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uYi1nYWxsZXJ5LyIsInNvdXJjZXMiOlsibGliL25iLWdhbGxlcnkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFDaEQsV0FBVyxFQUFXLFVBQVUsRUFBaUIsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUcvRixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxtREFBbUQsQ0FBQztBQUM5RixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUNyRixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSx5REFBeUQsQ0FBQztBQUN2RyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUdyRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUN6RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDbkUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7O0lBb0Q1RSw0QkFBb0IsU0FBcUI7UUFBckIsY0FBUyxHQUFULFNBQVMsQ0FBWTswQkFqQ2xCLElBQUksWUFBWSxFQUFFO3NCQUN0QixJQUFJLFlBQVksRUFBMkM7MkJBQ3RELElBQUksWUFBWSxFQUFFOzRCQUNqQixJQUFJLFlBQVksRUFBRTs2QkFDakIsSUFBSSxZQUFZLEVBQTJDOzhCQVVwRSxDQUFDOzZCQUVGLENBQUM7MEJBS3dCLFNBQVM7OEJBQ0wsU0FBUztLQVdUOzs7O0lBRTdDLHFDQUFROzs7SUFBUjtRQUNJLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFH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eUJBQ04sTUFBTTs4QkFDTixNQUFNOytCQUNOLE1BQU07Z0NBQ04sTUFBTTswQkFxQk4sU0FBUyxTQUFDLHlCQUF5Qjt1QkFDbkMsU0FBUyxTQUFDLHNCQUFzQjs0QkFDaEMsU0FBUyxTQUFDLDRCQUE0Qjt3QkFFdEMsV0FBVyxTQUFDLGFBQWE7eUJBQ3pCLFdBQVcsU0FBQyxjQUFjO3VCQUMxQixXQUFXLFNBQUMsWUFBWTsyQkE2Q3hCLFlBQVksU0FBQyxlQUFlOzs2QkE1Ry9COztTQTRCYSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBIb3N0TGlzdGVuZXIsIFZpZXdDaGlsZCwgT25Jbml0LFxuICBIb3N0QmluZGluZywgRG9DaGVjaywgRWxlbWVudFJlZiwgQWZ0ZXJWaWV3SW5pdCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNhZmVSZXNvdXJjZVVybCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5pbXBvcnQgeyBOYkdhbGxlcnlQcmV2aWV3Q29tcG9uZW50IH0gZnJvbSAnLi9uYi1nYWxsZXJ5LXByZXZpZXcvbmItZ2FsbGVyeS1wcmV2aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOYkdhbGxlcnlJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9uYi1nYWxsZXJ5LWl0ZW0vbmItZ2FsbGVyeS1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOYkdhbGxlcnlUaHVtYm5haWxzQ29tcG9uZW50IH0gZnJvbSAnLi9uYi1nYWxsZXJ5LXRodW1ibmFpbHMvbmItZ2FsbGVyeS10aHVtYm5haWxzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOYkdhbGxlcnlIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi9uYi1nYWxsZXJ5LWhlbHBlci5zZXJ2aWNlJztcblxuaW1wb3J0IHsgTmJHYWxsZXJ5SXRlbSB9IGZyb20gJy4vbW9kZWxzL25iLWdhbGxlcnktaXRlbS5tb2RlbCc7XG5pbXBvcnQgeyBOYkdhbGxlcnlPcHRpb25zIH0gZnJvbSAnLi9tb2RlbHMvbmItZ2FsbGVyeS1vcHRpb25zLm1vZGVsJztcbmltcG9ydCB7IE5iR2FsbGVyeVRodW1ibmFpbCB9IGZyb20gJy4vbW9kZWxzL25iLWdhbGxlcnktdGh1bWJuYWlsLm1vZGVsJztcbmltcG9ydCB7IE5iR2FsbGVyeUxheW91dCB9IGZyb20gJy4vbW9kZWxzL25iLWdhbGxlcnktbGF5b3V0Lm1vZGVsJztcbmltcG9ydCB7IE5iR2FsbGVyeU9yZGVyZWRJdGVtIH0gZnJvbSAnLi9tb2RlbHMvbmItZ2FsbGVyeS1vcmRlcmVkLWl0ZW0ubW9kZWwnO1xuaW1wb3J0IHsgTmJHYWxsZXJ5UHJldmlldyB9IGZyb20gJy4vbW9kZWxzL25iLWdhbGxlcnktcHJldmlldy5tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25iLWdhbGxlcnknLFxuICB0ZW1wbGF0ZTogYFxuICA8ZGl2IGNsYXNzPVwibmItZ2FsbGVyeS1sYXlvdXQge3tjdXJyZW50T3B0aW9ucz8ubGF5b3V0fX1cIj5cbiAgICAgIDxuYi1nYWxsZXJ5LWl0ZW0gICpuZ0lmPVwiY3VycmVudE9wdGlvbnM/Lml0ZW1cIiBbc3R5bGUuaGVpZ2h0XT1cImdldEl0ZW1IZWlnaHQoKVwiIFtpdGVtc109XCJnYWxsZXJ5SXRlbXNcIiBbY2xpY2thYmxlXT1cImN1cnJlbnRPcHRpb25zPy5wcmV2aWV3XCIgW3NlbGVjdGVkSW5kZXhdPVwic2VsZWN0ZWRJbmRleFwiIFthcnJvd3NdPVwiY3VycmVudE9wdGlvbnM/Lml0ZW1BcnJvd3NcIiBbYXJyb3dzQXV0b0hpZGVdPVwiY3VycmVudE9wdGlvbnM/Lml0ZW1BcnJvd3NBdXRvSGlkZVwiIFthcnJvd1ByZXZJY29uXT1cImN1cnJlbnRPcHRpb25zPy5hcnJvd1ByZXZJY29uXCIgW2Fycm93TmV4dEljb25dPVwiY3VycmVudE9wdGlvbnM/LmFycm93TmV4dEljb25cIiBbc3dpcGVdPVwiY3VycmVudE9wdGlvbnM/Lml0ZW1Td2lwZVwiIFthbmltYXRpb25dPVwiY3VycmVudE9wdGlvbnM/Lml0ZW1BbmltYXRpb25cIiBbc2l6ZV09XCJjdXJyZW50T3B0aW9ucz8uaXRlbVNpemVcIiBbYXV0b1BsYXldPVwiY3VycmVudE9wdGlvbnM/Lml0ZW1BdXRvUGxheVwiIFthdXRvUGxheUludGVydmFsXT1cImN1cnJlbnRPcHRpb25zPy5pdGVtQXV0b1BsYXlJbnRlcnZhbFwiIFthdXRvUGxheVBhdXNlT25Ib3Zlcl09XCJjdXJyZW50T3B0aW9ucz8uaXRlbUF1dG9QbGF5UGF1c2VPbkhvdmVyXCIgW2luZmluaXR5TW92ZV09XCJjdXJyZW50T3B0aW9ucz8uaXRlbUluZmluaXR5TW92ZVwiICBbbGF6eUxvYWRpbmddPVwiY3VycmVudE9wdGlvbnM/LmxhenlMb2FkaW5nXCIgW2FjdGlvbnNdPVwiY3VycmVudE9wdGlvbnM/Lml0ZW1BY3Rpb25zXCIgW2Rlc2NyaXB0aW9uc109XCJkZXNjcmlwdGlvbnNcIiBbc2hvd0Rlc2NyaXB0aW9uXT1cImN1cnJlbnRPcHRpb25zPy5pdGVtRGVzY3JpcHRpb25cIiBbYnVsbGV0c109XCJjdXJyZW50T3B0aW9ucz8uaXRlbUJ1bGxldHNcIiAob25DbGljayk9XCJvcGVuUHJldmlldygkZXZlbnQpXCIgKG9uQWN0aXZlQ2hhbmdlKT1cInNlbGVjdEZyb21JdGVtKCRldmVudClcIj48L25iLWdhbGxlcnktaXRlbT5cbiAgICAgIDxuYi1nYWxsZXJ5LXRodW1ibmFpbHMgKm5nSWY9XCJjdXJyZW50T3B0aW9ucz8udGh1bWJuYWlsc1wiIFtzdHlsZS5tYXJnaW5Ub3BdPVwiZ2V0VGh1bWJuYWlsc01hcmdpblRvcCgpXCIgW3N0eWxlLm1hcmdpbkJvdHRvbV09XCJnZXRUaHVtYm5haWxzTWFyZ2luQm90dG9tKClcIiBbc3R5bGUuaGVpZ2h0XT1cImdldFRodW1ibmFpbHNIZWlnaHQoKVwiIFtpdGVtc109XCJ0aHVtYm5haWxzXCIgW2xpbmtzXT1cImN1cnJlbnRPcHRpb25zPy50aHVtYm5haWxzQXNMaW5rcyA/IGxpbmtzIDogW11cIiBbbGFiZWxzXT1cImxhYmVsc1wiIFtsaW5rVGFyZ2V0XT1cImN1cnJlbnRPcHRpb25zPy5saW5rVGFyZ2V0XCIgW3NlbGVjdGVkSW5kZXhdPVwic2VsZWN0ZWRJbmRleFwiIFtjb2x1bW5zXT1cImN1cnJlbnRPcHRpb25zPy50aHVtYm5haWxzQ29sdW1uc1wiIFtyb3dzXT1cImN1cnJlbnRPcHRpb25zPy50aHVtYm5haWxzUm93c1wiIFttYXJnaW5dPVwiY3VycmVudE9wdGlvbnM/LnRodW1ibmFpbE1hcmdpblwiIFthcnJvd3NdPVwiY3VycmVudE9wdGlvbnM/LnRodW1ibmFpbHNBcnJvd3NcIiBbYXJyb3dzQXV0b0hpZGVdPVwiY3VycmVudE9wdGlvbnM/LnRodW1ibmFpbHNBcnJvd3NBdXRvSGlkZVwiIFthcnJvd1ByZXZJY29uXT1cImN1cnJlbnRPcHRpb25zPy5hcnJvd1ByZXZJY29uXCIgW2Fycm93TmV4dEljb25dPVwiY3VycmVudE9wdGlvbnM/LmFycm93TmV4dEljb25cIiBbY2xpY2thYmxlXT1cImN1cnJlbnRPcHRpb25zPy5pdGVtIHx8IGN1cnJlbnRPcHRpb25zPy5wcmV2aWV3XCIgW3N3aXBlXT1cImN1cnJlbnRPcHRpb25zPy50aHVtYm5haWxzU3dpcGVcIiBbc2l6ZV09XCJjdXJyZW50T3B0aW9ucz8udGh1bWJuYWlsU2l6ZVwiIFttb3ZlU2l6ZV09XCJjdXJyZW50T3B0aW9ucz8udGh1bWJuYWlsc01vdmVTaXplXCIgW29yZGVyXT1cImN1cnJlbnRPcHRpb25zPy50aHVtYm5haWxzT3JkZXJcIiBbcmVtYWluaW5nQ291bnRdPVwiY3VycmVudE9wdGlvbnM/LnRodW1ibmFpbHNSZW1haW5pbmdDb3VudFwiIFtsYXp5TG9hZGluZ109XCJjdXJyZW50T3B0aW9ucz8ubGF6eUxvYWRpbmdcIiBbYWN0aW9uc109XCJjdXJyZW50T3B0aW9ucz8udGh1bWJuYWlsQWN0aW9uc1wiICAob25BY3RpdmVDaGFuZ2UpPVwic2VsZWN0RnJvbVRodW1ibmFpbHMoJGV2ZW50KVwiPjwvbmItZ2FsbGVyeS10aHVtYm5haWxzPlxuICAgICAgPG5iLWdhbGxlcnktcHJldmlldyBbaXRlbXNdPVwicHJldmlld0l0ZW1zXCIgW2Rlc2NyaXB0aW9uc109XCJkZXNjcmlwdGlvbnNcIiBbc2hvd0Rlc2NyaXB0aW9uXT1cImN1cnJlbnRPcHRpb25zPy5wcmV2aWV3RGVzY3JpcHRpb25cIiBbYXJyb3dQcmV2SWNvbl09XCJjdXJyZW50T3B0aW9ucz8uYXJyb3dQcmV2SWNvblwiIFthcnJvd05leHRJY29uXT1cImN1cnJlbnRPcHRpb25zPy5hcnJvd05leHRJY29uXCIgW2Nsb3NlSWNvbl09XCJjdXJyZW50T3B0aW9ucz8uY2xvc2VJY29uXCIgW2Z1bGxzY3JlZW5JY29uXT1cImN1cnJlbnRPcHRpb25zPy5mdWxsc2NyZWVuSWNvblwiIFtzcGlubmVySWNvbl09XCJjdXJyZW50T3B0aW9ucz8uc3Bpbm5lckljb25cIiBbc3dpcGVdPVwiY3VycmVudE9wdGlvbnM/LnByZXZpZXdTd2lwZVwiIFtmdWxsc2NyZWVuXT1cImN1cnJlbnRPcHRpb25zPy5wcmV2aWV3RnVsbHNjcmVlblwiIFtmb3JjZUZ1bGxzY3JlZW5dPVwiY3VycmVudE9wdGlvbnM/LnByZXZpZXdGb3JjZUZ1bGxzY3JlZW5cIiBbY2xvc2VPbkNsaWNrXT1cImN1cnJlbnRPcHRpb25zPy5wcmV2aWV3Q2xvc2VPbkNsaWNrXCIgW2Nsb3NlT25Fc2NdPVwiY3VycmVudE9wdGlvbnM/LnByZXZpZXdDbG9zZU9uRXNjXCIgW2tleWJvYXJkTmF2aWdhdGlvbl09XCJjdXJyZW50T3B0aW9ucz8ucHJldmlld0tleWJvYXJkTmF2aWdhdGlvblwiIFthbmltYXRpb25dPVwiY3VycmVudE9wdGlvbnM/LnByZXZpZXdBbmltYXRpb25cIiBbYXV0b1BsYXldPVwiY3VycmVudE9wdGlvbnM/LnByZXZpZXdBdXRvUGxheVwiIFthdXRvUGxheUludGVydmFsXT1cImN1cnJlbnRPcHRpb25zPy5wcmV2aWV3QXV0b1BsYXlJbnRlcnZhbFwiIFthdXRvUGxheVBhdXNlT25Ib3Zlcl09XCJjdXJyZW50T3B0aW9ucz8ucHJldmlld0F1dG9QbGF5UGF1c2VPbkhvdmVyXCIgW2luZmluaXR5TW92ZV09XCJjdXJyZW50T3B0aW9ucz8ucHJldmlld0luZmluaXR5TW92ZVwiIFt6b29tXT1cImN1cnJlbnRPcHRpb25zPy5wcmV2aWV3Wm9vbVwiIFt6b29tU3RlcF09XCJjdXJyZW50T3B0aW9ucz8ucHJldmlld1pvb21TdGVwXCIgW3pvb21NYXhdPVwiY3VycmVudE9wdGlvbnM/LnByZXZpZXdab29tTWF4XCIgW3pvb21NaW5dPVwiY3VycmVudE9wdGlvbnM/LnByZXZpZXdab29tTWluXCIgW3pvb21Jbkljb25dPVwiY3VycmVudE9wdGlvbnM/Lnpvb21Jbkljb25cIiBbem9vbU91dEljb25dPVwiY3VycmVudE9wdGlvbnM/Lnpvb21PdXRJY29uXCIgW2FjdGlvbnNdPVwiY3VycmVudE9wdGlvbnM/LmFjdGlvbnNcIiBbcm90YXRlXT1cImN1cnJlbnRPcHRpb25zPy5wcmV2aWV3Um90YXRlXCIgW3JvdGF0ZUxlZnRJY29uXT1cImN1cnJlbnRPcHRpb25zPy5yb3RhdGVMZWZ0SWNvblwiIFtyb3RhdGVSaWdodEljb25dPVwiY3VycmVudE9wdGlvbnM/LnJvdGF0ZVJpZ2h0SWNvblwiIFtkb3dubG9hZF09XCJjdXJyZW50T3B0aW9ucz8ucHJldmlld0Rvd25sb2FkXCIgW2Rvd25sb2FkSWNvbl09XCJjdXJyZW50T3B0aW9ucz8uZG93bmxvYWRJY29uXCIgW2J1bGxldHNdPVwiY3VycmVudE9wdGlvbnM/LnByZXZpZXdCdWxsZXRzXCIgKG9uQ2xvc2UpPVwib25QcmV2aWV3Q2xvc2UoKVwiIChvbk9wZW4pPVwib25QcmV2aWV3T3BlbigpXCIgKG9uQWN0aXZlQ2hhbmdlKT1cInByZXZpZXdTZWxlY3QoJGV2ZW50KVwiIFtjbGFzcy5uYi1nYWxsZXJ5LWFjdGl2ZV09XCJwcmV2aWV3RW5hYmxlZFwiPjwvbmItZ2FsbGVyeS1wcmV2aWV3PlxuICA8L2Rpdj5cbiAgYCxcbiAgc3R5bGVVcmxzOiBbJy4vbmItZ2FsbGVyeS5jb21wb25lbnQuc2NzcyddLFxuICBwcm92aWRlcnM6IFtOYkdhbGxlcnlIZWxwZXJTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBOYkdhbGxlcnlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIERvQ2hlY2ssIEFmdGVyVmlld0luaXQgICB7XG4gIEBJbnB1dCgpIG9wdGlvbnM6IE5iR2FsbGVyeU9wdGlvbnNbXTtcbiAgQElucHV0KCkgaXRlbXM6IE5iR2FsbGVyeUl0ZW1bXTtcblxuICBAT3V0cHV0KCkgaXRlbXNSZWFkeSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8eyBpbmRleDogbnVtYmVyOyBpdGVtOiBOYkdhbGxlcnlJdGVtOyB9PigpO1xuICBAT3V0cHV0KCkgcHJldmlld09wZW4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBwcmV2aWV3Q2xvc2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBwcmV2aWV3Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjx7IGluZGV4OiBudW1iZXI7IGl0ZW06IE5iR2FsbGVyeUl0ZW07IH0+KCk7XG5cbiAgdGh1bWJuYWlsczogTmJHYWxsZXJ5VGh1bWJuYWlsW107XG4gIGdhbGxlcnlJdGVtczogTmJHYWxsZXJ5T3JkZXJlZEl0ZW1bXTtcbiAgcHJldmlld0l0ZW1zOiBOYkdhbGxlcnlPcmRlcmVkSXRlbVtdO1xuICBkZXNjcmlwdGlvbnM6IHN0cmluZ1tdO1xuICBsaW5rczogc3RyaW5nW107XG4gIGxhYmVsczogc3RyaW5nW107XG5cbiAgb2xkSXRlbXM6IE5iR2FsbGVyeUl0ZW1bXTtcbiAgb2xkSXRlbXNMZW5ndGggPSAwO1xuXG4gIHNlbGVjdGVkSW5kZXggPSAwO1xuICBwcmV2aWV3RW5hYmxlZDogYm9vbGVhbjtcblxuICBjdXJyZW50T3B0aW9uczogTmJHYWxsZXJ5T3B0aW9ucztcblxuICBwcml2YXRlIGJyZWFrcG9pbnQ6IG51bWJlciB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBwcmV2QnJlYWtwb2ludDogbnVtYmVyIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICBwcml2YXRlIGZ1bGxXaWR0aFRpbWVvdXQ6IGFueTtcblxuICBAVmlld0NoaWxkKE5iR2FsbGVyeVByZXZpZXdDb21wb25lbnQpIHByZXZpZXc6IE5iR2FsbGVyeVByZXZpZXdDb21wb25lbnQ7XG4gIEBWaWV3Q2hpbGQoTmJHYWxsZXJ5SXRlbUNvbXBvbmVudCkgaXRlbTogTmJHYWxsZXJ5SXRlbUNvbXBvbmVudDtcbiAgQFZpZXdDaGlsZChOYkdhbGxlcnlUaHVtYm5haWxzQ29tcG9uZW50KSB0aHVtYm5haWw6IE5iR2FsbGVyeVRodW1ibmFpbHNDb21wb25lbnQ7XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS53aWR0aCcpIHdpZHRoOiBzdHJpbmc7XG4gIEBIb3N0QmluZGluZygnc3R5bGUuaGVpZ2h0JykgaGVpZ2h0OiBzdHJpbmc7XG4gIEBIb3N0QmluZGluZygnc3R5bGUubGVmdCcpIGxlZnQ6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG15RWxlbWVudDogRWxlbWVudFJlZikge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICAgIHRoaXMub3B0aW9ucyA9IHRoaXMub3B0aW9ucy5tYXAoKG9wdCkgPT4gbmV3IE5iR2FsbGVyeU9wdGlvbnMob3B0KSk7XG4gICAgICB0aGlzLnNvcnRPcHRpb25zKCk7XG4gICAgICB0aGlzLnNldEJyZWFrcG9pbnQoKTtcbiAgICAgIHRoaXMuc2V0T3B0aW9ucygpO1xuICAgICAgdGhpcy5jaGVja0Z1bGxXaWR0aCgpO1xuICAgICAgaWYgKHRoaXMuY3VycmVudE9wdGlvbnMpIHtcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSA8bnVtYmVyPnRoaXMuY3VycmVudE9wdGlvbnMuc3RhcnRJbmRleDtcbiAgICAgIH1cbiAgfVxuXG4gIG5nRG9DaGVjaygpOiB2b2lkIHtcbiAgICAgIGlmICh0aGlzLml0ZW1zICE9PSB1bmRlZmluZWQgJiYgKHRoaXMuaXRlbXMubGVuZ3RoICE9PSB0aGlzLm9sZEl0ZW1zTGVuZ3RoKVxuICAgICAgICAgIHx8ICh0aGlzLml0ZW1zICE9PSB0aGlzLm9sZEl0ZW1zKSkge1xuICAgICAgICAgIHRoaXMub2xkSXRlbXNMZW5ndGggPSB0aGlzLml0ZW1zLmxlbmd0aDtcbiAgICAgICAgICB0aGlzLm9sZEl0ZW1zID0gdGhpcy5pdGVtcztcbiAgICAgICAgICB0aGlzLnNldE9wdGlvbnMoKTtcbiAgICAgICAgICB0aGlzLnNldEl0ZW1zKCk7XG5cbiAgICAgICAgICBpZiAodGhpcy5pdGVtcyAmJiB0aGlzLml0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgICB0aGlzLml0ZW1zUmVhZHkuZW1pdCgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0aGlzLml0ZW0pIHtcbiAgICAgICAgICAgICAgdGhpcy5pdGVtLnJlc2V0KDxudW1iZXI+dGhpcy5jdXJyZW50T3B0aW9ucy5zdGFydEluZGV4KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGhpcy5jdXJyZW50T3B0aW9ucy50aHVtYm5haWxzQXV0b0hpZGUgJiYgdGhpcy5jdXJyZW50T3B0aW9ucy50aHVtYm5haWxzXG4gICAgICAgICAgICAgICYmIHRoaXMuaXRlbXMubGVuZ3RoIDw9IDEpIHtcbiAgICAgICAgICAgICAgdGhpcy5jdXJyZW50T3B0aW9ucy50aHVtYm5haWxzID0gZmFsc2U7XG4gICAgICAgICAgICAgIHRoaXMuY3VycmVudE9wdGlvbnMuaXRlbUFycm93cyA9IGZhbHNlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMucmVzZXRUaHVtYm5haWxzKCk7XG4gICAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICB0aGlzLmNoZWNrRnVsbFdpZHRoKCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJykgb25SZXNpemUoKSB7XG4gICAgICB0aGlzLnNldEJyZWFrcG9pbnQoKTtcblxuICAgICAgaWYgKHRoaXMucHJldkJyZWFrcG9pbnQgIT09IHRoaXMuYnJlYWtwb2ludCkge1xuICAgICAgICAgIHRoaXMuc2V0T3B0aW9ucygpO1xuICAgICAgICAgIHRoaXMucmVzZXRUaHVtYm5haWxzKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmN1cnJlbnRPcHRpb25zICYmIHRoaXMuY3VycmVudE9wdGlvbnMuZnVsbFdpZHRoKSB7XG5cbiAgICAgICAgICBpZiAodGhpcy5mdWxsV2lkdGhUaW1lb3V0KSB7XG4gICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmZ1bGxXaWR0aFRpbWVvdXQpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuZnVsbFdpZHRoVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmNoZWNrRnVsbFdpZHRoKCk7XG4gICAgICAgICAgfSwgMjAwKTtcbiAgICAgIH1cbiAgfVxuXG4gIGdldEl0ZW1IZWlnaHQoKTogc3RyaW5nIHtcbiAgICAgIHJldHVybiAodGhpcy5jdXJyZW50T3B0aW9ucyAmJiB0aGlzLmN1cnJlbnRPcHRpb25zLnRodW1ibmFpbHMpID9cbiAgICAgICAgICB0aGlzLmN1cnJlbnRPcHRpb25zLml0ZW1QZXJjZW50ICsgJyUnIDogJzEwMCUnO1xuICB9XG5cbiAgZ2V0VGh1bWJuYWlsc0hlaWdodCgpOiBzdHJpbmcge1xuICAgICAgaWYgKHRoaXMuY3VycmVudE9wdGlvbnMgJiYgdGhpcy5jdXJyZW50T3B0aW9ucy5pdGVtKSB7XG4gICAgICAgICAgcmV0dXJuICdjYWxjKCcgKyB0aGlzLmN1cnJlbnRPcHRpb25zLnRodW1ibmFpbHNQZXJjZW50ICsgJyUgLSAnXG4gICAgICAgICAgKyB0aGlzLmN1cnJlbnRPcHRpb25zLnRodW1ibmFpbHNNYXJnaW4gKyAncHgpJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuICcxMDAlJztcbiAgICAgIH1cbiAgfVxuXG4gIGdldFRodW1ibmFpbHNNYXJnaW5Ub3AoKTogc3RyaW5nIHtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRPcHRpb25zICYmIHRoaXMuY3VycmVudE9wdGlvbnMubGF5b3V0ID09PSBOYkdhbGxlcnlMYXlvdXQuVGh1bWJuYWlsc0JvdHRvbSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRPcHRpb25zLnRodW1ibmFpbHNNYXJnaW4gKyAncHgnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gJzBweCc7XG4gICAgICB9XG4gIH1cblxuICBnZXRUaHVtYm5haWxzTWFyZ2luQm90dG9tKCk6IHN0cmluZyB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50T3B0aW9ucyAmJiB0aGlzLmN1cnJlbnRPcHRpb25zLmxheW91dCA9PT0gTmJHYWxsZXJ5TGF5b3V0LlRodW1ibmFpbHNUb3ApIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50T3B0aW9ucy50aHVtYm5haWxzTWFyZ2luICsgJ3B4JztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuICcwcHgnO1xuICAgICAgfVxuICB9XG5cbiAgb3BlblByZXZpZXcoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgICAgaWYgKHRoaXMuY3VycmVudE9wdGlvbnMucHJldmlld0N1c3RvbSkge1xuICAgICAgICAgIHRoaXMuY3VycmVudE9wdGlvbnMucHJldmlld0N1c3RvbShpbmRleCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucHJldmlld0VuYWJsZWQgPSB0cnVlO1xuICAgICAgICAgIHRoaXMucHJldmlldy5vcGVuKGluZGV4KTtcbiAgICAgIH1cbiAgfVxuXG4gIG9uUHJldmlld09wZW4oKTogdm9pZCB7XG4gICAgICB0aGlzLnByZXZpZXdPcGVuLmVtaXQoKTtcblxuICAgICAgaWYgKHRoaXMuaXRlbSAmJiB0aGlzLml0ZW0uYXV0b1BsYXkpIHtcbiAgICAgICAgICB0aGlzLml0ZW0uc3RvcEF1dG9QbGF5KCk7XG4gICAgICB9XG4gIH1cblxuICBvblByZXZpZXdDbG9zZSgpOiB2b2lkIHtcbiAgICAgIHRoaXMucHJldmlld0VuYWJsZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMucHJldmlld0Nsb3NlLmVtaXQoKTtcblxuICAgICAgaWYgKHRoaXMuaXRlbSAmJiB0aGlzLml0ZW0uYXV0b1BsYXkpIHtcbiAgICAgICAgICB0aGlzLml0ZW0uc3RhcnRBdXRvUGxheSgpO1xuICAgICAgfVxuICB9XG5cbiAgc2VsZWN0RnJvbUl0ZW0oaW5kZXg6IG51bWJlcikge1xuICAgICAgdGhpcy5zZWxlY3QoaW5kZXgpO1xuICB9XG5cbiAgc2VsZWN0RnJvbVRodW1ibmFpbHMoaW5kZXg6IG51bWJlcikge1xuICAgICAgdGhpcy5zZWxlY3QoaW5kZXgpO1xuXG4gICAgICBpZiAodGhpcy5jdXJyZW50T3B0aW9ucyAmJiB0aGlzLmN1cnJlbnRPcHRpb25zLnRodW1ibmFpbHMgJiYgdGhpcy5jdXJyZW50T3B0aW9ucy5wcmV2aWV3XG4gICAgICAgICAgJiYgKCF0aGlzLmN1cnJlbnRPcHRpb25zLml0ZW0gfHwgdGhpcy5jdXJyZW50T3B0aW9ucy50aHVtYm5haWxzUmVtYWluaW5nQ291bnQpKSB7XG4gICAgICAgICAgdGhpcy5vcGVuUHJldmlldyh0aGlzLnNlbGVjdGVkSW5kZXgpO1xuICAgICAgfVxuICB9XG5cbiAgc2hvdyhpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICB0aGlzLnNlbGVjdChpbmRleCk7XG4gIH1cblxuICBzaG93TmV4dCgpOiB2b2lkIHtcbiAgICAgIHRoaXMuaXRlbS5zaG93TmV4dCgpO1xuICB9XG5cbiAgc2hvd1ByZXYoKTogdm9pZCB7XG4gICAgICB0aGlzLml0ZW0uc2hvd1ByZXYoKTtcbiAgfVxuXG4gIGNhblNob3dOZXh0KCk6IGJvb2xlYW4ge1xuICAgICAgaWYgKHRoaXMuaXRlbXMgJiYgdGhpcy5jdXJyZW50T3B0aW9ucykge1xuICAgICAgICAgIHJldHVybiAodGhpcy5jdXJyZW50T3B0aW9ucy5pdGVtSW5maW5pdHlNb3ZlIHx8IHRoaXMuc2VsZWN0ZWRJbmRleCA8IHRoaXMuaXRlbXMubGVuZ3RoIC0gMSlcbiAgICAgICAgICAgICAgPyB0cnVlIDogZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgfVxuXG4gIGNhblNob3dQcmV2KCk6IGJvb2xlYW4ge1xuICAgICAgaWYgKHRoaXMuaXRlbXMgJiYgdGhpcy5jdXJyZW50T3B0aW9ucykge1xuICAgICAgICAgIHJldHVybiAodGhpcy5jdXJyZW50T3B0aW9ucy5pdGVtSW5maW5pdHlNb3ZlIHx8IHRoaXMuc2VsZWN0ZWRJbmRleCA+IDApID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gIH1cblxuICBwcmV2aWV3U2VsZWN0KGluZGV4OiBudW1iZXIpIHtcbiAgICAgIHRoaXMucHJldmlld0NoYW5nZS5lbWl0KHtpbmRleCwgaXRlbTogdGhpcy5pdGVtc1tpbmRleF19KTtcbiAgfVxuXG4gIG1vdmVUaHVtYm5haWxzUmlnaHQoKSB7XG4gICAgICB0aGlzLnRodW1ibmFpbC5tb3ZlUmlnaHQoKTtcbiAgfVxuXG4gIG1vdmVUaHVtYm5haWxzTGVmdCgpIHtcbiAgICAgIHRoaXMudGh1bWJuYWlsLm1vdmVMZWZ0KCk7XG4gIH1cblxuICBjYW5Nb3ZlVGh1bWJuYWlsc1JpZ2h0KCkge1xuICAgICAgcmV0dXJuIHRoaXMudGh1bWJuYWlsLmNhbk1vdmVSaWdodCgpO1xuICB9XG5cbiAgY2FuTW92ZVRodW1ibmFpbHNMZWZ0KCkge1xuICAgICAgcmV0dXJuIHRoaXMudGh1bWJuYWlsLmNhbk1vdmVMZWZ0KCk7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0VGh1bWJuYWlscygpIHtcbiAgICAgIGlmICh0aGlzLnRodW1ibmFpbCkge1xuICAgICAgICAgIHRoaXMudGh1bWJuYWlsLnJlc2V0KDxudW1iZXI+dGhpcy5jdXJyZW50T3B0aW9ucy5zdGFydEluZGV4KTtcbiAgICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2VsZWN0KGluZGV4OiBudW1iZXIpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IGluZGV4O1xuXG4gICAgICB0aGlzLmNoYW5nZS5lbWl0KHtcbiAgICAgICAgICBpbmRleCxcbiAgICAgICAgICBpdGVtOiB0aGlzLml0ZW1zW2luZGV4XVxuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGNoZWNrRnVsbFdpZHRoKCk6IHZvaWQge1xuICAgICAgaWYgKHRoaXMuY3VycmVudE9wdGlvbnMgJiYgdGhpcy5jdXJyZW50T3B0aW9ucy5mdWxsV2lkdGgpIHtcbiAgICAgICAgICB0aGlzLndpZHRoID0gZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCArICdweCc7XG4gICAgICAgICAgdGhpcy5sZWZ0ID0gKC0oZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCAtXG4gICAgICAgICAgICAgIHRoaXMubXlFbGVtZW50Lm5hdGl2ZUVsZW1lbnQucGFyZW50Tm9kZS5pbm5lcldpZHRoKSAvIDIpICsgJ3B4JztcbiAgICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0SXRlbXMoKTogdm9pZCB7XG4gICAgICB0aGlzLnRodW1ibmFpbHMgPSB0aGlzLml0ZW1zLm1hcCgoaXRlbSwgaSkgPT4gbmV3IE5iR2FsbGVyeVRodW1ibmFpbCh7XG4gICAgICAgICAgdHlwZTogaXRlbS50eXBlLFxuICAgICAgICAgIHNvdXJjZTogaXRlbS5zb3VyY2UsXG4gICAgICAgICAgdXJsOiBpdGVtLnR5cGUgPT09ICdpbWFnZScgPyBpdGVtLnNtYWxsIDogdGhpcy5jdXJyZW50T3B0aW9ucy5kZWZhdWx0VmlkZW9UaHVtYm5uYWlsVXJsXG4gICAgICB9KSk7XG4gICAgICB0aGlzLmdhbGxlcnlJdGVtcyA9IHRoaXMuaXRlbXMubWFwKChpdGVtLCBpKSA9PiBuZXcgTmJHYWxsZXJ5T3JkZXJlZEl0ZW0oe1xuICAgICAgICAgIHR5cGU6IGl0ZW0udHlwZSxcbiAgICAgICAgICBzb3VyY2U6IGl0ZW0uc291cmNlLFxuICAgICAgICAgIHVybDogaXRlbS50eXBlID09PSAnaW1hZ2UnID8gaXRlbS5tZWRpdW0gOiBpdGVtLnVybCxcbiAgICAgICAgICBpbmRleDogaVxuICAgICAgfSkpO1xuICAgICAgdGhpcy5wcmV2aWV3SXRlbXMgPSB0aGlzLml0ZW1zLm1hcCgoaXRlbSwgaSkgPT4gbmV3IE5iR2FsbGVyeU9yZGVyZWRJdGVtKHtcbiAgICAgICAgICB0eXBlOiBpdGVtLnR5cGUsXG4gICAgICAgICAgc291cmNlOiBpdGVtLnNvdXJjZSxcbiAgICAgICAgICB1cmw6IGl0ZW0udHlwZSA9PT0gJ2ltYWdlJyA/IGl0ZW0uYmlnIDogaXRlbS51cmwsXG4gICAgICAgICAgaW5kZXg6IGlcbiAgICAgIH0pKTtcbiAgICAgIHRoaXMuZGVzY3JpcHRpb25zID0gdGhpcy5pdGVtcy5tYXAoKGl0ZW0pID0+IDxzdHJpbmc+aXRlbS5kZXNjcmlwdGlvbik7XG4gICAgICB0aGlzLmxpbmtzID0gdGhpcy5pdGVtcy5tYXAoKGl0ZW0pID0+IDxzdHJpbmc+aXRlbS51cmwpO1xuICAgICAgdGhpcy5sYWJlbHMgPSB0aGlzLml0ZW1zLm1hcCgoaXRlbSkgPT4gPHN0cmluZz5pdGVtLmxhYmVsKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0QnJlYWtwb2ludCgpOiB2b2lkIHtcbiAgICAgIHRoaXMucHJldkJyZWFrcG9pbnQgPSB0aGlzLmJyZWFrcG9pbnQ7XG4gICAgICBsZXQgYnJlYWtwb2ludHM7XG5cbiAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGJyZWFrcG9pbnRzID0gdGhpcy5vcHRpb25zLmZpbHRlcigob3B0KSA9PiBvcHQuYnJlYWtwb2ludCA+PSB3aW5kb3cuaW5uZXJXaWR0aClcbiAgICAgICAgICAgICAgLm1hcCgob3B0KSA9PiBvcHQuYnJlYWtwb2ludCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChicmVha3BvaW50cyAmJiBicmVha3BvaW50cy5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLmJyZWFrcG9pbnQgPSBicmVha3BvaW50cy5wb3AoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5icmVha3BvaW50ID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzb3J0T3B0aW9ucygpOiB2b2lkIHtcbiAgICAgIHRoaXMub3B0aW9ucyA9IFtcbiAgICAgICAgICAuLi50aGlzLm9wdGlvbnMuZmlsdGVyKChhKSA9PiBhLmJyZWFrcG9pbnQgPT09IHVuZGVmaW5lZCksXG4gICAgICAgICAgLi4udGhpcy5vcHRpb25zXG4gICAgICAgICAgICAgIC5maWx0ZXIoKGEpID0+IGEuYnJlYWtwb2ludCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAuc29ydCgoYSwgYikgPT4gYi5icmVha3BvaW50IC0gYS5icmVha3BvaW50KVxuICAgICAgXTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0T3B0aW9ucygpOiB2b2lkIHtcbiAgICAgIHRoaXMuY3VycmVudE9wdGlvbnMgPSBuZXcgTmJHYWxsZXJ5T3B0aW9ucyh7fSk7XG5cbiAgICAgIHRoaXMub3B0aW9uc1xuICAgICAgICAgIC5maWx0ZXIoKG9wdCkgPT4gb3B0LmJyZWFrcG9pbnQgPT09IHVuZGVmaW5lZCB8fCBvcHQuYnJlYWtwb2ludCA+PSB0aGlzLmJyZWFrcG9pbnQpXG4gICAgICAgICAgLm1hcCgob3B0KSA9PiB0aGlzLmNvbWJpbmVPcHRpb25zKHRoaXMuY3VycmVudE9wdGlvbnMsIG9wdCkpO1xuXG4gICAgICB0aGlzLndpZHRoID0gPHN0cmluZz50aGlzLmN1cnJlbnRPcHRpb25zLndpZHRoO1xuICAgICAgdGhpcy5oZWlnaHQgPSA8c3RyaW5nPnRoaXMuY3VycmVudE9wdGlvbnMuaGVpZ2h0O1xuICB9XG5cbiAgcHJpdmF0ZSBjb21iaW5lT3B0aW9ucyhmaXJzdDogTmJHYWxsZXJ5T3B0aW9ucywgc2Vjb25kOiBOYkdhbGxlcnlPcHRpb25zKSB7XG4gICAgICBPYmplY3Qua2V5cyhzZWNvbmQpLm1hcCgodmFsKSA9PiBmaXJzdFt2YWxdID0gc2Vjb25kW3ZhbF0gIT09IHVuZGVmaW5lZCA/IHNlY29uZFt2YWxdIDogZmlyc3RbdmFsXSk7XG4gIH1cbn1cblxuIl19