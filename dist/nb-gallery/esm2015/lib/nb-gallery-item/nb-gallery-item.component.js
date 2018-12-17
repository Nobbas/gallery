/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NbGalleryHelperService } from '../nb-gallery-helper.service';
import { NbGalleryAnimation } from '../models/nb-gallery-animation.model';
export class NbGalleryItemComponent {
    /**
     * @param {?} sanitization
     * @param {?} elementRef
     * @param {?} helperService
     */
    constructor(sanitization, elementRef, helperService) {
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
    ngOnInit() {
        if (this.arrows && this.arrowsAutoHide) {
            this.arrows = false;
        }
        if (this.autoPlay) {
            this.startAutoPlay();
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes['swipe']) {
            this.helperService.manageSwipe(this.swipe, this.elementRef, 'image', () => this.showNext(), () => this.showPrev());
        }
    }
    /**
     * @return {?}
     */
    onMouseEnter() {
        if (this.arrowsAutoHide && !this.arrows) {
            this.arrows = true;
        }
        if (this.autoPlay && this.autoPlayPauseOnHover) {
            this.stopAutoPlay();
        }
    }
    /**
     * @return {?}
     */
    onMouseLeave() {
        if (this.arrowsAutoHide && this.arrows) {
            this.arrows = false;
        }
        if (this.autoPlay && this.autoPlayPauseOnHover) {
            this.startAutoPlay();
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    reset(index) {
        this.selectedIndex = index;
    }
    /**
     * @return {?}
     */
    getItems() {
        if (!this.items) {
            return [];
        }
        if (this.lazyLoading) {
            /** @type {?} */
            const indexes = [this.selectedIndex];
            /** @type {?} */
            const prevIndex = this.selectedIndex - 1;
            if (prevIndex === -1 && this.infinityMove) {
                indexes.push(this.items.length - 1);
            }
            else if (prevIndex >= 0) {
                indexes.push(prevIndex);
            }
            /** @type {?} */
            const nextIndex = this.selectedIndex + 1;
            if (nextIndex === this.items.length && this.infinityMove) {
                indexes.push(0);
            }
            else if (nextIndex < this.items.length) {
                indexes.push(nextIndex);
            }
            return this.items.filter((img, i) => indexes.indexOf(i) != -1);
        }
        else {
            return this.items;
        }
    }
    /**
     * @return {?}
     */
    startAutoPlay() {
        this.stopAutoPlay();
        this.timer = setInterval(() => {
            if (!this.showNext()) {
                this.selectedIndex = -1;
                this.showNext();
            }
        }, this.autoPlayInterval);
    }
    /**
     * @return {?}
     */
    stopAutoPlay() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
    /**
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    handleClick(event, index) {
        if (this.clickable) {
            this.onClick.emit(index);
            event.stopPropagation();
            event.preventDefault();
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    show(index) {
        this.selectedIndex = index;
        this.onActiveChange.emit(this.selectedIndex);
        this.setChangeTimeout();
    }
    /**
     * @return {?}
     */
    showNext() {
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
    }
    /**
     * @return {?}
     */
    showPrev() {
        if (this.canShowPrev() && this.canChangeImage) {
            this.selectedIndex--;
            if (this.selectedIndex < 0) {
                this.selectedIndex = this.items.length - 1;
            }
            this.onActiveChange.emit(this.selectedIndex);
            this.setChangeTimeout();
        }
    }
    /**
     * @return {?}
     */
    setChangeTimeout() {
        this.canChangeImage = false;
        /** @type {?} */
        let timeout = 1000;
        if (this.animation === NbGalleryAnimation.Slide
            || this.animation === NbGalleryAnimation.Fade) {
            timeout = 500;
        }
        setTimeout(() => {
            this.canChangeImage = true;
        }, timeout);
    }
    /**
     * @return {?}
     */
    canShowNext() {
        if (this.items) {
            return this.infinityMove || this.selectedIndex < this.items.length - 1
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
        if (this.items) {
            return this.infinityMove || this.selectedIndex > 0 ? true : false;
        }
        else {
            return false;
        }
    }
    /**
     * @param {?} image
     * @return {?}
     */
    getSafeUrl(image) {
        return this.sanitization.bypassSecurityTrustStyle(this.helperService.getBackgroundUrl(image));
    }
}
NbGalleryItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'nb-gallery-item',
                template: `
        <div class="nb-gallery-item-wrapper nb-gallery-animation-{{animation}} nb-gallery-item-size-{{size}}">
            <div class="nb-gallery-item" *ngFor="let item of getItems(); let i = index;" [ngClass]="{ 'nb-gallery-active': selectedIndex == item.index, 'nb-gallery-inactive-left': selectedIndex > item.index, 'nb-gallery-inactive-right': selectedIndex < item.index, 'nb-gallery-clickable': clickable }" (click)="handleClick($event, item.index)">
                <div *ngIf="item.type === 'image'" class="nb-gallery-item-image" [style.background-image]="getSafeUrl(item.url)"></div>
                <nb-gallery-video *ngIf="item.type === 'video'" [videoItem]="item" [pause]="selectedIndex !== item.index" class="nb-gallery-item-video"></nb-gallery-video>
                <div class="nb-gallery-icons-wrapper">
                    <nb-gallery-action *ngFor="let action of actions" [icon]="action.icon" [disabled]="action.disabled" [titleText]="action.titleText" (onClick)="action.onClick($event, item.index)"></nb-gallery-action>
                </div>
                <div class="nb-gallery-item-text" *ngIf="showDescription && descriptions[item.index]" [innerHTML]="descriptions[item.index]" (click)="$event.stopPropagation()"></div>
            </div>
        </div>
        <nb-gallery-bullets *ngIf="bullets" [count]="items.length" [active]="selectedIndex" (onChange)="show($event)"></nb-gallery-bullets>
        <nb-gallery-arrows class="nb-gallery-item-size-{{size}}" *ngIf="arrows" (onPrevClick)="showPrev()" (onNextClick)="showNext()" [prevDisabled]="!canShowPrev()" [nextDisabled]="!canShowNext()" [arrowPrevIcon]="arrowPrevIcon" [arrowNextIcon]="arrowNextIcon"></nb-gallery-arrows>
    `,
                styles: [":host{width:100%;display:inline-block;position:relative}.nb-gallery-item-wrapper{width:100%;height:100%;position:absolute;left:0;top:0;overflow:hidden}.nb-gallery-item,.nb-gallery-item-image{background-position:center;background-repeat:no-repeat;height:100%;width:100%;position:absolute;top:0}.nb-gallery-item-image.nb-gallery-active,.nb-gallery-item.nb-gallery-active{z-index:1000}.nb-gallery-item-size-cover .nb-gallery-item .nb-gallery-item-image{background-size:cover}.nb-gallery-item-size-contain .nb-gallery-item .nb-gallery-item-image{background-size:contain}.nb-gallery-animation-fade .nb-gallery-item{left:0;opacity:0;transition:.5s ease-in-out}.nb-gallery-animation-fade .nb-gallery-item.nb-gallery-active{opacity:1}.nb-gallery-animation-slide .nb-gallery-item{transition:.5s ease-in-out}.nb-gallery-animation-slide .nb-gallery-item.nb-gallery-active{left:0}.nb-gallery-animation-slide .nb-gallery-item.nb-gallery-inactive-left{left:-100%}.nb-gallery-animation-slide .nb-gallery-item.nb-gallery-inactive-right{left:100%}.nb-gallery-animation-rotate .nb-gallery-item{transition:1s;-webkit-transform:scale(3.5,3.5) rotate(90deg);transform:scale(3.5,3.5) rotate(90deg);left:0;opacity:0}.nb-gallery-animation-rotate .nb-gallery-item.nb-gallery-active{-webkit-transform:scale(1,1) rotate(0);transform:scale(1,1) rotate(0);opacity:1}.nb-gallery-animation-zoom .nb-gallery-item{transition:1s;-webkit-transform:scale(2.5,2.5);transform:scale(2.5,2.5);left:0;opacity:0}.nb-gallery-animation-zoom .nb-gallery-item.nb-gallery-active{-webkit-transform:scale(1,1);transform:scale(1,1);opacity:1}.nb-gallery-item-text{width:100%;background:rgba(0,0,0,.7);padding:10px;text-align:center;color:#fff;font-size:16px;position:absolute;bottom:0;z-index:10}"]
            }] }
];
/** @nocollapse */
NbGalleryItemComponent.ctorParameters = () => [
    { type: DomSanitizer },
    { type: ElementRef },
    { type: NbGalleryHelperService }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmItZ2FsbGVyeS1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25iLWdhbGxlcnkvIiwic291cmNlcyI6WyJsaWIvbmItZ2FsbGVyeS1pdGVtL25iLWdhbGxlcnktaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFHLFVBQVUsRUFBb0MsTUFBTSxlQUFlLENBQUM7QUFDcEksT0FBTyxFQUFFLFlBQVksRUFBYSxNQUFNLDJCQUEyQixDQUFDO0FBRXBFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBc0IxRSxNQUFNOzs7Ozs7SUE2QkYsWUFBb0IsWUFBMEIsRUFDbEMsWUFBZ0MsYUFBcUM7UUFEN0QsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDbEMsZUFBVSxHQUFWLFVBQVU7UUFBc0Isa0JBQWEsR0FBYixhQUFhLENBQXdCO3VCQVI3RCxJQUFJLFlBQVksRUFBRTs4QkFDWCxJQUFJLFlBQVksRUFBRTs4QkFFNUIsSUFBSTtLQUtnRTs7OztJQUVyRixRQUFRO1FBQ0osSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDcEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7U0FDdkI7UUFFRCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7S0FDSjs7Ozs7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDOUIsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDbEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFF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LGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0tBQ2pHOzs7WUF0TkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7OztLQWFUOzthQUVKOzs7O1lBeEJRLFlBQVk7WUFEMkMsVUFBVTtZQUdqRSxzQkFBc0I7OztvQkF3QjFCLEtBQUs7d0JBQ0wsS0FBSzs0QkFDTCxLQUFLO3FCQUNMLEtBQUs7NkJBQ0wsS0FBSztvQkFDTCxLQUFLO3dCQUNMLEtBQUs7bUJBQ0wsS0FBSzs0QkFDTCxLQUFLOzRCQUNMLEtBQUs7dUJBQ0wsS0FBSzsrQkFDTCxLQUFLO21DQUNMLEtBQUs7MkJBQ0wsS0FBSzswQkFDTCxLQUFLO3NCQUNMLEtBQUs7MkJBQ0wsS0FBSzs4QkFDTCxLQUFLO3NCQUNMLEtBQUs7c0JBQ0wsS0FBSztzQkFFTCxNQUFNOzZCQUNOLE1BQU07MkJBeUJOLFlBQVksU0FBQyxZQUFZOzJCQVV6QixZQUFZLFNBQUMsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsICBFbGVtZW50UmVmLCBPbkluaXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyLCBTYWZlU3R5bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuaW1wb3J0IHsgTmJHYWxsZXJ5SGVscGVyU2VydmljZSB9IGZyb20gJy4uL25iLWdhbGxlcnktaGVscGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgTmJHYWxsZXJ5QW5pbWF0aW9uIH0gZnJvbSAnLi4vbW9kZWxzL25iLWdhbGxlcnktYW5pbWF0aW9uLm1vZGVsJztcbmltcG9ydCB7IE5iR2FsbGVyeUFjdGlvbiB9IGZyb20gJy4uL21vZGVscy9uYi1nYWxsZXJ5LWFjdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBOYkdhbGxlcnlPcmRlcmVkSXRlbSB9IGZyb20gJy4uL21vZGVscy9uYi1nYWxsZXJ5LW9yZGVyZWQtaXRlbS5tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbmItZ2FsbGVyeS1pdGVtJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IGNsYXNzPVwibmItZ2FsbGVyeS1pdGVtLXdyYXBwZXIgbmItZ2FsbGVyeS1hbmltYXRpb24te3thbmltYXRpb259fSBuYi1nYWxsZXJ5LWl0ZW0tc2l6ZS17e3NpemV9fVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5iLWdhbGxlcnktaXRlbVwiICpuZ0Zvcj1cImxldCBpdGVtIG9mIGdldEl0ZW1zKCk7IGxldCBpID0gaW5kZXg7XCIgW25nQ2xhc3NdPVwieyAnbmItZ2FsbGVyeS1hY3RpdmUnOiBzZWxlY3RlZEluZGV4ID09IGl0ZW0uaW5kZXgsICduYi1nYWxsZXJ5LWluYWN0aXZlLWxlZnQnOiBzZWxlY3RlZEluZGV4ID4gaXRlbS5pbmRleCwgJ25iLWdhbGxlcnktaW5hY3RpdmUtcmlnaHQnOiBzZWxlY3RlZEluZGV4IDwgaXRlbS5pbmRleCwgJ25iLWdhbGxlcnktY2xpY2thYmxlJzogY2xpY2thYmxlIH1cIiAoY2xpY2spPVwiaGFuZGxlQ2xpY2soJGV2ZW50LCBpdGVtLmluZGV4KVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJpdGVtLnR5cGUgPT09ICdpbWFnZSdcIiBjbGFzcz1cIm5iLWdhbGxlcnktaXRlbS1pbWFnZVwiIFtzdHlsZS5iYWNrZ3JvdW5kLWltYWdlXT1cImdldFNhZmVVcmwoaXRlbS51cmwpXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPG5iLWdhbGxlcnktdmlkZW8gKm5nSWY9XCJpdGVtLnR5cGUgPT09ICd2aWRlbydcIiBbdmlkZW9JdGVtXT1cIml0ZW1cIiBbcGF1c2VdPVwic2VsZWN0ZWRJbmRleCAhPT0gaXRlbS5pbmRleFwiIGNsYXNzPVwibmItZ2FsbGVyeS1pdGVtLXZpZGVvXCI+PC9uYi1nYWxsZXJ5LXZpZGVvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuYi1nYWxsZXJ5LWljb25zLXdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5iLWdhbGxlcnktYWN0aW9uICpuZ0Zvcj1cImxldCBhY3Rpb24gb2YgYWN0aW9uc1wiIFtpY29uXT1cImFjdGlvbi5pY29uXCIgW2Rpc2FibGVkXT1cImFjdGlvbi5kaXNhYmxlZFwiIFt0aXRsZVRleHRdPVwiYWN0aW9uLnRpdGxlVGV4dFwiIChvbkNsaWNrKT1cImFjdGlvbi5vbkNsaWNrKCRldmVudCwgaXRlbS5pbmRleClcIj48L25iLWdhbGxlcnktYWN0aW9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuYi1nYWxsZXJ5LWl0ZW0tdGV4dFwiICpuZ0lmPVwic2hvd0Rlc2NyaXB0aW9uICYmIGRlc2NyaXB0aW9uc1tpdGVtLmluZGV4XVwiIFtpbm5lckhUTUxdPVwiZGVzY3JpcHRpb25zW2l0ZW0uaW5kZXhdXCIgKGNsaWNrKT1cIiRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8bmItZ2FsbGVyeS1idWxsZXRzICpuZ0lmPVwiYnVsbGV0c1wiIFtjb3VudF09XCJpdGVtcy5sZW5ndGhcIiBbYWN0aXZlXT1cInNlbGVjdGVkSW5kZXhcIiAob25DaGFuZ2UpPVwic2hvdygkZXZlbnQpXCI+PC9uYi1nYWxsZXJ5LWJ1bGxldHM+XG4gICAgICAgIDxuYi1nYWxsZXJ5LWFycm93cyBjbGFzcz1cIm5iLWdhbGxlcnktaXRlbS1zaXplLXt7c2l6ZX19XCIgKm5nSWY9XCJhcnJvd3NcIiAob25QcmV2Q2xpY2spPVwic2hvd1ByZXYoKVwiIChvbk5leHRDbGljayk9XCJzaG93TmV4dCgpXCIgW3ByZXZEaXNhYmxlZF09XCIhY2FuU2hvd1ByZXYoKVwiIFtuZXh0RGlzYWJsZWRdPVwiIWNhblNob3dOZXh0KClcIiBbYXJyb3dQcmV2SWNvbl09XCJhcnJvd1ByZXZJY29uXCIgW2Fycm93TmV4dEljb25dPVwiYXJyb3dOZXh0SWNvblwiPjwvbmItZ2FsbGVyeS1hcnJvd3M+XG4gICAgYCxcbiAgICBzdHlsZVVybHM6IFsnLi9uYi1nYWxsZXJ5LWl0ZW0uY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBOYkdhbGxlcnlJdGVtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICAgIEBJbnB1dCgpIGl0ZW1zOiBOYkdhbGxlcnlPcmRlcmVkSXRlbVtdO1xuICAgIEBJbnB1dCgpIGNsaWNrYWJsZTogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBzZWxlY3RlZEluZGV4OiBudW1iZXI7XG4gICAgQElucHV0KCkgYXJyb3dzOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIGFycm93c0F1dG9IaWRlOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIHN3aXBlOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIGFuaW1hdGlvbjogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHNpemU6IHN0cmluZztcbiAgICBASW5wdXQoKSBhcnJvd1ByZXZJY29uOiBzdHJpbmc7XG4gICAgQElucHV0KCkgYXJyb3dOZXh0SWNvbjogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGF1dG9QbGF5OiBib29sZWFuO1xuICAgIEBJbnB1dCgpIGF1dG9QbGF5SW50ZXJ2YWw6IG51bWJlcjtcbiAgICBASW5wdXQoKSBhdXRvUGxheVBhdXNlT25Ib3ZlcjogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBpbmZpbml0eU1vdmU6IGJvb2xlYW47XG4gICAgQElucHV0KCkgbGF6eUxvYWRpbmc6IGJvb2xlYW47XG4gICAgQElucHV0KCkgYWN0aW9uczogTmJHYWxsZXJ5QWN0aW9uW107XG4gICAgQElucHV0KCkgZGVzY3JpcHRpb25zOiBzdHJpbmdbXTtcbiAgICBASW5wdXQoKSBzaG93RGVzY3JpcHRpb246IGJvb2xlYW47XG4gICAgQElucHV0KCkgYnVsbGV0czogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBiZ0NvbG9yOiBzdHJpbmc7XG5cbiAgICBAT3V0cHV0KCkgb25DbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgb25BY3RpdmVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBjYW5DaGFuZ2VJbWFnZSA9IHRydWU7XG5cbiAgICBwcml2YXRlIHRpbWVyO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzYW5pdGl6YXRpb246IERvbVNhbml0aXplcixcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIGhlbHBlclNlcnZpY2U6IE5iR2FsbGVyeUhlbHBlclNlcnZpY2UpIHt9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuYXJyb3dzICYmIHRoaXMuYXJyb3dzQXV0b0hpZGUpIHtcbiAgICAgICAgICAgIHRoaXMuYXJyb3dzID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5hdXRvUGxheSkge1xuICAgICAgICAgICAgdGhpcy5zdGFydEF1dG9QbGF5KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgICAgIGlmIChjaGFuZ2VzWydzd2lwZSddKSB7XG4gICAgICAgICAgICB0aGlzLmhlbHBlclNlcnZpY2UubWFuYWdlU3dpcGUodGhpcy5zd2lwZSwgdGhpcy5lbGVtZW50UmVmLCAnaW1hZ2UnLCAoKSA9PiB0aGlzLnNob3dOZXh0KCksICgpID0+IHRoaXMuc2hvd1ByZXYoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdtb3VzZWVudGVyJykgb25Nb3VzZUVudGVyKCkge1xuICAgICAgICBpZiAodGhpcy5hcnJvd3NBdXRvSGlkZSAmJiAhdGhpcy5hcnJvd3MpIHtcbiAgICAgICAgICAgIHRoaXMuYXJyb3dzID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmF1dG9QbGF5ICYmIHRoaXMuYXV0b1BsYXlQYXVzZU9uSG92ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcEF1dG9QbGF5KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJykgb25Nb3VzZUxlYXZlKCkge1xuICAgICAgICBpZiAodGhpcy5hcnJvd3NBdXRvSGlkZSAmJiB0aGlzLmFycm93cykge1xuICAgICAgICAgICAgdGhpcy5hcnJvd3MgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmF1dG9QbGF5ICYmIHRoaXMuYXV0b1BsYXlQYXVzZU9uSG92ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRBdXRvUGxheSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzZXQoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBpbmRleDtcbiAgICB9XG5cbiAgICBnZXRJdGVtcygpOiBOYkdhbGxlcnlPcmRlcmVkSXRlbVtdIHtcbiAgICAgICAgaWYgKCF0aGlzLml0ZW1zKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5sYXp5TG9hZGluZykge1xuICAgICAgICAgICAgY29uc3QgaW5kZXhlcyA9IFt0aGlzLnNlbGVjdGVkSW5kZXhdO1xuICAgICAgICAgICAgY29uc3QgcHJldkluZGV4ID0gdGhpcy5zZWxlY3RlZEluZGV4IC0gMTtcblxuICAgICAgICAgICAgaWYgKHByZXZJbmRleCA9PT0gLTEgJiYgdGhpcy5pbmZpbml0eU1vdmUpIHtcbiAgICAgICAgICAgICAgICBpbmRleGVzLnB1c2godGhpcy5pdGVtcy5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocHJldkluZGV4ID49IDApIHtcbiAgICAgICAgICAgICAgICBpbmRleGVzLnB1c2gocHJldkluZGV4KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbmV4dEluZGV4ID0gdGhpcy5zZWxlY3RlZEluZGV4ICsgMTtcblxuICAgICAgICAgICAgaWYgKG5leHRJbmRleCA9PT0gdGhpcy5pdGVtcy5sZW5ndGggJiYgdGhpcy5pbmZpbml0eU1vdmUpIHtcbiAgICAgICAgICAgICAgICBpbmRleGVzLnB1c2goMCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5leHRJbmRleCA8IHRoaXMuaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaW5kZXhlcy5wdXNoKG5leHRJbmRleCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLml0ZW1zLmZpbHRlcigoaW1nLCBpKSA9PiBpbmRleGVzLmluZGV4T2YoaSkgIT0gLTEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGFydEF1dG9QbGF5KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnN0b3BBdXRvUGxheSgpO1xuXG4gICAgICAgIHRoaXMudGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuc2hvd05leHQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IC0xO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd05leHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcy5hdXRvUGxheUludGVydmFsKTtcbiAgICB9XG5cbiAgICBzdG9wQXV0b1BsYXkoKSB7XG4gICAgICAgIGlmICh0aGlzLnRpbWVyKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMudGltZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2soZXZlbnQ6IEV2ZW50LCBpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmNsaWNrYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5vbkNsaWNrLmVtaXQoaW5kZXgpO1xuXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93KGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gaW5kZXg7XG4gICAgICAgIHRoaXMub25BY3RpdmVDaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGVkSW5kZXgpO1xuICAgICAgICB0aGlzLnNldENoYW5nZVRpbWVvdXQoKTtcbiAgICB9XG5cbiAgICBzaG93TmV4dCgpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuY2FuU2hvd05leHQoKSAmJiB0aGlzLmNhbkNoYW5nZUltYWdlKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXgrKztcblxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRJbmRleCA9PT0gdGhpcy5pdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm9uQWN0aXZlQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3RlZEluZGV4KTtcbiAgICAgICAgICAgIHRoaXMuc2V0Q2hhbmdlVGltZW91dCgpO1xuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3dQcmV2KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5jYW5TaG93UHJldigpICYmIHRoaXMuY2FuQ2hhbmdlSW1hZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleC0tO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZEluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IHRoaXMuaXRlbXMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5vbkFjdGl2ZUNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0ZWRJbmRleCk7XG4gICAgICAgICAgICB0aGlzLnNldENoYW5nZVRpbWVvdXQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldENoYW5nZVRpbWVvdXQoKSB7XG4gICAgICAgIHRoaXMuY2FuQ2hhbmdlSW1hZ2UgPSBmYWxzZTtcbiAgICAgICAgbGV0IHRpbWVvdXQgPSAxMDAwO1xuXG4gICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbiA9PT0gTmJHYWxsZXJ5QW5pbWF0aW9uLlNsaWRlXG4gICAgICAgICAgICB8fCB0aGlzLmFuaW1hdGlvbiA9PT0gTmJHYWxsZXJ5QW5pbWF0aW9uLkZhZGUpIHtcbiAgICAgICAgICAgICAgICB0aW1lb3V0ID0gNTAwO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNhbkNoYW5nZUltYWdlID0gdHJ1ZTtcbiAgICAgICAgfSwgdGltZW91dCk7XG4gICAgfVxuXG4gICAgY2FuU2hvd05leHQoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLml0ZW1zKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbmZpbml0eU1vdmUgfHwgdGhpcy5zZWxlY3RlZEluZGV4IDwgdGhpcy5pdGVtcy5sZW5ndGggLSAxXG4gICAgICAgICAgICAgICAgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjYW5TaG93UHJldigpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuaXRlbXMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmluZmluaXR5TW92ZSB8fCB0aGlzLnNlbGVjdGVkSW5kZXggPiAwID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0U2FmZVVybChpbWFnZTogc3RyaW5nKTogU2FmZVN0eWxlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2FuaXRpemF0aW9uLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZSh0aGlzLmhlbHBlclNlcnZpY2UuZ2V0QmFja2dyb3VuZFVybChpbWFnZSkpO1xuICAgIH1cbn1cbiJdfQ==