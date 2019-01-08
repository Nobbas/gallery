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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
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
            },] }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmItZ2FsbGVyeS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uYi1nYWxsZXJ5LyIsInNvdXJjZXMiOlsibGliL25iLWdhbGxlcnkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFdkYsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0saURBQWlELENBQUM7QUFDM0YsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0saURBQWlELENBQUM7QUFDM0YsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFDOUYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDckYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDeEYsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDMUYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDcEYsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0seURBQXlELENBQUM7QUFDdkcsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFDOUYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFFckUsbUNBQWMsd0JBQXdCLENBQUM7QUFDdkMseUNBQWMsaURBQWlELENBQUM7QUFDaEUsdUNBQWMsNkNBQTZDLENBQUM7QUFDNUQsd0NBQWMsK0NBQStDLENBQUM7QUFDOUQseUNBQWMsZ0RBQWdELENBQUM7QUFDL0Qsc0NBQWMsNkNBQTZDLENBQUM7QUFDNUQsNkNBQWMseURBQXlELENBQUM7QUFDeEUsMENBQWMsbURBQW1ELENBQUM7QUFDbEUseUNBQWMsaURBQWlELENBQUM7QUFDaEUsMENBQWMsbURBQW1ELENBQUM7QUFDbEUsaUNBQWMsbUNBQW1DLENBQUM7QUFDbEQsOEJBQWMsZ0NBQWdDLENBQUM7QUFDL0MsbUNBQWMscUNBQXFDLENBQUM7QUFDcEQsdUNBQWMsNkJBQTZCLENBQUM7QUFDNUMsbUNBQWMsc0NBQXNDLENBQUM7QUFDckQsZ0NBQWMsa0NBQWtDLENBQUM7QUFDakQsK0JBQWMsaUNBQWlDLENBQUM7QUFDaEQsc0NBQWMseUNBQXlDLENBQUM7QUFDeEQsZ0NBQWMsa0NBQWtDLENBQUM7QUFFakQsTUFBTSx5QkFBMEIsU0FBUSxtQkFBbUI7OzsyQ0FDdEM7WUFDYixPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO1lBQzFCLFFBQVEsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7U0FDOUI7O0NBQ0o7Ozs7O0FBMkJELE1BQU07OztZQXpCTCxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNMLFlBQVk7b0JBQ1osaUJBQWlCO2lCQUNwQjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1Ysd0JBQXdCO29CQUN4Qix3QkFBd0I7b0JBQ3hCLHlCQUF5QjtvQkFDekIsc0JBQXNCO29CQUN0Qiw0QkFBNEI7b0JBQzVCLHlCQUF5QjtvQkFDekIsa0JBQWtCO29CQUNsQix1QkFBdUI7b0JBQ3ZCLHdCQUF3QjtvQkFDeEIscUJBQXFCO2lCQUN4QjtnQkFDRCxPQUFPLEVBQUU7b0JBQ0wsa0JBQWtCO2lCQUNyQjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1AsRUFBRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsUUFBUSxFQUFFLGtCQUFrQixFQUFFO2lCQUNuRTthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBIYW1tZXJHZXN0dXJlQ29uZmlnLCBIQU1NRVJfR0VTVFVSRV9DT05GSUcgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuaW1wb3J0IHsgTmJHYWxsZXJ5QWN0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9uYi1nYWxsZXJ5LWFjdGlvbi9uYi1nYWxsZXJ5LWFjdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmJHYWxsZXJ5QXJyb3dzQ29tcG9uZW50IH0gZnJvbSAnLi9uYi1nYWxsZXJ5LWFycm93cy9uYi1nYWxsZXJ5LWFycm93cy5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmJHYWxsZXJ5QnVsbGV0c0NvbXBvbmVudCB9IGZyb20gJy4vbmItZ2FsbGVyeS1idWxsZXRzL25iLWdhbGxlcnktYnVsbGV0cy5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmJHYWxsZXJ5SXRlbUNvbXBvbmVudCB9IGZyb20gJy4vbmItZ2FsbGVyeS1pdGVtL25iLWdhbGxlcnktaXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmJHYWxsZXJ5VmlkZW9Db21wb25lbnQgfSBmcm9tICcuL25iLWdhbGxlcnktdmlkZW8vbmItZ2FsbGVyeS12aWRlby5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmJHYWxsZXJ5SWZyYW1lQ29tcG9uZW50IH0gZnJvbSAnLi9uYi1nYWxsZXJ5LXZpZGVvL25iLWdhbGxlcnktaWZyYW1lLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOYkdhbGxlcnlUYWdDb21wb25lbnQgfSBmcm9tICcuL25iLWdhbGxlcnktdmlkZW8vbmItZ2FsbGVyeS10YWcuY29tcG9uZW50JztcbmltcG9ydCB7IE5iR2FsbGVyeVRodW1ibmFpbHNDb21wb25lbnQgfSBmcm9tICcuL25iLWdhbGxlcnktdGh1bWJuYWlscy9uYi1nYWxsZXJ5LXRodW1ibmFpbHMuY29tcG9uZW50JztcbmltcG9ydCB7IE5iR2FsbGVyeVByZXZpZXdDb21wb25lbnQgfSBmcm9tICcuL25iLWdhbGxlcnktcHJldmlldy9uYi1nYWxsZXJ5LXByZXZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IE5iR2FsbGVyeUNvbXBvbmVudCB9IGZyb20gJy4vbmItZ2FsbGVyeS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRm9udEF3ZXNvbWVNb2R1bGUgfSBmcm9tICdAZm9ydGF3ZXNvbWUvYW5ndWxhci1mb250YXdlc29tZSc7XG5cbmV4cG9ydCAqIGZyb20gJy4vbmItZ2FsbGVyeS5jb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9uYi1nYWxsZXJ5LWFjdGlvbi9uYi1nYWxsZXJ5LWFjdGlvbi5jb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9uYi1nYWxsZXJ5LWl0ZW0vbmItZ2FsbGVyeS1pdGVtLmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL25iLWdhbGxlcnktdmlkZW8vbmItZ2FsbGVyeS12aWRlby5jb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9uYi1nYWxsZXJ5LXZpZGVvL25iLWdhbGxlcnktaWZyYW1lLmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL25iLWdhbGxlcnktdmlkZW8vbmItZ2FsbGVyeS10YWcuY29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vbmItZ2FsbGVyeS10aHVtYm5haWxzL25iLWdhbGxlcnktdGh1bWJuYWlscy5jb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9uYi1nYWxsZXJ5LXByZXZpZXcvbmItZ2FsbGVyeS1wcmV2aWV3LmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL25iLWdhbGxlcnktYXJyb3dzL25iLWdhbGxlcnktYXJyb3dzLmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL25iLWdhbGxlcnktYnVsbGV0cy9uYi1nYWxsZXJ5LWJ1bGxldHMuY29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vbW9kZWxzL25iLWdhbGxlcnktb3B0aW9ucy5tb2RlbCc7XG5leHBvcnQgKiBmcm9tICcuL21vZGVscy9uYi1nYWxsZXJ5LWl0ZW0ubW9kZWwnO1xuZXhwb3J0ICogZnJvbSAnLi9tb2RlbHMvbmItZ2FsbGVyeS1hbmltYXRpb24ubW9kZWwnO1xuZXhwb3J0ICogZnJvbSAnLi9uYi1nYWxsZXJ5LWhlbHBlci5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vbW9kZWxzL25iLWdhbGxlcnktaW1hZ2Utc2l6ZS5tb2RlbCc7XG5leHBvcnQgKiBmcm9tICcuL21vZGVscy9uYi1nYWxsZXJ5LWxheW91dC5tb2RlbCc7XG5leHBvcnQgKiBmcm9tICcuL21vZGVscy9uYi1nYWxsZXJ5LW9yZGVyLm1vZGVsJztcbmV4cG9ydCAqIGZyb20gJy4vbW9kZWxzL25iLWdhbGxlcnktb3JkZXJlZC1pbWFnZS5tb2RlbCc7XG5leHBvcnQgKiBmcm9tICcuL21vZGVscy9uYi1nYWxsZXJ5LWFjdGlvbi5tb2RlbCc7XG5cbmV4cG9ydCBjbGFzcyBDdXN0b21IYW1tZXJDb25maWcgZXh0ZW5kcyBIYW1tZXJHZXN0dXJlQ29uZmlnICB7XG4gICAgb3ZlcnJpZGVzID0gPGFueT57XG4gICAgICAgICdwaW5jaCc6IHsgZW5hYmxlOiBmYWxzZSB9LFxuICAgICAgICAncm90YXRlJzogeyBlbmFibGU6IGZhbHNlIH1cbiAgICB9O1xufVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgICBDb21tb25Nb2R1bGUsXG4gICAgICBGb250QXdlc29tZU1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgIE5iR2FsbGVyeUFjdGlvbkNvbXBvbmVudCxcbiAgICAgIE5iR2FsbGVyeUFycm93c0NvbXBvbmVudCxcbiAgICAgIE5iR2FsbGVyeUJ1bGxldHNDb21wb25lbnQsXG4gICAgICBOYkdhbGxlcnlJdGVtQ29tcG9uZW50LFxuICAgICAgTmJHYWxsZXJ5VGh1bWJuYWlsc0NvbXBvbmVudCxcbiAgICAgIE5iR2FsbGVyeVByZXZpZXdDb21wb25lbnQsXG4gICAgICBOYkdhbGxlcnlDb21wb25lbnQsXG4gICAgICBOYkdhbGxlcnlWaWRlb0NvbXBvbmVudCxcbiAgICAgIE5iR2FsbGVyeUlmcmFtZUNvbXBvbmVudCxcbiAgICAgIE5iR2FsbGVyeVRhZ0NvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgICBOYkdhbGxlcnlDb21wb25lbnRcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgICB7IHByb3ZpZGU6IEhBTU1FUl9HRVNUVVJFX0NPTkZJRywgdXNlQ2xhc3M6IEN1c3RvbUhhbW1lckNvbmZpZyB9XG4gIF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBOYkdhbGxlcnlNb2R1bGUgeyB9XG4iXX0=