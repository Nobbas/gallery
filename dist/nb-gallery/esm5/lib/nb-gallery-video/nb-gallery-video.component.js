/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { NbGalleryItem } from '../models/nb-gallery-item.model';
var NbGalleryVideoComponent = /** @class */ (function () {
    function NbGalleryVideoComponent() {
    }
    /**
     * @return {?}
     */
    NbGalleryVideoComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        switch (this.videoItem.source) {
            case 'youtube':
                this.src = "https://www.youtube.com/embed/" + this.videoItem.url;
                break;
            case 'vimeo':
                this.src = "https://player.vimeo.com/video/" + this.videoItem.url;
                break;
            case 'memory':
                this.src = this.videoItem.url;
                break;
        }
    };
    NbGalleryVideoComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nb-gallery-video',
                    template: "\n    <nb-gallery-iframe\n        *ngIf=\"(videoItem.source === 'youtube' ||videoItem.source === 'vimeo')\"\n        [pause]=\"pause\" [src]=\"src\">\n    </nb-gallery-iframe>\n    <nb-gallery-tag *ngIf=\"videoItem.source === 'memory'\" [pause]=\"pause\" [src]=\"src\"></nb-gallery-tag>\n        ",
                    styles: [".nb-gallery-video{width:100%;height:100%}"]
                }] }
    ];
    /** @nocollapse */
    NbGalleryVideoComponent.ctorParameters = function () { return []; };
    NbGalleryVideoComponent.propDecorators = {
        videoItem: [{ type: Input }],
        pause: [{ type: Input }]
    };
    return NbGalleryVideoComponent;
}());
export { NbGalleryVideoComponent };
if (false) {
    /** @type {?} */
    NbGalleryVideoComponent.prototype.videoItem;
    /** @type {?} */
    NbGalleryVideoComponent.prototype.pause;
    /** @type {?} */
    NbGalleryVideoComponent.prototype.src;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmItZ2FsbGVyeS12aWRlby5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uYi1nYWxsZXJ5LyIsInNvdXJjZXMiOlsibGliL25iLWdhbGxlcnktdmlkZW8vbmItZ2FsbGVyeS12aWRlby5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFxRixNQUFNLGVBQWUsQ0FBQztBQUVwSSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUNBQWlDLENBQUM7O0lBb0I1RDtLQUVDOzs7O0lBRUQsMENBQVE7OztJQUFSO1FBQ0ksUUFBUSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUMzQixLQUFLLFNBQVM7Z0JBQ1YsSUFBSSxDQUFDLEdBQUcsR0FBRyxnQ0FBZ0MsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQztnQkFDakUsTUFBTTtZQUNWLEtBQUssT0FBTztnQkFDUixJQUFJLENBQUMsR0FBRyxHQUFHLGlDQUFpQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDO2dCQUNsRSxNQUFNO1lBQ1YsS0FBSyxRQUFRO2dCQUNULElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUM7Z0JBQzlCLE1BQU07U0FDYjtLQUNKOztnQkFqQ0osU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLFFBQVEsRUFBRSwwU0FNTDs7aUJBRVI7Ozs7OzRCQUVJLEtBQUs7d0JBQ0wsS0FBSzs7a0NBbEJWOztTQWdCYSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCAgRWxlbWVudFJlZiwgT25Jbml0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbVNhbml0aXplciwgU2FmZVN0eWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBOYkdhbGxlcnlJdGVtIH0gZnJvbSAnLi4vbW9kZWxzL25iLWdhbGxlcnktaXRlbS5tb2RlbCc7XG5cbi8vXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ25iLWdhbGxlcnktdmlkZW8nLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgPG5iLWdhbGxlcnktaWZyYW1lXG4gICAgICAgICpuZ0lmPVwiKHZpZGVvSXRlbS5zb3VyY2UgPT09ICd5b3V0dWJlJyB8fHZpZGVvSXRlbS5zb3VyY2UgPT09ICd2aW1lbycpXCJcbiAgICAgICAgW3BhdXNlXT1cInBhdXNlXCIgW3NyY109XCJzcmNcIj5cbiAgICA8L25iLWdhbGxlcnktaWZyYW1lPlxuICAgIDxuYi1nYWxsZXJ5LXRhZyAqbmdJZj1cInZpZGVvSXRlbS5zb3VyY2UgPT09ICdtZW1vcnknXCIgW3BhdXNlXT1cInBhdXNlXCIgW3NyY109XCJzcmNcIj48L25iLWdhbGxlcnktdGFnPlxuICAgICAgICBgLFxuICAgIHN0eWxlVXJsczogWycuL25iLWdhbGxlcnktdmlkZW8uY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBOYkdhbGxlcnlWaWRlb0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQElucHV0KCkgdmlkZW9JdGVtOiBOYkdhbGxlcnlJdGVtO1xuICAgIEBJbnB1dCgpIHBhdXNlOiBCb29sZWFuO1xuXG4gICAgc3JjOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMudmlkZW9JdGVtLnNvdXJjZSkge1xuICAgICAgICAgICAgY2FzZSAneW91dHViZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5zcmMgPSBcImh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2VtYmVkL1wiICsgdGhpcy52aWRlb0l0ZW0udXJsO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAndmltZW8nOlxuICAgICAgICAgICAgICAgIHRoaXMuc3JjID0gXCJodHRwczovL3BsYXllci52aW1lby5jb20vdmlkZW8vXCIgKyB0aGlzLnZpZGVvSXRlbS51cmw7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdtZW1vcnknOlxuICAgICAgICAgICAgICAgIHRoaXMuc3JjID0gdGhpcy52aWRlb0l0ZW0udXJsO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbiJdfQ==