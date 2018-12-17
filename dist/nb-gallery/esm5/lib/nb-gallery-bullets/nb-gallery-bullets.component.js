/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, } from '@angular/core';
var NbGalleryBulletsComponent = /** @class */ (function () {
    function NbGalleryBulletsComponent() {
        this.active = 0;
        this.onChange = new EventEmitter();
    }
    /**
     * @return {?}
     */
    NbGalleryBulletsComponent.prototype.getBullets = /**
     * @return {?}
     */
    function () {
        return Array(this.count);
    };
    /**
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    NbGalleryBulletsComponent.prototype.handleChange = /**
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    function (event, index) {
        this.onChange.emit(index);
    };
    NbGalleryBulletsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nb-gallery-bullets',
                    template: "\n        <div class=\"nb-gallery-bullet\" *ngFor=\"let bullet of getBullets(); let i = index;\" (click)=\"handleChange($event, i)\" [ngClass]=\"{ 'nb-gallery-active': i == active }\"></div>\n    ",
                    styles: [":host{position:absolute;z-index:2000;display:inline-flex;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);bottom:0;padding:10px}.nb-gallery-bullet{width:10px;height:10px;border-radius:50%;cursor:pointer;background:#fff}.nb-gallery-bullet:not(:first-child){margin-left:5px}.nb-gallery-bullet.nb-gallery-active,.nb-gallery-bullet:hover{background:#000}"]
                }] }
    ];
    NbGalleryBulletsComponent.propDecorators = {
        count: [{ type: Input }],
        active: [{ type: Input }],
        onChange: [{ type: Output }]
    };
    return NbGalleryBulletsComponent;
}());
export { NbGalleryBulletsComponent };
if (false) {
    /** @type {?} */
    NbGalleryBulletsComponent.prototype.count;
    /** @type {?} */
    NbGalleryBulletsComponent.prototype.active;
    /** @type {?} */
    NbGalleryBulletsComponent.prototype.onChange;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmItZ2FsbGVyeS1idWxsZXRzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25iLWdhbGxlcnkvIiwic291cmNlcyI6WyJsaWIvbmItZ2FsbGVyeS1idWxsZXRzL25iLWdhbGxlcnktYnVsbGV0cy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEdBQUcsTUFBTSxlQUFlLENBQUM7OztzQkFXMUMsQ0FBQzt3QkFFTixJQUFJLFlBQVksRUFBRTs7Ozs7SUFFdkMsOENBQVU7OztJQUFWO1FBQ0ksT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzVCOzs7Ozs7SUFFRCxnREFBWTs7Ozs7SUFBWixVQUFhLEtBQVksRUFBRSxLQUFhO1FBQ3BDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzdCOztnQkFuQkosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFFBQVEsRUFBRSxzTUFFVDs7aUJBRUo7Ozt3QkFFSSxLQUFLO3lCQUNMLEtBQUs7MkJBRUwsTUFBTTs7b0NBYlg7O1NBU2EseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbmItZ2FsbGVyeS1idWxsZXRzJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IGNsYXNzPVwibmItZ2FsbGVyeS1idWxsZXRcIiAqbmdGb3I9XCJsZXQgYnVsbGV0IG9mIGdldEJ1bGxldHMoKTsgbGV0IGkgPSBpbmRleDtcIiAoY2xpY2spPVwiaGFuZGxlQ2hhbmdlKCRldmVudCwgaSlcIiBbbmdDbGFzc109XCJ7ICduYi1nYWxsZXJ5LWFjdGl2ZSc6IGkgPT0gYWN0aXZlIH1cIj48L2Rpdj5cbiAgICBgLFxuICAgIHN0eWxlVXJsczogWycuL25iLWdhbGxlcnktYnVsbGV0cy5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIE5iR2FsbGVyeUJ1bGxldHNDb21wb25lbnQge1xuICAgIEBJbnB1dCgpIGNvdW50OiBudW1iZXI7XG4gICAgQElucHV0KCkgYWN0aXZlOiBudW1iZXIgPSAwO1xuXG4gICAgQE91dHB1dCgpIG9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgZ2V0QnVsbGV0cygpOiBudW1iZXJbXSB7XG4gICAgICAgIHJldHVybiBBcnJheSh0aGlzLmNvdW50KTtcbiAgICB9XG5cbiAgICBoYW5kbGVDaGFuZ2UoZXZlbnQ6IEV2ZW50LCBpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25DaGFuZ2UuZW1pdChpbmRleCk7XG4gICAgfVxufVxuIl19