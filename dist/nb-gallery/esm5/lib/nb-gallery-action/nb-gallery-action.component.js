/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
var NbGalleryActionComponent = /** @class */ (function () {
    function NbGalleryActionComponent() {
        this.disabled = false;
        this.titleText = '';
        this.onClick = new EventEmitter();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    NbGalleryActionComponent.prototype.handleClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.disabled) {
            this.onClick.emit(event);
        }
        event.stopPropagation();
        event.preventDefault();
    };
    NbGalleryActionComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nb-gallery-action',
                    template: "\n        <div class=\"nb-gallery-icon\" [class.nb-gallery-icon-disabled]=\"disabled\"\n            aria-hidden=\"true\"\n            title=\"{{ titleText }}\"\n            (click)=\"handleClick($event)\">\n                <fa-icon class=\"nb-gallery-icon-content\" [icon]=\"icon\"></fa-icon>\n        </div>",
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    NbGalleryActionComponent.propDecorators = {
        icon: [{ type: Input }],
        disabled: [{ type: Input }],
        titleText: [{ type: Input }],
        onClick: [{ type: Output }]
    };
    return NbGalleryActionComponent;
}());
export { NbGalleryActionComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmItZ2FsbGVyeS1hY3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmItZ2FsbGVyeS8iLCJzb3VyY2VzIjpbImxpYi9uYi1nYWxsZXJ5LWFjdGlvbi9uYi1nYWxsZXJ5LWFjdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozt3QkFleEUsS0FBSzt5QkFDSixFQUFFO3VCQUVrQixJQUFJLFlBQVksRUFBRTs7Ozs7O0lBRTNELDhDQUFXOzs7O0lBQVgsVUFBWSxLQUFZO1FBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzVCO1FBRUQsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3hCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUMxQjs7Z0JBekJKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixRQUFRLEVBQUUsc1RBTUM7b0JBQ1gsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2xEOzs7dUJBRUksS0FBSzsyQkFDTCxLQUFLOzRCQUNMLEtBQUs7MEJBRUwsTUFBTTs7bUNBbEJYOztTQWFhLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ25iLWdhbGxlcnktYWN0aW9uJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IGNsYXNzPVwibmItZ2FsbGVyeS1pY29uXCIgW2NsYXNzLm5iLWdhbGxlcnktaWNvbi1kaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICAgICAgICAgICAgdGl0bGU9XCJ7eyB0aXRsZVRleHQgfX1cIlxuICAgICAgICAgICAgKGNsaWNrKT1cImhhbmRsZUNsaWNrKCRldmVudClcIj5cbiAgICAgICAgICAgICAgICA8ZmEtaWNvbiBjbGFzcz1cIm5iLWdhbGxlcnktaWNvbi1jb250ZW50XCIgW2ljb25dPVwiaWNvblwiPjwvZmEtaWNvbj5cbiAgICAgICAgPC9kaXY+YCxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBOYkdhbGxlcnlBY3Rpb25Db21wb25lbnQge1xuICAgIEBJbnB1dCgpIGljb246IHN0cmluZ1tdO1xuICAgIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XG4gICAgQElucHV0KCkgdGl0bGVUZXh0ID0gJyc7XG5cbiAgICBAT3V0cHV0KCkgb25DbGljazogRXZlbnRFbWl0dGVyPEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIGhhbmRsZUNsaWNrKGV2ZW50OiBFdmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMub25DbGljay5lbWl0KGV2ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbn1cbiJdfQ==