import { HammerGestureConfig } from '@angular/platform-browser';
export * from './nb-gallery.component';
export * from './nb-gallery-action/nb-gallery-action.component';
export * from './nb-gallery-item/nb-gallery-item.component';
export * from './nb-gallery-video/nb-gallery-video.component';
export * from './nb-gallery-video/nb-gallery-iframe.component';
export * from './nb-gallery-video/nb-gallery-tag.component';
export * from './nb-gallery-thumbnails/nb-gallery-thumbnails.component';
export * from './nb-gallery-preview/nb-gallery-preview.component';
export * from './nb-gallery-arrows/nb-gallery-arrows.component';
export * from './nb-gallery-bullets/nb-gallery-bullets.component';
export * from './models/nb-gallery-options.model';
export * from './models/nb-gallery-item.model';
export * from './models/nb-gallery-animation.model';
export * from './nb-gallery-helper.service';
export * from './models/nb-gallery-image-size.model';
export * from './models/nb-gallery-layout.model';
export * from './models/nb-gallery-order.model';
export * from './models/nb-gallery-ordered-image.model';
export * from './models/nb-gallery-action.model';
export declare class CustomHammerConfig extends HammerGestureConfig {
    overrides: any;
}
export declare class NbGalleryModule {
}
