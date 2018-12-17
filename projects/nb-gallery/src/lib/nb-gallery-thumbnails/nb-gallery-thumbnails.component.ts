import { Component, Input, Output, EventEmitter, HostListener, OnChanges, SimpleChanges, ElementRef } from '@angular/core';
import { DomSanitizer, SafeStyle, SafeResourceUrl } from '@angular/platform-browser';

import { NbGalleryHelperService } from '../nb-gallery-helper.service';
import { NbGalleryOrder } from '../models/nb-gallery-order.model';
import { NbGalleryAction } from '../models/nb-gallery-action.model';
import { NbGalleryThumbnail } from '../models/nb-gallery-thumbnail.model';

@Component({
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
    styleUrls: ['./nb-gallery-thumbnails.component.scss']
})
export class NbGalleryThumbnailsComponent implements OnChanges {

    thumbnailsLeft: string;
    thumbnailsMarginLeft: string;
    mouseenter: boolean;
    remainingCountValue: number;

    minStopIndex = 0;

    @Input() items: NbGalleryThumbnail[];
    @Input() links: string[];
    @Input() labels: string[];
    @Input() linkTarget: string;
    @Input() columns: number;
    @Input() rows: number;
    @Input() arrows: boolean;
    @Input() arrowsAutoHide: boolean;
    @Input() margin: number;
    @Input() selectedIndex: number;
    @Input() clickable: boolean;
    @Input() swipe: boolean;
    @Input() size: string;
    @Input() arrowPrevIcon: string;
    @Input() arrowNextIcon: string;
    @Input() moveSize: number;
    @Input() order: number;
    @Input() remainingCount: boolean;
    @Input() lazyLoading: boolean;
    @Input() actions: NbGalleryAction[];

    @Output() onActiveChange = new EventEmitter();

    private index = 0;

    constructor(private sanitization: DomSanitizer, private elementRef: ElementRef,
        private helperService: NbGalleryHelperService) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['selectedIndex']) {
            this.validateIndex();
        }

        if (changes['swipe']) {
            this.helperService.manageSwipe(this.swipe, this.elementRef,
            'thumbnails', () => this.moveRight(), () => this.moveLeft());
        }

        if (this.items) {
            this.remainingCountValue = this.items.length - (this.rows * this.columns);
        }
    }

    @HostListener('mouseenter') onMouseEnter() {
        this.mouseenter = true;
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.mouseenter = false;
    }

    reset(index: number): void {
        this.selectedIndex = index;
        this.setDefaultPosition();

        this.index = 0;
        this.validateIndex();
    }

    getItems(): string[] | SafeResourceUrl[] {
        if (!this.items) {
            return [];
        }

        if (this.remainingCount) {
            return this.items.slice(0, this.rows * this.columns);
        } else if (this.lazyLoading && this.order !== NbGalleryOrder.Row) {
            let stopIndex = 0;

            if (this.order === NbGalleryOrder.Column) {
                stopIndex = (this.index + this.columns + this.moveSize) * this.rows;
            } else if (this.order === NbGalleryOrder.Page) {
                stopIndex = this.index + ((this.columns * this.rows) * 2);
            }

            if (stopIndex <= this.minStopIndex) {
                stopIndex = this.minStopIndex;
            } else {
                this.minStopIndex = stopIndex;
            }

            return this.items.slice(0, stopIndex);
        } else {
            return this.items;
        }
    }

    handleClick(event: Event, index: number): void {
        if (!this.hasLink(index)) {
            this.selectedIndex = index;
            this.onActiveChange.emit(index);

            event.stopPropagation();
            event.preventDefault();
        }
    }

    hasLink(index: number): boolean {
        if (this.links && this.links.length && this.links[index]) return true;
    }

    moveRight(): void {
        if (this.canMoveRight()) {
            this.index += this.moveSize;
            const maxIndex = this.getMaxIndex() - this.columns;

            if (this.index > maxIndex) {
                this.index = maxIndex;
            }

            this.setThumbnailsPosition();
        }
    }

    moveLeft(): void {
        if (this.canMoveLeft()) {
            this.index -= this.moveSize;

            if (this.index < 0) {
                this.index = 0;
            }

            this.setThumbnailsPosition();
        }
    }

    canMoveRight(): boolean {
        return this.index + this.columns < this.getMaxIndex() ? true : false;
    }

    canMoveLeft(): boolean {
        return this.index !== 0 ? true : false;
    }

    getThumbnailLeft(index: number): SafeStyle {
        let calculatedIndex;

        if (this.order === NbGalleryOrder.Column) {
            calculatedIndex = Math.floor(index / this.rows);
        } else if (this.order === NbGalleryOrder.Page) {
            calculatedIndex = (index % this.columns) + (Math.floor(index / (this.rows * this.columns)) * this.columns);
        } else if (this.order === NbGalleryOrder.Row && this.remainingCount) {
            calculatedIndex = index % this.columns;
        } else {
            calculatedIndex = index % Math.ceil(this.items.length / this.rows);
        }

        return this.getThumbnailPosition(calculatedIndex, this.columns);
    }

    getThumbnailTop(index: number): SafeStyle {
        let calculatedIndex;

        if (this.order === NbGalleryOrder.Column) {
            calculatedIndex = index % this.rows;
        } else if (this.order === NbGalleryOrder.Page) {
            calculatedIndex = Math.floor(index / this.columns) - (Math.floor(index / (this.rows * this.columns)) * this.rows);
        } else if (this.order === NbGalleryOrder.Row && this.remainingCount) {
            calculatedIndex = Math.floor(index / this.columns);
        } else {
            calculatedIndex = Math.floor(index / Math.ceil(this.items.length / this.rows));
        }

        return this.getThumbnailPosition(calculatedIndex, this.rows);
    }

    getThumbnailWidth(): SafeStyle {
        return this.getThumbnailDimension(this.columns);
    }

    getThumbnailHeight(): SafeStyle {
        return this.getThumbnailDimension(this.rows);
    }

    setThumbnailsPosition(): void {
        this.thumbnailsLeft = - ((100 / this.columns) * this.index) + '%'

        this.thumbnailsMarginLeft = - ((this.margin - (((this.columns - 1)
        * this.margin) / this.columns)) * this.index) + 'px';
    }

    setDefaultPosition(): void {
        this.thumbnailsLeft = '0px';
        this.thumbnailsMarginLeft = '0px';
    }

    canShowArrows(): boolean {
        if (this.remainingCount) {
            return false;
        } else if (this.arrows && this.items && this.items.length > this.getVisibleCount()
            && (!this.arrowsAutoHide || this.mouseenter)) {
            return true;
        } else {
            return false;
        }
    }

    validateIndex(): void {
        if (this.items) {
            let newIndex;

            if (this.order === NbGalleryOrder.Column) {
                newIndex = Math.floor(this.selectedIndex / this.rows);
            } else {
                newIndex = this.selectedIndex % Math.ceil(this.items.length / this.rows);
            }

            if (this.remainingCount) {
                newIndex = 0;
            }

            if (newIndex < this.index || newIndex >= this.index + this.columns) {
                const maxIndex = this.getMaxIndex() - this.columns;
                this.index = newIndex > maxIndex ? maxIndex : newIndex;

                this.setThumbnailsPosition();
            }
        }
    }

    getSafeUrl(image: string): SafeStyle {
        return this.sanitization.bypassSecurityTrustStyle(this.helperService.getBackgroundUrl(image));
    }

    private getThumbnailPosition(index: number, count: number): SafeStyle {
        return this.getSafeStyle('calc(' + ((100 / count) * index) + '% + '
            + ((this.margin - (((count - 1) * this.margin) / count)) * index) + 'px)');
    }

    private getThumbnailDimension(count: number): SafeStyle {
        if (this.margin !== 0) {
            return this.getSafeStyle('calc(' + (100 / count) + '% - '
                + (((count - 1) * this.margin) / count) + 'px)');
        } else {
            return this.getSafeStyle('calc(' + (100 / count) + '% + 1px)');
        }
    }

    private getMaxIndex(): number {
        if (this.order === NbGalleryOrder.Page) {
            let maxIndex = (Math.floor(this.items.length / this.getVisibleCount()) * this.columns);

            if (this.items.length % this.getVisibleCount() > this.columns) {
                maxIndex += this.columns;
            } else {
                maxIndex += this.items.length % this.getVisibleCount();
            }

            return maxIndex;
        } else {
            return Math.ceil(this.items.length / this.rows);
        }
    }

    private getVisibleCount(): number {
        return this.columns * this.rows;
    }

    private getSafeStyle(value: string): SafeStyle {
        return this.sanitization.bypassSecurityTrustStyle(value);
    }
}
