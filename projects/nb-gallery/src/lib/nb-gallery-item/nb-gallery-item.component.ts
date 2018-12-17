import { Component, Input, Output, EventEmitter, HostListener,  ElementRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { NbGalleryHelperService } from '../nb-gallery-helper.service';
import { NbGalleryAnimation } from '../models/nb-gallery-animation.model';
import { NbGalleryAction } from '../models/nb-gallery-action.model';
import { NbGalleryOrderedItem } from '../models/nb-gallery-ordered-item.model';

@Component({
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
    styleUrls: ['./nb-gallery-item.component.scss']
})
export class NbGalleryItemComponent implements OnInit, OnChanges {
    @Input() items: NbGalleryOrderedItem[];
    @Input() clickable: boolean;
    @Input() selectedIndex: number;
    @Input() arrows: boolean;
    @Input() arrowsAutoHide: boolean;
    @Input() swipe: boolean;
    @Input() animation: string;
    @Input() size: string;
    @Input() arrowPrevIcon: string;
    @Input() arrowNextIcon: string;
    @Input() autoPlay: boolean;
    @Input() autoPlayInterval: number;
    @Input() autoPlayPauseOnHover: boolean;
    @Input() infinityMove: boolean;
    @Input() lazyLoading: boolean;
    @Input() actions: NbGalleryAction[];
    @Input() descriptions: string[];
    @Input() showDescription: boolean;
    @Input() bullets: boolean;
    @Input() bgColor: string;

    @Output() onClick = new EventEmitter();
    @Output() onActiveChange = new EventEmitter();

    canChangeImage = true;

    private timer;

    constructor(private sanitization: DomSanitizer,
        private elementRef: ElementRef, private helperService: NbGalleryHelperService) {}

    ngOnInit(): void {
        if (this.arrows && this.arrowsAutoHide) {
            this.arrows = false;
        }

        if (this.autoPlay) {
            this.startAutoPlay();
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['swipe']) {
            this.helperService.manageSwipe(this.swipe, this.elementRef, 'image', () => this.showNext(), () => this.showPrev());
        }
    }

    @HostListener('mouseenter') onMouseEnter() {
        if (this.arrowsAutoHide && !this.arrows) {
            this.arrows = true;
        }

        if (this.autoPlay && this.autoPlayPauseOnHover) {
            this.stopAutoPlay();
        }
    }

    @HostListener('mouseleave') onMouseLeave() {
        if (this.arrowsAutoHide && this.arrows) {
            this.arrows = false;
        }

        if (this.autoPlay && this.autoPlayPauseOnHover) {
            this.startAutoPlay();
        }
    }

    reset(index: number): void {
        this.selectedIndex = index;
    }

    getItems(): NbGalleryOrderedItem[] {
        if (!this.items) {
            return [];
        }

        if (this.lazyLoading) {
            const indexes = [this.selectedIndex];
            const prevIndex = this.selectedIndex - 1;

            if (prevIndex === -1 && this.infinityMove) {
                indexes.push(this.items.length - 1);
            } else if (prevIndex >= 0) {
                indexes.push(prevIndex);
            }

            const nextIndex = this.selectedIndex + 1;

            if (nextIndex === this.items.length && this.infinityMove) {
                indexes.push(0);
            } else if (nextIndex < this.items.length) {
                indexes.push(nextIndex);
            }

            return this.items.filter((img, i) => indexes.indexOf(i) != -1);
        } else {
            return this.items;
        }
    }

    startAutoPlay(): void {
        this.stopAutoPlay();

        this.timer = setInterval(() => {
            if (!this.showNext()) {
                this.selectedIndex = -1;
                this.showNext();
            }
        }, this.autoPlayInterval);
    }

    stopAutoPlay() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    handleClick(event: Event, index: number): void {
        if (this.clickable) {
            this.onClick.emit(index);

            event.stopPropagation();
            event.preventDefault();
        }
    }

    show(index: number) {
        this.selectedIndex = index;
        this.onActiveChange.emit(this.selectedIndex);
        this.setChangeTimeout();
    }

    showNext(): boolean {
        if (this.canShowNext() && this.canChangeImage) {
            this.selectedIndex++;

            if (this.selectedIndex === this.items.length) {
                this.selectedIndex = 0;
            }

            this.onActiveChange.emit(this.selectedIndex);
            this.setChangeTimeout();

            return true;
        } else {
            return false;
        }
    }

    showPrev(): void {
        if (this.canShowPrev() && this.canChangeImage) {
            this.selectedIndex--;

            if (this.selectedIndex < 0) {
                this.selectedIndex = this.items.length - 1;
            }

            this.onActiveChange.emit(this.selectedIndex);
            this.setChangeTimeout();
        }
    }

    setChangeTimeout() {
        this.canChangeImage = false;
        let timeout = 1000;

        if (this.animation === NbGalleryAnimation.Slide
            || this.animation === NbGalleryAnimation.Fade) {
                timeout = 500;
        }

        setTimeout(() => {
            this.canChangeImage = true;
        }, timeout);
    }

    canShowNext(): boolean {
        if (this.items) {
            return this.infinityMove || this.selectedIndex < this.items.length - 1
                ? true : false;
        } else {
            return false;
        }
    }

    canShowPrev(): boolean {
        if (this.items) {
            return this.infinityMove || this.selectedIndex > 0 ? true : false;
        } else {
            return false;
        }
    }

    getSafeUrl(image: string): SafeStyle {
        return this.sanitization.bypassSecurityTrustStyle(this.helperService.getBackgroundUrl(image));
    }
}
