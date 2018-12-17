/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NbGalleryHelperService } from '../nb-gallery-helper.service';
import { NbGalleryAnimation } from '../models/nb-gallery-animation.model';
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
export { NbGalleryItemComponent };
if (false) {
    /** @type {?} */
    NbGalleryItemComponent.prototype.items;
    /** @type {?} */
    NbGalleryItemComponent.prototype.clickable;
    /** @type {?} */
    NbGalleryItemComponent.prototype.selectedIndex;
    /** @type {?} */
    NbGalleryItemComponent.prototype.arrows;
    /** @type {?} */
    NbGalleryItemComponent.prototype.arrowsAutoHide;
    /** @type {?} */
    NbGalleryItemComponent.prototype.swipe;
    /** @type {?} */
    NbGalleryItemComponent.prototype.animation;
    /** @type {?} */
    NbGalleryItemComponent.prototype.size;
    /** @type {?} */
    NbGalleryItemComponent.prototype.arrowPrevIcon;
    /** @type {?} */
    NbGalleryItemComponent.prototype.arrowNextIcon;
    /** @type {?} */
    NbGalleryItemComponent.prototype.autoPlay;
    /** @type {?} */
    NbGalleryItemComponent.prototype.autoPlayInterval;
    /** @type {?} */
    NbGalleryItemComponent.prototype.autoPlayPauseOnHover;
    /** @type {?} */
    NbGalleryItemComponent.prototype.infinityMove;
    /** @type {?} */
    NbGalleryItemComponent.prototype.lazyLoading;
    /** @type {?} */
    NbGalleryItemComponent.prototype.actions;
    /** @type {?} */
    NbGalleryItemComponent.prototype.descriptions;
    /** @type {?} */
    NbGalleryItemComponent.prototype.showDescription;
    /** @type {?} */
    NbGalleryItemComponent.prototype.bullets;
    /** @type {?} */
    NbGalleryItemComponent.prototype.bgColor;
    /** @type {?} */
    NbGalleryItemComponent.prototype.onClick;
    /** @type {?} */
    NbGalleryItemComponent.prototype.onActiveChange;
    /** @type {?} */
    NbGalleryItemComponent.prototype.canChangeImage;
    /** @type {?} */
    NbGalleryItemComponent.prototype.timer;
    /** @type {?} */
    NbGalleryItemComponent.prototype.sanitization;
    /** @type {?} */
    NbGalleryItemComponent.prototype.elementRef;
    /** @type {?} */
    NbGalleryItemComponent.prototype.helperService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmItZ2FsbGVyeS1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25iLWdhbGxlcnkvIiwic291cmNlcyI6WyJsaWIvbmItZ2FsbGVyeS1pdGVtL25iLWdhbGxlcnktaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFHLFVBQVUsRUFBb0MsTUFBTSxlQUFlLENBQUM7QUFDcEksT0FBTyxFQUFFLFlBQVksRUFBYSxNQUFNLDJCQUEyQixDQUFDO0FBRXBFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDOztJQW1EdEUsZ0NBQW9CLFlBQTBCLEVBQ2xDLFlBQWdDLGFBQXFDO1FBRDdELGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQ2xDLGVBQVUsR0FBVixVQUFVO1FBQXNCLGtCQUFhLEdBQWIsYUFBYSxDQUF3Qjt1QkFSN0QsSUFBSSxZQUFZLEVBQUU7OEJBQ1gsSUFBSSxZQUFZLEVBQUU7OEJBRTVCLElBQUk7S0FLZ0U7Ozs7SUFFckYseUNBQVE7OztJQUFSO1FBQ0ksSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDcEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7U0FDdkI7UUFFRCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7S0FDSjs7Ozs7SUFFRCw0Q0FBVzs7OztJQUFYLFVBQVksT0FBc0I7UUFBbEMsaUJBSUM7UUFIRyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNsQixJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLGNBQU0sT0FBQSxLQUFJLENBQUMsUUFBUSxFQUFFLEVBQWYsQ0FBZSxFQUFFLGNBQU0sT0FBQSxLQUFJLENBQUMsUUFBUSxFQUFFLEVBQWYsQ0FBZSxDQUFDLENBQUM7U0FDdEg7S0FDSjs7OztJQUUyQiw2Q0FBWTs7O0lBQXhDO1FBQ0ksSUFBSSxJQUFJLENBQUMsY0FBYyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNyQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztTQUN0QjtRQUVELElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsb0JBQW9CLEVBQUU7WUFDNUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3ZCO0tBQ0o7Ozs7SUFFMkIsNkNBQVk7OztJQUF4QztRQUNJLElBQUksSUFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ3BDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1NBQ3ZCO1FBRUQsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtZQUM1QyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7S0FDSjs7Ozs7SUFFRCxzQ0FBSzs7OztJQUFMLFVBQU0sS0FBYTtRQUNmLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO0tBQzlCOzs7O0lBRUQseUNBQVE7OztJQUFSO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDYixPQUFPLEVBQUUsQ0FBQztTQUNiO1FBRUQsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFOztZQUNsQixJQUFNLFNBQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQzs7WUFDckMsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7WUFFekMsSUFBSSxTQUFTLEtBQUssQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDdkMsU0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQzthQUN2QztpQkFBTSxJQUFJLFNBQVMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3ZCLFNBQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDM0I7O1lBRUQsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7WUFFekMsSUFBSSxTQUFTLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDdEQsU0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNuQjtpQkFBTSxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtnQkFDdEMsU0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUMzQjtZQUVELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQyxHQUFHLEVBQUUsQ0FBQyxJQUFLLE9BQUEsU0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBeEIsQ0FBd0IsQ0FBQyxDQUFDO1NBQ2xFO2FBQU07WUFDSCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDckI7S0FDSjs7OztJQUVELDhDQUFhOzs7SUFBYjtRQUFBLGlCQVNDO1FBUkcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRXBCLElBQUksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxLQUFJLENBQUMsUUFBUSxFQUFFLEVBQUU7Z0JBQ2xCLEtBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUNuQjtTQUNKLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7S0FDN0I7Ozs7SUFFRCw2Q0FBWTs7O0lBQVo7UUFDSSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDWixhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzdCO0tBQ0o7Ozs7OztJQUVELDRDQUFXOzs7OztJQUFYLFVBQVksS0FBWSxFQUFFLEtBQWE7UUFDbkMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRXpCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN4QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDMUI7S0FDSjs7Ozs7SUFFRCxxQ0FBSTs7OztJQUFKLFVBQUssS0FBYTtRQUNkLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQzNCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztLQUMzQjs7OztJQUVELHlDQUFROzs7SUFBUjtRQUNJLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDM0MsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBRXJCLElBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtnQkFDMUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7YUFDMUI7WUFFRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFFeEIsT0FBTyxJQUFJLENBQUM7U0FDZjthQUFNO1lBQ0gsT0FBTyxLQUFLLENBQUM7U0FDaEI7S0FDSjs7OztJQUVELHlDQUFROzs7SUFBUjtRQUNJLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDM0MsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBRXJCLElBQUksSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLEVBQUU7Z0JBQ3hCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2FBQzlDO1lBRUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1NBQzNCO0tBQ0o7Ozs7SUFFRCxpREFBZ0I7OztJQUFoQjtRQUFBLGlCQVlDO1FBWEcsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7O1FBQzVCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQztRQUVuQixJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssa0JBQWtCLENBQUMsS0FBSztlQUN4QyxJQUFJLENBQUMsU0FBUyxLQUFLLGtCQUFrQixDQUFDLElBQUksRUFBRTtZQUMzQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1NBQ3JCO1FBRUQsVUFBVSxDQUFDO1lBQ1AsS0FBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7U0FDOUIsRUFBRSxPQUFPLENBQUMsQ0FBQztLQUNmOzs7O0lBRUQsNENBQVc7OztJQUFYO1FBQ0ksSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1osT0FBTyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQztnQkFDbEUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1NBQ3RCO2FBQU07WUFDSCxPQUFPLEtBQUssQ0FBQztTQUNoQjtLQUNKOzs7O0lBRUQsNENBQVc7OztJQUFYO1FBQ0ksSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1osT0FBTyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztTQUNyRTthQUFNO1lBQ0gsT0FBTyxLQUFLLENBQUM7U0FDaEI7S0FDSjs7Ozs7SUFFRCwyQ0FBVTs7OztJQUFWLFVBQVcsS0FBYTtRQUNwQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0tBQ2pHOztnQkF0TkosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLFFBQVEsRUFBRSw2dkRBYVQ7O2lCQUVKOzs7O2dCQXhCUSxZQUFZO2dCQUQyQyxVQUFVO2dCQUdqRSxzQkFBc0I7Ozt3QkF3QjFCLEtBQUs7NEJBQ0wsS0FBSztnQ0FDTCxLQUFLO3lCQUNMLEtBQUs7aUNBQ0wsS0FBSzt3QkFDTCxLQUFLOzRCQUNMLEtBQUs7dUJBQ0wsS0FBSztnQ0FDTCxLQUFLO2dDQUNMLEtBQUs7MkJBQ0wsS0FBSzttQ0FDTCxLQUFLO3VDQUNMLEtBQUs7K0JBQ0wsS0FBSzs4QkFDTCxLQUFLOzBCQUNMLEtBQUs7K0JBQ0wsS0FBSztrQ0FDTCxLQUFLOzBCQUNMLEtBQUs7MEJBQ0wsS0FBSzswQkFFTCxNQUFNO2lDQUNOLE1BQU07K0JBeUJOLFlBQVksU0FBQyxZQUFZOytCQVV6QixZQUFZLFNBQUMsWUFBWTs7aUNBcEY5Qjs7U0EwQmEsc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciwgIEVsZW1lbnRSZWYsIE9uSW5pdCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIsIFNhZmVTdHlsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5pbXBvcnQgeyBOYkdhbGxlcnlIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi4vbmItZ2FsbGVyeS1oZWxwZXIuc2VydmljZSc7XG5pbXBvcnQgeyBOYkdhbGxlcnlBbmltYXRpb24gfSBmcm9tICcuLi9tb2RlbHMvbmItZ2FsbGVyeS1hbmltYXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgTmJHYWxsZXJ5QWN0aW9uIH0gZnJvbSAnLi4vbW9kZWxzL25iLWdhbGxlcnktYWN0aW9uLm1vZGVsJztcbmltcG9ydCB7IE5iR2FsbGVyeU9yZGVyZWRJdGVtIH0gZnJvbSAnLi4vbW9kZWxzL25iLWdhbGxlcnktb3JkZXJlZC1pdGVtLm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduYi1nYWxsZXJ5LWl0ZW0nLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJuYi1nYWxsZXJ5LWl0ZW0td3JhcHBlciBuYi1nYWxsZXJ5LWFuaW1hdGlvbi17e2FuaW1hdGlvbn19IG5iLWdhbGxlcnktaXRlbS1zaXplLXt7c2l6ZX19XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibmItZ2FsbGVyeS1pdGVtXCIgKm5nRm9yPVwibGV0IGl0ZW0gb2YgZ2V0SXRlbXMoKTsgbGV0IGkgPSBpbmRleDtcIiBbbmdDbGFzc109XCJ7ICduYi1nYWxsZXJ5LWFjdGl2ZSc6IHNlbGVjdGVkSW5kZXggPT0gaXRlbS5pbmRleCwgJ25iLWdhbGxlcnktaW5hY3RpdmUtbGVmdCc6IHNlbGVjdGVkSW5kZXggPiBpdGVtLmluZGV4LCAnbmItZ2FsbGVyeS1pbmFjdGl2ZS1yaWdodCc6IHNlbGVjdGVkSW5kZXggPCBpdGVtLmluZGV4LCAnbmItZ2FsbGVyeS1jbGlja2FibGUnOiBjbGlja2FibGUgfVwiIChjbGljayk9XCJoYW5kbGVDbGljaygkZXZlbnQsIGl0ZW0uaW5kZXgpXCI+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cIml0ZW0udHlwZSA9PT0gJ2ltYWdlJ1wiIGNsYXNzPVwibmItZ2FsbGVyeS1pdGVtLWltYWdlXCIgW3N0eWxlLmJhY2tncm91bmQtaW1hZ2VdPVwiZ2V0U2FmZVVybChpdGVtLnVybClcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8bmItZ2FsbGVyeS12aWRlbyAqbmdJZj1cIml0ZW0udHlwZSA9PT0gJ3ZpZGVvJ1wiIFt2aWRlb0l0ZW1dPVwiaXRlbVwiIFtwYXVzZV09XCJzZWxlY3RlZEluZGV4ICE9PSBpdGVtLmluZGV4XCIgY2xhc3M9XCJuYi1nYWxsZXJ5LWl0ZW0tdmlkZW9cIj48L25iLWdhbGxlcnktdmlkZW8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5iLWdhbGxlcnktaWNvbnMtd3JhcHBlclwiPlxuICAgICAgICAgICAgICAgICAgICA8bmItZ2FsbGVyeS1hY3Rpb24gKm5nRm9yPVwibGV0IGFjdGlvbiBvZiBhY3Rpb25zXCIgW2ljb25dPVwiYWN0aW9uLmljb25cIiBbZGlzYWJsZWRdPVwiYWN0aW9uLmRpc2FibGVkXCIgW3RpdGxlVGV4dF09XCJhY3Rpb24udGl0bGVUZXh0XCIgKG9uQ2xpY2spPVwiYWN0aW9uLm9uQ2xpY2soJGV2ZW50LCBpdGVtLmluZGV4KVwiPjwvbmItZ2FsbGVyeS1hY3Rpb24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5iLWdhbGxlcnktaXRlbS10ZXh0XCIgKm5nSWY9XCJzaG93RGVzY3JpcHRpb24gJiYgZGVzY3JpcHRpb25zW2l0ZW0uaW5kZXhdXCIgW2lubmVySFRNTF09XCJkZXNjcmlwdGlvbnNbaXRlbS5pbmRleF1cIiAoY2xpY2spPVwiJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxuYi1nYWxsZXJ5LWJ1bGxldHMgKm5nSWY9XCJidWxsZXRzXCIgW2NvdW50XT1cIml0ZW1zLmxlbmd0aFwiIFthY3RpdmVdPVwic2VsZWN0ZWRJbmRleFwiIChvbkNoYW5nZSk9XCJzaG93KCRldmVudClcIj48L25iLWdhbGxlcnktYnVsbGV0cz5cbiAgICAgICAgPG5iLWdhbGxlcnktYXJyb3dzIGNsYXNzPVwibmItZ2FsbGVyeS1pdGVtLXNpemUte3tzaXplfX1cIiAqbmdJZj1cImFycm93c1wiIChvblByZXZDbGljayk9XCJzaG93UHJldigpXCIgKG9uTmV4dENsaWNrKT1cInNob3dOZXh0KClcIiBbcHJldkRpc2FibGVkXT1cIiFjYW5TaG93UHJldigpXCIgW25leHREaXNhYmxlZF09XCIhY2FuU2hvd05leHQoKVwiIFthcnJvd1ByZXZJY29uXT1cImFycm93UHJldkljb25cIiBbYXJyb3dOZXh0SWNvbl09XCJhcnJvd05leHRJY29uXCI+PC9uYi1nYWxsZXJ5LWFycm93cz5cbiAgICBgLFxuICAgIHN0eWxlVXJsczogWycuL25iLWdhbGxlcnktaXRlbS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIE5iR2FsbGVyeUl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gICAgQElucHV0KCkgaXRlbXM6IE5iR2FsbGVyeU9yZGVyZWRJdGVtW107XG4gICAgQElucHV0KCkgY2xpY2thYmxlOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIHNlbGVjdGVkSW5kZXg6IG51bWJlcjtcbiAgICBASW5wdXQoKSBhcnJvd3M6IGJvb2xlYW47XG4gICAgQElucHV0KCkgYXJyb3dzQXV0b0hpZGU6IGJvb2xlYW47XG4gICAgQElucHV0KCkgc3dpcGU6IGJvb2xlYW47XG4gICAgQElucHV0KCkgYW5pbWF0aW9uOiBzdHJpbmc7XG4gICAgQElucHV0KCkgc2l6ZTogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGFycm93UHJldkljb246IHN0cmluZztcbiAgICBASW5wdXQoKSBhcnJvd05leHRJY29uOiBzdHJpbmc7XG4gICAgQElucHV0KCkgYXV0b1BsYXk6IGJvb2xlYW47XG4gICAgQElucHV0KCkgYXV0b1BsYXlJbnRlcnZhbDogbnVtYmVyO1xuICAgIEBJbnB1dCgpIGF1dG9QbGF5UGF1c2VPbkhvdmVyOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIGluZmluaXR5TW92ZTogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBsYXp5TG9hZGluZzogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBhY3Rpb25zOiBOYkdhbGxlcnlBY3Rpb25bXTtcbiAgICBASW5wdXQoKSBkZXNjcmlwdGlvbnM6IHN0cmluZ1tdO1xuICAgIEBJbnB1dCgpIHNob3dEZXNjcmlwdGlvbjogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBidWxsZXRzOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIGJnQ29sb3I6IHN0cmluZztcblxuICAgIEBPdXRwdXQoKSBvbkNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBvbkFjdGl2ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIGNhbkNoYW5nZUltYWdlID0gdHJ1ZTtcblxuICAgIHByaXZhdGUgdGltZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNhbml0aXphdGlvbjogRG9tU2FuaXRpemVyLFxuICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgaGVscGVyU2VydmljZTogTmJHYWxsZXJ5SGVscGVyU2VydmljZSkge31cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5hcnJvd3MgJiYgdGhpcy5hcnJvd3NBdXRvSGlkZSkge1xuICAgICAgICAgICAgdGhpcy5hcnJvd3MgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmF1dG9QbGF5KSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0QXV0b1BsYXkoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICAgICAgaWYgKGNoYW5nZXNbJ3N3aXBlJ10pIHtcbiAgICAgICAgICAgIHRoaXMuaGVscGVyU2VydmljZS5tYW5hZ2VTd2lwZSh0aGlzLnN3aXBlLCB0aGlzLmVsZW1lbnRSZWYsICdpbWFnZScsICgpID0+IHRoaXMuc2hvd05leHQoKSwgKCkgPT4gdGhpcy5zaG93UHJldigpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNlZW50ZXInKSBvbk1vdXNlRW50ZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmFycm93c0F1dG9IaWRlICYmICF0aGlzLmFycm93cykge1xuICAgICAgICAgICAgdGhpcy5hcnJvd3MgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuYXV0b1BsYXkgJiYgdGhpcy5hdXRvUGxheVBhdXNlT25Ib3Zlcikge1xuICAgICAgICAgICAgdGhpcy5zdG9wQXV0b1BsYXkoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnKSBvbk1vdXNlTGVhdmUoKSB7XG4gICAgICAgIGlmICh0aGlzLmFycm93c0F1dG9IaWRlICYmIHRoaXMuYXJyb3dzKSB7XG4gICAgICAgICAgICB0aGlzLmFycm93cyA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuYXV0b1BsYXkgJiYgdGhpcy5hdXRvUGxheVBhdXNlT25Ib3Zlcikge1xuICAgICAgICAgICAgdGhpcy5zdGFydEF1dG9QbGF5KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXNldChpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IGluZGV4O1xuICAgIH1cblxuICAgIGdldEl0ZW1zKCk6IE5iR2FsbGVyeU9yZGVyZWRJdGVtW10ge1xuICAgICAgICBpZiAoIXRoaXMuaXRlbXMpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmxhenlMb2FkaW5nKSB7XG4gICAgICAgICAgICBjb25zdCBpbmRleGVzID0gW3RoaXMuc2VsZWN0ZWRJbmRleF07XG4gICAgICAgICAgICBjb25zdCBwcmV2SW5kZXggPSB0aGlzLnNlbGVjdGVkSW5kZXggLSAxO1xuXG4gICAgICAgICAgICBpZiAocHJldkluZGV4ID09PSAtMSAmJiB0aGlzLmluZmluaXR5TW92ZSkge1xuICAgICAgICAgICAgICAgIGluZGV4ZXMucHVzaCh0aGlzLml0ZW1zLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwcmV2SW5kZXggPj0gMCkge1xuICAgICAgICAgICAgICAgIGluZGV4ZXMucHVzaChwcmV2SW5kZXgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBuZXh0SW5kZXggPSB0aGlzLnNlbGVjdGVkSW5kZXggKyAxO1xuXG4gICAgICAgICAgICBpZiAobmV4dEluZGV4ID09PSB0aGlzLml0ZW1zLmxlbmd0aCAmJiB0aGlzLmluZmluaXR5TW92ZSkge1xuICAgICAgICAgICAgICAgIGluZGV4ZXMucHVzaCgwKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmV4dEluZGV4IDwgdGhpcy5pdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpbmRleGVzLnB1c2gobmV4dEluZGV4KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXMuZmlsdGVyKChpbWcsIGkpID0+IGluZGV4ZXMuaW5kZXhPZihpKSAhPSAtMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pdGVtcztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXJ0QXV0b1BsYXkoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3RvcEF1dG9QbGF5KCk7XG5cbiAgICAgICAgdGhpcy50aW1lciA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5zaG93TmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gLTE7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93TmV4dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzLmF1dG9QbGF5SW50ZXJ2YWwpO1xuICAgIH1cblxuICAgIHN0b3BBdXRvUGxheSgpIHtcbiAgICAgICAgaWYgKHRoaXMudGltZXIpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayhldmVudDogRXZlbnQsIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuY2xpY2thYmxlKSB7XG4gICAgICAgICAgICB0aGlzLm9uQ2xpY2suZW1pdChpbmRleCk7XG5cbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3coaW5kZXg6IG51bWJlcikge1xuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBpbmRleDtcbiAgICAgICAgdGhpcy5vbkFjdGl2ZUNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0ZWRJbmRleCk7XG4gICAgICAgIHRoaXMuc2V0Q2hhbmdlVGltZW91dCgpO1xuICAgIH1cblxuICAgIHNob3dOZXh0KCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5jYW5TaG93TmV4dCgpICYmIHRoaXMuY2FuQ2hhbmdlSW1hZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCsrO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZEluZGV4ID09PSB0aGlzLml0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMub25BY3RpdmVDaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGVkSW5kZXgpO1xuICAgICAgICAgICAgdGhpcy5zZXRDaGFuZ2VUaW1lb3V0KCk7XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvd1ByZXYoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmNhblNob3dQcmV2KCkgJiYgdGhpcy5jYW5DaGFuZ2VJbWFnZSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4LS07XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkSW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gdGhpcy5pdGVtcy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm9uQWN0aXZlQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3RlZEluZGV4KTtcbiAgICAgICAgICAgIHRoaXMuc2V0Q2hhbmdlVGltZW91dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0Q2hhbmdlVGltZW91dCgpIHtcbiAgICAgICAgdGhpcy5jYW5DaGFuZ2VJbWFnZSA9IGZhbHNlO1xuICAgICAgICBsZXQgdGltZW91dCA9IDEwMDA7XG5cbiAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uID09PSBOYkdhbGxlcnlBbmltYXRpb24uU2xpZGVcbiAgICAgICAgICAgIHx8IHRoaXMuYW5pbWF0aW9uID09PSBOYkdhbGxlcnlBbmltYXRpb24uRmFkZSkge1xuICAgICAgICAgICAgICAgIHRpbWVvdXQgPSA1MDA7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2FuQ2hhbmdlSW1hZ2UgPSB0cnVlO1xuICAgICAgICB9LCB0aW1lb3V0KTtcbiAgICB9XG5cbiAgICBjYW5TaG93TmV4dCgpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuaXRlbXMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmluZmluaXR5TW92ZSB8fCB0aGlzLnNlbGVjdGVkSW5kZXggPCB0aGlzLml0ZW1zLmxlbmd0aCAtIDFcbiAgICAgICAgICAgICAgICA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNhblNob3dQcmV2KCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5pdGVtcykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5maW5pdHlNb3ZlIHx8IHRoaXMuc2VsZWN0ZWRJbmRleCA+IDAgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRTYWZlVXJsKGltYWdlOiBzdHJpbmcpOiBTYWZlU3R5bGUge1xuICAgICAgICByZXR1cm4gdGhpcy5zYW5pdGl6YXRpb24uYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKHRoaXMuaGVscGVyU2VydmljZS5nZXRCYWNrZ3JvdW5kVXJsKGltYWdlKSk7XG4gICAgfVxufVxuIl19