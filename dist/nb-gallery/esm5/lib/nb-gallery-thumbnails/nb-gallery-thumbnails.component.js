/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NbGalleryHelperService } from '../nb-gallery-helper.service';
import { NbGalleryOrder } from '../models/nb-gallery-order.model';
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
export { NbGalleryThumbnailsComponent };
if (false) {
    /** @type {?} */
    NbGalleryThumbnailsComponent.prototype.thumbnailsLeft;
    /** @type {?} */
    NbGalleryThumbnailsComponent.prototype.thumbnailsMarginLeft;
    /** @type {?} */
    NbGalleryThumbnailsComponent.prototype.mouseenter;
    /** @type {?} */
    NbGalleryThumbnailsComponent.prototype.remainingCountValue;
    /** @type {?} */
    NbGalleryThumbnailsComponent.prototype.minStopIndex;
    /** @type {?} */
    NbGalleryThumbnailsComponent.prototype.items;
    /** @type {?} */
    NbGalleryThumbnailsComponent.prototype.links;
    /** @type {?} */
    NbGalleryThumbnailsComponent.prototype.labels;
    /** @type {?} */
    NbGalleryThumbnailsComponent.prototype.linkTarget;
    /** @type {?} */
    NbGalleryThumbnailsComponent.prototype.columns;
    /** @type {?} */
    NbGalleryThumbnailsComponent.prototype.rows;
    /** @type {?} */
    NbGalleryThumbnailsComponent.prototype.arrows;
    /** @type {?} */
    NbGalleryThumbnailsComponent.prototype.arrowsAutoHide;
    /** @type {?} */
    NbGalleryThumbnailsComponent.prototype.margin;
    /** @type {?} */
    NbGalleryThumbnailsComponent.prototype.selectedIndex;
    /** @type {?} */
    NbGalleryThumbnailsComponent.prototype.clickable;
    /** @type {?} */
    NbGalleryThumbnailsComponent.prototype.swipe;
    /** @type {?} */
    NbGalleryThumbnailsComponent.prototype.size;
    /** @type {?} */
    NbGalleryThumbnailsComponent.prototype.arrowPrevIcon;
    /** @type {?} */
    NbGalleryThumbnailsComponent.prototype.arrowNextIcon;
    /** @type {?} */
    NbGalleryThumbnailsComponent.prototype.moveSize;
    /** @type {?} */
    NbGalleryThumbnailsComponent.prototype.order;
    /** @type {?} */
    NbGalleryThumbnailsComponent.prototype.remainingCount;
    /** @type {?} */
    NbGalleryThumbnailsComponent.prototype.lazyLoading;
    /** @type {?} */
    NbGalleryThumbnailsComponent.prototype.actions;
    /** @type {?} */
    NbGalleryThumbnailsComponent.prototype.onActiveChange;
    /** @type {?} */
    NbGalleryThumbnailsComponent.prototype.index;
    /** @type {?} */
    NbGalleryThumbnailsComponent.prototype.sanitization;
    /** @type {?} */
    NbGalleryThumbnailsComponent.prototype.elementRef;
    /** @type {?} */
    NbGalleryThumbnailsComponent.prototype.helperService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmItZ2FsbGVyeS10aHVtYm5haWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25iLWdhbGxlcnkvIiwic291cmNlcyI6WyJsaWIvbmItZ2FsbGVyeS10aHVtYm5haWxzL25iLWdhbGxlcnktdGh1bWJuYWlscy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUE0QixVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0gsT0FBTyxFQUFFLFlBQVksRUFBOEIsTUFBTSwyQkFBMkIsQ0FBQztBQUVyRixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0NBQWtDLENBQUM7O0lBeUQ5RCxzQ0FBb0IsWUFBMEIsRUFBVSxVQUFzQixFQUNsRTtRQURRLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQVUsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUNsRSxrQkFBYSxHQUFiLGFBQWE7NEJBNUJWLENBQUM7OEJBdUJXLElBQUksWUFBWSxFQUFFO3FCQUU3QixDQUFDO0tBR29DOzs7OztJQUVyRCxrREFBVzs7OztJQUFYLFVBQVksT0FBc0I7UUFBbEMsaUJBYUM7UUFaRyxJQUFJLE9BQU8sQ0FBQyxlQUFlLENBQUMsRUFBRTtZQUMxQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7UUFFRCxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNsQixJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQzFELFlBQVksRUFBRSxjQUFNLE9BQUEsS0FBSSxDQUFDLFNBQVMsRUFBRSxFQUFoQixDQUFnQixFQUFFLGNBQU0sT0FBQSxLQUFJLENBQUMsUUFBUSxFQUFFLEVBQWYs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QkFBc0I7Ozt3QkFpQzFCLEtBQUs7d0JBQ0wsS0FBSzt5QkFDTCxLQUFLOzZCQUNMLEtBQUs7MEJBQ0wsS0FBSzt1QkFDTCxLQUFLO3lCQUNMLEtBQUs7aUNBQ0wsS0FBSzt5QkFDTCxLQUFLO2dDQUNMLEtBQUs7NEJBQ0wsS0FBSzt3QkFDTCxLQUFLO3VCQUNMLEtBQUs7Z0NBQ0wsS0FBSztnQ0FDTCxLQUFLOzJCQUNMLEtBQUs7d0JBQ0wsS0FBSztpQ0FDTCxLQUFLOzhCQUNMLEtBQUs7MEJBQ0wsS0FBSztpQ0FFTCxNQUFNOytCQXNCTixZQUFZLFNBQUMsWUFBWTsrQkFJekIsWUFBWSxTQUFDLFlBQVk7O3VDQW5GOUI7O1NBMkJhLDRCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyLCBTYWZlU3R5bGUsIFNhZmVSZXNvdXJjZVVybCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5pbXBvcnQgeyBOYkdhbGxlcnlIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi4vbmItZ2FsbGVyeS1oZWxwZXIuc2VydmljZSc7XG5pbXBvcnQgeyBOYkdhbGxlcnlPcmRlciB9IGZyb20gJy4uL21vZGVscy9uYi1nYWxsZXJ5LW9yZGVyLm1vZGVsJztcbmltcG9ydCB7IE5iR2FsbGVyeUFjdGlvbiB9IGZyb20gJy4uL21vZGVscy9uYi1nYWxsZXJ5LWFjdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBOYkdhbGxlcnlUaHVtYm5haWwgfSBmcm9tICcuLi9tb2RlbHMvbmItZ2FsbGVyeS10aHVtYm5haWwubW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ25iLWdhbGxlcnktdGh1bWJuYWlscycsXG4gICAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwibmItZ2FsbGVyeS10aHVtYm5haWxzLXdyYXBwZXIgbmItZ2FsbGVyeS10aHVtYm5haWwtc2l6ZS17e3NpemV9fVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibmItZ2FsbGVyeS10aHVtYm5haWxzXCIgW3N0eWxlLnRyYW5zZm9ybV09XCIndHJhbnNsYXRlWCgnICsgdGh1bWJuYWlsc0xlZnQgKyAnKSdcIiBbc3R5bGUubWFyZ2luTGVmdF09XCJ0aHVtYm5haWxzTWFyZ2luTGVmdFwiPlxuICAgICAgICAgICAgPGEgW2hyZWZdPVwiaGFzTGluayhpKSA/IGxpbmtzW2ldIDogJyMnXCIgW3RhcmdldF09XCJsaW5rVGFyZ2V0XCIgY2xhc3M9XCJuYi1nYWxsZXJ5LXRodW1ibmFpbFwiICpuZ0Zvcj1cImxldCBpdGVtIG9mIGdldEl0ZW1zKCk7IGxldCBpID0gaW5kZXg7XCIgW3N0eWxlLmJhY2tncm91bmQtaW1hZ2VdPVwiZ2V0U2FmZVVybChpdGVtLnVybClcIiAoY2xpY2spPVwiaGFuZGxlQ2xpY2soJGV2ZW50LCBpKVwiIFtzdHlsZS53aWR0aF09XCJnZXRUaHVtYm5haWxXaWR0aCgpXCIgW3N0eWxlLmhlaWdodF09XCJnZXRUaHVtYm5haWxIZWlnaHQoKVwiIFtzdHlsZS5sZWZ0XT1cImdldFRodW1ibmFpbExlZnQoaSlcIiBbc3R5bGUudG9wXT1cImdldFRodW1ibmFpbFRvcChpKVwiIFtuZ0NsYXNzXT1cInsgJ25iLWdhbGxlcnktYWN0aXZlJzogaSA9PSBzZWxlY3RlZEluZGV4LCAnbmItZ2FsbGVyeS1jbGlja2FibGUnOiBjbGlja2FibGUgfVwiIFthdHRyLmFyaWEtbGFiZWxdPVwibGFiZWxzW2ldXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5iLWdhbGxlcnktaWNvbnMtd3JhcHBlclwiPlxuICAgICAgICAgICAgICAgICAgICA8bmItZ2FsbGVyeS1hY3Rpb24gKm5nRm9yPVwibGV0IGFjdGlvbiBvZiBhY3Rpb25zXCIgW2ljb25dPVwiYWN0aW9uLmljb25cIiBbZGlzYWJsZWRdPVwiYWN0aW9uLmRpc2FibGVkXCIgW3RpdGxlVGV4dF09XCJhY3Rpb24udGl0bGVUZXh0XCIgKG9uQ2xpY2spPVwiYWN0aW9uLm9uQ2xpY2soJGV2ZW50LCBpKVwiPjwvbmItZ2FsbGVyeS1hY3Rpb24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5iLWdhbGxlcnktcmVtYWluaW5nLWNvdW50LW92ZXJsYXlcIiAqbmdJZj1cInJlbWFpbmluZ0NvdW50ICYmIHJlbWFpbmluZ0NvdW50VmFsdWUgJiYgKGkgPT0gKHJvd3MgKiBjb2x1bW5zKSAtIDEpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibmItZ2FsbGVyeS1yZW1haW5pbmctY291bnRcIj4re3tyZW1haW5pbmdDb3VudFZhbHVlfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxuYi1nYWxsZXJ5LWFycm93cyAqbmdJZj1cImNhblNob3dBcnJvd3MoKVwiIChvblByZXZDbGljayk9XCJtb3ZlTGVmdCgpXCIgKG9uTmV4dENsaWNrKT1cIm1vdmVSaWdodCgpXCIgW3ByZXZEaXNhYmxlZF09XCIhY2FuTW92ZUxlZnQoKVwiIFtuZXh0RGlzYWJsZWRdPVwiIWNhbk1vdmVSaWdodCgpXCIgW2Fycm93UHJldkljb25dPVwiYXJyb3dQcmV2SWNvblwiIFthcnJvd05leHRJY29uXT1cImFycm93TmV4dEljb25cIj48L25iLWdhbGxlcnktYXJyb3dzPlxuICAgIGAsXG4gICAgc3R5bGVVcmxzOiBbJy4vbmItZ2FsbGVyeS10aHVtYm5haWxzLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTmJHYWxsZXJ5VGh1bWJuYWlsc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgICB0aHVtYm5haWxzTGVmdDogc3RyaW5nO1xuICAgIHRodW1ibmFpbHNNYXJnaW5MZWZ0OiBzdHJpbmc7XG4gICAgbW91c2VlbnRlcjogYm9vbGVhbjtcbiAgICByZW1haW5pbmdDb3VudFZhbHVlOiBudW1iZXI7XG5cbiAgICBtaW5TdG9wSW5kZXggPSAwO1xuXG4gICAgQElucHV0KCkgaXRlbXM6IE5iR2FsbGVyeVRodW1ibmFpbFtdO1xuICAgIEBJbnB1dCgpIGxpbmtzOiBzdHJpbmdbXTtcbiAgICBASW5wdXQoKSBsYWJlbHM6IHN0cmluZ1tdO1xuICAgIEBJbnB1dCgpIGxpbmtUYXJnZXQ6IHN0cmluZztcbiAgICBASW5wdXQoKSBjb2x1bW5zOiBudW1iZXI7XG4gICAgQElucHV0KCkgcm93czogbnVtYmVyO1xuICAgIEBJbnB1dCgpIGFycm93czogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBhcnJvd3NBdXRvSGlkZTogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBtYXJnaW46IG51bWJlcjtcbiAgICBASW5wdXQoKSBzZWxlY3RlZEluZGV4OiBudW1iZXI7XG4gICAgQElucHV0KCkgY2xpY2thYmxlOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIHN3aXBlOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIHNpemU6IHN0cmluZztcbiAgICBASW5wdXQoKSBhcnJvd1ByZXZJY29uOiBzdHJpbmc7XG4gICAgQElucHV0KCkgYXJyb3dOZXh0SWNvbjogc3RyaW5nO1xuICAgIEBJbnB1dCgpIG1vdmVTaXplOiBudW1iZXI7XG4gICAgQElucHV0KCkgb3JkZXI6IG51bWJlcjtcbiAgICBASW5wdXQoKSByZW1haW5pbmdDb3VudDogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBsYXp5TG9hZGluZzogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBhY3Rpb25zOiBOYkdhbGxlcnlBY3Rpb25bXTtcblxuICAgIEBPdXRwdXQoKSBvbkFjdGl2ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIHByaXZhdGUgaW5kZXggPSAwO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzYW5pdGl6YXRpb246IERvbVNhbml0aXplciwgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIGhlbHBlclNlcnZpY2U6IE5iR2FsbGVyeUhlbHBlclNlcnZpY2UpIHt9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgICAgIGlmIChjaGFuZ2VzWydzZWxlY3RlZEluZGV4J10pIHtcbiAgICAgICAgICAgIHRoaXMudmFsaWRhdGVJbmRleCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNoYW5nZXNbJ3N3aXBlJ10pIHtcbiAgICAgICAgICAgIHRoaXMuaGVscGVyU2VydmljZS5tYW5hZ2VTd2lwZSh0aGlzLnN3aXBlLCB0aGlzLmVsZW1lbnRSZWYsXG4gICAgICAgICAgICAndGh1bWJuYWlscycsICgpID0+IHRoaXMubW92ZVJpZ2h0KCksICgpID0+IHRoaXMubW92ZUxlZnQoKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pdGVtcykge1xuICAgICAgICAgICAgdGhpcy5yZW1haW5pbmdDb3VudFZhbHVlID0gdGhpcy5pdGVtcy5sZW5ndGggLSAodGhpcy5yb3dzICogdGhpcy5jb2x1bW5zKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNlZW50ZXInKSBvbk1vdXNlRW50ZXIoKSB7XG4gICAgICAgIHRoaXMubW91c2VlbnRlciA9IHRydWU7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScpIG9uTW91c2VMZWF2ZSgpIHtcbiAgICAgICAgdGhpcy5tb3VzZWVudGVyID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcmVzZXQoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBpbmRleDtcbiAgICAgICAgdGhpcy5zZXREZWZhdWx0UG9zaXRpb24oKTtcblxuICAgICAgICB0aGlzLmluZGV4ID0gMDtcbiAgICAgICAgdGhpcy52YWxpZGF0ZUluZGV4KCk7XG4gICAgfVxuXG4gICAgZ2V0SXRlbXMoKTogc3RyaW5nW10gfCBTYWZlUmVzb3VyY2VVcmxbXSB7XG4gICAgICAgIGlmICghdGhpcy5pdGVtcykge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucmVtYWluaW5nQ291bnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLml0ZW1zLnNsaWNlKDAsIHRoaXMucm93cyAqIHRoaXMuY29sdW1ucyk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5sYXp5TG9hZGluZyAmJiB0aGlzLm9yZGVyICE9PSBOYkdhbGxlcnlPcmRlci5Sb3cpIHtcbiAgICAgICAgICAgIGxldCBzdG9wSW5kZXggPSAwO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5vcmRlciA9PT0gTmJHYWxsZXJ5T3JkZXIuQ29sdW1uKSB7XG4gICAgICAgICAgICAgICAgc3RvcEluZGV4ID0gKHRoaXMuaW5kZXggKyB0aGlzLmNvbHVtbnMgKyB0aGlzLm1vdmVTaXplKSAqIHRoaXMucm93cztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5vcmRlciA9PT0gTmJHYWxsZXJ5T3JkZXIuUGFnZSkge1xuICAgICAgICAgICAgICAgIHN0b3BJbmRleCA9IHRoaXMuaW5kZXggKyAoKHRoaXMuY29sdW1ucyAqIHRoaXMucm93cykgKiAyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHN0b3BJbmRleCA8PSB0aGlzLm1pblN0b3BJbmRleCkge1xuICAgICAgICAgICAgICAgIHN0b3BJbmRleCA9IHRoaXMubWluU3RvcEluZGV4O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1pblN0b3BJbmRleCA9IHN0b3BJbmRleDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXMuc2xpY2UoMCwgc3RvcEluZGV4KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLml0ZW1zO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2soZXZlbnQ6IEV2ZW50LCBpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5oYXNMaW5rKGluZGV4KSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICB0aGlzLm9uQWN0aXZlQ2hhbmdlLmVtaXQoaW5kZXgpO1xuXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYXNMaW5rKGluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMubGlua3MgJiYgdGhpcy5saW5rcy5sZW5ndGggJiYgdGhpcy5saW5rc1tpbmRleF0pIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIG1vdmVSaWdodCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuY2FuTW92ZVJpZ2h0KCkpIHtcbiAgICAgICAgICAgIHRoaXMuaW5kZXggKz0gdGhpcy5tb3ZlU2l6ZTtcbiAgICAgICAgICAgIGNvbnN0IG1heEluZGV4ID0gdGhpcy5nZXRNYXhJbmRleCgpIC0gdGhpcy5jb2x1bW5zO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5pbmRleCA+IG1heEluZGV4KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleCA9IG1heEluZGV4O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNldFRodW1ibmFpbHNQb3NpdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZUxlZnQoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmNhbk1vdmVMZWZ0KCkpIHtcbiAgICAgICAgICAgIHRoaXMuaW5kZXggLT0gdGhpcy5tb3ZlU2l6ZTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleCA9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2V0VGh1bWJuYWlsc1Bvc2l0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjYW5Nb3ZlUmlnaHQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmluZGV4ICsgdGhpcy5jb2x1bW5zIDwgdGhpcy5nZXRNYXhJbmRleCgpID8gdHJ1ZSA6IGZhbHNlO1xuICAgIH1cblxuICAgIGNhbk1vdmVMZWZ0KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pbmRleCAhPT0gMCA/IHRydWUgOiBmYWxzZTtcbiAgICB9XG5cbiAgICBnZXRUaHVtYm5haWxMZWZ0KGluZGV4OiBudW1iZXIpOiBTYWZlU3R5bGUge1xuICAgICAgICBsZXQgY2FsY3VsYXRlZEluZGV4O1xuXG4gICAgICAgIGlmICh0aGlzLm9yZGVyID09PSBOYkdhbGxlcnlPcmRlci5Db2x1bW4pIHtcbiAgICAgICAgICAgIGNhbGN1bGF0ZWRJbmRleCA9IE1hdGguZmxvb3IoaW5kZXggLyB0aGlzLnJvd3MpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMub3JkZXIgPT09IE5iR2FsbGVyeU9yZGVyLlBhZ2UpIHtcbiAgICAgICAgICAgIGNhbGN1bGF0ZWRJbmRleCA9IChpbmRleCAlIHRoaXMuY29sdW1ucykgKyAoTWF0aC5mbG9vcihpbmRleCAvICh0aGlzLnJvd3MgKiB0aGlzLmNvbHVtbnMpKSAqIHRoaXMuY29sdW1ucyk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5vcmRlciA9PT0gTmJHYWxsZXJ5T3JkZXIuUm93ICYmIHRoaXMucmVtYWluaW5nQ291bnQpIHtcbiAgICAgICAgICAgIGNhbGN1bGF0ZWRJbmRleCA9IGluZGV4ICUgdGhpcy5jb2x1bW5zO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FsY3VsYXRlZEluZGV4ID0gaW5kZXggJSBNYXRoLmNlaWwodGhpcy5pdGVtcy5sZW5ndGggLyB0aGlzLnJvd3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VGh1bWJuYWlsUG9zaXRpb24oY2FsY3VsYXRlZEluZGV4LCB0aGlzLmNvbHVtbnMpO1xuICAgIH1cblxuICAgIGdldFRodW1ibmFpbFRvcChpbmRleDogbnVtYmVyKTogU2FmZVN0eWxlIHtcbiAgICAgICAgbGV0IGNhbGN1bGF0ZWRJbmRleDtcblxuICAgICAgICBpZiAodGhpcy5vcmRlciA9PT0gTmJHYWxsZXJ5T3JkZXIuQ29sdW1uKSB7XG4gICAgICAgICAgICBjYWxjdWxhdGVkSW5kZXggPSBpbmRleCAlIHRoaXMucm93cztcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm9yZGVyID09PSBOYkdhbGxlcnlPcmRlci5QYWdlKSB7XG4gICAgICAgICAgICBjYWxjdWxhdGVkSW5kZXggPSBNYXRoLmZsb29yKGluZGV4IC8gdGhpcy5jb2x1bW5zKSAtIChNYXRoLmZsb29yKGluZGV4IC8gKHRoaXMucm93cyAqIHRoaXMuY29sdW1ucykpICogdGhpcy5yb3dzKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm9yZGVyID09PSBOYkdhbGxlcnlPcmRlci5Sb3cgJiYgdGhpcy5yZW1haW5pbmdDb3VudCkge1xuICAgICAgICAgICAgY2FsY3VsYXRlZEluZGV4ID0gTWF0aC5mbG9vcihpbmRleCAvIHRoaXMuY29sdW1ucyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWxjdWxhdGVkSW5kZXggPSBNYXRoLmZsb29yKGluZGV4IC8gTWF0aC5jZWlsKHRoaXMuaXRlbXMubGVuZ3RoIC8gdGhpcy5yb3dzKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5nZXRUaHVtYm5haWxQb3NpdGlvbihjYWxjdWxhdGVkSW5kZXgsIHRoaXMucm93cyk7XG4gICAgfVxuXG4gICAgZ2V0VGh1bWJuYWlsV2lkdGgoKTogU2FmZVN0eWxlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VGh1bWJuYWlsRGltZW5zaW9uKHRoaXMuY29sdW1ucyk7XG4gICAgfVxuXG4gICAgZ2V0VGh1bWJuYWlsSGVpZ2h0KCk6IFNhZmVTdHlsZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFRodW1ibmFpbERpbWVuc2lvbih0aGlzLnJvd3MpO1xuICAgIH1cblxuICAgIHNldFRodW1ibmFpbHNQb3NpdGlvbigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50aHVtYm5haWxzTGVmdCA9IC0gKCgxMDAgLyB0aGlzLmNvbHVtbnMpICogdGhpcy5pbmRleCkgKyAnJSdcblxuICAgICAgICB0aGlzLnRodW1ibmFpbHNNYXJnaW5MZWZ0ID0gLSAoKHRoaXMubWFyZ2luIC0gKCgodGhpcy5jb2x1bW5zIC0gMSlcbiAgICAgICAgKiB0aGlzLm1hcmdpbikgLyB0aGlzLmNvbHVtbnMpKSAqIHRoaXMuaW5kZXgpICsgJ3B4JztcbiAgICB9XG5cbiAgICBzZXREZWZhdWx0UG9zaXRpb24oKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGh1bWJuYWlsc0xlZnQgPSAnMHB4JztcbiAgICAgICAgdGhpcy50aHVtYm5haWxzTWFyZ2luTGVmdCA9ICcwcHgnO1xuICAgIH1cblxuICAgIGNhblNob3dBcnJvd3MoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLnJlbWFpbmluZ0NvdW50KSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5hcnJvd3MgJiYgdGhpcy5pdGVtcyAmJiB0aGlzLml0ZW1zLmxlbmd0aCA+IHRoaXMuZ2V0VmlzaWJsZUNvdW50KClcbiAgICAgICAgICAgICYmICghdGhpcy5hcnJvd3NBdXRvSGlkZSB8fCB0aGlzLm1vdXNlZW50ZXIpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhbGlkYXRlSW5kZXgoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLml0ZW1zKSB7XG4gICAgICAgICAgICBsZXQgbmV3SW5kZXg7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm9yZGVyID09PSBOYkdhbGxlcnlPcmRlci5Db2x1bW4pIHtcbiAgICAgICAgICAgICAgICBuZXdJbmRleCA9IE1hdGguZmxvb3IodGhpcy5zZWxlY3RlZEluZGV4IC8gdGhpcy5yb3dzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3SW5kZXggPSB0aGlzLnNlbGVjdGVkSW5kZXggJSBNYXRoLmNlaWwodGhpcy5pdGVtcy5sZW5ndGggLyB0aGlzLnJvd3MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5yZW1haW5pbmdDb3VudCkge1xuICAgICAgICAgICAgICAgIG5ld0luZGV4ID0gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG5ld0luZGV4IDwgdGhpcy5pbmRleCB8fCBuZXdJbmRleCA+PSB0aGlzLmluZGV4ICsgdGhpcy5jb2x1bW5zKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWF4SW5kZXggPSB0aGlzLmdldE1heEluZGV4KCkgLSB0aGlzLmNvbHVtbnM7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleCA9IG5ld0luZGV4ID4gbWF4SW5kZXggPyBtYXhJbmRleCA6IG5ld0luZGV4O1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRUaHVtYm5haWxzUG9zaXRpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFNhZmVVcmwoaW1hZ2U6IHN0cmluZyk6IFNhZmVTdHlsZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNhbml0aXphdGlvbi5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUodGhpcy5oZWxwZXJTZXJ2aWNlLmdldEJhY2tncm91bmRVcmwoaW1hZ2UpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFRodW1ibmFpbFBvc2l0aW9uKGluZGV4OiBudW1iZXIsIGNvdW50OiBudW1iZXIpOiBTYWZlU3R5bGUge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRTYWZlU3R5bGUoJ2NhbGMoJyArICgoMTAwIC8gY291bnQpICogaW5kZXgpICsgJyUgKyAnXG4gICAgICAgICAgICArICgodGhpcy5tYXJnaW4gLSAoKChjb3VudCAtIDEpICogdGhpcy5tYXJnaW4pIC8gY291bnQpKSAqIGluZGV4KSArICdweCknKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFRodW1ibmFpbERpbWVuc2lvbihjb3VudDogbnVtYmVyKTogU2FmZVN0eWxlIHtcbiAgICAgICAgaWYgKHRoaXMubWFyZ2luICE9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRTYWZlU3R5bGUoJ2NhbGMoJyArICgxMDAgLyBjb3VudCkgKyAnJSAtICdcbiAgICAgICAgICAgICAgICArICgoKGNvdW50IC0gMSkgKiB0aGlzLm1hcmdpbikgLyBjb3VudCkgKyAncHgpJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRTYWZlU3R5bGUoJ2NhbGMoJyArICgxMDAgLyBjb3VudCkgKyAnJSArIDFweCknKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0TWF4SW5kZXgoKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKHRoaXMub3JkZXIgPT09IE5iR2FsbGVyeU9yZGVyLlBhZ2UpIHtcbiAgICAgICAgICAgIGxldCBtYXhJbmRleCA9IChNYXRoLmZsb29yKHRoaXMuaXRlbXMubGVuZ3RoIC8gdGhpcy5nZXRWaXNpYmxlQ291bnQoKSkgKiB0aGlzLmNvbHVtbnMpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5pdGVtcy5sZW5ndGggJSB0aGlzLmdldFZpc2libGVDb3VudCgpID4gdGhpcy5jb2x1bW5zKSB7XG4gICAgICAgICAgICAgICAgbWF4SW5kZXggKz0gdGhpcy5jb2x1bW5zO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtYXhJbmRleCArPSB0aGlzLml0ZW1zLmxlbmd0aCAlIHRoaXMuZ2V0VmlzaWJsZUNvdW50KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBtYXhJbmRleDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmNlaWwodGhpcy5pdGVtcy5sZW5ndGggLyB0aGlzLnJvd3MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRWaXNpYmxlQ291bnQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29sdW1ucyAqIHRoaXMucm93cztcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFNhZmVTdHlsZSh2YWx1ZTogc3RyaW5nKTogU2FmZVN0eWxlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2FuaXRpemF0aW9uLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZSh2YWx1ZSk7XG4gICAgfVxufVxuIl19