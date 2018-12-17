/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
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
export { NbGalleryComponent } from './nb-gallery.component';
export { NbGalleryActionComponent } from './nb-gallery-action/nb-gallery-action.component';
export { NbGalleryItemComponent } from './nb-gallery-item/nb-gallery-item.component';
export { NbGalleryVideoComponent } from './nb-gallery-video/nb-gallery-video.component';
export { NbGalleryIframeComponent } from './nb-gallery-video/nb-gallery-iframe.component';
export { NbGalleryTagComponent } from './nb-gallery-video/nb-gallery-tag.component';
export { NbGalleryThumbnailsComponent } from './nb-gallery-thumbnails/nb-gallery-thumbnails.component';
export { NbGalleryPreviewComponent } from './nb-gallery-preview/nb-gallery-preview.component';
export { NbGalleryArrowsComponent } from './nb-gallery-arrows/nb-gallery-arrows.component';
export { NbGalleryBulletsComponent } from './nb-gallery-bullets/nb-gallery-bullets.component';
export { NbGalleryOptions } from './models/nb-gallery-options.model';
export { NbGalleryItem } from './models/nb-gallery-item.model';
export { NbGalleryAnimation } from './models/nb-gallery-animation.model';
export { NbGalleryHelperService } from './nb-gallery-helper.service';
export { NbGalleryImageSize } from './models/nb-gallery-image-size.model';
export { NbGalleryLayout } from './models/nb-gallery-layout.model';
export { NbGalleryOrder } from './models/nb-gallery-order.model';
export { NbGalleryOrderedImage } from './models/nb-gallery-ordered-image.model';
export { NbGalleryAction } from './models/nb-gallery-action.model';
export class CustomHammerConfig extends HammerGestureConfig {
    constructor() {
        super(...arguments);
        this.overrides = /** @type {?} */ ({
            'pinch': { enable: false },
            'rotate': { enable: false }
        });
    }
}
if (false) {
    /** @type {?} */
    CustomHammerConfig.prototype.overrides;
}
export class NbGalleryModule {
}
NbGalleryModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
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
            },] }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmItZ2FsbGVyeS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uYi1nYWxsZXJ5LyIsInNvdXJjZXMiOlsibGliL25iLWdhbGxlcnkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFdkYsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0saURBQWlELENBQUM7QUFDM0YsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0saURBQWlELENBQUM7QUFDM0YsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFDOUYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDckYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDeEYsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDMUYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDcEYsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0seURBQXlELENBQUM7QUFDdkcsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFDOUYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFNUQsbUNBQWMsd0JBQXdCLENBQUM7QUFDdkMseUNBQWMsaURBQWlELENBQUM7QUFDaEUsdUNBQWMsNkNBQTZDLENBQUM7QUFDNUQsd0NBQWMsK0NBQStDLENBQUM7QUFDOUQseUNBQWMsZ0RBQWdELENBQUM7QUFDL0Qsc0NBQWMsNkNBQTZDLENBQUM7QUFDNUQsNkNBQWMseURBQXlELENBQUM7QUFDeEUsMENBQWMsbURBQW1ELENBQUM7QUFDbEUseUNBQWMsaURBQWlELENBQUM7QUFDaEUsMENBQWMsbURBQW1ELENBQUM7QUFDbEUsaUNBQWMsbUNBQW1DLENBQUM7QUFDbEQsOEJBQWMsZ0NBQWdDLENBQUM7QUFDL0MsbUNBQWMscUNBQXFDLENBQUM7QUFDcEQsdUNBQWMsNkJBQTZCLENBQUM7QUFDNUMsbUNBQWMsc0NBQXNDLENBQUM7QUFDckQsZ0NBQWMsa0NBQWtDLENBQUM7QUFDakQsK0JBQWMsaUNBQWlDLENBQUM7QUFDaEQsc0NBQWMseUNBQXlDLENBQUM7QUFDeEQsZ0NBQWMsa0NBQWtDLENBQUM7QUFFakQsTUFBTSx5QkFBMEIsU0FBUSxtQkFBbUI7OzsyQ0FDdEM7WUFDYixPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO1lBQzFCLFFBQVEsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7U0FDOUI7O0NBQ0o7Ozs7O0FBMEJELE1BQU07OztZQXhCTCxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNMLFlBQVk7aUJBQ2Y7Z0JBQ0QsWUFBWSxFQUFFO29CQUNWLHdCQUF3QjtvQkFDeEIsd0JBQXdCO29CQUN4Qix5QkFBeUI7b0JBQ3pCLHNCQUFzQjtvQkFDdEIsNEJBQTRCO29CQUM1Qix5QkFBeUI7b0JBQ3pCLGtCQUFrQjtvQkFDbEIsdUJBQXVCO29CQUN2Qix3QkFBd0I7b0JBQ3hCLHFCQUFxQjtpQkFDeEI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLGtCQUFrQjtpQkFDckI7Z0JBQ0QsU0FBUyxFQUFFO29CQUNQLEVBQUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLFFBQVEsRUFBRSxrQkFBa0IsRUFBRTtpQkFDbkU7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSGFtbWVyR2VzdHVyZUNvbmZpZywgSEFNTUVSX0dFU1RVUkVfQ09ORklHIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmltcG9ydCB7IE5iR2FsbGVyeUFjdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vbmItZ2FsbGVyeS1hY3Rpb24vbmItZ2FsbGVyeS1hY3Rpb24uY29tcG9uZW50JztcbmltcG9ydCB7IE5iR2FsbGVyeUFycm93c0NvbXBvbmVudCB9IGZyb20gJy4vbmItZ2FsbGVyeS1hcnJvd3MvbmItZ2FsbGVyeS1hcnJvd3MuY29tcG9uZW50JztcbmltcG9ydCB7IE5iR2FsbGVyeUJ1bGxldHNDb21wb25lbnQgfSBmcm9tICcuL25iLWdhbGxlcnktYnVsbGV0cy9uYi1nYWxsZXJ5LWJ1bGxldHMuY29tcG9uZW50JztcbmltcG9ydCB7IE5iR2FsbGVyeUl0ZW1Db21wb25lbnQgfSBmcm9tICcuL25iLWdhbGxlcnktaXRlbS9uYi1nYWxsZXJ5LWl0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IE5iR2FsbGVyeVZpZGVvQ29tcG9uZW50IH0gZnJvbSAnLi9uYi1nYWxsZXJ5LXZpZGVvL25iLWdhbGxlcnktdmlkZW8uY29tcG9uZW50JztcbmltcG9ydCB7IE5iR2FsbGVyeUlmcmFtZUNvbXBvbmVudCB9IGZyb20gJy4vbmItZ2FsbGVyeS12aWRlby9uYi1nYWxsZXJ5LWlmcmFtZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmJHYWxsZXJ5VGFnQ29tcG9uZW50IH0gZnJvbSAnLi9uYi1nYWxsZXJ5LXZpZGVvL25iLWdhbGxlcnktdGFnLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOYkdhbGxlcnlUaHVtYm5haWxzQ29tcG9uZW50IH0gZnJvbSAnLi9uYi1nYWxsZXJ5LXRodW1ibmFpbHMvbmItZ2FsbGVyeS10aHVtYm5haWxzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOYkdhbGxlcnlQcmV2aWV3Q29tcG9uZW50IH0gZnJvbSAnLi9uYi1nYWxsZXJ5LXByZXZpZXcvbmItZ2FsbGVyeS1wcmV2aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOYkdhbGxlcnlDb21wb25lbnQgfSBmcm9tICcuL25iLWdhbGxlcnkuY29tcG9uZW50JztcblxuZXhwb3J0ICogZnJvbSAnLi9uYi1nYWxsZXJ5LmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL25iLWdhbGxlcnktYWN0aW9uL25iLWdhbGxlcnktYWN0aW9uLmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL25iLWdhbGxlcnktaXRlbS9uYi1nYWxsZXJ5LWl0ZW0uY29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vbmItZ2FsbGVyeS12aWRlby9uYi1nYWxsZXJ5LXZpZGVvLmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL25iLWdhbGxlcnktdmlkZW8vbmItZ2FsbGVyeS1pZnJhbWUuY29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vbmItZ2FsbGVyeS12aWRlby9uYi1nYWxsZXJ5LXRhZy5jb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9uYi1nYWxsZXJ5LXRodW1ibmFpbHMvbmItZ2FsbGVyeS10aHVtYm5haWxzLmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL25iLWdhbGxlcnktcHJldmlldy9uYi1nYWxsZXJ5LXByZXZpZXcuY29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vbmItZ2FsbGVyeS1hcnJvd3MvbmItZ2FsbGVyeS1hcnJvd3MuY29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vbmItZ2FsbGVyeS1idWxsZXRzL25iLWdhbGxlcnktYnVsbGV0cy5jb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9tb2RlbHMvbmItZ2FsbGVyeS1vcHRpb25zLm1vZGVsJztcbmV4cG9ydCAqIGZyb20gJy4vbW9kZWxzL25iLWdhbGxlcnktaXRlbS5tb2RlbCc7XG5leHBvcnQgKiBmcm9tICcuL21vZGVscy9uYi1nYWxsZXJ5LWFuaW1hdGlvbi5tb2RlbCc7XG5leHBvcnQgKiBmcm9tICcuL25iLWdhbGxlcnktaGVscGVyLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9tb2RlbHMvbmItZ2FsbGVyeS1pbWFnZS1zaXplLm1vZGVsJztcbmV4cG9ydCAqIGZyb20gJy4vbW9kZWxzL25iLWdhbGxlcnktbGF5b3V0Lm1vZGVsJztcbmV4cG9ydCAqIGZyb20gJy4vbW9kZWxzL25iLWdhbGxlcnktb3JkZXIubW9kZWwnO1xuZXhwb3J0ICogZnJvbSAnLi9tb2RlbHMvbmItZ2FsbGVyeS1vcmRlcmVkLWltYWdlLm1vZGVsJztcbmV4cG9ydCAqIGZyb20gJy4vbW9kZWxzL25iLWdhbGxlcnktYWN0aW9uLm1vZGVsJztcblxuZXhwb3J0IGNsYXNzIEN1c3RvbUhhbW1lckNvbmZpZyBleHRlbmRzIEhhbW1lckdlc3R1cmVDb25maWcgIHtcbiAgICBvdmVycmlkZXMgPSA8YW55PntcbiAgICAgICAgJ3BpbmNoJzogeyBlbmFibGU6IGZhbHNlIH0sXG4gICAgICAgICdyb3RhdGUnOiB7IGVuYWJsZTogZmFsc2UgfVxuICAgIH07XG59XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgIE5iR2FsbGVyeUFjdGlvbkNvbXBvbmVudCxcbiAgICAgIE5iR2FsbGVyeUFycm93c0NvbXBvbmVudCxcbiAgICAgIE5iR2FsbGVyeUJ1bGxldHNDb21wb25lbnQsXG4gICAgICBOYkdhbGxlcnlJdGVtQ29tcG9uZW50LFxuICAgICAgTmJHYWxsZXJ5VGh1bWJuYWlsc0NvbXBvbmVudCxcbiAgICAgIE5iR2FsbGVyeVByZXZpZXdDb21wb25lbnQsXG4gICAgICBOYkdhbGxlcnlDb21wb25lbnQsXG4gICAgICBOYkdhbGxlcnlWaWRlb0NvbXBvbmVudCxcbiAgICAgIE5iR2FsbGVyeUlmcmFtZUNvbXBvbmVudCxcbiAgICAgIE5iR2FsbGVyeVRhZ0NvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgICBOYkdhbGxlcnlDb21wb25lbnRcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgICB7IHByb3ZpZGU6IEhBTU1FUl9HRVNUVVJFX0NPTkZJRywgdXNlQ2xhc3M6IEN1c3RvbUhhbW1lckNvbmZpZyB9XG4gIF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBOYkdhbGxlcnlNb2R1bGUgeyB9XG4iXX0=