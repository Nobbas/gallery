/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
export class NbGalleryActionComponent {
    constructor() {
        this.disabled = false;
        this.titleText = '';
        this.onClick = new EventEmitter();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleClick(event) {
        if (!this.disabled) {
            this.onClick.emit(event);
        }
        event.stopPropagation();
        event.preventDefault();
    }
}
NbGalleryActionComponent.decorators = [
    { type: Component, args: [{
                selector: 'nb-gallery-action',
                template: `
        <div class="nb-gallery-icon" [class.nb-gallery-icon-disabled]="disabled"
            aria-hidden="true"
            title="{{ titleText }}"
            (click)="handleClick($event)">
                <i class="nb-gallery-icon-content {{ icon }}"></i>
        </div>`,
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
NbGalleryActionComponent.propDecorators = {
    icon: [{ type: Input }],
    disabled: [{ type: Input }],
    titleText: [{ type: Input }],
    onClick: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    NbGalleryActionComponent.prototype.icon;
    /** @type {?} */
    NbGalleryActionComponent.prototype.disabled;
    /** @type {?} */
    NbGalleryActionComponent.prototype.titleText;
    /** @type {?} */
    NbGalleryActionComponent.prototype.onClick;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmItZ2FsbGVyeS1hY3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmItZ2FsbGVyeS8iLCJzb3VyY2VzIjpbImxpYi9uYi1nYWxsZXJ5LWFjdGlvbi9uYi1nYWxsZXJ5LWFjdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFhaEcsTUFBTTs7d0JBRWtCLEtBQUs7eUJBQ0osRUFBRTt1QkFFa0IsSUFBSSxZQUFZLEVBQUU7Ozs7OztJQUUzRCxXQUFXLENBQUMsS0FBWTtRQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM1QjtRQUVELEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN4QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7S0FDMUI7OztZQXpCSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsUUFBUSxFQUFFOzs7Ozs7ZUFNQztnQkFDWCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNsRDs7O21CQUVJLEtBQUs7dUJBQ0wsS0FBSzt3QkFDTCxLQUFLO3NCQUVMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduYi1nYWxsZXJ5LWFjdGlvbicsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cIm5iLWdhbGxlcnktaWNvblwiIFtjbGFzcy5uYi1nYWxsZXJ5LWljb24tZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgICAgICAgICAgIHRpdGxlPVwie3sgdGl0bGVUZXh0IH19XCJcbiAgICAgICAgICAgIChjbGljayk9XCJoYW5kbGVDbGljaygkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJuYi1nYWxsZXJ5LWljb24tY29udGVudCB7eyBpY29uIH19XCI+PC9pPlxuICAgICAgICA8L2Rpdj5gLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE5iR2FsbGVyeUFjdGlvbkNvbXBvbmVudCB7XG4gICAgQElucHV0KCkgaWNvbjogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XG4gICAgQElucHV0KCkgdGl0bGVUZXh0ID0gJyc7XG5cbiAgICBAT3V0cHV0KCkgb25DbGljazogRXZlbnRFbWl0dGVyPEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIGhhbmRsZUNsaWNrKGV2ZW50OiBFdmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMub25DbGljay5lbWl0KGV2ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbn1cbiJdfQ==