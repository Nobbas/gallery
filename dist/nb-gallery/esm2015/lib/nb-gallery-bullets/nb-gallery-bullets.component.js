/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, } from '@angular/core';
export class NbGalleryBulletsComponent {
    constructor() {
        this.active = 0;
        this.onChange = new EventEmitter();
    }
    /**
     * @return {?}
     */
    getBullets() {
        return Array(this.count);
    }
    /**
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    handleChange(event, index) {
        this.onChange.emit(index);
    }
}
NbGalleryBulletsComponent.decorators = [
    { type: Component, args: [{
                selector: 'nb-gallery-bullets',
                template: `
        <div class="nb-gallery-bullet" *ngFor="let bullet of getBullets(); let i = index;" (click)="handleChange($event, i)" [ngClass]="{ 'nb-gallery-active': i == active }"></div>
    `,
                styles: [":host{position:absolute;z-index:2000;display:inline-flex;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);bottom:0;padding:10px}.nb-gallery-bullet{width:10px;height:10px;border-radius:50%;cursor:pointer;background:#fff}.nb-gallery-bullet:not(:first-child){margin-left:5px}.nb-gallery-bullet.nb-gallery-active,.nb-gallery-bullet:hover{background:#000}"]
            }] }
];
NbGalleryBulletsComponent.propDecorators = {
    count: [{ type: Input }],
    active: [{ type: Input }],
    onChange: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    NbGalleryBulletsComponent.prototype.count;
    /** @type {?} */
    NbGalleryBulletsComponent.prototype.active;
    /** @type {?} */
    NbGalleryBulletsComponent.prototype.onChange;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmItZ2FsbGVyeS1idWxsZXRzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25iLWdhbGxlcnkvIiwic291cmNlcyI6WyJsaWIvbmItZ2FsbGVyeS1idWxsZXRzL25iLWdhbGxlcnktYnVsbGV0cy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEdBQUcsTUFBTSxlQUFlLENBQUM7QUFTeEUsTUFBTTs7c0JBRXdCLENBQUM7d0JBRU4sSUFBSSxZQUFZLEVBQUU7Ozs7O0lBRXZDLFVBQVU7UUFDTixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDNUI7Ozs7OztJQUVELFlBQVksQ0FBQyxLQUFZLEVBQUUsS0FBYTtRQUNwQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUM3Qjs7O1lBbkJKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixRQUFRLEVBQUU7O0tBRVQ7O2FBRUo7OztvQkFFSSxLQUFLO3FCQUNMLEtBQUs7dUJBRUwsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ25iLWdhbGxlcnktYnVsbGV0cycsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cIm5iLWdhbGxlcnktYnVsbGV0XCIgKm5nRm9yPVwibGV0IGJ1bGxldCBvZiBnZXRCdWxsZXRzKCk7IGxldCBpID0gaW5kZXg7XCIgKGNsaWNrKT1cImhhbmRsZUNoYW5nZSgkZXZlbnQsIGkpXCIgW25nQ2xhc3NdPVwieyAnbmItZ2FsbGVyeS1hY3RpdmUnOiBpID09IGFjdGl2ZSB9XCI+PC9kaXY+XG4gICAgYCxcbiAgICBzdHlsZVVybHM6IFsnLi9uYi1nYWxsZXJ5LWJ1bGxldHMuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBOYkdhbGxlcnlCdWxsZXRzQ29tcG9uZW50IHtcbiAgICBASW5wdXQoKSBjb3VudDogbnVtYmVyO1xuICAgIEBJbnB1dCgpIGFjdGl2ZTogbnVtYmVyID0gMDtcblxuICAgIEBPdXRwdXQoKSBvbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIGdldEJ1bGxldHMoKTogbnVtYmVyW10ge1xuICAgICAgICByZXR1cm4gQXJyYXkodGhpcy5jb3VudCk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2hhbmdlKGV2ZW50OiBFdmVudCwgaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlLmVtaXQoaW5kZXgpO1xuICAgIH1cbn1cbiJdfQ==