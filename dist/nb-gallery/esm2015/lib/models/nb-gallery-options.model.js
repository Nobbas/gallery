/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NbGalleryAnimation } from './nb-gallery-animation.model';
import { NbGalleryImageSize } from './nb-gallery-image-size.model';
import { NbGalleryLayout } from './nb-gallery-layout.model';
import { NbGalleryOrder } from './nb-gallery-order.model';
import { NbGalleryAction } from './nb-gallery-action.model';
/**
 * @record
 */
export function INbGalleryOptions() { }
/** @type {?|undefined} */
INbGalleryOptions.prototype.width;
/** @type {?|undefined} */
INbGalleryOptions.prototype.height;
/** @type {?|undefined} */
INbGalleryOptions.prototype.breakpoint;
/** @type {?|undefined} */
INbGalleryOptions.prototype.fullWidth;
/** @type {?|undefined} */
INbGalleryOptions.prototype.layout;
/** @type {?|undefined} */
INbGalleryOptions.prototype.startIndex;
/** @type {?|undefined} */
INbGalleryOptions.prototype.linkTarget;
/** @type {?|undefined} */
INbGalleryOptions.prototype.lazyLoading;
/** @type {?|undefined} */
INbGalleryOptions.prototype.item;
/** @type {?|undefined} */
INbGalleryOptions.prototype.itemPercent;
/** @type {?|undefined} */
INbGalleryOptions.prototype.itemArrows;
/** @type {?|undefined} */
INbGalleryOptions.prototype.itemArrowsAutoHide;
/** @type {?|undefined} */
INbGalleryOptions.prototype.itemSwipe;
/** @type {?|undefined} */
INbGalleryOptions.prototype.itemAnimation;
/** @type {?|undefined} */
INbGalleryOptions.prototype.itemSize;
/** @type {?|undefined} */
INbGalleryOptions.prototype.itemAutoPlay;
/** @type {?|undefined} */
INbGalleryOptions.prototype.itemAutoPlayInterval;
/** @type {?|undefined} */
INbGalleryOptions.prototype.itemAutoPlayPauseOnHover;
/** @type {?|undefined} */
INbGalleryOptions.prototype.itemInfinityMove;
/** @type {?|undefined} */
INbGalleryOptions.prototype.itemActions;
/** @type {?|undefined} */
INbGalleryOptions.prototype.itemDescription;
/** @type {?|undefined} */
INbGalleryOptions.prototype.itemBullets;
/** @type {?|undefined} */
INbGalleryOptions.prototype.thumbnails;
/** @type {?|undefined} */
INbGalleryOptions.prototype.defaultVideoThumbnnailUrl;
/** @type {?|undefined} */
INbGalleryOptions.prototype.thumbnailsColumns;
/** @type {?|undefined} */
INbGalleryOptions.prototype.thumbnailsRows;
/** @type {?|undefined} */
INbGalleryOptions.prototype.thumbnailsPercent;
/** @type {?|undefined} */
INbGalleryOptions.prototype.thumbnailsMargin;
/** @type {?|undefined} */
INbGalleryOptions.prototype.thumbnailsArrows;
/** @type {?|undefined} */
INbGalleryOptions.prototype.thumbnailsArrowsAutoHide;
/** @type {?|undefined} */
INbGalleryOptions.prototype.thumbnailsSwipe;
/** @type {?|undefined} */
INbGalleryOptions.prototype.thumbnailsMoveSize;
/** @type {?|undefined} */
INbGalleryOptions.prototype.thumbnailsOrder;
/** @type {?|undefined} */
INbGalleryOptions.prototype.thumbnailsRemainingCount;
/** @type {?|undefined} */
INbGalleryOptions.prototype.thumbnailsAsLinks;
/** @type {?|undefined} */
INbGalleryOptions.prototype.thumbnailsAutoHide;
/** @type {?|undefined} */
INbGalleryOptions.prototype.thumbnailMargin;
/** @type {?|undefined} */
INbGalleryOptions.prototype.thumbnailSize;
/** @type {?|undefined} */
INbGalleryOptions.prototype.thumbnailActions;
/** @type {?|undefined} */
INbGalleryOptions.prototype.preview;
/** @type {?|undefined} */
INbGalleryOptions.prototype.previewDescription;
/** @type {?|undefined} */
INbGalleryOptions.prototype.previewSwipe;
/** @type {?|undefined} */
INbGalleryOptions.prototype.previewFullscreen;
/** @type {?|undefined} */
INbGalleryOptions.prototype.previewForceFullscreen;
/** @type {?|undefined} */
INbGalleryOptions.prototype.previewCloseOnClick;
/** @type {?|undefined} */
INbGalleryOptions.prototype.previewCloseOnEsc;
/** @type {?|undefined} */
INbGalleryOptions.prototype.previewKeyboardNavigation;
/** @type {?|undefined} */
INbGalleryOptions.prototype.previewAnimation;
/** @type {?|undefined} */
INbGalleryOptions.prototype.previewAutoPlay;
/** @type {?|undefined} */
INbGalleryOptions.prototype.previewAutoPlayInterval;
/** @type {?|undefined} */
INbGalleryOptions.prototype.previewAutoPlayPauseOnHover;
/** @type {?|undefined} */
INbGalleryOptions.prototype.previewInfinityMove;
/** @type {?|undefined} */
INbGalleryOptions.prototype.previewZoom;
/** @type {?|undefined} */
INbGalleryOptions.prototype.previewZoomStep;
/** @type {?|undefined} */
INbGalleryOptions.prototype.previewZoomMax;
/** @type {?|undefined} */
INbGalleryOptions.prototype.previewZoomMin;
/** @type {?|undefined} */
INbGalleryOptions.prototype.previewRotate;
/** @type {?|undefined} */
INbGalleryOptions.prototype.previewDownload;
/** @type {?|undefined} */
INbGalleryOptions.prototype.previewCustom;
/** @type {?|undefined} */
INbGalleryOptions.prototype.previewBullets;
/** @type {?|undefined} */
INbGalleryOptions.prototype.arrowPrevIcon;
/** @type {?|undefined} */
INbGalleryOptions.prototype.arrowNextIcon;
/** @type {?|undefined} */
INbGalleryOptions.prototype.closeIcon;
/** @type {?|undefined} */
INbGalleryOptions.prototype.fullscreenIcon;
/** @type {?|undefined} */
INbGalleryOptions.prototype.spinnerIcon;
/** @type {?|undefined} */
INbGalleryOptions.prototype.zoomInIcon;
/** @type {?|undefined} */
INbGalleryOptions.prototype.zoomOutIcon;
/** @type {?|undefined} */
INbGalleryOptions.prototype.rotateLeftIcon;
/** @type {?|undefined} */
INbGalleryOptions.prototype.rotateRightIcon;
/** @type {?|undefined} */
INbGalleryOptions.prototype.downloadIcon;
/** @type {?|undefined} */
INbGalleryOptions.prototype.actions;
export class NbGalleryOptions {
    /**
     * @param {?} obj
     */
    constructor(obj) {
        /** @type {?} */
        const preventDefaults = obj.breakpoint === undefined ? false : true;
        /**
         * @template T
         * @param {?} source
         * @param {?} defaultValue
         * @return {?}
         */
        function use(source, defaultValue) {
            return obj && (source !== undefined || preventDefaults) ? source : defaultValue;
        }
        this.breakpoint = use(obj.breakpoint, undefined);
        this.width = use(obj.width, '500px');
        this.height = use(obj.height, '400px');
        this.fullWidth = use(obj.fullWidth, false);
        this.layout = use(obj.layout, NbGalleryLayout.ThumbnailsBottom);
        this.startIndex = use(obj.startIndex, 0);
        this.linkTarget = use(obj.linkTarget, '_blank');
        this.lazyLoading = use(obj.lazyLoading, true);
        this.item = use(obj.item, true);
        this.itemPercent = use(obj.itemPercent, 75);
        this.itemArrows = use(obj.itemArrows, true);
        this.itemArrowsAutoHide = use(obj.itemArrowsAutoHide, false);
        this.itemSwipe = use(obj.itemSwipe, false);
        this.itemAnimation = use(obj.itemAnimation, NbGalleryAnimation.Fade);
        this.itemSize = use(obj.itemSize, NbGalleryImageSize.Cover);
        this.itemAutoPlay = use(obj.itemAutoPlay, false);
        this.itemAutoPlayInterval = use(obj.itemAutoPlayInterval, 2000);
        this.itemAutoPlayPauseOnHover = use(obj.itemAutoPlayPauseOnHover, false);
        this.itemInfinityMove = use(obj.itemInfinityMove, false);
        if (obj && obj.itemActions && obj.itemActions.length) {
            obj.itemActions = obj.itemActions.map(action => new NbGalleryAction(action));
        }
        this.itemActions = use(obj.itemActions, []);
        this.itemDescription = use(obj.itemDescription, false);
        this.itemBullets = use(obj.itemBullets, false);
        this.thumbnails = use(obj.thumbnails, true);
        this.defaultVideoThumbnnailUrl = use(obj.defaultVideoThumbnnailUrl, undefined);
        this.thumbnailsColumns = use(obj.thumbnailsColumns, 4);
        this.thumbnailsRows = use(obj.thumbnailsRows, 1);
        this.thumbnailsPercent = use(obj.thumbnailsPercent, 25);
        this.thumbnailsMargin = use(obj.thumbnailsMargin, 10);
        this.thumbnailsArrows = use(obj.thumbnailsArrows, true);
        this.thumbnailsArrowsAutoHide = use(obj.thumbnailsArrowsAutoHide, false);
        this.thumbnailsSwipe = use(obj.thumbnailsSwipe, false);
        this.thumbnailsMoveSize = use(obj.thumbnailsMoveSize, 1);
        this.thumbnailsOrder = use(obj.thumbnailsOrder, NbGalleryOrder.Column);
        this.thumbnailsRemainingCount = use(obj.thumbnailsRemainingCount, false);
        this.thumbnailsAsLinks = use(obj.thumbnailsAsLinks, false);
        this.thumbnailsAutoHide = use(obj.thumbnailsAutoHide, false);
        this.thumbnailMargin = use(obj.thumbnailMargin, 10);
        this.thumbnailSize = use(obj.thumbnailSize, NbGalleryImageSize.Cover);
        if (obj && obj.thumbnailActions && obj.thumbnailActions.length) {
            obj.thumbnailActions = obj.thumbnailActions.map(action => new NbGalleryAction(action));
        }
        this.thumbnailActions = use(obj.thumbnailActions, []);
        this.preview = use(obj.preview, true);
        this.previewDescription = use(obj.previewDescription, true);
        this.previewSwipe = use(obj.previewSwipe, false);
        this.previewFullscreen = use(obj.previewFullscreen, false);
        this.previewForceFullscreen = use(obj.previewForceFullscreen, false);
        this.previewCloseOnClick = use(obj.previewCloseOnClick, false);
        this.previewCloseOnEsc = use(obj.previewCloseOnEsc, false);
        this.previewKeyboardNavigation = use(obj.previewKeyboardNavigation, false);
        this.previewAnimation = use(obj.previewAnimation, true);
        this.previewAutoPlay = use(obj.previewAutoPlay, false);
        this.previewAutoPlayInterval = use(obj.previewAutoPlayInterval, 2000);
        this.previewAutoPlayPauseOnHover = use(obj.previewAutoPlayPauseOnHover, false);
        this.previewInfinityMove = use(obj.previewInfinityMove, false);
        this.previewZoom = use(obj.previewZoom, false);
        this.previewZoomStep = use(obj.previewZoomStep, 0.1);
        this.previewZoomMax = use(obj.previewZoomMax, 2);
        this.previewZoomMin = use(obj.previewZoomMin, 0.5);
        this.previewRotate = use(obj.previewRotate, false);
        this.previewDownload = use(obj.previewDownload, false);
        this.previewCustom = use(obj.previewCustom, undefined);
        this.previewBullets = use(obj.previewBullets, false);
        this.arrowPrevIcon = use(obj.arrowPrevIcon, 'fa fa-arrow-circle-left');
        this.arrowNextIcon = use(obj.arrowNextIcon, 'fa fa-arrow-circle-right');
        this.closeIcon = use(obj.closeIcon, 'fa fa-times-circle');
        this.fullscreenIcon = use(obj.fullscreenIcon, 'fa fa-arrows-alt');
        this.spinnerIcon = use(obj.spinnerIcon, 'fa fa-spinner fa-pulse fa-3x fa-fw');
        this.zoomInIcon = use(obj.zoomInIcon, 'fa fa-search-plus');
        this.zoomOutIcon = use(obj.zoomOutIcon, 'fa fa-search-minus');
        this.rotateLeftIcon = use(obj.rotateLeftIcon, 'fa fa-undo');
        this.rotateRightIcon = use(obj.rotateRightIcon, 'fa fa-repeat');
        this.downloadIcon = use(obj.downloadIcon, 'fa fa-arrow-circle-down');
        if (obj && obj.actions && obj.actions.length) {
            obj.actions = obj.actions.map(action => new NbGalleryAction(action));
        }
        this.actions = use(obj.actions, []);
    }
}
if (false) {
    /** @type {?} */
    NbGalleryOptions.prototype.width;
    /** @type {?} */
    NbGalleryOptions.prototype.height;
    /** @type {?} */
    NbGalleryOptions.prototype.breakpoint;
    /** @type {?} */
    NbGalleryOptions.prototype.fullWidth;
    /** @type {?} */
    NbGalleryOptions.prototype.layout;
    /** @type {?} */
    NbGalleryOptions.prototype.startIndex;
    /** @type {?} */
    NbGalleryOptions.prototype.linkTarget;
    /** @type {?} */
    NbGalleryOptions.prototype.lazyLoading;
    /** @type {?} */
    NbGalleryOptions.prototype.item;
    /** @type {?} */
    NbGalleryOptions.prototype.itemPercent;
    /** @type {?} */
    NbGalleryOptions.prototype.itemArrows;
    /** @type {?} */
    NbGalleryOptions.prototype.itemArrowsAutoHide;
    /** @type {?} */
    NbGalleryOptions.prototype.itemSwipe;
    /** @type {?} */
    NbGalleryOptions.prototype.itemAnimation;
    /** @type {?} */
    NbGalleryOptions.prototype.itemSize;
    /** @type {?} */
    NbGalleryOptions.prototype.itemAutoPlay;
    /** @type {?} */
    NbGalleryOptions.prototype.itemAutoPlayInterval;
    /** @type {?} */
    NbGalleryOptions.prototype.itemAutoPlayPauseOnHover;
    /** @type {?} */
    NbGalleryOptions.prototype.itemInfinityMove;
    /** @type {?} */
    NbGalleryOptions.prototype.itemActions;
    /** @type {?} */
    NbGalleryOptions.prototype.itemDescription;
    /** @type {?} */
    NbGalleryOptions.prototype.itemBullets;
    /** @type {?} */
    NbGalleryOptions.prototype.thumbnails;
    /** @type {?} */
    NbGalleryOptions.prototype.defaultVideoThumbnnailUrl;
    /** @type {?} */
    NbGalleryOptions.prototype.thumbnailsColumns;
    /** @type {?} */
    NbGalleryOptions.prototype.thumbnailsRows;
    /** @type {?} */
    NbGalleryOptions.prototype.thumbnailsPercent;
    /** @type {?} */
    NbGalleryOptions.prototype.thumbnailsMargin;
    /** @type {?} */
    NbGalleryOptions.prototype.thumbnailsArrows;
    /** @type {?} */
    NbGalleryOptions.prototype.thumbnailsArrowsAutoHide;
    /** @type {?} */
    NbGalleryOptions.prototype.thumbnailsSwipe;
    /** @type {?} */
    NbGalleryOptions.prototype.thumbnailsMoveSize;
    /** @type {?} */
    NbGalleryOptions.prototype.thumbnailsOrder;
    /** @type {?} */
    NbGalleryOptions.prototype.thumbnailsRemainingCount;
    /** @type {?} */
    NbGalleryOptions.prototype.thumbnailsAsLinks;
    /** @type {?} */
    NbGalleryOptions.prototype.thumbnailsAutoHide;
    /** @type {?} */
    NbGalleryOptions.prototype.thumbnailMargin;
    /** @type {?} */
    NbGalleryOptions.prototype.thumbnailSize;
    /** @type {?} */
    NbGalleryOptions.prototype.thumbnailActions;
    /** @type {?} */
    NbGalleryOptions.prototype.preview;
    /** @type {?} */
    NbGalleryOptions.prototype.previewDescription;
    /** @type {?} */
    NbGalleryOptions.prototype.previewSwipe;
    /** @type {?} */
    NbGalleryOptions.prototype.previewFullscreen;
    /** @type {?} */
    NbGalleryOptions.prototype.previewForceFullscreen;
    /** @type {?} */
    NbGalleryOptions.prototype.previewCloseOnClick;
    /** @type {?} */
    NbGalleryOptions.prototype.previewCloseOnEsc;
    /** @type {?} */
    NbGalleryOptions.prototype.previewKeyboardNavigation;
    /** @type {?} */
    NbGalleryOptions.prototype.previewAnimation;
    /** @type {?} */
    NbGalleryOptions.prototype.previewAutoPlay;
    /** @type {?} */
    NbGalleryOptions.prototype.previewAutoPlayInterval;
    /** @type {?} */
    NbGalleryOptions.prototype.previewAutoPlayPauseOnHover;
    /** @type {?} */
    NbGalleryOptions.prototype.previewInfinityMove;
    /** @type {?} */
    NbGalleryOptions.prototype.previewZoom;
    /** @type {?} */
    NbGalleryOptions.prototype.previewZoomStep;
    /** @type {?} */
    NbGalleryOptions.prototype.previewZoomMax;
    /** @type {?} */
    NbGalleryOptions.prototype.previewZoomMin;
    /** @type {?} */
    NbGalleryOptions.prototype.previewRotate;
    /** @type {?} */
    NbGalleryOptions.prototype.previewDownload;
    /** @type {?} */
    NbGalleryOptions.prototype.previewCustom;
    /** @type {?} */
    NbGalleryOptions.prototype.previewBullets;
    /** @type {?} */
    NbGalleryOptions.prototype.arrowPrevIcon;
    /** @type {?} */
    NbGalleryOptions.prototype.arrowNextIcon;
    /** @type {?} */
    NbGalleryOptions.prototype.closeIcon;
    /** @type {?} */
    NbGalleryOptions.prototype.fullscreenIcon;
    /** @type {?} */
    NbGalleryOptions.prototype.spinnerIcon;
    /** @type {?} */
    NbGalleryOptions.prototype.zoomInIcon;
    /** @type {?} */
    NbGalleryOptions.prototype.zoomOutIcon;
    /** @type {?} */
    NbGalleryOptions.prototype.rotateLeftIcon;
    /** @type {?} */
    NbGalleryOptions.prototype.rotateRightIcon;
    /** @type {?} */
    NbGalleryOptions.prototype.downloadIcon;
    /** @type {?} */
    NbGalleryOptions.prototype.actions;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmItZ2FsbGVyeS1vcHRpb25zLm1vZGVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmItZ2FsbGVyeS8iLCJzb3VyY2VzIjpbImxpYi9tb2RlbHMvbmItZ2FsbGVyeS1vcHRpb25zLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNuRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzFELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNEU1RCxNQUFNOzs7O0lBeUVGLFlBQVksR0FBc0I7O1FBRTlCLE1BQU0sZUFBZSxHQUFHLEdBQUcsQ0FBQyxVQUFVLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQzs7Ozs7OztRQUVwRSxhQUFnQixNQUFTLEVBQUUsWUFBZTtZQUN0QyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sS0FBSyxTQUFTLElBQUksZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDO1NBQ25GO1FBRUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxHQUFH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QUF5QixDQUFDLENBQUM7UUFFckUsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLE9BQU8sSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUMxQyxHQUFHLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUN4RTtRQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDdkM7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5iR2FsbGVyeUFuaW1hdGlvbiB9IGZyb20gJy4vbmItZ2FsbGVyeS1hbmltYXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgTmJHYWxsZXJ5SW1hZ2VTaXplIH0gZnJvbSAnLi9uYi1nYWxsZXJ5LWltYWdlLXNpemUubW9kZWwnO1xuaW1wb3J0IHsgTmJHYWxsZXJ5TGF5b3V0IH0gZnJvbSAnLi9uYi1nYWxsZXJ5LWxheW91dC5tb2RlbCc7XG5pbXBvcnQgeyBOYkdhbGxlcnlPcmRlciB9IGZyb20gJy4vbmItZ2FsbGVyeS1vcmRlci5tb2RlbCc7XG5pbXBvcnQgeyBOYkdhbGxlcnlBY3Rpb24gfSBmcm9tICcuL25iLWdhbGxlcnktYWN0aW9uLm1vZGVsJztcblxuZXhwb3J0IGludGVyZmFjZSBJTmJHYWxsZXJ5T3B0aW9ucyB7XG4gICAgd2lkdGg/OiBzdHJpbmc7XG4gICAgaGVpZ2h0Pzogc3RyaW5nO1xuICAgIGJyZWFrcG9pbnQ/OiBudW1iZXI7XG4gICAgZnVsbFdpZHRoPzogYm9vbGVhbjtcbiAgICBsYXlvdXQ/OiBzdHJpbmc7XG4gICAgc3RhcnRJbmRleD86IG51bWJlcjtcbiAgICBsaW5rVGFyZ2V0Pzogc3RyaW5nO1xuICAgIGxhenlMb2FkaW5nPzogYm9vbGVhbjtcbiAgICBpdGVtPzogYm9vbGVhbjtcbiAgICBpdGVtUGVyY2VudD86IG51bWJlcjtcbiAgICBpdGVtQXJyb3dzPzogYm9vbGVhbjtcbiAgICBpdGVtQXJyb3dzQXV0b0hpZGU/OiBib29sZWFuO1xuICAgIGl0ZW1Td2lwZT86IGJvb2xlYW47XG4gICAgaXRlbUFuaW1hdGlvbj86IHN0cmluZztcbiAgICBpdGVtU2l6ZT86IHN0cmluZztcbiAgICBpdGVtQXV0b1BsYXk/OiBib29sZWFuO1xuICAgIGl0ZW1BdXRvUGxheUludGVydmFsPzogbnVtYmVyO1xuICAgIGl0ZW1BdXRvUGxheVBhdXNlT25Ib3Zlcj86IGJvb2xlYW47XG4gICAgaXRlbUluZmluaXR5TW92ZT86IGJvb2xlYW47XG4gICAgaXRlbUFjdGlvbnM/OiBOYkdhbGxlcnlBY3Rpb25bXTtcbiAgICBpdGVtRGVzY3JpcHRpb24/OiBib29sZWFuO1xuICAgIGl0ZW1CdWxsZXRzPzogYm9vbGVhbjtcbiAgICB0aHVtYm5haWxzPzogYm9vbGVhbjtcbiAgICBkZWZhdWx0VmlkZW9UaHVtYm5uYWlsVXJsPzogc3RyaW5nO1xuICAgIHRodW1ibmFpbHNDb2x1bW5zPzogbnVtYmVyO1xuICAgIHRodW1ibmFpbHNSb3dzPzogbnVtYmVyO1xuICAgIHRodW1ibmFpbHNQZXJjZW50PzogbnVtYmVyO1xuICAgIHRodW1ibmFpbHNNYXJnaW4/OiBudW1iZXI7XG4gICAgdGh1bWJuYWlsc0Fycm93cz86IGJvb2xlYW47XG4gICAgdGh1bWJuYWlsc0Fycm93c0F1dG9IaWRlPzogYm9vbGVhbjtcbiAgICB0aHVtYm5haWxzU3dpcGU/OiBib29sZWFuO1xuICAgIHRodW1ibmFpbHNNb3ZlU2l6ZT86IG51bWJlcjtcbiAgICB0aHVtYm5haWxzT3JkZXI/OiBOYkdhbGxlcnlPcmRlcjtcbiAgICB0aHVtYm5haWxzUmVtYWluaW5nQ291bnQ/OiBib29sZWFuO1xuICAgIHRodW1ibmFpbHNBc0xpbmtzPzogYm9vbGVhbjtcbiAgICB0aHVtYm5haWxzQXV0b0hpZGU/OiBib29sZWFuO1xuICAgIHRodW1ibmFpbE1hcmdpbj86IG51bWJlcjtcbiAgICB0aHVtYm5haWxTaXplPzogc3RyaW5nO1xuICAgIHRodW1ibmFpbEFjdGlvbnM/OiBOYkdhbGxlcnlBY3Rpb25bXTtcbiAgICBwcmV2aWV3PzogYm9vbGVhbjtcbiAgICBwcmV2aWV3RGVzY3JpcHRpb24/OiBib29sZWFuO1xuICAgIHByZXZpZXdTd2lwZT86IGJvb2xlYW47XG4gICAgcHJldmlld0Z1bGxzY3JlZW4/OiBib29sZWFuO1xuICAgIHByZXZpZXdGb3JjZUZ1bGxzY3JlZW4/OiBib29sZWFuO1xuICAgIHByZXZpZXdDbG9zZU9uQ2xpY2s/OiBib29sZWFuO1xuICAgIHByZXZpZXdDbG9zZU9uRXNjPzogYm9vbGVhbjtcbiAgICBwcmV2aWV3S2V5Ym9hcmROYXZpZ2F0aW9uPzogYm9vbGVhbjtcbiAgICBwcmV2aWV3QW5pbWF0aW9uPzogYm9vbGVhbjtcbiAgICBwcmV2aWV3QXV0b1BsYXk/OiBib29sZWFuO1xuICAgIHByZXZpZXdBdXRvUGxheUludGVydmFsPzogbnVtYmVyO1xuICAgIHByZXZpZXdBdXRvUGxheVBhdXNlT25Ib3Zlcj86IGJvb2xlYW47XG4gICAgcHJldmlld0luZmluaXR5TW92ZT86IGJvb2xlYW47XG4gICAgcHJldmlld1pvb20/OiBib29sZWFuO1xuICAgIHByZXZpZXdab29tU3RlcD86IG51bWJlcjtcbiAgICBwcmV2aWV3Wm9vbU1heD86IG51bWJlcjtcbiAgICBwcmV2aWV3Wm9vbU1pbj86IG51bWJlcjtcbiAgICBwcmV2aWV3Um90YXRlPzogYm9vbGVhbjtcbiAgICBwcmV2aWV3RG93bmxvYWQ/OiBib29sZWFuO1xuICAgIHByZXZpZXdDdXN0b20/OiAoaW5kZXg6IG51bWJlcikgPT4gdm9pZDtcbiAgICBwcmV2aWV3QnVsbGV0cz86IGJvb2xlYW47XG4gICAgYXJyb3dQcmV2SWNvbj86IHN0cmluZztcbiAgICBhcnJvd05leHRJY29uPzogc3RyaW5nO1xuICAgIGNsb3NlSWNvbj86IHN0cmluZztcbiAgICBmdWxsc2NyZWVuSWNvbj86IHN0cmluZztcbiAgICBzcGlubmVySWNvbj86IHN0cmluZztcbiAgICB6b29tSW5JY29uPzogc3RyaW5nO1xuICAgIHpvb21PdXRJY29uPzogc3RyaW5nO1xuICAgIHJvdGF0ZUxlZnRJY29uPzogc3RyaW5nO1xuICAgIHJvdGF0ZVJpZ2h0SWNvbj86IHN0cmluZztcbiAgICBkb3dubG9hZEljb24/OiBzdHJpbmc7XG4gICAgYWN0aW9ucz86IE5iR2FsbGVyeUFjdGlvbltdO1xufVxuXG5leHBvcnQgY2xhc3MgTmJHYWxsZXJ5T3B0aW9ucyBpbXBsZW1lbnRzIElOYkdhbGxlcnlPcHRpb25zIHtcbiAgICB3aWR0aD86IHN0cmluZztcbiAgICBoZWlnaHQ/OiBzdHJpbmc7XG4gICAgYnJlYWtwb2ludD86IG51bWJlcjtcbiAgICBmdWxsV2lkdGg/OiBib29sZWFuO1xuICAgIGxheW91dD86IHN0cmluZztcbiAgICBzdGFydEluZGV4PzogbnVtYmVyO1xuICAgIGxpbmtUYXJnZXQ/OiBzdHJpbmc7XG4gICAgbGF6eUxvYWRpbmc/OiBib29sZWFuO1xuICAgIGl0ZW0/OiBib29sZWFuO1xuICAgIGl0ZW1QZXJjZW50PzogbnVtYmVyO1xuICAgIGl0ZW1BcnJvd3M/OiBib29sZWFuO1xuICAgIGl0ZW1BcnJvd3NBdXRvSGlkZT86IGJvb2xlYW47XG4gICAgaXRlbVN3aXBlPzogYm9vbGVhbjtcbiAgICBpdGVtQW5pbWF0aW9uPzogc3RyaW5nO1xuICAgIGl0ZW1TaXplPzogc3RyaW5nO1xuICAgIGl0ZW1BdXRvUGxheT86IGJvb2xlYW47XG4gICAgaXRlbUF1dG9QbGF5SW50ZXJ2YWw/OiBudW1iZXI7XG4gICAgaXRlbUF1dG9QbGF5UGF1c2VPbkhvdmVyPzogYm9vbGVhbjtcbiAgICBpdGVtSW5maW5pdHlNb3ZlPzogYm9vbGVhbjtcbiAgICBpdGVtQWN0aW9ucz86IE5iR2FsbGVyeUFjdGlvbltdO1xuICAgIGl0ZW1EZXNjcmlwdGlvbj86IGJvb2xlYW47XG4gICAgaXRlbUJ1bGxldHM/OiBib29sZWFuO1xuICAgIHRodW1ibmFpbHM/OiBib29sZWFuO1xuICAgIGRlZmF1bHRWaWRlb1RodW1ibm5haWxVcmw/OiBzdHJpbmc7XG4gICAgdGh1bWJuYWlsc0NvbHVtbnM/OiBudW1iZXI7XG4gICAgdGh1bWJuYWlsc1Jvd3M/OiBudW1iZXI7XG4gICAgdGh1bWJuYWlsc1BlcmNlbnQ/OiBudW1iZXI7XG4gICAgdGh1bWJuYWlsc01hcmdpbj86IG51bWJlcjtcbiAgICB0aHVtYm5haWxzQXJyb3dzPzogYm9vbGVhbjtcbiAgICB0aHVtYm5haWxzQXJyb3dzQXV0b0hpZGU/OiBib29sZWFuO1xuICAgIHRodW1ibmFpbHNTd2lwZT86IGJvb2xlYW47XG4gICAgdGh1bWJuYWlsc01vdmVTaXplPzogbnVtYmVyO1xuICAgIHRodW1ibmFpbHNPcmRlcj86IE5iR2FsbGVyeU9yZGVyO1xuICAgIHRodW1ibmFpbHNSZW1haW5pbmdDb3VudD86IGJvb2xlYW47XG4gICAgdGh1bWJuYWlsc0FzTGlua3M/OiBib29sZWFuO1xuICAgIHRodW1ibmFpbHNBdXRvSGlkZT86IGJvb2xlYW47XG4gICAgdGh1bWJuYWlsTWFyZ2luPzogbnVtYmVyO1xuICAgIHRodW1ibmFpbFNpemU/OiBzdHJpbmc7XG4gICAgdGh1bWJuYWlsQWN0aW9ucz86IE5iR2FsbGVyeUFjdGlvbltdO1xuICAgIHByZXZpZXc/OiBib29sZWFuO1xuICAgIHByZXZpZXdEZXNjcmlwdGlvbj86IGJvb2xlYW47XG4gICAgcHJldmlld1N3aXBlPzogYm9vbGVhbjtcbiAgICBwcmV2aWV3RnVsbHNjcmVlbj86IGJvb2xlYW47XG4gICAgcHJldmlld0ZvcmNlRnVsbHNjcmVlbj86IGJvb2xlYW47XG4gICAgcHJldmlld0Nsb3NlT25DbGljaz86IGJvb2xlYW47XG4gICAgcHJldmlld0Nsb3NlT25Fc2M/OiBib29sZWFuO1xuICAgIHByZXZpZXdLZXlib2FyZE5hdmlnYXRpb24/OiBib29sZWFuO1xuICAgIHByZXZpZXdBbmltYXRpb24/OiBib29sZWFuO1xuICAgIHByZXZpZXdBdXRvUGxheT86IGJvb2xlYW47XG4gICAgcHJldmlld0F1dG9QbGF5SW50ZXJ2YWw/OiBudW1iZXI7XG4gICAgcHJldmlld0F1dG9QbGF5UGF1c2VPbkhvdmVyPzogYm9vbGVhbjtcbiAgICBwcmV2aWV3SW5maW5pdHlNb3ZlPzogYm9vbGVhbjtcbiAgICBwcmV2aWV3Wm9vbT86IGJvb2xlYW47XG4gICAgcHJldmlld1pvb21TdGVwPzogbnVtYmVyO1xuICAgIHByZXZpZXdab29tTWF4PzogbnVtYmVyO1xuICAgIHByZXZpZXdab29tTWluPzogbnVtYmVyO1xuICAgIHByZXZpZXdSb3RhdGU/OiBib29sZWFuO1xuICAgIHByZXZpZXdEb3dubG9hZD86IGJvb2xlYW47XG4gICAgcHJldmlld0N1c3RvbT86IChpbmRleDogbnVtYmVyKSA9PiB2b2lkO1xuICAgIHByZXZpZXdCdWxsZXRzPzogYm9vbGVhbjtcbiAgICBhcnJvd1ByZXZJY29uPzogc3RyaW5nO1xuICAgIGFycm93TmV4dEljb24/OiBzdHJpbmc7XG4gICAgY2xvc2VJY29uPzogc3RyaW5nO1xuICAgIGZ1bGxzY3JlZW5JY29uPzogc3RyaW5nO1xuICAgIHNwaW5uZXJJY29uPzogc3RyaW5nO1xuICAgIHpvb21Jbkljb24/OiBzdHJpbmc7XG4gICAgem9vbU91dEljb24/OiBzdHJpbmc7XG4gICAgcm90YXRlTGVmdEljb24/OiBzdHJpbmc7XG4gICAgcm90YXRlUmlnaHRJY29uPzogc3RyaW5nO1xuICAgIGRvd25sb2FkSWNvbj86IHN0cmluZztcbiAgICBhY3Rpb25zPzogTmJHYWxsZXJ5QWN0aW9uW107XG5cbiAgICBjb25zdHJ1Y3RvcihvYmo6IElOYkdhbGxlcnlPcHRpb25zKSB7XG5cbiAgICAgICAgY29uc3QgcHJldmVudERlZmF1bHRzID0gb2JqLmJyZWFrcG9pbnQgPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogdHJ1ZTtcblxuICAgICAgICBmdW5jdGlvbiB1c2U8VD4oc291cmNlOiBULCBkZWZhdWx0VmFsdWU6IFQpOiBUIHtcbiAgICAgICAgICAgIHJldHVybiBvYmogJiYgKHNvdXJjZSAhPT0gdW5kZWZpbmVkIHx8IHByZXZlbnREZWZhdWx0cykgPyBzb3VyY2UgOiBkZWZhdWx0VmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmJyZWFrcG9pbnQgPSB1c2Uob2JqLmJyZWFrcG9pbnQsIHVuZGVmaW5lZCk7XG4gICAgICAgIHRoaXMud2lkdGggPSB1c2Uob2JqLndpZHRoLCAnNTAwcHgnKTtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSB1c2Uob2JqLmhlaWdodCwgJzQwMHB4Jyk7XG4gICAgICAgIHRoaXMuZnVsbFdpZHRoID0gdXNlKG9iai5mdWxsV2lkdGgsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5sYXlvdXQgPSB1c2Uob2JqLmxheW91dCwgTmJHYWxsZXJ5TGF5b3V0LlRodW1ibmFpbHNCb3R0b20pO1xuICAgICAgICB0aGlzLnN0YXJ0SW5kZXggPSB1c2Uob2JqLnN0YXJ0SW5kZXgsIDApO1xuICAgICAgICB0aGlzLmxpbmtUYXJnZXQgPSB1c2Uob2JqLmxpbmtUYXJnZXQsICdfYmxhbmsnKTtcbiAgICAgICAgdGhpcy5sYXp5TG9hZGluZyA9IHVzZShvYmoubGF6eUxvYWRpbmcsIHRydWUpO1xuXG4gICAgICAgIHRoaXMuaXRlbSA9IHVzZShvYmouaXRlbSwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuaXRlbVBlcmNlbnQgPSB1c2Uob2JqLml0ZW1QZXJjZW50LCA3NSk7XG4gICAgICAgIHRoaXMuaXRlbUFycm93cyA9IHVzZShvYmouaXRlbUFycm93cywgdHJ1ZSk7XG4gICAgICAgIHRoaXMuaXRlbUFycm93c0F1dG9IaWRlID0gdXNlKG9iai5pdGVtQXJyb3dzQXV0b0hpZGUsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5pdGVtU3dpcGUgPSB1c2Uob2JqLml0ZW1Td2lwZSwgZmFsc2UpO1xuICAgICAgICB0aGlzLml0ZW1BbmltYXRpb24gPSB1c2Uob2JqLml0ZW1BbmltYXRpb24sIE5iR2FsbGVyeUFuaW1hdGlvbi5GYWRlKTtcbiAgICAgICAgdGhpcy5pdGVtU2l6ZSA9IHVzZShvYmouaXRlbVNpemUsIE5iR2FsbGVyeUltYWdlU2l6ZS5Db3Zlcik7XG4gICAgICAgIHRoaXMuaXRlbUF1dG9QbGF5ID0gdXNlKG9iai5pdGVtQXV0b1BsYXksIGZhbHNlKTtcbiAgICAgICAgdGhpcy5pdGVtQXV0b1BsYXlJbnRlcnZhbCA9IHVzZShvYmouaXRlbUF1dG9QbGF5SW50ZXJ2YWwsIDIwMDApO1xuICAgICAgICB0aGlzLml0ZW1BdXRvUGxheVBhdXNlT25Ib3ZlciA9IHVzZShvYmouaXRlbUF1dG9QbGF5UGF1c2VPbkhvdmVyLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuaXRlbUluZmluaXR5TW92ZSA9IHVzZShvYmouaXRlbUluZmluaXR5TW92ZSwgZmFsc2UpO1xuICAgICAgICBpZiAob2JqICYmIG9iai5pdGVtQWN0aW9ucyAmJiBvYmouaXRlbUFjdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBvYmouaXRlbUFjdGlvbnMgPSBvYmouaXRlbUFjdGlvbnMubWFwKGFjdGlvbiA9PiBuZXcgTmJHYWxsZXJ5QWN0aW9uKGFjdGlvbikpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXRlbUFjdGlvbnMgPSB1c2Uob2JqLml0ZW1BY3Rpb25zLCBbXSk7XG4gICAgICAgIHRoaXMuaXRlbURlc2NyaXB0aW9uID0gdXNlKG9iai5pdGVtRGVzY3JpcHRpb24sIGZhbHNlKTtcbiAgICAgICAgdGhpcy5pdGVtQnVsbGV0cyA9IHVzZShvYmouaXRlbUJ1bGxldHMsIGZhbHNlKTtcblxuICAgICAgICB0aGlzLnRodW1ibmFpbHMgPSB1c2Uob2JqLnRodW1ibmFpbHMsIHRydWUpO1xuICAgICAgICB0aGlzLmRlZmF1bHRWaWRlb1RodW1ibm5haWxVcmwgPSB1c2Uob2JqLmRlZmF1bHRWaWRlb1RodW1ibm5haWxVcmwsIHVuZGVmaW5lZCk7XG4gICAgICAgIHRoaXMudGh1bWJuYWlsc0NvbHVtbnMgPSB1c2Uob2JqLnRodW1ibmFpbHNDb2x1bW5zLCA0KTtcbiAgICAgICAgdGhpcy50aHVtYm5haWxzUm93cyA9IHVzZShvYmoudGh1bWJuYWlsc1Jvd3MsIDEpO1xuICAgICAgICB0aGlzLnRodW1ibmFpbHNQZXJjZW50ID0gdXNlKG9iai50aHVtYm5haWxzUGVyY2VudCwgMjUpO1xuICAgICAgICB0aGlzLnRodW1ibmFpbHNNYXJnaW4gPSB1c2Uob2JqLnRodW1ibmFpbHNNYXJnaW4sIDEwKTtcbiAgICAgICAgdGhpcy50aHVtYm5haWxzQXJyb3dzID0gdXNlKG9iai50aHVtYm5haWxzQXJyb3dzLCB0cnVlKTtcbiAgICAgICAgdGhpcy50aHVtYm5haWxzQXJyb3dzQXV0b0hpZGUgPSB1c2Uob2JqLnRodW1ibmFpbHNBcnJvd3NBdXRvSGlkZSwgZmFsc2UpO1xuICAgICAgICB0aGlzLnRodW1ibmFpbHNTd2lwZSA9IHVzZShvYmoudGh1bWJuYWlsc1N3aXBlLCBmYWxzZSk7XG4gICAgICAgIHRoaXMudGh1bWJuYWlsc01vdmVTaXplID0gdXNlKG9iai50aHVtYm5haWxzTW92ZVNpemUsIDEpO1xuICAgICAgICB0aGlzLnRodW1ibmFpbHNPcmRlciA9IHVzZShvYmoudGh1bWJuYWlsc09yZGVyLCBOYkdhbGxlcnlPcmRlci5Db2x1bW4pO1xuICAgICAgICB0aGlzLnRodW1ibmFpbHNSZW1haW5pbmdDb3VudCA9IHVzZShvYmoudGh1bWJuYWlsc1JlbWFpbmluZ0NvdW50LCBmYWxzZSk7XG4gICAgICAgIHRoaXMudGh1bWJuYWlsc0FzTGlua3MgPSB1c2Uob2JqLnRodW1ibmFpbHNBc0xpbmtzLCBmYWxzZSk7XG4gICAgICAgIHRoaXMudGh1bWJuYWlsc0F1dG9IaWRlID0gdXNlKG9iai50aHVtYm5haWxzQXV0b0hpZGUsIGZhbHNlKTtcbiAgICAgICAgdGhpcy50aHVtYm5haWxNYXJnaW4gPSB1c2Uob2JqLnRodW1ibmFpbE1hcmdpbiwgMTApO1xuICAgICAgICB0aGlzLnRodW1ibmFpbFNpemUgPSB1c2Uob2JqLnRodW1ibmFpbFNpemUsIE5iR2FsbGVyeUltYWdlU2l6ZS5Db3Zlcik7XG4gICAgICAgIGlmIChvYmogJiYgb2JqLnRodW1ibmFpbEFjdGlvbnMgJiYgb2JqLnRodW1ibmFpbEFjdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBvYmoudGh1bWJuYWlsQWN0aW9ucyA9IG9iai50aHVtYm5haWxBY3Rpb25zLm1hcChhY3Rpb24gPT4gbmV3IE5iR2FsbGVyeUFjdGlvbihhY3Rpb24pKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRodW1ibmFpbEFjdGlvbnMgPSB1c2Uob2JqLnRodW1ibmFpbEFjdGlvbnMsIFtdKTtcblxuICAgICAgICB0aGlzLnByZXZpZXcgPSB1c2Uob2JqLnByZXZpZXcsIHRydWUpO1xuICAgICAgICB0aGlzLnByZXZpZXdEZXNjcmlwdGlvbiA9IHVzZShvYmoucHJldmlld0Rlc2NyaXB0aW9uLCB0cnVlKTtcbiAgICAgICAgdGhpcy5wcmV2aWV3U3dpcGUgPSB1c2Uob2JqLnByZXZpZXdTd2lwZSwgZmFsc2UpO1xuICAgICAgICB0aGlzLnByZXZpZXdGdWxsc2NyZWVuID0gdXNlKG9iai5wcmV2aWV3RnVsbHNjcmVlbiwgZmFsc2UpO1xuICAgICAgICB0aGlzLnByZXZpZXdGb3JjZUZ1bGxzY3JlZW4gPSB1c2Uob2JqLnByZXZpZXdGb3JjZUZ1bGxzY3JlZW4sIGZhbHNlKTtcbiAgICAgICAgdGhpcy5wcmV2aWV3Q2xvc2VPbkNsaWNrID0gdXNlKG9iai5wcmV2aWV3Q2xvc2VPbkNsaWNrLCBmYWxzZSk7XG4gICAgICAgIHRoaXMucHJldmlld0Nsb3NlT25Fc2MgPSB1c2Uob2JqLnByZXZpZXdDbG9zZU9uRXNjLCBmYWxzZSk7XG4gICAgICAgIHRoaXMucHJldmlld0tleWJvYXJkTmF2aWdhdGlvbiA9IHVzZShvYmoucHJldmlld0tleWJvYXJkTmF2aWdhdGlvbiwgZmFsc2UpO1xuICAgICAgICB0aGlzLnByZXZpZXdBbmltYXRpb24gPSB1c2Uob2JqLnByZXZpZXdBbmltYXRpb24sIHRydWUpO1xuICAgICAgICB0aGlzLnByZXZpZXdBdXRvUGxheSA9IHVzZShvYmoucHJldmlld0F1dG9QbGF5LCBmYWxzZSk7XG4gICAgICAgIHRoaXMucHJldmlld0F1dG9QbGF5SW50ZXJ2YWwgPSB1c2Uob2JqLnByZXZpZXdBdXRvUGxheUludGVydmFsLCAyMDAwKTtcbiAgICAgICAgdGhpcy5wcmV2aWV3QXV0b1BsYXlQYXVzZU9uSG92ZXIgPSB1c2Uob2JqLnByZXZpZXdBdXRvUGxheVBhdXNlT25Ib3ZlciwgZmFsc2UpO1xuICAgICAgICB0aGlzLnByZXZpZXdJbmZpbml0eU1vdmUgPSB1c2Uob2JqLnByZXZpZXdJbmZpbml0eU1vdmUsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5wcmV2aWV3Wm9vbSA9IHVzZShvYmoucHJldmlld1pvb20sIGZhbHNlKTtcbiAgICAgICAgdGhpcy5wcmV2aWV3Wm9vbVN0ZXAgPSB1c2Uob2JqLnByZXZpZXdab29tU3RlcCwgMC4xKTtcbiAgICAgICAgdGhpcy5wcmV2aWV3Wm9vbU1heCA9IHVzZShvYmoucHJldmlld1pvb21NYXgsIDIpO1xuICAgICAgICB0aGlzLnByZXZpZXdab29tTWluID0gdXNlKG9iai5wcmV2aWV3Wm9vbU1pbiwgMC41KTtcbiAgICAgICAgdGhpcy5wcmV2aWV3Um90YXRlID0gdXNlKG9iai5wcmV2aWV3Um90YXRlLCBmYWxzZSk7XG4gICAgICAgIHRoaXMucHJldmlld0Rvd25sb2FkID0gdXNlKG9iai5wcmV2aWV3RG93bmxvYWQsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5wcmV2aWV3Q3VzdG9tID0gdXNlKG9iai5wcmV2aWV3Q3VzdG9tLCB1bmRlZmluZWQpO1xuICAgICAgICB0aGlzLnByZXZpZXdCdWxsZXRzID0gdXNlKG9iai5wcmV2aWV3QnVsbGV0cywgZmFsc2UpO1xuXG4gICAgICAgIHRoaXMuYXJyb3dQcmV2SWNvbiA9IHVzZShvYmouYXJyb3dQcmV2SWNvbiwgJ2ZhIGZhLWFycm93LWNpcmNsZS1sZWZ0Jyk7XG4gICAgICAgIHRoaXMuYXJyb3dOZXh0SWNvbiA9IHVzZShvYmouYXJyb3dOZXh0SWNvbiwgJ2ZhIGZhLWFycm93LWNpcmNsZS1yaWdodCcpO1xuICAgICAgICB0aGlzLmNsb3NlSWNvbiA9IHVzZShvYmouY2xvc2VJY29uLCAnZmEgZmEtdGltZXMtY2lyY2xlJyk7XG4gICAgICAgIHRoaXMuZnVsbHNjcmVlbkljb24gPSB1c2Uob2JqLmZ1bGxzY3JlZW5JY29uLCAnZmEgZmEtYXJyb3dzLWFsdCcpO1xuICAgICAgICB0aGlzLnNwaW5uZXJJY29uID0gdXNlKG9iai5zcGlubmVySWNvbiwgJ2ZhIGZhLXNwaW5uZXIgZmEtcHVsc2UgZmEtM3ggZmEtZncnKTtcbiAgICAgICAgdGhpcy56b29tSW5JY29uID0gdXNlKG9iai56b29tSW5JY29uLCAnZmEgZmEtc2VhcmNoLXBsdXMnKTtcbiAgICAgICAgdGhpcy56b29tT3V0SWNvbiA9IHVzZShvYmouem9vbU91dEljb24sICdmYSBmYS1zZWFyY2gtbWludXMnKTtcbiAgICAgICAgdGhpcy5yb3RhdGVMZWZ0SWNvbiA9IHVzZShvYmoucm90YXRlTGVmdEljb24sICdmYSBmYS11bmRvJyk7XG4gICAgICAgIHRoaXMucm90YXRlUmlnaHRJY29uID0gdXNlKG9iai5yb3RhdGVSaWdodEljb24sICdmYSBmYS1yZXBlYXQnKTtcbiAgICAgICAgdGhpcy5kb3dubG9hZEljb24gPSB1c2Uob2JqLmRvd25sb2FkSWNvbiwgJ2ZhIGZhLWFycm93LWNpcmNsZS1kb3duJyk7XG5cbiAgICAgICAgaWYgKG9iaiAmJiBvYmouYWN0aW9ucyAmJiBvYmouYWN0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgIG9iai5hY3Rpb25zID0gb2JqLmFjdGlvbnMubWFwKGFjdGlvbiA9PiBuZXcgTmJHYWxsZXJ5QWN0aW9uKGFjdGlvbikpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYWN0aW9ucyA9IHVzZShvYmouYWN0aW9ucywgW10pO1xuICAgIH1cbn1cbiJdfQ==