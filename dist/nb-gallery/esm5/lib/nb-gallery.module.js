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
    return NbGalleryModule;
}());
export { NbGalleryModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmItZ2FsbGVyeS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uYi1nYWxsZXJ5LyIsInNvdXJjZXMiOlsibGliL25iLWdhbGxlcnkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRXZGLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBQzNGLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBQzNGLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBQzlGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3JGLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGdEQUFnRCxDQUFDO0FBQzFGLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLHlEQUF5RCxDQUFDO0FBQ3ZHLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBQzlGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRXJFLG1DQUFjLHdCQUF3QixDQUFDO0FBQ3ZDLHlDQUFjLGlEQUFpRCxDQUFDO0FBQ2hFLHVDQUFjLDZDQUE2QyxDQUFDO0FBQzVELHdDQUFjLCtDQUErQyxDQUFDO0FBQzlELHlDQUFjLGdEQUFnRCxDQUFDO0FBQy9ELHNDQUFjLDZDQUE2QyxDQUFDO0FBQzVELDZDQUFjLHlEQUF5RCxDQUFDO0FBQ3hFLDBDQUFjLG1EQUFtRCxDQUFDO0FBQ2xFLHlDQUFjLGlEQUFpRCxDQUFDO0FBQ2hFLDBDQUFjLG1EQUFtRCxDQUFDO0FBQ2xFLGlDQUFjLG1DQUFtQyxDQUFDO0FBQ2xELDhCQUFjLGdDQUFnQyxDQUFDO0FBQy9DLG1DQUFjLHFDQUFxQyxDQUFDO0FBQ3BELHVDQUFjLDZCQUE2QixDQUFDO0FBQzVDLG1DQUFjLHNDQUFzQyxDQUFDO0FBQ3JELGdDQUFjLGtDQUFrQyxDQUFDO0FBQ2pELCtCQUFjLGlDQUFpQyxDQUFDO0FBQ2hELHNDQUFjLHlDQUF5QyxDQUFDO0FBQ3hELGdDQUFjLGtDQUFrQyxDQUFDO0FBRWpELElBQUE7SUFBd0MsOENBQW1COzs7NENBQ3RDO1lBQ2IsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtZQUMxQixRQUFRLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO1NBQzlCOzs7NkJBeENMO0VBb0N3QyxtQkFBbUIsRUFLMUQsQ0FBQTtBQUxELDhCQUtDOzs7Ozs7Ozs7Z0JBRUEsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDTCxZQUFZO3dCQUNaLGlCQUFpQjtxQkFDcEI7b0JBQ0QsWUFBWSxFQUFFO3dCQUNWLHdCQUF3Qjt3QkFDeEIsd0JBQXdCO3dCQUN4Qix5QkFBeUI7d0JBQ3pCLHNCQUFzQjt3QkFDdEIsNEJBQTRCO3dCQUM1Qix5QkFBeUI7d0JBQ3pCLGtCQUFrQjt3QkFDbEIsdUJBQXVCO3dCQUN2Qix3QkFBd0I7d0JBQ3hCLHFCQUFxQjtxQkFDeEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNMLGtCQUFrQjtxQkFDckI7b0JBQ0QsU0FBUyxFQUFFO3dCQUNQLEVBQUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLFFBQVEsRUFBRSxrQkFBa0IsRUFBRTtxQkFDbkU7aUJBQ0Y7OzBCQWxFRDs7U0FvRWEsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSGFtbWVyR2VzdHVyZUNvbmZpZywgSEFNTUVSX0dFU1RVUkVfQ09ORklHIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmltcG9ydCB7IE5iR2FsbGVyeUFjdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vbmItZ2FsbGVyeS1hY3Rpb24vbmItZ2FsbGVyeS1hY3Rpb24uY29tcG9uZW50JztcbmltcG9ydCB7IE5iR2FsbGVyeUFycm93c0NvbXBvbmVudCB9IGZyb20gJy4vbmItZ2FsbGVyeS1hcnJvd3MvbmItZ2FsbGVyeS1hcnJvd3MuY29tcG9uZW50JztcbmltcG9ydCB7IE5iR2FsbGVyeUJ1bGxldHNDb21wb25lbnQgfSBmcm9tICcuL25iLWdhbGxlcnktYnVsbGV0cy9uYi1nYWxsZXJ5LWJ1bGxldHMuY29tcG9uZW50JztcbmltcG9ydCB7IE5iR2FsbGVyeUl0ZW1Db21wb25lbnQgfSBmcm9tICcuL25iLWdhbGxlcnktaXRlbS9uYi1nYWxsZXJ5LWl0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IE5iR2FsbGVyeVZpZGVvQ29tcG9uZW50IH0gZnJvbSAnLi9uYi1nYWxsZXJ5LXZpZGVvL25iLWdhbGxlcnktdmlkZW8uY29tcG9uZW50JztcbmltcG9ydCB7IE5iR2FsbGVyeUlmcmFtZUNvbXBvbmVudCB9IGZyb20gJy4vbmItZ2FsbGVyeS12aWRlby9uYi1nYWxsZXJ5LWlmcmFtZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmJHYWxsZXJ5VGFnQ29tcG9uZW50IH0gZnJvbSAnLi9uYi1nYWxsZXJ5LXZpZGVvL25iLWdhbGxlcnktdGFnLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOYkdhbGxlcnlUaHVtYm5haWxzQ29tcG9uZW50IH0gZnJvbSAnLi9uYi1nYWxsZXJ5LXRodW1ibmFpbHMvbmItZ2FsbGVyeS10aHVtYm5haWxzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOYkdhbGxlcnlQcmV2aWV3Q29tcG9uZW50IH0gZnJvbSAnLi9uYi1nYWxsZXJ5LXByZXZpZXcvbmItZ2FsbGVyeS1wcmV2aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOYkdhbGxlcnlDb21wb25lbnQgfSBmcm9tICcuL25iLWdhbGxlcnkuY29tcG9uZW50JztcbmltcG9ydCB7IEZvbnRBd2Vzb21lTW9kdWxlIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2FuZ3VsYXItZm9udGF3ZXNvbWUnO1xuXG5leHBvcnQgKiBmcm9tICcuL25iLWdhbGxlcnkuY29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vbmItZ2FsbGVyeS1hY3Rpb24vbmItZ2FsbGVyeS1hY3Rpb24uY29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vbmItZ2FsbGVyeS1pdGVtL25iLWdhbGxlcnktaXRlbS5jb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9uYi1nYWxsZXJ5LXZpZGVvL25iLWdhbGxlcnktdmlkZW8uY29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vbmItZ2FsbGVyeS12aWRlby9uYi1nYWxsZXJ5LWlmcmFtZS5jb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9uYi1nYWxsZXJ5LXZpZGVvL25iLWdhbGxlcnktdGFnLmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL25iLWdhbGxlcnktdGh1bWJuYWlscy9uYi1nYWxsZXJ5LXRodW1ibmFpbHMuY29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vbmItZ2FsbGVyeS1wcmV2aWV3L25iLWdhbGxlcnktcHJldmlldy5jb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9uYi1nYWxsZXJ5LWFycm93cy9uYi1nYWxsZXJ5LWFycm93cy5jb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9uYi1nYWxsZXJ5LWJ1bGxldHMvbmItZ2FsbGVyeS1idWxsZXRzLmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL21vZGVscy9uYi1nYWxsZXJ5LW9wdGlvbnMubW9kZWwnO1xuZXhwb3J0ICogZnJvbSAnLi9tb2RlbHMvbmItZ2FsbGVyeS1pdGVtLm1vZGVsJztcbmV4cG9ydCAqIGZyb20gJy4vbW9kZWxzL25iLWdhbGxlcnktYW5pbWF0aW9uLm1vZGVsJztcbmV4cG9ydCAqIGZyb20gJy4vbmItZ2FsbGVyeS1oZWxwZXIuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL21vZGVscy9uYi1nYWxsZXJ5LWltYWdlLXNpemUubW9kZWwnO1xuZXhwb3J0ICogZnJvbSAnLi9tb2RlbHMvbmItZ2FsbGVyeS1sYXlvdXQubW9kZWwnO1xuZXhwb3J0ICogZnJvbSAnLi9tb2RlbHMvbmItZ2FsbGVyeS1vcmRlci5tb2RlbCc7XG5leHBvcnQgKiBmcm9tICcuL21vZGVscy9uYi1nYWxsZXJ5LW9yZGVyZWQtaW1hZ2UubW9kZWwnO1xuZXhwb3J0ICogZnJvbSAnLi9tb2RlbHMvbmItZ2FsbGVyeS1hY3Rpb24ubW9kZWwnO1xuXG5leHBvcnQgY2xhc3MgQ3VzdG9tSGFtbWVyQ29uZmlnIGV4dGVuZHMgSGFtbWVyR2VzdHVyZUNvbmZpZyAge1xuICAgIG92ZXJyaWRlcyA9IDxhbnk+e1xuICAgICAgICAncGluY2gnOiB7IGVuYWJsZTogZmFsc2UgfSxcbiAgICAgICAgJ3JvdGF0ZSc6IHsgZW5hYmxlOiBmYWxzZSB9XG4gICAgfTtcbn1cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgRm9udEF3ZXNvbWVNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgICBOYkdhbGxlcnlBY3Rpb25Db21wb25lbnQsXG4gICAgICBOYkdhbGxlcnlBcnJvd3NDb21wb25lbnQsXG4gICAgICBOYkdhbGxlcnlCdWxsZXRzQ29tcG9uZW50LFxuICAgICAgTmJHYWxsZXJ5SXRlbUNvbXBvbmVudCxcbiAgICAgIE5iR2FsbGVyeVRodW1ibmFpbHNDb21wb25lbnQsXG4gICAgICBOYkdhbGxlcnlQcmV2aWV3Q29tcG9uZW50LFxuICAgICAgTmJHYWxsZXJ5Q29tcG9uZW50LFxuICAgICAgTmJHYWxsZXJ5VmlkZW9Db21wb25lbnQsXG4gICAgICBOYkdhbGxlcnlJZnJhbWVDb21wb25lbnQsXG4gICAgICBOYkdhbGxlcnlUYWdDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgICAgTmJHYWxsZXJ5Q29tcG9uZW50XG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgICAgeyBwcm92aWRlOiBIQU1NRVJfR0VTVFVSRV9DT05GSUcsIHVzZUNsYXNzOiBDdXN0b21IYW1tZXJDb25maWcgfVxuICBdXG59KVxuXG5leHBvcnQgY2xhc3MgTmJHYWxsZXJ5TW9kdWxlIHsgfVxuIl19