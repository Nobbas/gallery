/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NbGalleryHelperService } from '../nb-gallery-helper.service';
import { NbGalleryOrder } from '../models/nb-gallery-order.model';
export class NbGalleryThumbnailsComponent {
    /**
     * @param {?} sanitization
     * @param {?} elementRef
     * @param {?} helperService
     */
    constructor(sanitization, elementRef, helperService) {
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
    ngOnChanges(changes) {
        if (changes['selectedIndex']) {
            this.validateIndex();
        }
        if (changes['swipe']) {
            this.helperService.manageSwipe(this.swipe, this.elementRef, 'thumbnails', () => this.moveRight(), () => this.moveLeft());
        }
        if (this.items) {
            this.remainingCountValue = this.items.length - (this.rows * this.columns);
        }
    }
    /**
     * @return {?}
     */
    onMouseEnter() {
        this.mouseenter = true;
    }
    /**
     * @return {?}
     */
    onMouseLeave() {
        this.mouseenter = false;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    reset(index) {
        this.selectedIndex = index;
        this.setDefaultPosition();
        this.index = 0;
        this.validateIndex();
    }
    /**
     * @return {?}
     */
    getItems() {
        if (!this.items) {
            return [];
        }
        if (this.remainingCount) {
            return this.items.slice(0, this.rows * this.columns);
        }
        else if (this.lazyLoading && this.order !== NbGalleryOrder.Row) {
            /** @type {?} */
            let stopIndex = 0;
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
    }
    /**
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    handleClick(event, index) {
        if (!this.hasLink(index)) {
            this.selectedIndex = index;
            this.onActiveChange.emit(index);
            event.stopPropagation();
            event.preventDefault();
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    hasLink(index) {
        if (this.links && this.links.length && this.links[index])
            return true;
    }
    /**
     * @return {?}
     */
    moveRight() {
        if (this.canMoveRight()) {
            this.index += this.moveSize;
            /** @type {?} */
            const maxIndex = this.getMaxIndex() - this.columns;
            if (this.index > maxIndex) {
                this.index = maxIndex;
            }
            this.setThumbnailsPosition();
        }
    }
    /**
     * @return {?}
     */
    moveLeft() {
        if (this.canMoveLeft()) {
            this.index -= this.moveSize;
            if (this.index < 0) {
                this.index = 0;
            }
            this.setThumbnailsPosition();
        }
    }
    /**
     * @return {?}
     */
    canMoveRight() {
        return this.index + this.columns < this.getMaxIndex() ? true : false;
    }
    /**
     * @return {?}
     */
    canMoveLeft() {
        return this.index !== 0 ? true : false;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    getThumbnailLeft(index) {
        /** @type {?} */
        let calculatedIndex;
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
    }
    /**
     * @param {?} index
     * @return {?}
     */
    getThumbnailTop(index) {
        /** @type {?} */
        let calculatedIndex;
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
    }
    /**
     * @return {?}
     */
    getThumbnailWidth() {
        return this.getThumbnailDimension(this.columns);
    }
    /**
     * @return {?}
     */
    getThumbnailHeight() {
        return this.getThumbnailDimension(this.rows);
    }
    /**
     * @return {?}
     */
    setThumbnailsPosition() {
        this.thumbnailsLeft = -((100 / this.columns) * this.index) + '%';
        this.thumbnailsMarginLeft = -((this.margin - (((this.columns - 1)
            * this.margin) / this.columns)) * this.index) + 'px';
    }
    /**
     * @return {?}
     */
    setDefaultPosition() {
        this.thumbnailsLeft = '0px';
        this.thumbnailsMarginLeft = '0px';
    }
    /**
     * @return {?}
     */
    canShowArrows() {
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
    }
    /**
     * @return {?}
     */
    validateIndex() {
        if (this.items) {
            /** @type {?} */
            let newIndex;
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
                const maxIndex = this.getMaxIndex() - this.columns;
                this.index = newIndex > maxIndex ? maxIndex : newIndex;
                this.setThumbnailsPosition();
            }
        }
    }
    /**
     * @param {?} image
     * @return {?}
     */
    getSafeUrl(image) {
        return this.sanitization.bypassSecurityTrustStyle(this.helperService.getBackgroundUrl(image));
    }
    /**
     * @param {?} index
     * @param {?} count
     * @return {?}
     */
    getThumbnailPosition(index, count) {
        return this.getSafeStyle('calc(' + ((100 / count) * index) + '% + '
            + ((this.margin - (((count - 1) * this.margin) / count)) * index) + 'px)');
    }
    /**
     * @param {?} count
     * @return {?}
     */
    getThumbnailDimension(count) {
        if (this.margin !== 0) {
            return this.getSafeStyle('calc(' + (100 / count) + '% - '
                + (((count - 1) * this.margin) / count) + 'px)');
        }
        else {
            return this.getSafeStyle('calc(' + (100 / count) + '% + 1px)');
        }
    }
    /**
     * @return {?}
     */
    getMaxIndex() {
        if (this.order === NbGalleryOrder.Page) {
            /** @type {?} */
            let maxIndex = (Math.floor(this.items.length / this.getVisibleCount()) * this.columns);
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
    }
    /**
     * @return {?}
     */
    getVisibleCount() {
        return this.columns * this.rows;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    getSafeStyle(value) {
        return this.sanitization.bypassSecurityTrustStyle(value);
    }
}
NbGalleryThumbnailsComponent.decorators = [
    { type: Component, args: [{
                selector: 'nb-gallery-thumbnails',
                template: `
    <div class="nb-gallery-thumbnails-wrapper nb-gallery-thumbnail-size-{{size}}">
        <div class="nb-gallery-thumbnails" [style.transform]="'translateX(' + thumbnailsLeft + ')'" [style.marginLeft]="thumbnailsMarginLeft">
            <a [href]="hasLink(i) ? links[i] : '#'" [target]="linkTarget" class="nb-gallery-thumbnail" *ngFor="let item of getItems(); let i = index;" [style.background-image]="getSafeUrl(item.url)" (click)="handleClick($event, i)" [style.width]="getThumbnailWidth()" [style.height]="getThumbnailHeight()" [style.left]="getThumbnailLeft(i)" [style.top]="getThumbnailTop(i)" [ngClass]="{ 'nb-gallery-active': i == selectedIndex, 'nb-gallery-clickable': clickable }" [attr.aria-label]="labels[i]">
                <div class="nb-gallery-icons-wrapper">
                    <nb-gallery-action *ngFor="let action of actions" [icon]="action.icon" [disabled]="action.disabled" [titleText]="action.titleText" (onClick)="action.onClick($event, i)"></nb-gallery-action>
                </div>
                <div class="nb-gallery-remaining-count-overlay" *ngIf="remainingCount && remainingCountValue && (i == (rows * columns) - 1)">
                    <span class="nb-gallery-remaining-count">+{{remainingCountValue}}</span>
                </div>
            </a>
        </div>
    </div>
    <nb-gallery-arrows *ngIf="canShowArrows()" (onPrevClick)="moveLeft()" (onNextClick)="moveRight()" [prevDisabled]="!canMoveLeft()" [nextDisabled]="!canMoveRight()" [arrowPrevIcon]="arrowPrevIcon" [arrowNextIcon]="arrowNextIcon"></nb-gallery-arrows>
    `,
                styles: [":host{width:100%;display:inline-block;position:relative}.nb-gallery-thumbnails-wrapper{width:100%;height:100%;position:absolute;overflow:hidden}.nb-gallery-thumbnails{height:100%;width:100%;position:absolute;left:0;-webkit-transform:translateX(0);transform:translateX(0);transition:transform .5s ease-in-out;transition:transform .5s ease-in-out,-webkit-transform .5s ease-in-out;will-change:transform}.nb-gallery-thumbnails .nb-gallery-thumbnail{position:absolute;height:100%;background-position:center;background-repeat:no-repeat;text-decoration:none}.nb-gallery-thumbnail-size-cover .nb-gallery-thumbnails .nb-gallery-thumbnail{background-size:cover}.nb-gallery-thumbnail-size-contain .nb-gallery-thumbnails .nb-gallery-thumbnail{background-size:contain}.nb-gallery-remaining-count-overlay{width:100%;height:100%;position:absolute;left:0;top:0;background-color:rgba(0,0,0,.4)}.nb-gallery-remaining-count{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);color:#fff;font-size:30px}"]
            }] }
];
/** @nocollapse */
NbGalleryThumbnailsComponent.ctorParameters = () => [
    { type: DomSanitizer },
    { type: ElementRef },
    { type: NbGalleryHelperService }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmItZ2FsbGVyeS10aHVtYm5haWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25iLWdhbGxlcnkvIiwic291cmNlcyI6WyJsaWIvbmItZ2FsbGVyeS10aHVtYm5haWxzL25iLWdhbGxlcnktdGh1bWJuYWlscy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUE0QixVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0gsT0FBTyxFQUFFLFlBQVksRUFBOEIsTUFBTSwyQkFBMkIsQ0FBQztBQUVyRixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUF1QmxFLE1BQU07Ozs7OztJQWtDRixZQUFvQixZQUEwQixFQUFVLFVBQXNCLEVBQ2xFO1FBRFEsaUJBQVksR0FBWixZQUFZLENBQWM7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ2xFLGtCQUFhLEdBQWIsYUFBYTs0QkE1QlYsQ0FBQzs4QkF1QlcsSUFBSSxZQUFZLEVBQUU7cUJBRTdCLENBQUM7S0FHb0M7Ozs7O0lBRXJELFdBQVcsQ0FBQyxPQUFzQjtRQUM5QixJQUFJLE9BQU8sQ0FBQyxlQUFlLENBQUMsRUFBRTtZQUMxQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7UUFFRCxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNsQixJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQzFELFlBQVksRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7U0FD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TCxLQUFLOzZCQUNMLEtBQUs7MEJBQ0wsS0FBSztzQkFDTCxLQUFLOzZCQUVMLE1BQU07MkJBc0JOLFlBQVksU0FBQyxZQUFZOzJCQUl6QixZQUFZLFNBQUMsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyLCBTYWZlU3R5bGUsIFNhZmVSZXNvdXJjZVVybCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5pbXBvcnQgeyBOYkdhbGxlcnlIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi4vbmItZ2FsbGVyeS1oZWxwZXIuc2VydmljZSc7XG5pbXBvcnQgeyBOYkdhbGxlcnlPcmRlciB9IGZyb20gJy4uL21vZGVscy9uYi1nYWxsZXJ5LW9yZGVyLm1vZGVsJztcbmltcG9ydCB7IE5iR2FsbGVyeUFjdGlvbiB9IGZyb20gJy4uL21vZGVscy9uYi1nYWxsZXJ5LWFjdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBOYkdhbGxlcnlUaHVtYm5haWwgfSBmcm9tICcuLi9tb2RlbHMvbmItZ2FsbGVyeS10aHVtYm5haWwubW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ25iLWdhbGxlcnktdGh1bWJuYWlscycsXG4gICAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwibmItZ2FsbGVyeS10aHVtYm5haWxzLXdyYXBwZXIgbmItZ2FsbGVyeS10aHVtYm5haWwtc2l6ZS17e3NpemV9fVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibmItZ2FsbGVyeS10aHVtYm5haWxzXCIgW3N0eWxlLnRyYW5zZm9ybV09XCIndHJhbnNsYXRlWCgnICsgdGh1bWJuYWlsc0xlZnQgKyAnKSdcIiBbc3R5bGUubWFyZ2luTGVmdF09XCJ0aHVtYm5haWxzTWFyZ2luTGVmdFwiPlxuICAgICAgICAgICAgPGEgW2hyZWZdPVwiaGFzTGluayhpKSA/IGxpbmtzW2ldIDogJyMnXCIgW3RhcmdldF09XCJsaW5rVGFyZ2V0XCIgY2xhc3M9XCJuYi1nYWxsZXJ5LXRodW1ibmFpbFwiICpuZ0Zvcj1cImxldCBpdGVtIG9mIGdldEl0ZW1zKCk7IGxldCBpID0gaW5kZXg7XCIgW3N0eWxlLmJhY2tncm91bmQtaW1hZ2VdPVwiZ2V0U2FmZVVybChpdGVtLnVybClcIiAoY2xpY2spPVwiaGFuZGxlQ2xpY2soJGV2ZW50LCBpKVwiIFtzdHlsZS53aWR0aF09XCJnZXRUaHVtYm5haWxXaWR0aCgpXCIgW3N0eWxlLmhlaWdodF09XCJnZXRUaHVtYm5haWxIZWlnaHQoKVwiIFtzdHlsZS5sZWZ0XT1cImdldFRodW1ibmFpbExlZnQoaSlcIiBbc3R5bGUudG9wXT1cImdldFRodW1ibmFpbFRvcChpKVwiIFtuZ0NsYXNzXT1cInsgJ25iLWdhbGxlcnktYWN0aXZlJzogaSA9PSBzZWxlY3RlZEluZGV4LCAnbmItZ2FsbGVyeS1jbGlja2FibGUnOiBjbGlja2FibGUgfVwiIFthdHRyLmFyaWEtbGFiZWxdPVwibGFiZWxzW2ldXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5iLWdhbGxlcnktaWNvbnMtd3JhcHBlclwiPlxuICAgICAgICAgICAgICAgICAgICA8bmItZ2FsbGVyeS1hY3Rpb24gKm5nRm9yPVwibGV0IGFjdGlvbiBvZiBhY3Rpb25zXCIgW2ljb25dPVwiYWN0aW9uLmljb25cIiBbZGlzYWJsZWRdPVwiYWN0aW9uLmRpc2FibGVkXCIgW3RpdGxlVGV4dF09XCJhY3Rpb24udGl0bGVUZXh0XCIgKG9uQ2xpY2spPVwiYWN0aW9uLm9uQ2xpY2soJGV2ZW50LCBpKVwiPjwvbmItZ2FsbGVyeS1hY3Rpb24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5iLWdhbGxlcnktcmVtYWluaW5nLWNvdW50LW92ZXJsYXlcIiAqbmdJZj1cInJlbWFpbmluZ0NvdW50ICYmIHJlbWFpbmluZ0NvdW50VmFsdWUgJiYgKGkgPT0gKHJvd3MgKiBjb2x1bW5zKSAtIDEpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibmItZ2FsbGVyeS1yZW1haW5pbmctY291bnRcIj4re3tyZW1haW5pbmdDb3VudFZhbHVlfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxuYi1nYWxsZXJ5LWFycm93cyAqbmdJZj1cImNhblNob3dBcnJvd3MoKVwiIChvblByZXZDbGljayk9XCJtb3ZlTGVmdCgpXCIgKG9uTmV4dENsaWNrKT1cIm1vdmVSaWdodCgpXCIgW3ByZXZEaXNhYmxlZF09XCIhY2FuTW92ZUxlZnQoKVwiIFtuZXh0RGlzYWJsZWRdPVwiIWNhbk1vdmVSaWdodCgpXCIgW2Fycm93UHJldkljb25dPVwiYXJyb3dQcmV2SWNvblwiIFthcnJvd05leHRJY29uXT1cImFycm93TmV4dEljb25cIj48L25iLWdhbGxlcnktYXJyb3dzPlxuICAgIGAsXG4gICAgc3R5bGVVcmxzOiBbJy4vbmItZ2FsbGVyeS10aHVtYm5haWxzLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTmJHYWxsZXJ5VGh1bWJuYWlsc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgICB0aHVtYm5haWxzTGVmdDogc3RyaW5nO1xuICAgIHRodW1ibmFpbHNNYXJnaW5MZWZ0OiBzdHJpbmc7XG4gICAgbW91c2VlbnRlcjogYm9vbGVhbjtcbiAgICByZW1haW5pbmdDb3VudFZhbHVlOiBudW1iZXI7XG5cbiAgICBtaW5TdG9wSW5kZXggPSAwO1xuXG4gICAgQElucHV0KCkgaXRlbXM6IE5iR2FsbGVyeVRodW1ibmFpbFtdO1xuICAgIEBJbnB1dCgpIGxpbmtzOiBzdHJpbmdbXTtcbiAgICBASW5wdXQoKSBsYWJlbHM6IHN0cmluZ1tdO1xuICAgIEBJbnB1dCgpIGxpbmtUYXJnZXQ6IHN0cmluZztcbiAgICBASW5wdXQoKSBjb2x1bW5zOiBudW1iZXI7XG4gICAgQElucHV0KCkgcm93czogbnVtYmVyO1xuICAgIEBJbnB1dCgpIGFycm93czogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBhcnJvd3NBdXRvSGlkZTogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBtYXJnaW46IG51bWJlcjtcbiAgICBASW5wdXQoKSBzZWxlY3RlZEluZGV4OiBudW1iZXI7XG4gICAgQElucHV0KCkgY2xpY2thYmxlOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIHN3aXBlOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIHNpemU6IHN0cmluZztcbiAgICBASW5wdXQoKSBhcnJvd1ByZXZJY29uOiBzdHJpbmc7XG4gICAgQElucHV0KCkgYXJyb3dOZXh0SWNvbjogc3RyaW5nO1xuICAgIEBJbnB1dCgpIG1vdmVTaXplOiBudW1iZXI7XG4gICAgQElucHV0KCkgb3JkZXI6IG51bWJlcjtcbiAgICBASW5wdXQoKSByZW1haW5pbmdDb3VudDogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBsYXp5TG9hZGluZzogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBhY3Rpb25zOiBOYkdhbGxlcnlBY3Rpb25bXTtcblxuICAgIEBPdXRwdXQoKSBvbkFjdGl2ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIHByaXZhdGUgaW5kZXggPSAwO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzYW5pdGl6YXRpb246IERvbVNhbml0aXplciwgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIGhlbHBlclNlcnZpY2U6IE5iR2FsbGVyeUhlbHBlclNlcnZpY2UpIHt9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgICAgIGlmIChjaGFuZ2VzWydzZWxlY3RlZEluZGV4J10pIHtcbiAgICAgICAgICAgIHRoaXMudmFsaWRhdGVJbmRleCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNoYW5nZXNbJ3N3aXBlJ10pIHtcbiAgICAgICAgICAgIHRoaXMuaGVscGVyU2VydmljZS5tYW5hZ2VTd2lwZSh0aGlzLnN3aXBlLCB0aGlzLmVsZW1lbnRSZWYsXG4gICAgICAgICAgICAndGh1bWJuYWlscycsICgpID0+IHRoaXMubW92ZVJpZ2h0KCksICgpID0+IHRoaXMubW92ZUxlZnQoKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pdGVtcykge1xuICAgICAgICAgICAgdGhpcy5yZW1haW5pbmdDb3VudFZhbHVlID0gdGhpcy5pdGVtcy5sZW5ndGggLSAodGhpcy5yb3dzICogdGhpcy5jb2x1bW5zKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNlZW50ZXInKSBvbk1vdXNlRW50ZXIoKSB7XG4gICAgICAgIHRoaXMubW91c2VlbnRlciA9IHRydWU7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScpIG9uTW91c2VMZWF2ZSgpIHtcbiAgICAgICAgdGhpcy5tb3VzZWVudGVyID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcmVzZXQoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBpbmRleDtcbiAgICAgICAgdGhpcy5zZXREZWZhdWx0UG9zaXRpb24oKTtcblxuICAgICAgICB0aGlzLmluZGV4ID0gMDtcbiAgICAgICAgdGhpcy52YWxpZGF0ZUluZGV4KCk7XG4gICAgfVxuXG4gICAgZ2V0SXRlbXMoKTogc3RyaW5nW10gfCBTYWZlUmVzb3VyY2VVcmxbXSB7XG4gICAgICAgIGlmICghdGhpcy5pdGVtcykge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucmVtYWluaW5nQ291bnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLml0ZW1zLnNsaWNlKDAsIHRoaXMucm93cyAqIHRoaXMuY29sdW1ucyk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5sYXp5TG9hZGluZyAmJiB0aGlzLm9yZGVyICE9PSBOYkdhbGxlcnlPcmRlci5Sb3cpIHtcbiAgICAgICAgICAgIGxldCBzdG9wSW5kZXggPSAwO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5vcmRlciA9PT0gTmJHYWxsZXJ5T3JkZXIuQ29sdW1uKSB7XG4gICAgICAgICAgICAgICAgc3RvcEluZGV4ID0gKHRoaXMuaW5kZXggKyB0aGlzLmNvbHVtbnMgKyB0aGlzLm1vdmVTaXplKSAqIHRoaXMucm93cztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5vcmRlciA9PT0gTmJHYWxsZXJ5T3JkZXIuUGFnZSkge1xuICAgICAgICAgICAgICAgIHN0b3BJbmRleCA9IHRoaXMuaW5kZXggKyAoKHRoaXMuY29sdW1ucyAqIHRoaXMucm93cykgKiAyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHN0b3BJbmRleCA8PSB0aGlzLm1pblN0b3BJbmRleCkge1xuICAgICAgICAgICAgICAgIHN0b3BJbmRleCA9IHRoaXMubWluU3RvcEluZGV4O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1pblN0b3BJbmRleCA9IHN0b3BJbmRleDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXMuc2xpY2UoMCwgc3RvcEluZGV4KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLml0ZW1zO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2soZXZlbnQ6IEV2ZW50LCBpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5oYXNMaW5rKGluZGV4KSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICB0aGlzLm9uQWN0aXZlQ2hhbmdlLmVtaXQoaW5kZXgpO1xuXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYXNMaW5rKGluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMubGlua3MgJiYgdGhpcy5saW5rcy5sZW5ndGggJiYgdGhpcy5saW5rc1tpbmRleF0pIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIG1vdmVSaWdodCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuY2FuTW92ZVJpZ2h0KCkpIHtcbiAgICAgICAgICAgIHRoaXMuaW5kZXggKz0gdGhpcy5tb3ZlU2l6ZTtcbiAgICAgICAgICAgIGNvbnN0IG1heEluZGV4ID0gdGhpcy5nZXRNYXhJbmRleCgpIC0gdGhpcy5jb2x1bW5zO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5pbmRleCA+IG1heEluZGV4KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleCA9IG1heEluZGV4O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNldFRodW1ibmFpbHNQb3NpdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZUxlZnQoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmNhbk1vdmVMZWZ0KCkpIHtcbiAgICAgICAgICAgIHRoaXMuaW5kZXggLT0gdGhpcy5tb3ZlU2l6ZTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleCA9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2V0VGh1bWJuYWlsc1Bvc2l0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjYW5Nb3ZlUmlnaHQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmluZGV4ICsgdGhpcy5jb2x1bW5zIDwgdGhpcy5nZXRNYXhJbmRleCgpID8gdHJ1ZSA6IGZhbHNlO1xuICAgIH1cblxuICAgIGNhbk1vdmVMZWZ0KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pbmRleCAhPT0gMCA/IHRydWUgOiBmYWxzZTtcbiAgICB9XG5cbiAgICBnZXRUaHVtYm5haWxMZWZ0KGluZGV4OiBudW1iZXIpOiBTYWZlU3R5bGUge1xuICAgICAgICBsZXQgY2FsY3VsYXRlZEluZGV4O1xuXG4gICAgICAgIGlmICh0aGlzLm9yZGVyID09PSBOYkdhbGxlcnlPcmRlci5Db2x1bW4pIHtcbiAgICAgICAgICAgIGNhbGN1bGF0ZWRJbmRleCA9IE1hdGguZmxvb3IoaW5kZXggLyB0aGlzLnJvd3MpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMub3JkZXIgPT09IE5iR2FsbGVyeU9yZGVyLlBhZ2UpIHtcbiAgICAgICAgICAgIGNhbGN1bGF0ZWRJbmRleCA9IChpbmRleCAlIHRoaXMuY29sdW1ucykgKyAoTWF0aC5mbG9vcihpbmRleCAvICh0aGlzLnJvd3MgKiB0aGlzLmNvbHVtbnMpKSAqIHRoaXMuY29sdW1ucyk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5vcmRlciA9PT0gTmJHYWxsZXJ5T3JkZXIuUm93ICYmIHRoaXMucmVtYWluaW5nQ291bnQpIHtcbiAgICAgICAgICAgIGNhbGN1bGF0ZWRJbmRleCA9IGluZGV4ICUgdGhpcy5jb2x1bW5zO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FsY3VsYXRlZEluZGV4ID0gaW5kZXggJSBNYXRoLmNlaWwodGhpcy5pdGVtcy5sZW5ndGggLyB0aGlzLnJvd3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VGh1bWJuYWlsUG9zaXRpb24oY2FsY3VsYXRlZEluZGV4LCB0aGlzLmNvbHVtbnMpO1xuICAgIH1cblxuICAgIGdldFRodW1ibmFpbFRvcChpbmRleDogbnVtYmVyKTogU2FmZVN0eWxlIHtcbiAgICAgICAgbGV0IGNhbGN1bGF0ZWRJbmRleDtcblxuICAgICAgICBpZiAodGhpcy5vcmRlciA9PT0gTmJHYWxsZXJ5T3JkZXIuQ29sdW1uKSB7XG4gICAgICAgICAgICBjYWxjdWxhdGVkSW5kZXggPSBpbmRleCAlIHRoaXMucm93cztcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm9yZGVyID09PSBOYkdhbGxlcnlPcmRlci5QYWdlKSB7XG4gICAgICAgICAgICBjYWxjdWxhdGVkSW5kZXggPSBNYXRoLmZsb29yKGluZGV4IC8gdGhpcy5jb2x1bW5zKSAtIChNYXRoLmZsb29yKGluZGV4IC8gKHRoaXMucm93cyAqIHRoaXMuY29sdW1ucykpICogdGhpcy5yb3dzKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm9yZGVyID09PSBOYkdhbGxlcnlPcmRlci5Sb3cgJiYgdGhpcy5yZW1haW5pbmdDb3VudCkge1xuICAgICAgICAgICAgY2FsY3VsYXRlZEluZGV4ID0gTWF0aC5mbG9vcihpbmRleCAvIHRoaXMuY29sdW1ucyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWxjdWxhdGVkSW5kZXggPSBNYXRoLmZsb29yKGluZGV4IC8gTWF0aC5jZWlsKHRoaXMuaXRlbXMubGVuZ3RoIC8gdGhpcy5yb3dzKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5nZXRUaHVtYm5haWxQb3NpdGlvbihjYWxjdWxhdGVkSW5kZXgsIHRoaXMucm93cyk7XG4gICAgfVxuXG4gICAgZ2V0VGh1bWJuYWlsV2lkdGgoKTogU2FmZVN0eWxlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VGh1bWJuYWlsRGltZW5zaW9uKHRoaXMuY29sdW1ucyk7XG4gICAgfVxuXG4gICAgZ2V0VGh1bWJuYWlsSGVpZ2h0KCk6IFNhZmVTdHlsZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFRodW1ibmFpbERpbWVuc2lvbih0aGlzLnJvd3MpO1xuICAgIH1cblxuICAgIHNldFRodW1ibmFpbHNQb3NpdGlvbigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50aHVtYm5haWxzTGVmdCA9IC0gKCgxMDAgLyB0aGlzLmNvbHVtbnMpICogdGhpcy5pbmRleCkgKyAnJSdcblxuICAgICAgICB0aGlzLnRodW1ibmFpbHNNYXJnaW5MZWZ0ID0gLSAoKHRoaXMubWFyZ2luIC0gKCgodGhpcy5jb2x1bW5zIC0gMSlcbiAgICAgICAgKiB0aGlzLm1hcmdpbikgLyB0aGlzLmNvbHVtbnMpKSAqIHRoaXMuaW5kZXgpICsgJ3B4JztcbiAgICB9XG5cbiAgICBzZXREZWZhdWx0UG9zaXRpb24oKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGh1bWJuYWlsc0xlZnQgPSAnMHB4JztcbiAgICAgICAgdGhpcy50aHVtYm5haWxzTWFyZ2luTGVmdCA9ICcwcHgnO1xuICAgIH1cblxuICAgIGNhblNob3dBcnJvd3MoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLnJlbWFpbmluZ0NvdW50KSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5hcnJvd3MgJiYgdGhpcy5pdGVtcyAmJiB0aGlzLml0ZW1zLmxlbmd0aCA+IHRoaXMuZ2V0VmlzaWJsZUNvdW50KClcbiAgICAgICAgICAgICYmICghdGhpcy5hcnJvd3NBdXRvSGlkZSB8fCB0aGlzLm1vdXNlZW50ZXIpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhbGlkYXRlSW5kZXgoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLml0ZW1zKSB7XG4gICAgICAgICAgICBsZXQgbmV3SW5kZXg7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm9yZGVyID09PSBOYkdhbGxlcnlPcmRlci5Db2x1bW4pIHtcbiAgICAgICAgICAgICAgICBuZXdJbmRleCA9IE1hdGguZmxvb3IodGhpcy5zZWxlY3RlZEluZGV4IC8gdGhpcy5yb3dzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3SW5kZXggPSB0aGlzLnNlbGVjdGVkSW5kZXggJSBNYXRoLmNlaWwodGhpcy5pdGVtcy5sZW5ndGggLyB0aGlzLnJvd3MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5yZW1haW5pbmdDb3VudCkge1xuICAgICAgICAgICAgICAgIG5ld0luZGV4ID0gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG5ld0luZGV4IDwgdGhpcy5pbmRleCB8fCBuZXdJbmRleCA+PSB0aGlzLmluZGV4ICsgdGhpcy5jb2x1bW5zKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWF4SW5kZXggPSB0aGlzLmdldE1heEluZGV4KCkgLSB0aGlzLmNvbHVtbnM7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleCA9IG5ld0luZGV4ID4gbWF4SW5kZXggPyBtYXhJbmRleCA6IG5ld0luZGV4O1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRUaHVtYm5haWxzUG9zaXRpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFNhZmVVcmwoaW1hZ2U6IHN0cmluZyk6IFNhZmVTdHlsZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNhbml0aXphdGlvbi5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUodGhpcy5oZWxwZXJTZXJ2aWNlLmdldEJhY2tncm91bmRVcmwoaW1hZ2UpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFRodW1ibmFpbFBvc2l0aW9uKGluZGV4OiBudW1iZXIsIGNvdW50OiBudW1iZXIpOiBTYWZlU3R5bGUge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRTYWZlU3R5bGUoJ2NhbGMoJyArICgoMTAwIC8gY291bnQpICogaW5kZXgpICsgJyUgKyAnXG4gICAgICAgICAgICArICgodGhpcy5tYXJnaW4gLSAoKChjb3VudCAtIDEpICogdGhpcy5tYXJnaW4pIC8gY291bnQpKSAqIGluZGV4KSArICdweCknKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFRodW1ibmFpbERpbWVuc2lvbihjb3VudDogbnVtYmVyKTogU2FmZVN0eWxlIHtcbiAgICAgICAgaWYgKHRoaXMubWFyZ2luICE9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRTYWZlU3R5bGUoJ2NhbGMoJyArICgxMDAgLyBjb3VudCkgKyAnJSAtICdcbiAgICAgICAgICAgICAgICArICgoKGNvdW50IC0gMSkgKiB0aGlzLm1hcmdpbikgLyBjb3VudCkgKyAncHgpJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRTYWZlU3R5bGUoJ2NhbGMoJyArICgxMDAgLyBjb3VudCkgKyAnJSArIDFweCknKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0TWF4SW5kZXgoKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKHRoaXMub3JkZXIgPT09IE5iR2FsbGVyeU9yZGVyLlBhZ2UpIHtcbiAgICAgICAgICAgIGxldCBtYXhJbmRleCA9IChNYXRoLmZsb29yKHRoaXMuaXRlbXMubGVuZ3RoIC8gdGhpcy5nZXRWaXNpYmxlQ291bnQoKSkgKiB0aGlzLmNvbHVtbnMpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5pdGVtcy5sZW5ndGggJSB0aGlzLmdldFZpc2libGVDb3VudCgpID4gdGhpcy5jb2x1bW5zKSB7XG4gICAgICAgICAgICAgICAgbWF4SW5kZXggKz0gdGhpcy5jb2x1bW5zO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtYXhJbmRleCArPSB0aGlzLml0ZW1zLmxlbmd0aCAlIHRoaXMuZ2V0VmlzaWJsZUNvdW50KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBtYXhJbmRleDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmNlaWwodGhpcy5pdGVtcy5sZW5ndGggLyB0aGlzLnJvd3MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRWaXNpYmxlQ291bnQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29sdW1ucyAqIHRoaXMucm93cztcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFNhZmVTdHlsZSh2YWx1ZTogc3RyaW5nKTogU2FmZVN0eWxlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2FuaXRpemF0aW9uLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZSh2YWx1ZSk7XG4gICAgfVxufVxuIl19