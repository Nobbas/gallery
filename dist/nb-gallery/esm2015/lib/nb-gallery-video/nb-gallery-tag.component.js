/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
export class NbGalleryTagComponent {
    constructor() {
        /**
         * Stream that emits when an error occurs
         */
        this.error = new EventEmitter();
    }
    /**
     * @param {?} shouldPause
     * @return {?}
     */
    set pauseVideo(shouldPause) {
        /** @type {?} */
        const video = this.video.nativeElement;
        if (shouldPause && !video.paused) {
            video.pause();
        }
    }
}
NbGalleryTagComponent.decorators = [
    { type: Component, args: [{
                selector: 'nb-gallery-tag',
                template: `
    <video #video class="nb-gallery-video" controls (error)="error.emit($event)">
      <source src="{{src}}"/>
    </video>
        `,
                styles: [".nb-gallery-video{width:100%;height:100%}"]
            }] }
];
NbGalleryTagComponent.propDecorators = {
    src: [{ type: Input }],
    pauseVideo: [{ type: Input, args: ['pause',] }],
    error: [{ type: Output }],
    video: [{ type: ViewChild, args: ['video',] }]
};
if (false) {
    /** @type {?} */
    NbGalleryTagComponent.prototype.src;
    /**
     * Stream that emits when an error occurs
     * @type {?}
     */
    NbGalleryTagComponent.prototype.error;
    /** @type {?} */
    NbGalleryTagComponent.prototype.video;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmItZ2FsbGVyeS10YWcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmItZ2FsbGVyeS8iLCJzb3VyY2VzIjpbImxpYi9uYi1nYWxsZXJ5LXZpZGVvL25iLWdhbGxlcnktdGFnLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUcsVUFBVSxFQUFvQyxNQUFNLGVBQWUsQ0FBQztBQVVqSSxNQUFNOzs7OztxQkFXYyxJQUFJLFlBQVksRUFBUzs7Ozs7O0lBUjNDLElBQW9CLFVBQVUsQ0FBQyxXQUFvQjs7UUFDakQsTUFBTSxLQUFLLEdBQXFCLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDO1FBQ3pELElBQUksV0FBVyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNoQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDZjtLQUNGOzs7WUFqQkYsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLFFBQVEsRUFBRTs7OztTQUlMOzthQUVSOzs7a0JBRUksS0FBSzt5QkFFUCxLQUFLLFNBQUMsT0FBTztvQkFRYixNQUFNO29CQUVOLFNBQVMsU0FBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIFZpZXdDaGlsZCwgIEVsZW1lbnRSZWYsIE9uSW5pdCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ25iLWdhbGxlcnktdGFnJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgIDx2aWRlbyAjdmlkZW8gY2xhc3M9XCJuYi1nYWxsZXJ5LXZpZGVvXCIgY29udHJvbHMgKGVycm9yKT1cImVycm9yLmVtaXQoJGV2ZW50KVwiPlxuICAgICAgPHNvdXJjZSBzcmM9XCJ7e3NyY319XCIvPlxuICAgIDwvdmlkZW8+XG4gICAgICAgIGAsXG4gICAgc3R5bGVVcmxzOiBbJy4vbmItZ2FsbGVyeS12aWRlby5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIE5iR2FsbGVyeVRhZ0NvbXBvbmVudCB7XG4gICAgQElucHV0KCkgc3JjOiBzdHJpbmc7XG5cbiAgQElucHV0KCdwYXVzZScpIHNldCBwYXVzZVZpZGVvKHNob3VsZFBhdXNlOiBib29sZWFuKSB7XG4gICAgY29uc3QgdmlkZW86IEhUTUxWaWRlb0VsZW1lbnQgPSB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQ7XG4gICAgaWYgKHNob3VsZFBhdXNlICYmICF2aWRlby5wYXVzZWQpIHtcbiAgICAgIHZpZGVvLnBhdXNlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFN0cmVhbSB0aGF0IGVtaXRzIHdoZW4gYW4gZXJyb3Igb2NjdXJzICovXG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8RXJyb3I+KCk7XG5cbiAgQFZpZXdDaGlsZCgndmlkZW8nKSB2aWRlbzogRWxlbWVudFJlZjtcbn1cbiJdfQ==