/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, } from '@angular/core';
export class NbGalleryArrowsComponent {
    constructor() {
        this.onPrevClick = new EventEmitter();
        this.onNextClick = new EventEmitter();
    }
    /**
     * @return {?}
     */
    handlePrevClick() {
        this.onPrevClick.emit();
    }
    /**
     * @return {?}
     */
    handleNextClick() {
        this.onNextClick.emit();
    }
}
NbGalleryArrowsComponent.decorators = [
    { type: Component, args: [{
                selector: 'nb-gallery-arrows',
                template: `
        <div class="nb-gallery-arrow-wrapper nb-gallery-arrow-left">
            <div class="nb-gallery-icon nb-gallery-arrow" aria-hidden="true" (click)="handlePrevClick()" [class.nb-gallery-disabled]="prevDisabled">
                <fa-icon class="nb-gallery-icon-content" [icon]="arrowPrevIcon"></fa-icon>
            </div>
        </div>
        <div class="nb-gallery-arrow-wrapper nb-gallery-arrow-right">
            <div class="nb-gallery-icon nb-gallery-arrow" aria-hidden="true" (click)="handleNextClick()" [class.nb-gallery-disabled]="nextDisabled">
                <fa-icon class="nb-gallery-icon-content" [icon]="arrowNextIcon"></fa-icon>
            </div>
        </div>
    `,
                styles: [".nb-gallery-arrow-wrapper{position:absolute;height:100%;width:1px;display:table;z-index:2000;table-layout:fixed}.nb-gallery-arrow-left{left:0}.nb-gallery-arrow-right{right:0}.nb-gallery-arrow{top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);cursor:pointer}.nb-gallery-arrow.nb-gallery-disabled{opacity:.6;cursor:default}.nb-gallery-arrow-left .nb-gallery-arrow{left:10px}.nb-gallery-arrow-right .nb-gallery-arrow{right:10px}"]
            }] }
];
NbGalleryArrowsComponent.propDecorators = {
    prevDisabled: [{ type: Input }],
    nextDisabled: [{ type: Input }],
    arrowPrevIcon: [{ type: Input }],
    arrowNextIcon: [{ type: Input }],
    onPrevClick: [{ type: Output }],
    onNextClick: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    NbGalleryArrowsComponent.prototype.prevDisabled;
    /** @type {?} */
    NbGalleryArrowsComponent.prototype.nextDisabled;
    /** @type {?} */
    NbGalleryArrowsComponent.prototype.arrowPrevIcon;
    /** @type {?} */
    NbGalleryArrowsComponent.prototype.arrowNextIcon;
    /** @type {?} */
    NbGalleryArrowsComponent.prototype.onPrevClick;
    /** @type {?} */
    NbGalleryArrowsComponent.prototype.onNextClick;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmItZ2FsbGVyeS1hcnJvd3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmItZ2FsbGVyeS8iLCJzb3VyY2VzIjpbImxpYi9uYi1nYWxsZXJ5LWFycm93cy9uYi1nYWxsZXJ5LWFycm93cy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEdBQUcsTUFBTSxlQUFlLENBQUM7QUFrQnhFLE1BQU07OzJCQU1zQixJQUFJLFlBQVksRUFBRTsyQkFDbEIsSUFBSSxZQUFZLEVBQUU7Ozs7O0lBRTFDLGVBQWU7UUFDWCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO0tBQzNCOzs7O0lBRUQsZUFBZTtRQUNYLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDM0I7OztZQS9CSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsUUFBUSxFQUFFOzs7Ozs7Ozs7OztLQVdUOzthQUVKOzs7MkJBRUksS0FBSzsyQkFDTCxLQUFLOzRCQUNMLEtBQUs7NEJBQ0wsS0FBSzswQkFFTCxNQUFNOzBCQUNOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduYi1nYWxsZXJ5LWFycm93cycsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cIm5iLWdhbGxlcnktYXJyb3ctd3JhcHBlciBuYi1nYWxsZXJ5LWFycm93LWxlZnRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuYi1nYWxsZXJ5LWljb24gbmItZ2FsbGVyeS1hcnJvd1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIChjbGljayk9XCJoYW5kbGVQcmV2Q2xpY2soKVwiIFtjbGFzcy5uYi1nYWxsZXJ5LWRpc2FibGVkXT1cInByZXZEaXNhYmxlZFwiPlxuICAgICAgICAgICAgICAgIDxmYS1pY29uIGNsYXNzPVwibmItZ2FsbGVyeS1pY29uLWNvbnRlbnRcIiBbaWNvbl09XCJhcnJvd1ByZXZJY29uXCI+PC9mYS1pY29uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwibmItZ2FsbGVyeS1hcnJvdy13cmFwcGVyIG5iLWdhbGxlcnktYXJyb3ctcmlnaHRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuYi1nYWxsZXJ5LWljb24gbmItZ2FsbGVyeS1hcnJvd1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIChjbGljayk9XCJoYW5kbGVOZXh0Q2xpY2soKVwiIFtjbGFzcy5uYi1nYWxsZXJ5LWRpc2FibGVkXT1cIm5leHREaXNhYmxlZFwiPlxuICAgICAgICAgICAgICAgIDxmYS1pY29uIGNsYXNzPVwibmItZ2FsbGVyeS1pY29uLWNvbnRlbnRcIiBbaWNvbl09XCJhcnJvd05leHRJY29uXCI+PC9mYS1pY29uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgc3R5bGVVcmxzOiBbJy4vbmItZ2FsbGVyeS1hcnJvd3MuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBOYkdhbGxlcnlBcnJvd3NDb21wb25lbnQge1xuICAgIEBJbnB1dCgpIHByZXZEaXNhYmxlZDogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBuZXh0RGlzYWJsZWQ6IGJvb2xlYW47XG4gICAgQElucHV0KCkgYXJyb3dQcmV2SWNvbjogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGFycm93TmV4dEljb246IHN0cmluZztcblxuICAgIEBPdXRwdXQoKSBvblByZXZDbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgb25OZXh0Q2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBoYW5kbGVQcmV2Q2xpY2soKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25QcmV2Q2xpY2suZW1pdCgpO1xuICAgIH1cblxuICAgIGhhbmRsZU5leHRDbGljaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbk5leHRDbGljay5lbWl0KCk7XG4gICAgfVxufVxuIl19