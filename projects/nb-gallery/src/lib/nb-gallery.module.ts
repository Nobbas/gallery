import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

import { NbGalleryActionComponent } from './nb-gallery-action/nb-gallery-action.component';
import { NbGalleryArrowsComponent } from './nb-gallery-arrows/nb-gallery-arrows.component';
import { NbGalleryBulletsComponent } from './nb-gallery-bullets/nb-gallery-bullets.component';
import { NbGalleryItemComponent } from './nb-gallery-item/nb-gallery-item.component';
import { NbGalleryVideoComponent } from './nb-gallery-video/nb-gallery-video.component';
import { NbGalleryIframeComponent } from './nb-gallery-video/nb-gallery-iframe.component';
import { NbGalleryTagComponent } from './nb-gallery-video/nb-gallery-tag.component';
import { NbGalleryThumbnailsComponent } from './nb-gallery-thumbnails/nb-gallery-thumbnails.component';
import { NbGalleryPreviewComponent } from './nb-gallery-preview/nb-gallery-preview.component';
import { NbGalleryComponent } from './nb-gallery.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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

export class CustomHammerConfig extends HammerGestureConfig  {
    overrides = <any>{
        'pinch': { enable: false },
        'rotate': { enable: false }
    };
}

@NgModule({
  imports: [
      CommonModule,
      FontAwesomeModule
  ],
  declarations: [
      NbGalleryActionComponent,
      NbGalleryArrowsComponent,
      NbGalleryBulletsComponent,
      NbGalleryItemComponent,
      NbGalleryThumbnailsComponent,
      NbGalleryPreviewComponent,
      NbGalleryComponent,
      NbGalleryVideoComponent,
      NbGalleryIframeComponent,
      NbGalleryTagComponent
  ],
  exports: [
      NbGalleryComponent
  ],
  providers: [
      { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig }
  ]
})

export class NbGalleryModule { }
