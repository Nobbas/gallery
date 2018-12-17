/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
var NbGalleryIframeComponent = /** @class */ (function () {
    function NbGalleryIframeComponent(_sanitizer) {
        this._sanitizer = _sanitizer;
    }
    Object.defineProperty(NbGalleryIframeComponent.prototype, "pauseVideo", {
        set: /**
         * @param {?} shouldPause
         * @return {?}
         */
        function (shouldPause) {
            /** @type {?} */
            var iframe = this.iframe.nativeElement;
            if (shouldPause) {
                /** @type {?} */
                var src = iframe.src;
                iframe.src = src;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NbGalleryIframeComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.iframeSrc = this._sanitizer.bypassSecurityTrustResourceUrl(this.src);
    };
    NbGalleryIframeComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nb-gallery-iframe',
                    template: "\n    <iframe #iframe\n            frameborder=\"0\"\n            allowfullscreen\n            class=\"nb-gallery-video\"\n            [src]=\"iframeSrc\">\n    </iframe>\n        ",
                    styles: [".nb-gallery-video{width:100%;height:100%}"]
                }] }
    ];
    /** @nocollapse */
    NbGalleryIframeComponent.ctorParameters = function () { return [
        { type: DomSanitizer }
    ]; };
    NbGalleryIframeComponent.propDecorators = {
        src: [{ type: Input }],
        pauseVideo: [{ type: Input, args: ['pause',] }],
        iframe: [{ type: ViewChild, args: ['iframe',] }]
    };
    return NbGalleryIframeComponent;
}());
export { NbGalleryIframeComponent };
if (false) {
    /** @type {?} */
    NbGalleryIframeComponent.prototype.src;
    /** @type {?} */
    NbGalleryIframeComponent.prototype.iframeSrc;
    /** @type {?} */
    NbGalleryIframeComponent.prototype.iframe;
    /** @type {?} */
    NbGalleryIframeComponent.prototype._sanitizer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmItZ2FsbGVyeS1pZnJhbWUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmItZ2FsbGVyeS8iLCJzb3VyY2VzIjpbImxpYi9uYi1nYWxsZXJ5LXZpZGVvL25iLWdhbGxlcnktaWZyYW1lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQXdCLFNBQVMsRUFBRyxVQUFVLEVBQW9DLE1BQU0sZUFBZSxDQUFDO0FBQ2pJLE9BQU8sRUFBRSxZQUFZLEVBQW1CLE1BQU0sMkJBQTJCLENBQUM7O0lBNkJ4RSxrQ0FBb0IsVUFBd0I7UUFBeEIsZUFBVSxHQUFWLFVBQVUsQ0FBYztLQUFLO0lBWi9DLHNCQUFvQixnREFBVTs7Ozs7UUFBOUIsVUFBK0IsV0FBb0I7O1lBQy9DLElBQU0sTUFBTSxHQUFzQixJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQztZQUM1RCxJQUFJLFdBQVcsRUFBRTs7Z0JBQ2YsSUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQztnQkFDdkIsTUFBTSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7YUFDbEI7U0FDRjs7O09BQUE7Ozs7SUFRSCwyQ0FBUTs7O0lBQVI7UUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsOEJBQThCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQzdFOztnQkEvQkosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLFFBQVEsRUFBRSxzTEFPTDs7aUJBRVI7Ozs7Z0JBYlEsWUFBWTs7O3NCQWVoQixLQUFLOzZCQUVMLEtBQUssU0FBQyxPQUFPO3lCQVViLFNBQVMsU0FBQyxRQUFROzttQ0E1QnZCOztTQWVhLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBWaWV3Q2hpbGQsICBFbGVtZW50UmVmLCBPbkluaXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyLCBTYWZlUmVzb3VyY2VVcmwgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduYi1nYWxsZXJ5LWlmcmFtZScsXG4gICAgdGVtcGxhdGU6IGBcbiAgICA8aWZyYW1lICNpZnJhbWVcbiAgICAgICAgICAgIGZyYW1lYm9yZGVyPVwiMFwiXG4gICAgICAgICAgICBhbGxvd2Z1bGxzY3JlZW5cbiAgICAgICAgICAgIGNsYXNzPVwibmItZ2FsbGVyeS12aWRlb1wiXG4gICAgICAgICAgICBbc3JjXT1cImlmcmFtZVNyY1wiPlxuICAgIDwvaWZyYW1lPlxuICAgICAgICBgLFxuICAgIHN0eWxlVXJsczogWycuL25iLWdhbGxlcnktdmlkZW8uY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBOYkdhbGxlcnlJZnJhbWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgpIHNyYzogc3RyaW5nO1xuXG4gICAgQElucHV0KCdwYXVzZScpIHNldCBwYXVzZVZpZGVvKHNob3VsZFBhdXNlOiBib29sZWFuKSB7XG4gICAgICAgIGNvbnN0IGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQgPSB0aGlzLmlmcmFtZS5uYXRpdmVFbGVtZW50O1xuICAgICAgICBpZiAoc2hvdWxkUGF1c2UpIHtcbiAgICAgICAgICBjb25zdCBzcmMgPSBpZnJhbWUuc3JjO1xuICAgICAgICAgIGlmcmFtZS5zcmMgPSBzcmM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgIGlmcmFtZVNyYzogU2FmZVJlc291cmNlVXJsO1xuXG4gICAgQFZpZXdDaGlsZCgnaWZyYW1lJykgaWZyYW1lOiBFbGVtZW50UmVmO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3Nhbml0aXplcjogRG9tU2FuaXRpemVyKSB7IH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmlmcmFtZVNyYyA9IHRoaXMuX3Nhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwodGhpcy5zcmMpO1xuICAgIH1cbn1cbiJdfQ==