import { NbGalleryAnimation } from './nb-gallery-animation.model';
import { NbGalleryImageSize } from './nb-gallery-image-size.model';
import { NbGalleryLayout } from './nb-gallery-layout.model';
import { NbGalleryOrder } from './nb-gallery-order.model';
import { NbGalleryAction } from './nb-gallery-action.model';

export interface INbGalleryOptions {
    width?: string;
    height?: string;
    breakpoint?: number;
    fullWidth?: boolean;
    layout?: string;
    startIndex?: number;
    linkTarget?: string;
    lazyLoading?: boolean;
    item?: boolean;
    itemPercent?: number;
    itemArrows?: boolean;
    itemArrowsAutoHide?: boolean;
    itemSwipe?: boolean;
    itemAnimation?: string;
    itemSize?: string;
    itemAutoPlay?: boolean;
    itemAutoPlayInterval?: number;
    itemAutoPlayPauseOnHover?: boolean;
    itemInfinityMove?: boolean;
    itemActions?: NbGalleryAction[];
    itemDescription?: boolean;
    itemBullets?: boolean;
    thumbnails?: boolean;
    defaultVideoThumbnnailUrl?: string;
    thumbnailsColumns?: number;
    thumbnailsRows?: number;
    thumbnailsPercent?: number;
    thumbnailsMargin?: number;
    thumbnailsArrows?: boolean;
    thumbnailsArrowsAutoHide?: boolean;
    thumbnailsSwipe?: boolean;
    thumbnailsMoveSize?: number;
    thumbnailsOrder?: NbGalleryOrder;
    thumbnailsRemainingCount?: boolean;
    thumbnailsAsLinks?: boolean;
    thumbnailsAutoHide?: boolean;
    thumbnailMargin?: number;
    thumbnailSize?: string;
    thumbnailActions?: NbGalleryAction[];
    preview?: boolean;
    previewDescription?: boolean;
    previewSwipe?: boolean;
    previewFullscreen?: boolean;
    previewForceFullscreen?: boolean;
    previewCloseOnClick?: boolean;
    previewCloseOnEsc?: boolean;
    previewKeyboardNavigation?: boolean;
    previewAnimation?: boolean;
    previewAutoPlay?: boolean;
    previewAutoPlayInterval?: number;
    previewAutoPlayPauseOnHover?: boolean;
    previewInfinityMove?: boolean;
    previewZoom?: boolean;
    previewZoomStep?: number;
    previewZoomMax?: number;
    previewZoomMin?: number;
    previewRotate?: boolean;
    previewDownload?: boolean;
    previewCustom?: (index: number) => void;
    previewBullets?: boolean;
    arrowPrevIcon?: string[];
    arrowNextIcon?: string[];
    closeIcon?: string[];
    fullscreenIcon?: string[];
    spinnerIcon?: string[];
    zoomInIcon?: string[];
    zoomOutIcon?: string[];
    rotateLeftIcon?: string[];
    rotateRightIcon?: string[];
    downloadIcon?: string[];
    actions?: NbGalleryAction[];
}

export class NbGalleryOptions implements INbGalleryOptions {
    width?: string;
    height?: string;
    breakpoint?: number;
    fullWidth?: boolean;
    layout?: string;
    startIndex?: number;
    linkTarget?: string;
    lazyLoading?: boolean;
    item?: boolean;
    itemPercent?: number;
    itemArrows?: boolean;
    itemArrowsAutoHide?: boolean;
    itemSwipe?: boolean;
    itemAnimation?: string;
    itemSize?: string;
    itemAutoPlay?: boolean;
    itemAutoPlayInterval?: number;
    itemAutoPlayPauseOnHover?: boolean;
    itemInfinityMove?: boolean;
    itemActions?: NbGalleryAction[];
    itemDescription?: boolean;
    itemBullets?: boolean;
    thumbnails?: boolean;
    defaultVideoThumbnnailUrl?: string;
    thumbnailsColumns?: number;
    thumbnailsRows?: number;
    thumbnailsPercent?: number;
    thumbnailsMargin?: number;
    thumbnailsArrows?: boolean;
    thumbnailsArrowsAutoHide?: boolean;
    thumbnailsSwipe?: boolean;
    thumbnailsMoveSize?: number;
    thumbnailsOrder?: NbGalleryOrder;
    thumbnailsRemainingCount?: boolean;
    thumbnailsAsLinks?: boolean;
    thumbnailsAutoHide?: boolean;
    thumbnailMargin?: number;
    thumbnailSize?: string;
    thumbnailActions?: NbGalleryAction[];
    preview?: boolean;
    previewDescription?: boolean;
    previewSwipe?: boolean;
    previewFullscreen?: boolean;
    previewForceFullscreen?: boolean;
    previewCloseOnClick?: boolean;
    previewCloseOnEsc?: boolean;
    previewKeyboardNavigation?: boolean;
    previewAnimation?: boolean;
    previewAutoPlay?: boolean;
    previewAutoPlayInterval?: number;
    previewAutoPlayPauseOnHover?: boolean;
    previewInfinityMove?: boolean;
    previewZoom?: boolean;
    previewZoomStep?: number;
    previewZoomMax?: number;
    previewZoomMin?: number;
    previewRotate?: boolean;
    previewDownload?: boolean;
    previewCustom?: (index: number) => void;
    previewBullets?: boolean;
    arrowPrevIcon?: string[];
    arrowNextIcon?: string[];
    closeIcon?: string[];
    fullscreenIcon?: string[];
    spinnerIcon?: string[];
    zoomInIcon?: string[];
    zoomOutIcon?: string[];
    rotateLeftIcon?: string[];
    rotateRightIcon?: string[];
    downloadIcon?: string[];
    actions?: NbGalleryAction[];

    constructor(obj: INbGalleryOptions) {

        const preventDefaults = obj.breakpoint === undefined ? false : true;

        function use<T>(source: T, defaultValue: T): T {
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
