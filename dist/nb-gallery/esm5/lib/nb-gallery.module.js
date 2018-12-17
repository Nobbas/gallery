/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var CustomHammerConfig = /** @class */ (function (_super) {
    tslib_1.__extends(CustomHammerConfig, _super);
    function CustomHammerConfig() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.overrides = /** @type {?} */ ({
            'pinch': { enable: false },
            'rotate': { enable: false }
        });
        return _this;
    }
    return CustomHammerConfig;
}(HammerGestureConfig));
export { CustomHammerConfig };
if (false) {
    /** @type {?} */
    CustomHammerConfig.prototype.overrides;
}
var NbGalleryModule = /** @class */ (function () {
    function NbGalleryModule() {
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
    return NbGalleryModule;
}());
export { NbGalleryModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmItZ2FsbGVyeS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uYi1nYWxsZXJ5LyIsInNvdXJjZXMiOlsibGliL25iLWdhbGxlcnkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRXZGLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBQzNGLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBQzNGLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBQzlGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3JGLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGdEQUFnRCxDQUFDO0FBQzFGLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLHlEQUF5RCxDQUFDO0FBQ3ZHLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBQzlGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRTVELG1DQUFjLHdCQUF3QixDQUFDO0FBQ3ZDLHlDQUFjLGlEQUFpRCxDQUFDO0FBQ2hFLHVDQUFjLDZDQUE2QyxDQUFDO0FBQzVELHdDQUFjLCtDQUErQyxDQUFDO0FBQzlELHlDQUFjLGdEQUFnRCxDQUFDO0FBQy9ELHNDQUFjLDZDQUE2QyxDQUFDO0FBQzVELDZDQUFjLHlEQUF5RCxDQUFDO0FBQ3hFLDBDQUFjLG1EQUFtRCxDQUFDO0FBQ2xFLHlDQUFjLGlEQUFpRCxDQUFDO0FBQ2hFLDBDQUFjLG1EQUFtRCxDQUFDO0FBQ2xFLGlDQUFjLG1DQUFtQyxDQUFDO0FBQ2xELDhCQUFjLGdDQUFnQyxDQUFDO0FBQy9DLG1DQUFjLHFDQUFxQyxDQUFDO0FBQ3BELHVDQUFjLDZCQUE2QixDQUFDO0FBQzVDLG1DQUFjLHNDQUFzQyxDQUFDO0FBQ3JELGdDQUFjLGtDQUFrQyxDQUFDO0FBQ2pELCtCQUFjLGlDQUFpQyxDQUFDO0FBQ2hELHNDQUFjLHlDQUF5QyxDQUFDO0FBQ3hELGdDQUFjLGtDQUFrQyxDQUFDO0FBRWpELElBQUE7SUFBd0MsOENBQW1COzs7NENBQ3RDO1lBQ2IsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtZQUMxQixRQUFRLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO1NBQzlCOzs7NkJBdkNMO0VBbUN3QyxtQkFBbUIsRUFLMUQsQ0FBQTtBQUxELDhCQUtDOzs7Ozs7Ozs7Z0JBRUEsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDTCxZQUFZO3FCQUNmO29CQUNELFlBQVksRUFBRTt3QkFDVix3QkFBd0I7d0JBQ3hCLHdCQUF3Qjt3QkFDeEIseUJBQXlCO3dCQUN6QixzQkFBc0I7d0JBQ3RCLDRCQUE0Qjt3QkFDNUIseUJBQXlCO3dCQUN6QixrQkFBa0I7d0JBQ2xCLHVCQUF1Qjt3QkFDdkIsd0JBQXdCO3dCQUN4QixxQkFBcUI7cUJBQ3hCO29CQUNELE9BQU8sRUFBRTt3QkFDTCxrQkFBa0I7cUJBQ3JCO29CQUNELFNBQVMsRUFBRTt3QkFDUCxFQUFFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxRQUFRLEVBQUUsa0JBQWtCLEVBQUU7cUJBQ25FO2lCQUNGOzswQkFoRUQ7O1NBa0VhLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEhhbW1lckdlc3R1cmVDb25maWcsIEhBTU1FUl9HRVNUVVJFX0NPTkZJRyB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5pbXBvcnQgeyBOYkdhbGxlcnlBY3Rpb25Db21wb25lbnQgfSBmcm9tICcuL25iLWdhbGxlcnktYWN0aW9uL25iLWdhbGxlcnktYWN0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOYkdhbGxlcnlBcnJvd3NDb21wb25lbnQgfSBmcm9tICcuL25iLWdhbGxlcnktYXJyb3dzL25iLWdhbGxlcnktYXJyb3dzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOYkdhbGxlcnlCdWxsZXRzQ29tcG9uZW50IH0gZnJvbSAnLi9uYi1nYWxsZXJ5LWJ1bGxldHMvbmItZ2FsbGVyeS1idWxsZXRzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOYkdhbGxlcnlJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9uYi1nYWxsZXJ5LWl0ZW0vbmItZ2FsbGVyeS1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOYkdhbGxlcnlWaWRlb0NvbXBvbmVudCB9IGZyb20gJy4vbmItZ2FsbGVyeS12aWRlby9uYi1nYWxsZXJ5LXZpZGVvLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOYkdhbGxlcnlJZnJhbWVDb21wb25lbnQgfSBmcm9tICcuL25iLWdhbGxlcnktdmlkZW8vbmItZ2FsbGVyeS1pZnJhbWUuY29tcG9uZW50JztcbmltcG9ydCB7IE5iR2FsbGVyeVRhZ0NvbXBvbmVudCB9IGZyb20gJy4vbmItZ2FsbGVyeS12aWRlby9uYi1nYWxsZXJ5LXRhZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmJHYWxsZXJ5VGh1bWJuYWlsc0NvbXBvbmVudCB9IGZyb20gJy4vbmItZ2FsbGVyeS10aHVtYm5haWxzL25iLWdhbGxlcnktdGh1bWJuYWlscy5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmJHYWxsZXJ5UHJldmlld0NvbXBvbmVudCB9IGZyb20gJy4vbmItZ2FsbGVyeS1wcmV2aWV3L25iLWdhbGxlcnktcHJldmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmJHYWxsZXJ5Q29tcG9uZW50IH0gZnJvbSAnLi9uYi1nYWxsZXJ5LmNvbXBvbmVudCc7XG5cbmV4cG9ydCAqIGZyb20gJy4vbmItZ2FsbGVyeS5jb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9uYi1nYWxsZXJ5LWFjdGlvbi9uYi1nYWxsZXJ5LWFjdGlvbi5jb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9uYi1nYWxsZXJ5LWl0ZW0vbmItZ2FsbGVyeS1pdGVtLmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL25iLWdhbGxlcnktdmlkZW8vbmItZ2FsbGVyeS12aWRlby5jb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9uYi1nYWxsZXJ5LXZpZGVvL25iLWdhbGxlcnktaWZyYW1lLmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL25iLWdhbGxlcnktdmlkZW8vbmItZ2FsbGVyeS10YWcuY29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vbmItZ2FsbGVyeS10aHVtYm5haWxzL25iLWdhbGxlcnktdGh1bWJuYWlscy5jb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9uYi1nYWxsZXJ5LXByZXZpZXcvbmItZ2FsbGVyeS1wcmV2aWV3LmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL25iLWdhbGxlcnktYXJyb3dzL25iLWdhbGxlcnktYXJyb3dzLmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL25iLWdhbGxlcnktYnVsbGV0cy9uYi1nYWxsZXJ5LWJ1bGxldHMuY29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vbW9kZWxzL25iLWdhbGxlcnktb3B0aW9ucy5tb2RlbCc7XG5leHBvcnQgKiBmcm9tICcuL21vZGVscy9uYi1nYWxsZXJ5LWl0ZW0ubW9kZWwnO1xuZXhwb3J0ICogZnJvbSAnLi9tb2RlbHMvbmItZ2FsbGVyeS1hbmltYXRpb24ubW9kZWwnO1xuZXhwb3J0ICogZnJvbSAnLi9uYi1nYWxsZXJ5LWhlbHBlci5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vbW9kZWxzL25iLWdhbGxlcnktaW1hZ2Utc2l6ZS5tb2RlbCc7XG5leHBvcnQgKiBmcm9tICcuL21vZGVscy9uYi1nYWxsZXJ5LWxheW91dC5tb2RlbCc7XG5leHBvcnQgKiBmcm9tICcuL21vZGVscy9uYi1nYWxsZXJ5LW9yZGVyLm1vZGVsJztcbmV4cG9ydCAqIGZyb20gJy4vbW9kZWxzL25iLWdhbGxlcnktb3JkZXJlZC1pbWFnZS5tb2RlbCc7XG5leHBvcnQgKiBmcm9tICcuL21vZGVscy9uYi1nYWxsZXJ5LWFjdGlvbi5tb2RlbCc7XG5cbmV4cG9ydCBjbGFzcyBDdXN0b21IYW1tZXJDb25maWcgZXh0ZW5kcyBIYW1tZXJHZXN0dXJlQ29uZmlnICB7XG4gICAgb3ZlcnJpZGVzID0gPGFueT57XG4gICAgICAgICdwaW5jaCc6IHsgZW5hYmxlOiBmYWxzZSB9LFxuICAgICAgICAncm90YXRlJzogeyBlbmFibGU6IGZhbHNlIH1cbiAgICB9O1xufVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgICBOYkdhbGxlcnlBY3Rpb25Db21wb25lbnQsXG4gICAgICBOYkdhbGxlcnlBcnJvd3NDb21wb25lbnQsXG4gICAgICBOYkdhbGxlcnlCdWxsZXRzQ29tcG9uZW50LFxuICAgICAgTmJHYWxsZXJ5SXRlbUNvbXBvbmVudCxcbiAgICAgIE5iR2FsbGVyeVRodW1ibmFpbHNDb21wb25lbnQsXG4gICAgICBOYkdhbGxlcnlQcmV2aWV3Q29tcG9uZW50LFxuICAgICAgTmJHYWxsZXJ5Q29tcG9uZW50LFxuICAgICAgTmJHYWxsZXJ5VmlkZW9Db21wb25lbnQsXG4gICAgICBOYkdhbGxlcnlJZnJhbWVDb21wb25lbnQsXG4gICAgICBOYkdhbGxlcnlUYWdDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgICAgTmJHYWxsZXJ5Q29tcG9uZW50XG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgICAgeyBwcm92aWRlOiBIQU1NRVJfR0VTVFVSRV9DT05GSUcsIHVzZUNsYXNzOiBDdXN0b21IYW1tZXJDb25maWcgfVxuICBdXG59KVxuXG5leHBvcnQgY2xhc3MgTmJHYWxsZXJ5TW9kdWxlIHsgfVxuIl19