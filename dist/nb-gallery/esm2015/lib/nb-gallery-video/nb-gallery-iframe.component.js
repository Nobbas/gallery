/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
export class NbGalleryIframeComponent {
    /**
     * @param {?} _sanitizer
     */
    constructor(_sanitizer) {
        this._sanitizer = _sanitizer;
    }
    /**
     * @param {?} shouldPause
     * @return {?}
     */
    set pauseVideo(shouldPause) {
        /** @type {?} */
        const iframe = this.iframe.nativeElement;
        if (shouldPause) {
            /** @type {?} */
            const src = iframe.src;
            iframe.src = src;
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.iframeSrc = this._sanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
}
NbGalleryIframeComponent.decorators = [
    { type: Component, args: [{
                selector: 'nb-gallery-iframe',
                template: `
    <iframe #iframe
            frameborder="0"
            allowfullscreen
            class="nb-gallery-video"
            [src]="iframeSrc">
    </iframe>
        `,
                styles: [".nb-gallery-video{width:100%;height:100%}"]
            }] }
];
/** @nocollapse */
NbGalleryIframeComponent.ctorParameters = () => [
    { type: DomSanitizer }
];
NbGalleryIframeComponent.propDecorators = {
    src: [{ type: Input }],
    pauseVideo: [{ type: Input, args: ['pause',] }],
    iframe: [{ type: ViewChild, args: ['iframe',] }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmItZ2FsbGVyeS1pZnJhbWUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmItZ2FsbGVyeS8iLCJzb3VyY2VzIjpbImxpYi9uYi1nYWxsZXJ5LXZpZGVvL25iLWdhbGxlcnktaWZyYW1lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQXdCLFNBQVMsRUFBRyxVQUFVLEVBQW9DLE1BQU0sZUFBZSxDQUFDO0FBQ2pJLE9BQU8sRUFBRSxZQUFZLEVBQW1CLE1BQU0sMkJBQTJCLENBQUM7QUFjMUUsTUFBTTs7OztJQWVKLFlBQW9CLFVBQXdCO1FBQXhCLGVBQVUsR0FBVixVQUFVLENBQWM7S0FBSzs7Ozs7SUFaL0MsSUFBb0IsVUFBVSxDQUFDLFdBQW9COztRQUMvQyxNQUFNLE1BQU0sR0FBc0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUM7UUFDNUQsSUFBSSxXQUFXLEVBQUU7O1lBQ2YsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQztZQUN2QixNQUFNLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztTQUNsQjtLQUNGOzs7O0lBUUgsUUFBUTtRQUNKLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyw4QkFBOEIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDN0U7OztZQS9CSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsUUFBUSxFQUFFOzs7Ozs7O1NBT0w7O2FBRVI7Ozs7WUFiUSxZQUFZOzs7a0JBZWhCLEtBQUs7eUJBRUwsS0FBSyxTQUFDLE9BQU87cUJBVWIsU0FBUyxTQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgVmlld0NoaWxkLCAgRWxlbWVudFJlZiwgT25Jbml0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbVNhbml0aXplciwgU2FmZVJlc291cmNlVXJsIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbmItZ2FsbGVyeS1pZnJhbWUnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgPGlmcmFtZSAjaWZyYW1lXG4gICAgICAgICAgICBmcmFtZWJvcmRlcj1cIjBcIlxuICAgICAgICAgICAgYWxsb3dmdWxsc2NyZWVuXG4gICAgICAgICAgICBjbGFzcz1cIm5iLWdhbGxlcnktdmlkZW9cIlxuICAgICAgICAgICAgW3NyY109XCJpZnJhbWVTcmNcIj5cbiAgICA8L2lmcmFtZT5cbiAgICAgICAgYCxcbiAgICBzdHlsZVVybHM6IFsnLi9uYi1nYWxsZXJ5LXZpZGVvLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTmJHYWxsZXJ5SWZyYW1lQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKSBzcmM6IHN0cmluZztcblxuICAgIEBJbnB1dCgncGF1c2UnKSBzZXQgcGF1c2VWaWRlbyhzaG91bGRQYXVzZTogYm9vbGVhbikge1xuICAgICAgICBjb25zdCBpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50ID0gdGhpcy5pZnJhbWUubmF0aXZlRWxlbWVudDtcbiAgICAgICAgaWYgKHNob3VsZFBhdXNlKSB7XG4gICAgICAgICAgY29uc3Qgc3JjID0gaWZyYW1lLnNyYztcbiAgICAgICAgICBpZnJhbWUuc3JjID0gc3JjO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICBpZnJhbWVTcmM6IFNhZmVSZXNvdXJjZVVybDtcblxuICAgIEBWaWV3Q2hpbGQoJ2lmcmFtZScpIGlmcmFtZTogRWxlbWVudFJlZjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zYW5pdGl6ZXI6IERvbVNhbml0aXplcikgeyB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5pZnJhbWVTcmMgPSB0aGlzLl9zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKHRoaXMuc3JjKTtcbiAgICB9XG59XG4iXX0=