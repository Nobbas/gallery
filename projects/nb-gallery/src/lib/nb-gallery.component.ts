import { Component, Input, HostListener, ViewChild, OnInit,
  HostBinding, DoCheck, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';

import { NbGalleryPreviewComponent } from './nb-gallery-preview/nb-gallery-preview.component';
import { NbGalleryItemComponent } from './nb-gallery-item/nb-gallery-item.component';
import { NbGalleryThumbnailsComponent } from './nb-gallery-thumbnails/nb-gallery-thumbnails.component';
import { NbGalleryHelperService } from './nb-gallery-helper.service';

import { NbGalleryItem } from './models/nb-gallery-item.model';
import { NbGalleryOptions } from './models/nb-gallery-options.model';
import { NbGalleryThumbnail } from './models/nb-gallery-thumbnail.model';
import { NbGalleryLayout } from './models/nb-gallery-layout.model';
import { NbGalleryOrderedItem } from './models/nb-gallery-ordered-item.model';
import { NbGalleryPreview } from './models/nb-gallery-preview.model';

@Component({
  selector: 'nb-gallery',
  template: `
  <div class="nb-gallery-layout {{currentOptions?.layout}}">
      <nb-gallery-item  *ngIf="currentOptions?.item" [style.height]="getItemHeight()" [items]="galleryItems" [clickable]="currentOptions?.preview" [selectedIndex]="selectedIndex" [arrows]="currentOptions?.itemArrows" [arrowsAutoHide]="currentOptions?.itemArrowsAutoHide" [arrowPrevIcon]="currentOptions?.arrowPrevIcon" [arrowNextIcon]="currentOptions?.arrowNextIcon" [swipe]="currentOptions?.itemSwipe" [animation]="currentOptions?.itemAnimation" [size]="currentOptions?.itemSize" [autoPlay]="currentOptions?.itemAutoPlay" [autoPlayInterval]="currentOptions?.itemAutoPlayInterval" [autoPlayPauseOnHover]="currentOptions?.itemAutoPlayPauseOnHover" [infinityMove]="currentOptions?.itemInfinityMove"  [lazyLoading]="currentOptions?.lazyLoading" [actions]="currentOptions?.itemActions" [descriptions]="descriptions" [showDescription]="currentOptions?.itemDescription" [bullets]="currentOptions?.itemBullets" (onClick)="openPreview($event)" (onActiveChange)="selectFromItem($event)"></nb-gallery-item>
      <nb-gallery-thumbnails *ngIf="currentOptions?.thumbnails" [style.marginTop]="getThumbnailsMarginTop()" [style.marginBottom]="getThumbnailsMarginBottom()" [style.height]="getThumbnailsHeight()" [items]="thumbnails" [links]="currentOptions?.thumbnailsAsLinks ? links : []" [labels]="labels" [linkTarget]="currentOptions?.linkTarget" [selectedIndex]="selectedIndex" [columns]="currentOptions?.thumbnailsColumns" [rows]="currentOptions?.thumbnailsRows" [margin]="currentOptions?.thumbnailMargin" [arrows]="currentOptions?.thumbnailsArrows" [arrowsAutoHide]="currentOptions?.thumbnailsArrowsAutoHide" [arrowPrevIcon]="currentOptions?.arrowPrevIcon" [arrowNextIcon]="currentOptions?.arrowNextIcon" [clickable]="currentOptions?.item || currentOptions?.preview" [swipe]="currentOptions?.thumbnailsSwipe" [size]="currentOptions?.thumbnailSize" [moveSize]="currentOptions?.thumbnailsMoveSize" [order]="currentOptions?.thumbnailsOrder" [remainingCount]="currentOptions?.thumbnailsRemainingCount" [lazyLoading]="currentOptions?.lazyLoading" [actions]="currentOptions?.thumbnailActions"  (onActiveChange)="selectFromThumbnails($event)"></nb-gallery-thumbnails>
      <nb-gallery-preview [items]="previewItems" [descriptions]="descriptions" [showDescription]="currentOptions?.previewDescription" [arrowPrevIcon]="currentOptions?.arrowPrevIcon" [arrowNextIcon]="currentOptions?.arrowNextIcon" [closeIcon]="currentOptions?.closeIcon" [fullscreenIcon]="currentOptions?.fullscreenIcon" [spinnerIcon]="currentOptions?.spinnerIcon" [swipe]="currentOptions?.previewSwipe" [fullscreen]="currentOptions?.previewFullscreen" [forceFullscreen]="currentOptions?.previewForceFullscreen" [closeOnClick]="currentOptions?.previewCloseOnClick" [closeOnEsc]="currentOptions?.previewCloseOnEsc" [keyboardNavigation]="currentOptions?.previewKeyboardNavigation" [animation]="currentOptions?.previewAnimation" [autoPlay]="currentOptions?.previewAutoPlay" [autoPlayInterval]="currentOptions?.previewAutoPlayInterval" [autoPlayPauseOnHover]="currentOptions?.previewAutoPlayPauseOnHover" [infinityMove]="currentOptions?.previewInfinityMove" [zoom]="currentOptions?.previewZoom" [zoomStep]="currentOptions?.previewZoomStep" [zoomMax]="currentOptions?.previewZoomMax" [zoomMin]="currentOptions?.previewZoomMin" [zoomInIcon]="currentOptions?.zoomInIcon" [zoomOutIcon]="currentOptions?.zoomOutIcon" [actions]="currentOptions?.actions" [rotate]="currentOptions?.previewRotate" [rotateLeftIcon]="currentOptions?.rotateLeftIcon" [rotateRightIcon]="currentOptions?.rotateRightIcon" [download]="currentOptions?.previewDownload" [downloadIcon]="currentOptions?.downloadIcon" [bullets]="currentOptions?.previewBullets" (onClose)="onPreviewClose()" (onOpen)="onPreviewOpen()" (onActiveChange)="previewSelect($event)" [class.nb-gallery-active]="previewEnabled"></nb-gallery-preview>
  </div>
  `,
  styleUrls: ['./nb-gallery.component.scss'],
  providers: [NbGalleryHelperService]
})
export class NbGalleryComponent implements OnInit, DoCheck, AfterViewInit   {
  @Input() options: NbGalleryOptions[];
  @Input() items: NbGalleryItem[];

  @Output() itemsReady = new EventEmitter();
  @Output() change = new EventEmitter<{ index: number; item: NbGalleryItem; }>();
  @Output() previewOpen = new EventEmitter();
  @Output() previewClose = new EventEmitter();
  @Output() previewChange = new EventEmitter<{ index: number; item: NbGalleryItem; }>();

  thumbnails: NbGalleryThumbnail[];
  galleryItems: NbGalleryOrderedItem[];
  previewItems: NbGalleryOrderedItem[];
  descriptions: string[];
  links: string[];
  labels: string[];

  oldItems: NbGalleryItem[];
  oldItemsLength = 0;

  selectedIndex = 0;
  previewEnabled: boolean;

  currentOptions: NbGalleryOptions;

  private breakpoint: number | undefined = undefined;
  private prevBreakpoint: number | undefined = undefined;
  private fullWidthTimeout: any;

  @ViewChild(NbGalleryPreviewComponent) preview: NbGalleryPreviewComponent;
  @ViewChild(NbGalleryItemComponent) item: NbGalleryItemComponent;
  @ViewChild(NbGalleryThumbnailsComponent) thumbnail: NbGalleryThumbnailsComponent;

  @HostBinding('style.width') width: string;
  @HostBinding('style.height') height: string;
  @HostBinding('style.left') left: string;

  constructor(private myElement: ElementRef) {}

  ngOnInit() {
      this.options = this.options.map((opt) => new NbGalleryOptions(opt));
      this.sortOptions();
      this.setBreakpoint();
      this.setOptions();
      this.checkFullWidth();
      if (this.currentOptions) {
          this.selectedIndex = <number>this.currentOptions.startIndex;
      }
  }

  ngDoCheck(): void {
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
              this.item.reset(<number>this.currentOptions.startIndex);
          }

          if (this.currentOptions.thumbnailsAutoHide && this.currentOptions.thumbnails
              && this.items.length <= 1) {
              this.currentOptions.thumbnails = false;
              this.currentOptions.itemArrows = false;
          }

          this.resetThumbnails();
      }
  }

  ngAfterViewInit(): void {
      this.checkFullWidth();
  }

  @HostListener('window:resize') onResize() {
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

  getItemHeight(): string {
      return (this.currentOptions && this.currentOptions.thumbnails) ?
          this.currentOptions.itemPercent + '%' : '100%';
  }

  getThumbnailsHeight(): string {
      if (this.currentOptions && this.currentOptions.item) {
          return 'calc(' + this.currentOptions.thumbnailsPercent + '% - '
          + this.currentOptions.thumbnailsMargin + 'px)';
      } else {
          return '100%';
      }
  }

  getThumbnailsMarginTop(): string {
      if (this.currentOptions && this.currentOptions.layout === NbGalleryLayout.ThumbnailsBottom) {
          return this.currentOptions.thumbnailsMargin + 'px';
      } else {
          return '0px';
      }
  }

  getThumbnailsMarginBottom(): string {
      if (this.currentOptions && this.currentOptions.layout === NbGalleryLayout.ThumbnailsTop) {
          return this.currentOptions.thumbnailsMargin + 'px';
      } else {
          return '0px';
      }
  }

  openPreview(index: number): void {
      if (this.currentOptions.previewCustom) {
          this.currentOptions.previewCustom(index);
      } else {
          this.previewEnabled = true;
          this.preview.open(index);
      }
  }

  onPreviewOpen(): void {
      this.previewOpen.emit();

      if (this.item && this.item.autoPlay) {
          this.item.stopAutoPlay();
      }
  }

  onPreviewClose(): void {
      this.previewEnabled = false;
      this.previewClose.emit();

      if (this.item && this.item.autoPlay) {
          this.item.startAutoPlay();
      }
  }

  selectFromItem(index: number) {
      this.select(index);
  }

  selectFromThumbnails(index: number) {
      this.select(index);

      if (this.currentOptions && this.currentOptions.thumbnails && this.currentOptions.preview
          && (!this.currentOptions.item || this.currentOptions.thumbnailsRemainingCount)) {
          this.openPreview(this.selectedIndex);
      }
  }

  show(index: number): void {
      this.select(index);
  }

  showNext(): void {
      this.item.showNext();
  }

  showPrev(): void {
      this.item.showPrev();
  }

  canShowNext(): boolean {
      if (this.items && this.currentOptions) {
          return (this.currentOptions.itemInfinityMove || this.selectedIndex < this.items.length - 1)
              ? true : false;
      } else {
          return false;
      }
  }

  canShowPrev(): boolean {
      if (this.items && this.currentOptions) {
          return (this.currentOptions.itemInfinityMove || this.selectedIndex > 0) ? true : false;
      } else {
          return false;
      }
  }

  previewSelect(index: number) {
      this.previewChange.emit({index, item: this.items[index]});
  }

  moveThumbnailsRight() {
      this.thumbnail.moveRight();
  }

  moveThumbnailsLeft() {
      this.thumbnail.moveLeft();
  }

  canMoveThumbnailsRight() {
      return this.thumbnail.canMoveRight();
  }

  canMoveThumbnailsLeft() {
      return this.thumbnail.canMoveLeft();
  }

  private resetThumbnails() {
      if (this.thumbnail) {
          this.thumbnail.reset(<number>this.currentOptions.startIndex);
      }
  }

  private select(index: number) {
      this.selectedIndex = index;

      this.change.emit({
          index,
          item: this.items[index]
      });
  }

  private checkFullWidth(): void {
      if (this.currentOptions && this.currentOptions.fullWidth) {
          this.width = document.body.clientWidth + 'px';
          this.left = (-(document.body.clientWidth -
              this.myElement.nativeElement.parentNode.innerWidth) / 2) + 'px';
      }
  }

  private setItems(): void {
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
      this.descriptions = this.items.map((item) => <string>item.description);
      this.links = this.items.map((item) => <string>item.url);
      this.labels = this.items.map((item) => <string>item.label);
  }

  private setBreakpoint(): void {
      this.prevBreakpoint = this.breakpoint;
      let breakpoints;

      if (typeof window !== 'undefined') {
          breakpoints = this.options.filter((opt) => opt.breakpoint >= window.innerWidth)
              .map((opt) => opt.breakpoint);
      }

      if (breakpoints && breakpoints.length) {
          this.breakpoint = breakpoints.pop();
      } else {
          this.breakpoint = undefined;
      }
  }

  private sortOptions(): void {
      this.options = [
          ...this.options.filter((a) => a.breakpoint === undefined),
          ...this.options
              .filter((a) => a.breakpoint !== undefined)
              .sort((a, b) => b.breakpoint - a.breakpoint)
      ];
  }

  private setOptions(): void {
      this.currentOptions = new NbGalleryOptions({});

      this.options
          .filter((opt) => opt.breakpoint === undefined || opt.breakpoint >= this.breakpoint)
          .map((opt) => this.combineOptions(this.currentOptions, opt));

      this.width = <string>this.currentOptions.width;
      this.height = <string>this.currentOptions.height;
  }

  private combineOptions(first: NbGalleryOptions, second: NbGalleryOptions) {
      Object.keys(second).map((val) => first[val] = second[val] !== undefined ? second[val] : first[val]);
  }
}

