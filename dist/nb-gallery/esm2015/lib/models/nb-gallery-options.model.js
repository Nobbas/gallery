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
        this.arrowPrevIcon = use(obj.arrowPrevIcon, ['fa', 'arrow-circle-left']);
        this.arrowNextIcon = use(obj.arrowNextIcon, ['fa', 'arrow-circle-right']);
        this.closeIcon = use(obj.closeIcon, ['fa', 'times-circle']);
        this.fullscreenIcon = use(obj.fullscreenIcon, ['fa', 'arrows-alt']);
        this.spinnerIcon = use(obj.spinnerIcon, ['fa', 'spinner']);
        this.zoomInIcon = use(obj.zoomInIcon, ['fa', 'search-plus']);
        this.zoomOutIcon = use(obj.zoomOutIcon, ['fa', 'search-minus']);
        this.rotateLeftIcon = use(obj.rotateLeftIcon, ['fa', 'undo']);
        this.rotateRightIcon = use(obj.rotateRightIcon, ['fa', 'redo']);
        this.downloadIcon = use(obj.downloadIcon, ['fa', 'arrow-circle-down']);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmItZ2FsbGVyeS1vcHRpb25zLm1vZGVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmItZ2FsbGVyeS8iLCJzb3VyY2VzIjpbImxpYi9tb2RlbHMvbmItZ2FsbGVyeS1vcHRpb25zLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNuRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzFELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNEU1RCxNQUFNOzs7O0lBeUVGLFlBQVksR0FBc0I7O1FBRTlCLE1BQU0sZUFBZSxHQUFHLEdBQUcsQ0FBQyxVQUFVLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQzs7Ozs7OztRQUVwRSxhQUFnQixNQUFTLEVBQUUsWUFBZTtZQUN0QyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sS0FBSyxTQUFTLElBQUksZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDO1NBQ25GO1FBRUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxHQUFH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LE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLGVBQWUsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLEVBQUUsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO1FBRXZFLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxPQUFPLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDMUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDeEU7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQ3ZDO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOYkdhbGxlcnlBbmltYXRpb24gfSBmcm9tICcuL25iLWdhbGxlcnktYW5pbWF0aW9uLm1vZGVsJztcbmltcG9ydCB7IE5iR2FsbGVyeUltYWdlU2l6ZSB9IGZyb20gJy4vbmItZ2FsbGVyeS1pbWFnZS1zaXplLm1vZGVsJztcbmltcG9ydCB7IE5iR2FsbGVyeUxheW91dCB9IGZyb20gJy4vbmItZ2FsbGVyeS1sYXlvdXQubW9kZWwnO1xuaW1wb3J0IHsgTmJHYWxsZXJ5T3JkZXIgfSBmcm9tICcuL25iLWdhbGxlcnktb3JkZXIubW9kZWwnO1xuaW1wb3J0IHsgTmJHYWxsZXJ5QWN0aW9uIH0gZnJvbSAnLi9uYi1nYWxsZXJ5LWFjdGlvbi5tb2RlbCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU5iR2FsbGVyeU9wdGlvbnMge1xuICAgIHdpZHRoPzogc3RyaW5nO1xuICAgIGhlaWdodD86IHN0cmluZztcbiAgICBicmVha3BvaW50PzogbnVtYmVyO1xuICAgIGZ1bGxXaWR0aD86IGJvb2xlYW47XG4gICAgbGF5b3V0Pzogc3RyaW5nO1xuICAgIHN0YXJ0SW5kZXg/OiBudW1iZXI7XG4gICAgbGlua1RhcmdldD86IHN0cmluZztcbiAgICBsYXp5TG9hZGluZz86IGJvb2xlYW47XG4gICAgaXRlbT86IGJvb2xlYW47XG4gICAgaXRlbVBlcmNlbnQ/OiBudW1iZXI7XG4gICAgaXRlbUFycm93cz86IGJvb2xlYW47XG4gICAgaXRlbUFycm93c0F1dG9IaWRlPzogYm9vbGVhbjtcbiAgICBpdGVtU3dpcGU/OiBib29sZWFuO1xuICAgIGl0ZW1BbmltYXRpb24/OiBzdHJpbmc7XG4gICAgaXRlbVNpemU/OiBzdHJpbmc7XG4gICAgaXRlbUF1dG9QbGF5PzogYm9vbGVhbjtcbiAgICBpdGVtQXV0b1BsYXlJbnRlcnZhbD86IG51bWJlcjtcbiAgICBpdGVtQXV0b1BsYXlQYXVzZU9uSG92ZXI/OiBib29sZWFuO1xuICAgIGl0ZW1JbmZpbml0eU1vdmU/OiBib29sZWFuO1xuICAgIGl0ZW1BY3Rpb25zPzogTmJHYWxsZXJ5QWN0aW9uW107XG4gICAgaXRlbURlc2NyaXB0aW9uPzogYm9vbGVhbjtcbiAgICBpdGVtQnVsbGV0cz86IGJvb2xlYW47XG4gICAgdGh1bWJuYWlscz86IGJvb2xlYW47XG4gICAgZGVmYXVsdFZpZGVvVGh1bWJubmFpbFVybD86IHN0cmluZztcbiAgICB0aHVtYm5haWxzQ29sdW1ucz86IG51bWJlcjtcbiAgICB0aHVtYm5haWxzUm93cz86IG51bWJlcjtcbiAgICB0aHVtYm5haWxzUGVyY2VudD86IG51bWJlcjtcbiAgICB0aHVtYm5haWxzTWFyZ2luPzogbnVtYmVyO1xuICAgIHRodW1ibmFpbHNBcnJvd3M/OiBib29sZWFuO1xuICAgIHRodW1ibmFpbHNBcnJvd3NBdXRvSGlkZT86IGJvb2xlYW47XG4gICAgdGh1bWJuYWlsc1N3aXBlPzogYm9vbGVhbjtcbiAgICB0aHVtYm5haWxzTW92ZVNpemU/OiBudW1iZXI7XG4gICAgdGh1bWJuYWlsc09yZGVyPzogTmJHYWxsZXJ5T3JkZXI7XG4gICAgdGh1bWJuYWlsc1JlbWFpbmluZ0NvdW50PzogYm9vbGVhbjtcbiAgICB0aHVtYm5haWxzQXNMaW5rcz86IGJvb2xlYW47XG4gICAgdGh1bWJuYWlsc0F1dG9IaWRlPzogYm9vbGVhbjtcbiAgICB0aHVtYm5haWxNYXJnaW4/OiBudW1iZXI7XG4gICAgdGh1bWJuYWlsU2l6ZT86IHN0cmluZztcbiAgICB0aHVtYm5haWxBY3Rpb25zPzogTmJHYWxsZXJ5QWN0aW9uW107XG4gICAgcHJldmlldz86IGJvb2xlYW47XG4gICAgcHJldmlld0Rlc2NyaXB0aW9uPzogYm9vbGVhbjtcbiAgICBwcmV2aWV3U3dpcGU/OiBib29sZWFuO1xuICAgIHByZXZpZXdGdWxsc2NyZWVuPzogYm9vbGVhbjtcbiAgICBwcmV2aWV3Rm9yY2VGdWxsc2NyZWVuPzogYm9vbGVhbjtcbiAgICBwcmV2aWV3Q2xvc2VPbkNsaWNrPzogYm9vbGVhbjtcbiAgICBwcmV2aWV3Q2xvc2VPbkVzYz86IGJvb2xlYW47XG4gICAgcHJldmlld0tleWJvYXJkTmF2aWdhdGlvbj86IGJvb2xlYW47XG4gICAgcHJldmlld0FuaW1hdGlvbj86IGJvb2xlYW47XG4gICAgcHJldmlld0F1dG9QbGF5PzogYm9vbGVhbjtcbiAgICBwcmV2aWV3QXV0b1BsYXlJbnRlcnZhbD86IG51bWJlcjtcbiAgICBwcmV2aWV3QXV0b1BsYXlQYXVzZU9uSG92ZXI/OiBib29sZWFuO1xuICAgIHByZXZpZXdJbmZpbml0eU1vdmU/OiBib29sZWFuO1xuICAgIHByZXZpZXdab29tPzogYm9vbGVhbjtcbiAgICBwcmV2aWV3Wm9vbVN0ZXA/OiBudW1iZXI7XG4gICAgcHJldmlld1pvb21NYXg/OiBudW1iZXI7XG4gICAgcHJldmlld1pvb21NaW4/OiBudW1iZXI7XG4gICAgcHJldmlld1JvdGF0ZT86IGJvb2xlYW47XG4gICAgcHJldmlld0Rvd25sb2FkPzogYm9vbGVhbjtcbiAgICBwcmV2aWV3Q3VzdG9tPzogKGluZGV4OiBudW1iZXIpID0+IHZvaWQ7XG4gICAgcHJldmlld0J1bGxldHM/OiBib29sZWFuO1xuICAgIGFycm93UHJldkljb24/OiBzdHJpbmdbXTtcbiAgICBhcnJvd05leHRJY29uPzogc3RyaW5nW107XG4gICAgY2xvc2VJY29uPzogc3RyaW5nW107XG4gICAgZnVsbHNjcmVlbkljb24/OiBzdHJpbmdbXTtcbiAgICBzcGlubmVySWNvbj86IHN0cmluZ1tdO1xuICAgIHpvb21Jbkljb24/OiBzdHJpbmdbXTtcbiAgICB6b29tT3V0SWNvbj86IHN0cmluZ1tdO1xuICAgIHJvdGF0ZUxlZnRJY29uPzogc3RyaW5nW107XG4gICAgcm90YXRlUmlnaHRJY29uPzogc3RyaW5nW107XG4gICAgZG93bmxvYWRJY29uPzogc3RyaW5nW107XG4gICAgYWN0aW9ucz86IE5iR2FsbGVyeUFjdGlvbltdO1xufVxuXG5leHBvcnQgY2xhc3MgTmJHYWxsZXJ5T3B0aW9ucyBpbXBsZW1lbnRzIElOYkdhbGxlcnlPcHRpb25zIHtcbiAgICB3aWR0aD86IHN0cmluZztcbiAgICBoZWlnaHQ/OiBzdHJpbmc7XG4gICAgYnJlYWtwb2ludD86IG51bWJlcjtcbiAgICBmdWxsV2lkdGg/OiBib29sZWFuO1xuICAgIGxheW91dD86IHN0cmluZztcbiAgICBzdGFydEluZGV4PzogbnVtYmVyO1xuICAgIGxpbmtUYXJnZXQ/OiBzdHJpbmc7XG4gICAgbGF6eUxvYWRpbmc/OiBib29sZWFuO1xuICAgIGl0ZW0/OiBib29sZWFuO1xuICAgIGl0ZW1QZXJjZW50PzogbnVtYmVyO1xuICAgIGl0ZW1BcnJvd3M/OiBib29sZWFuO1xuICAgIGl0ZW1BcnJvd3NBdXRvSGlkZT86IGJvb2xlYW47XG4gICAgaXRlbVN3aXBlPzogYm9vbGVhbjtcbiAgICBpdGVtQW5pbWF0aW9uPzogc3RyaW5nO1xuICAgIGl0ZW1TaXplPzogc3RyaW5nO1xuICAgIGl0ZW1BdXRvUGxheT86IGJvb2xlYW47XG4gICAgaXRlbUF1dG9QbGF5SW50ZXJ2YWw/OiBudW1iZXI7XG4gICAgaXRlbUF1dG9QbGF5UGF1c2VPbkhvdmVyPzogYm9vbGVhbjtcbiAgICBpdGVtSW5maW5pdHlNb3ZlPzogYm9vbGVhbjtcbiAgICBpdGVtQWN0aW9ucz86IE5iR2FsbGVyeUFjdGlvbltdO1xuICAgIGl0ZW1EZXNjcmlwdGlvbj86IGJvb2xlYW47XG4gICAgaXRlbUJ1bGxldHM/OiBib29sZWFuO1xuICAgIHRodW1ibmFpbHM/OiBib29sZWFuO1xuICAgIGRlZmF1bHRWaWRlb1RodW1ibm5haWxVcmw/OiBzdHJpbmc7XG4gICAgdGh1bWJuYWlsc0NvbHVtbnM/OiBudW1iZXI7XG4gICAgdGh1bWJuYWlsc1Jvd3M/OiBudW1iZXI7XG4gICAgdGh1bWJuYWlsc1BlcmNlbnQ/OiBudW1iZXI7XG4gICAgdGh1bWJuYWlsc01hcmdpbj86IG51bWJlcjtcbiAgICB0aHVtYm5haWxzQXJyb3dzPzogYm9vbGVhbjtcbiAgICB0aHVtYm5haWxzQXJyb3dzQXV0b0hpZGU/OiBib29sZWFuO1xuICAgIHRodW1ibmFpbHNTd2lwZT86IGJvb2xlYW47XG4gICAgdGh1bWJuYWlsc01vdmVTaXplPzogbnVtYmVyO1xuICAgIHRodW1ibmFpbHNPcmRlcj86IE5iR2FsbGVyeU9yZGVyO1xuICAgIHRodW1ibmFpbHNSZW1haW5pbmdDb3VudD86IGJvb2xlYW47XG4gICAgdGh1bWJuYWlsc0FzTGlua3M/OiBib29sZWFuO1xuICAgIHRodW1ibmFpbHNBdXRvSGlkZT86IGJvb2xlYW47XG4gICAgdGh1bWJuYWlsTWFyZ2luPzogbnVtYmVyO1xuICAgIHRodW1ibmFpbFNpemU/OiBzdHJpbmc7XG4gICAgdGh1bWJuYWlsQWN0aW9ucz86IE5iR2FsbGVyeUFjdGlvbltdO1xuICAgIHByZXZpZXc/OiBib29sZWFuO1xuICAgIHByZXZpZXdEZXNjcmlwdGlvbj86IGJvb2xlYW47XG4gICAgcHJldmlld1N3aXBlPzogYm9vbGVhbjtcbiAgICBwcmV2aWV3RnVsbHNjcmVlbj86IGJvb2xlYW47XG4gICAgcHJldmlld0ZvcmNlRnVsbHNjcmVlbj86IGJvb2xlYW47XG4gICAgcHJldmlld0Nsb3NlT25DbGljaz86IGJvb2xlYW47XG4gICAgcHJldmlld0Nsb3NlT25Fc2M/OiBib29sZWFuO1xuICAgIHByZXZpZXdLZXlib2FyZE5hdmlnYXRpb24/OiBib29sZWFuO1xuICAgIHByZXZpZXdBbmltYXRpb24/OiBib29sZWFuO1xuICAgIHByZXZpZXdBdXRvUGxheT86IGJvb2xlYW47XG4gICAgcHJldmlld0F1dG9QbGF5SW50ZXJ2YWw/OiBudW1iZXI7XG4gICAgcHJldmlld0F1dG9QbGF5UGF1c2VPbkhvdmVyPzogYm9vbGVhbjtcbiAgICBwcmV2aWV3SW5maW5pdHlNb3ZlPzogYm9vbGVhbjtcbiAgICBwcmV2aWV3Wm9vbT86IGJvb2xlYW47XG4gICAgcHJldmlld1pvb21TdGVwPzogbnVtYmVyO1xuICAgIHByZXZpZXdab29tTWF4PzogbnVtYmVyO1xuICAgIHByZXZpZXdab29tTWluPzogbnVtYmVyO1xuICAgIHByZXZpZXdSb3RhdGU/OiBib29sZWFuO1xuICAgIHByZXZpZXdEb3dubG9hZD86IGJvb2xlYW47XG4gICAgcHJldmlld0N1c3RvbT86IChpbmRleDogbnVtYmVyKSA9PiB2b2lkO1xuICAgIHByZXZpZXdCdWxsZXRzPzogYm9vbGVhbjtcbiAgICBhcnJvd1ByZXZJY29uPzogc3RyaW5nW107XG4gICAgYXJyb3dOZXh0SWNvbj86IHN0cmluZ1tdO1xuICAgIGNsb3NlSWNvbj86IHN0cmluZ1tdO1xuICAgIGZ1bGxzY3JlZW5JY29uPzogc3RyaW5nW107XG4gICAgc3Bpbm5lckljb24/OiBzdHJpbmdbXTtcbiAgICB6b29tSW5JY29uPzogc3RyaW5nW107XG4gICAgem9vbU91dEljb24/OiBzdHJpbmdbXTtcbiAgICByb3RhdGVMZWZ0SWNvbj86IHN0cmluZ1tdO1xuICAgIHJvdGF0ZVJpZ2h0SWNvbj86IHN0cmluZ1tdO1xuICAgIGRvd25sb2FkSWNvbj86IHN0cmluZ1tdO1xuICAgIGFjdGlvbnM/OiBOYkdhbGxlcnlBY3Rpb25bXTtcblxuICAgIGNvbnN0cnVjdG9yKG9iajogSU5iR2FsbGVyeU9wdGlvbnMpIHtcblxuICAgICAgICBjb25zdCBwcmV2ZW50RGVmYXVsdHMgPSBvYmouYnJlYWtwb2ludCA9PT0gdW5kZWZpbmVkID8gZmFsc2UgOiB0cnVlO1xuXG4gICAgICAgIGZ1bmN0aW9uIHVzZTxUPihzb3VyY2U6IFQsIGRlZmF1bHRWYWx1ZTogVCk6IFQge1xuICAgICAgICAgICAgcmV0dXJuIG9iaiAmJiAoc291cmNlICE9PSB1bmRlZmluZWQgfHwgcHJldmVudERlZmF1bHRzKSA/IHNvdXJjZSA6IGRlZmF1bHRWYWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYnJlYWtwb2ludCA9IHVzZShvYmouYnJlYWtwb2ludCwgdW5kZWZpbmVkKTtcbiAgICAgICAgdGhpcy53aWR0aCA9IHVzZShvYmoud2lkdGgsICc1MDBweCcpO1xuICAgICAgICB0aGlzLmhlaWdodCA9IHVzZShvYmouaGVpZ2h0LCAnNDAwcHgnKTtcbiAgICAgICAgdGhpcy5mdWxsV2lkdGggPSB1c2Uob2JqLmZ1bGxXaWR0aCwgZmFsc2UpO1xuICAgICAgICB0aGlzLmxheW91dCA9IHVzZShvYmoubGF5b3V0LCBOYkdhbGxlcnlMYXlvdXQuVGh1bWJuYWlsc0JvdHRvbSk7XG4gICAgICAgIHRoaXMuc3RhcnRJbmRleCA9IHVzZShvYmouc3RhcnRJbmRleCwgMCk7XG4gICAgICAgIHRoaXMubGlua1RhcmdldCA9IHVzZShvYmoubGlua1RhcmdldCwgJ19ibGFuaycpO1xuICAgICAgICB0aGlzLmxhenlMb2FkaW5nID0gdXNlKG9iai5sYXp5TG9hZGluZywgdHJ1ZSk7XG5cbiAgICAgICAgdGhpcy5pdGVtID0gdXNlKG9iai5pdGVtLCB0cnVlKTtcbiAgICAgICAgdGhpcy5pdGVtUGVyY2VudCA9IHVzZShvYmouaXRlbVBlcmNlbnQsIDc1KTtcbiAgICAgICAgdGhpcy5pdGVtQXJyb3dzID0gdXNlKG9iai5pdGVtQXJyb3dzLCB0cnVlKTtcbiAgICAgICAgdGhpcy5pdGVtQXJyb3dzQXV0b0hpZGUgPSB1c2Uob2JqLml0ZW1BcnJvd3NBdXRvSGlkZSwgZmFsc2UpO1xuICAgICAgICB0aGlzLml0ZW1Td2lwZSA9IHVzZShvYmouaXRlbVN3aXBlLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuaXRlbUFuaW1hdGlvbiA9IHVzZShvYmouaXRlbUFuaW1hdGlvbiwgTmJHYWxsZXJ5QW5pbWF0aW9uLkZhZGUpO1xuICAgICAgICB0aGlzLml0ZW1TaXplID0gdXNlKG9iai5pdGVtU2l6ZSwgTmJHYWxsZXJ5SW1hZ2VTaXplLkNvdmVyKTtcbiAgICAgICAgdGhpcy5pdGVtQXV0b1BsYXkgPSB1c2Uob2JqLml0ZW1BdXRvUGxheSwgZmFsc2UpO1xuICAgICAgICB0aGlzLml0ZW1BdXRvUGxheUludGVydmFsID0gdXNlKG9iai5pdGVtQXV0b1BsYXlJbnRlcnZhbCwgMjAwMCk7XG4gICAgICAgIHRoaXMuaXRlbUF1dG9QbGF5UGF1c2VPbkhvdmVyID0gdXNlKG9iai5pdGVtQXV0b1BsYXlQYXVzZU9uSG92ZXIsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5pdGVtSW5maW5pdHlNb3ZlID0gdXNlKG9iai5pdGVtSW5maW5pdHlNb3ZlLCBmYWxzZSk7XG4gICAgICAgIGlmIChvYmogJiYgb2JqLml0ZW1BY3Rpb25zICYmIG9iai5pdGVtQWN0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgIG9iai5pdGVtQWN0aW9ucyA9IG9iai5pdGVtQWN0aW9ucy5tYXAoYWN0aW9uID0+IG5ldyBOYkdhbGxlcnlBY3Rpb24oYWN0aW9uKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pdGVtQWN0aW9ucyA9IHVzZShvYmouaXRlbUFjdGlvbnMsIFtdKTtcbiAgICAgICAgdGhpcy5pdGVtRGVzY3JpcHRpb24gPSB1c2Uob2JqLml0ZW1EZXNjcmlwdGlvbiwgZmFsc2UpO1xuICAgICAgICB0aGlzLml0ZW1CdWxsZXRzID0gdXNlKG9iai5pdGVtQnVsbGV0cywgZmFsc2UpO1xuXG4gICAgICAgIHRoaXMudGh1bWJuYWlscyA9IHVzZShvYmoudGh1bWJuYWlscywgdHJ1ZSk7XG4gICAgICAgIHRoaXMuZGVmYXVsdFZpZGVvVGh1bWJubmFpbFVybCA9IHVzZShvYmouZGVmYXVsdFZpZGVvVGh1bWJubmFpbFVybCwgdW5kZWZpbmVkKTtcbiAgICAgICAgdGhpcy50aHVtYm5haWxzQ29sdW1ucyA9IHVzZShvYmoudGh1bWJuYWlsc0NvbHVtbnMsIDQpO1xuICAgICAgICB0aGlzLnRodW1ibmFpbHNSb3dzID0gdXNlKG9iai50aHVtYm5haWxzUm93cywgMSk7XG4gICAgICAgIHRoaXMudGh1bWJuYWlsc1BlcmNlbnQgPSB1c2Uob2JqLnRodW1ibmFpbHNQZXJjZW50LCAyNSk7XG4gICAgICAgIHRoaXMudGh1bWJuYWlsc01hcmdpbiA9IHVzZShvYmoudGh1bWJuYWlsc01hcmdpbiwgMTApO1xuICAgICAgICB0aGlzLnRodW1ibmFpbHNBcnJvd3MgPSB1c2Uob2JqLnRodW1ibmFpbHNBcnJvd3MsIHRydWUpO1xuICAgICAgICB0aGlzLnRodW1ibmFpbHNBcnJvd3NBdXRvSGlkZSA9IHVzZShvYmoudGh1bWJuYWlsc0Fycm93c0F1dG9IaWRlLCBmYWxzZSk7XG4gICAgICAgIHRoaXMudGh1bWJuYWlsc1N3aXBlID0gdXNlKG9iai50aHVtYm5haWxzU3dpcGUsIGZhbHNlKTtcbiAgICAgICAgdGhpcy50aHVtYm5haWxzTW92ZVNpemUgPSB1c2Uob2JqLnRodW1ibmFpbHNNb3ZlU2l6ZSwgMSk7XG4gICAgICAgIHRoaXMudGh1bWJuYWlsc09yZGVyID0gdXNlKG9iai50aHVtYm5haWxzT3JkZXIsIE5iR2FsbGVyeU9yZGVyLkNvbHVtbik7XG4gICAgICAgIHRoaXMudGh1bWJuYWlsc1JlbWFpbmluZ0NvdW50ID0gdXNlKG9iai50aHVtYm5haWxzUmVtYWluaW5nQ291bnQsIGZhbHNlKTtcbiAgICAgICAgdGhpcy50aHVtYm5haWxzQXNMaW5rcyA9IHVzZShvYmoudGh1bWJuYWlsc0FzTGlua3MsIGZhbHNlKTtcbiAgICAgICAgdGhpcy50aHVtYm5haWxzQXV0b0hpZGUgPSB1c2Uob2JqLnRodW1ibmFpbHNBdXRvSGlkZSwgZmFsc2UpO1xuICAgICAgICB0aGlzLnRodW1ibmFpbE1hcmdpbiA9IHVzZShvYmoudGh1bWJuYWlsTWFyZ2luLCAxMCk7XG4gICAgICAgIHRoaXMudGh1bWJuYWlsU2l6ZSA9IHVzZShvYmoudGh1bWJuYWlsU2l6ZSwgTmJHYWxsZXJ5SW1hZ2VTaXplLkNvdmVyKTtcbiAgICAgICAgaWYgKG9iaiAmJiBvYmoudGh1bWJuYWlsQWN0aW9ucyAmJiBvYmoudGh1bWJuYWlsQWN0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgIG9iai50aHVtYm5haWxBY3Rpb25zID0gb2JqLnRodW1ibmFpbEFjdGlvbnMubWFwKGFjdGlvbiA9PiBuZXcgTmJHYWxsZXJ5QWN0aW9uKGFjdGlvbikpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudGh1bWJuYWlsQWN0aW9ucyA9IHVzZShvYmoudGh1bWJuYWlsQWN0aW9ucywgW10pO1xuXG4gICAgICAgIHRoaXMucHJldmlldyA9IHVzZShvYmoucHJldmlldywgdHJ1ZSk7XG4gICAgICAgIHRoaXMucHJldmlld0Rlc2NyaXB0aW9uID0gdXNlKG9iai5wcmV2aWV3RGVzY3JpcHRpb24sIHRydWUpO1xuICAgICAgICB0aGlzLnByZXZpZXdTd2lwZSA9IHVzZShvYmoucHJldmlld1N3aXBlLCBmYWxzZSk7XG4gICAgICAgIHRoaXMucHJldmlld0Z1bGxzY3JlZW4gPSB1c2Uob2JqLnByZXZpZXdGdWxsc2NyZWVuLCBmYWxzZSk7XG4gICAgICAgIHRoaXMucHJldmlld0ZvcmNlRnVsbHNjcmVlbiA9IHVzZShvYmoucHJldmlld0ZvcmNlRnVsbHNjcmVlbiwgZmFsc2UpO1xuICAgICAgICB0aGlzLnByZXZpZXdDbG9zZU9uQ2xpY2sgPSB1c2Uob2JqLnByZXZpZXdDbG9zZU9uQ2xpY2ssIGZhbHNlKTtcbiAgICAgICAgdGhpcy5wcmV2aWV3Q2xvc2VPbkVzYyA9IHVzZShvYmoucHJldmlld0Nsb3NlT25Fc2MsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5wcmV2aWV3S2V5Ym9hcmROYXZpZ2F0aW9uID0gdXNlKG9iai5wcmV2aWV3S2V5Ym9hcmROYXZpZ2F0aW9uLCBmYWxzZSk7XG4gICAgICAgIHRoaXMucHJldmlld0FuaW1hdGlvbiA9IHVzZShvYmoucHJldmlld0FuaW1hdGlvbiwgdHJ1ZSk7XG4gICAgICAgIHRoaXMucHJldmlld0F1dG9QbGF5ID0gdXNlKG9iai5wcmV2aWV3QXV0b1BsYXksIGZhbHNlKTtcbiAgICAgICAgdGhpcy5wcmV2aWV3QXV0b1BsYXlJbnRlcnZhbCA9IHVzZShvYmoucHJldmlld0F1dG9QbGF5SW50ZXJ2YWwsIDIwMDApO1xuICAgICAgICB0aGlzLnByZXZpZXdBdXRvUGxheVBhdXNlT25Ib3ZlciA9IHVzZShvYmoucHJldmlld0F1dG9QbGF5UGF1c2VPbkhvdmVyLCBmYWxzZSk7XG4gICAgICAgIHRoaXMucHJldmlld0luZmluaXR5TW92ZSA9IHVzZShvYmoucHJldmlld0luZmluaXR5TW92ZSwgZmFsc2UpO1xuICAgICAgICB0aGlzLnByZXZpZXdab29tID0gdXNlKG9iai5wcmV2aWV3Wm9vbSwgZmFsc2UpO1xuICAgICAgICB0aGlzLnByZXZpZXdab29tU3RlcCA9IHVzZShvYmoucHJldmlld1pvb21TdGVwLCAwLjEpO1xuICAgICAgICB0aGlzLnByZXZpZXdab29tTWF4ID0gdXNlKG9iai5wcmV2aWV3Wm9vbU1heCwgMik7XG4gICAgICAgIHRoaXMucHJldmlld1pvb21NaW4gPSB1c2Uob2JqLnByZXZpZXdab29tTWluLCAwLjUpO1xuICAgICAgICB0aGlzLnByZXZpZXdSb3RhdGUgPSB1c2Uob2JqLnByZXZpZXdSb3RhdGUsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5wcmV2aWV3RG93bmxvYWQgPSB1c2Uob2JqLnByZXZpZXdEb3dubG9hZCwgZmFsc2UpO1xuICAgICAgICB0aGlzLnByZXZpZXdDdXN0b20gPSB1c2Uob2JqLnByZXZpZXdDdXN0b20sIHVuZGVmaW5lZCk7XG4gICAgICAgIHRoaXMucHJldmlld0J1bGxldHMgPSB1c2Uob2JqLnByZXZpZXdCdWxsZXRzLCBmYWxzZSk7XG5cbiAgICAgICAgdGhpcy5hcnJvd1ByZXZJY29uID0gdXNlKG9iai5hcnJvd1ByZXZJY29uLCBbJ2ZhJywgJ2Fycm93LWNpcmNsZS1sZWZ0J10pO1xuICAgICAgICB0aGlzLmFycm93TmV4dEljb24gPSB1c2Uob2JqLmFycm93TmV4dEljb24sIFsnZmEnLCAnYXJyb3ctY2lyY2xlLXJpZ2h0J10pO1xuICAgICAgICB0aGlzLmNsb3NlSWNvbiA9IHVzZShvYmouY2xvc2VJY29uLCBbJ2ZhJywgJ3RpbWVzLWNpcmNsZSddKTtcbiAgICAgICAgdGhpcy5mdWxsc2NyZWVuSWNvbiA9IHVzZShvYmouZnVsbHNjcmVlbkljb24sIFsnZmEnLCAnYXJyb3dzLWFsdCddKTtcbiAgICAgICAgdGhpcy5zcGlubmVySWNvbiA9IHVzZShvYmouc3Bpbm5lckljb24sIFsnZmEnLCAnc3Bpbm5lciddKTtcbiAgICAgICAgdGhpcy56b29tSW5JY29uID0gdXNlKG9iai56b29tSW5JY29uLCBbJ2ZhJywgJ3NlYXJjaC1wbHVzJ10pO1xuICAgICAgICB0aGlzLnpvb21PdXRJY29uID0gdXNlKG9iai56b29tT3V0SWNvbiwgWydmYScsICdzZWFyY2gtbWludXMnXSk7XG4gICAgICAgIHRoaXMucm90YXRlTGVmdEljb24gPSB1c2Uob2JqLnJvdGF0ZUxlZnRJY29uLCBbJ2ZhJywgJ3VuZG8nXSk7XG4gICAgICAgIHRoaXMucm90YXRlUmlnaHRJY29uID0gdXNlKG9iai5yb3RhdGVSaWdodEljb24sIFsnZmEnLCAncmVkbyddKTtcbiAgICAgICAgdGhpcy5kb3dubG9hZEljb24gPSB1c2Uob2JqLmRvd25sb2FkSWNvbiwgWydmYScsICdhcnJvdy1jaXJjbGUtZG93biddKTtcblxuICAgICAgICBpZiAob2JqICYmIG9iai5hY3Rpb25zICYmIG9iai5hY3Rpb25zLmxlbmd0aCkge1xuICAgICAgICAgICAgb2JqLmFjdGlvbnMgPSBvYmouYWN0aW9ucy5tYXAoYWN0aW9uID0+IG5ldyBOYkdhbGxlcnlBY3Rpb24oYWN0aW9uKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hY3Rpb25zID0gdXNlKG9iai5hY3Rpb25zLCBbXSk7XG4gICAgfVxufVxuIl19