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
                    template: "\n        <div class=\"nb-gallery-icon\" [class.nb-gallery-icon-disabled]=\"disabled\"\n            aria-hidden=\"true\"\n            title=\"{{ titleText }}\"\n            (click)=\"handleClick($event)\">\n                <i class=\"nb-gallery-icon-content {{ icon }}\"></i>\n        </div>",
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmItZ2FsbGVyeS1hY3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmItZ2FsbGVyeS8iLCJzb3VyY2VzIjpbImxpYi9uYi1nYWxsZXJ5LWFjdGlvbi9uYi1nYWxsZXJ5LWFjdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozt3QkFleEUsS0FBSzt5QkFDSixFQUFFO3VCQUVrQixJQUFJLFlBQVksRUFBRTs7Ozs7O0lBRTNELDhDQUFXOzs7O0lBQVgsVUFBWSxLQUFZO1FBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzVCO1FBRUQsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3hCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUMxQjs7Z0JBekJKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixRQUFRLEVBQUUscVNBTUM7b0JBQ1gsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2xEOzs7dUJBRUksS0FBSzsyQkFDTCxLQUFLOzRCQUNMLEtBQUs7MEJBRUwsTUFBTTs7bUNBbEJYOztTQWFhLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ25iLWdhbGxlcnktYWN0aW9uJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IGNsYXNzPVwibmItZ2FsbGVyeS1pY29uXCIgW2NsYXNzLm5iLWdhbGxlcnktaWNvbi1kaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICAgICAgICAgICAgdGl0bGU9XCJ7eyB0aXRsZVRleHQgfX1cIlxuICAgICAgICAgICAgKGNsaWNrKT1cImhhbmRsZUNsaWNrKCRldmVudClcIj5cbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cIm5iLWdhbGxlcnktaWNvbi1jb250ZW50IHt7IGljb24gfX1cIj48L2k+XG4gICAgICAgIDwvZGl2PmAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTmJHYWxsZXJ5QWN0aW9uQ29tcG9uZW50IHtcbiAgICBASW5wdXQoKSBpY29uOiBzdHJpbmc7XG4gICAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcbiAgICBASW5wdXQoKSB0aXRsZVRleHQgPSAnJztcblxuICAgIEBPdXRwdXQoKSBvbkNsaWNrOiBFdmVudEVtaXR0ZXI8RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgaGFuZGxlQ2xpY2soZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5vbkNsaWNrLmVtaXQoZXZlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxufVxuIl19