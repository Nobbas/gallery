/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
var NbGalleryTagComponent = /** @class */ (function () {
    function NbGalleryTagComponent() {
        /**
         * Stream that emits when an error occurs
         */
        this.error = new EventEmitter();
    }
    Object.defineProperty(NbGalleryTagComponent.prototype, "pauseVideo", {
        set: /**
         * @param {?} shouldPause
         * @return {?}
         */
        function (shouldPause) {
            /** @type {?} */
            var video = this.video.nativeElement;
            if (shouldPause && !video.paused) {
                video.pause();
            }
        },
        enumerable: true,
        configurable: true
    });
    NbGalleryTagComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nb-gallery-tag',
                    template: "\n    <video #video class=\"nb-gallery-video\" controls (error)=\"error.emit($event)\">\n      <source src=\"{{src}}\"/>\n    </video>\n        ",
                    styles: [".nb-gallery-video{width:100%;height:100%}"]
                }] }
    ];
    NbGalleryTagComponent.propDecorators = {
        src: [{ type: Input }],
        pauseVideo: [{ type: Input, args: ['pause',] }],
        error: [{ type: Output }],
        video: [{ type: ViewChild, args: ['video',] }]
    };
    return NbGalleryTagComponent;
}());
export { NbGalleryTagComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmItZ2FsbGVyeS10YWcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmItZ2FsbGVyeS8iLCJzb3VyY2VzIjpbImxpYi9uYi1nYWxsZXJ5LXZpZGVvL25iLWdhbGxlcnktdGFnLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUcsVUFBVSxFQUFvQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7O3FCQXFCN0csSUFBSSxZQUFZLEVBQVM7O0lBUjNDLHNCQUFvQiw2Q0FBVTs7Ozs7UUFBOUIsVUFBK0IsV0FBb0I7O1lBQ2pELElBQU0sS0FBSyxHQUFxQixJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQztZQUN6RCxJQUFJLFdBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7Z0JBQ2hDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNmO1NBQ0Y7OztPQUFBOztnQkFqQkYsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFFBQVEsRUFBRSxrSkFJTDs7aUJBRVI7OztzQkFFSSxLQUFLOzZCQUVQLEtBQUssU0FBQyxPQUFPO3dCQVFiLE1BQU07d0JBRU4sU0FBUyxTQUFDLE9BQU87O2dDQXZCcEI7O1NBVWEscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIFZpZXdDaGlsZCwgIEVsZW1lbnRSZWYsIE9uSW5pdCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ25iLWdhbGxlcnktdGFnJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgIDx2aWRlbyAjdmlkZW8gY2xhc3M9XCJuYi1nYWxsZXJ5LXZpZGVvXCIgY29udHJvbHMgKGVycm9yKT1cImVycm9yLmVtaXQoJGV2ZW50KVwiPlxuICAgICAgPHNvdXJjZSBzcmM9XCJ7e3NyY319XCIvPlxuICAgIDwvdmlkZW8+XG4gICAgICAgIGAsXG4gICAgc3R5bGVVcmxzOiBbJy4vbmItZ2FsbGVyeS12aWRlby5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIE5iR2FsbGVyeVRhZ0NvbXBvbmVudCB7XG4gICAgQElucHV0KCkgc3JjOiBzdHJpbmc7XG5cbiAgQElucHV0KCdwYXVzZScpIHNldCBwYXVzZVZpZGVvKHNob3VsZFBhdXNlOiBib29sZWFuKSB7XG4gICAgY29uc3QgdmlkZW86IEhUTUxWaWRlb0VsZW1lbnQgPSB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQ7XG4gICAgaWYgKHNob3VsZFBhdXNlICYmICF2aWRlby5wYXVzZWQpIHtcbiAgICAgIHZpZGVvLnBhdXNlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFN0cmVhbSB0aGF0IGVtaXRzIHdoZW4gYW4gZXJyb3Igb2NjdXJzICovXG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8RXJyb3I+KCk7XG5cbiAgQFZpZXdDaGlsZCgndmlkZW8nKSB2aWRlbzogRWxlbWVudFJlZjtcbn1cbiJdfQ==