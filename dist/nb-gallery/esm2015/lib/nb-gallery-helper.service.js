/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, Renderer } from '@angular/core';
export class NbGalleryHelperService {
    /**
     * @param {?} renderer
     */
    constructor(renderer) {
        this.renderer = renderer;
        this.swipeHandlers = new Map();
    }
    /**
     * @param {?} status
     * @param {?} element
     * @param {?} id
     * @param {?} nextHandler
     * @param {?} prevHandler
     * @return {?}
     */
    manageSwipe(status, element, id, nextHandler, prevHandler) {
        /** @type {?} */
        const handlers = this.getSwipeHandlers(id);
        // swipeleft and swiperight are available only if hammerjs is included
        try {
            if (status && !handlers) {
                this.swipeHandlers.set(id, [
                    this.renderer.listen(element.nativeElement, 'swipeleft', () => nextHandler()),
                    this.renderer.listen(element.nativeElement, 'swiperight', () => prevHandler()),
                    this.renderer.listen(element.nativeElement, 'swipeup', () => prevHandler()),
                    this.renderer.listen(element.nativeElement, 'swipedown', () => prevHandler()),
                ]);
            }
            else if (!status && handlers) {
                handlers.map((handler) => handler());
                this.removeSwipeHandlers(id);
            }
        }
        catch (e) { }
    }
    /**
     * @param {?} url
     * @return {?}
     */
    validateUrl(url) {
        if (url.replace) {
            return url.replace(new RegExp(' ', 'g'), '%20')
                .replace(new RegExp('\'', 'g'), '%27');
        }
        else {
            return url;
        }
    }
    /**
     * @param {?} image
     * @return {?}
     */
    getBackgroundUrl(image) {
        return 'url(\'' + this.validateUrl(image) + '\')';
    }
    /**
     * @param {?} id
     * @return {?}
     */
    getSwipeHandlers(id) {
        return this.swipeHandlers.get(id);
    }
    /**
     * @param {?} id
     * @return {?}
     */
    removeSwipeHandlers(id) {
        this.swipeHandlers.delete(id);
    }
}
NbGalleryHelperService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
NbGalleryHelperService.ctorParameters = () => [
    { type: Renderer }
];
if (false) {
    /** @type {?} */
    NbGalleryHelperService.prototype.swipeHandlers;
    /** @type {?} */
    NbGalleryHelperService.prototype.renderer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmItZ2FsbGVyeS1oZWxwZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25iLWdhbGxlcnkvIiwic291cmNlcyI6WyJsaWIvbmItZ2FsbGVyeS1oZWxwZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBYyxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHakUsTUFBTTs7OztJQUlGLFlBQW9CLFFBQWtCO1FBQWxCLGFBQVEsR0FBUixRQUFRLENBQVU7NkJBRlcsSUFBSSxHQUFHLEVBQXNCO0tBRXBDOzs7Ozs7Ozs7SUFFMUMsV0FBVyxDQUFDLE1BQWUsRUFBRSxPQUFtQixFQUFFLEVBQVUsRUFBRSxXQUFxQixFQUFFLFdBQXFCOztRQUV0RyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLENBQUM7O1FBRzNDLElBQUk7WUFDQSxJQUFJLE1BQU0sSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDckIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFO29CQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQkFDN0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxZQUFZLEVBQUUsR0FBRyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7b0JBQzlFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUMzRSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztpQkFDaEYsQ0FBQyxDQUFDO2FBQ047aUJBQU0sSUFBSSxDQUFDLE1BQU0sSUFBSSxRQUFRLEVBQUU7Z0JBQzVCLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUNoQztTQUNKO1FBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRTtLQUNqQjs7Ozs7SUFFRCxXQUFXLENBQUMsR0FBVztRQUNuQixJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUU7WUFDYixPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEtBQUssQ0FBQztpQkFDMUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUM5QzthQUFNO1lBQ0gsT0FBTyxHQUFHLENBQUM7U0FDZDtLQUNKOzs7OztJQUVELGdCQUFnQixDQUFDLEtBQWE7UUFDMUIsT0FBTyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUM7S0FDckQ7Ozs7O0lBRU8sZ0JBQWdCLENBQUMsRUFBVTtRQUMvQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDOzs7Ozs7SUFHOUIsbUJBQW1CLENBQUMsRUFBVTtRQUNsQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQzs7OztZQTdDckMsVUFBVTs7OztZQUZzQixRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgRWxlbWVudFJlZiwgUmVuZGVyZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5iR2FsbGVyeUhlbHBlclNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSBzd2lwZUhhbmRsZXJzOiBNYXA8c3RyaW5nLCBGdW5jdGlvbltdPiA9IG5ldyBNYXA8c3RyaW5nLCBGdW5jdGlvbltdPigpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIpIHt9XG5cbiAgICBtYW5hZ2VTd2lwZShzdGF0dXM6IGJvb2xlYW4sIGVsZW1lbnQ6IEVsZW1lbnRSZWYsIGlkOiBzdHJpbmcsIG5leHRIYW5kbGVyOiBGdW5jdGlvbiwgcHJldkhhbmRsZXI6IEZ1bmN0aW9uKTogdm9pZCB7XG5cbiAgICAgICAgY29uc3QgaGFuZGxlcnMgPSB0aGlzLmdldFN3aXBlSGFuZGxlcnMoaWQpO1xuXG4gICAgICAgIC8vIHN3aXBlbGVmdCBhbmQgc3dpcGVyaWdodCBhcmUgYXZhaWxhYmxlIG9ubHkgaWYgaGFtbWVyanMgaXMgaW5jbHVkZWRcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChzdGF0dXMgJiYgIWhhbmRsZXJzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zd2lwZUhhbmRsZXJzLnNldChpZCwgW1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihlbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdzd2lwZWxlZnQnLCAoKSA9PiBuZXh0SGFuZGxlcigpKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnc3dpcGVyaWdodCcsICgpID0+IHByZXZIYW5kbGVyKCkpLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihlbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdzd2lwZXVwJywgKCkgPT4gcHJldkhhbmRsZXIoKSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKGVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ3N3aXBlZG93bicsICgpID0+IHByZXZIYW5kbGVyKCkpLFxuICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghc3RhdHVzICYmIGhhbmRsZXJzKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlcnMubWFwKChoYW5kbGVyKSA9PiBoYW5kbGVyKCkpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlU3dpcGVIYW5kbGVycyhpZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgfVxuXG4gICAgdmFsaWRhdGVVcmwodXJsOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBpZiAodXJsLnJlcGxhY2UpIHtcbiAgICAgICAgICAgIHJldHVybiB1cmwucmVwbGFjZShuZXcgUmVnRXhwKCcgJywgJ2cnKSwgJyUyMCcpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UobmV3IFJlZ0V4cCgnXFwnJywgJ2cnKSwgJyUyNycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHVybDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEJhY2tncm91bmRVcmwoaW1hZ2U6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gJ3VybChcXCcnICsgdGhpcy52YWxpZGF0ZVVybChpbWFnZSkgKyAnXFwnKSc7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRTd2lwZUhhbmRsZXJzKGlkOiBzdHJpbmcpOiBGdW5jdGlvbltdIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3dpcGVIYW5kbGVycy5nZXQoaWQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVtb3ZlU3dpcGVIYW5kbGVycyhpZDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3dpcGVIYW5kbGVycy5kZWxldGUoaWQpO1xuICAgIH1cbn1cbiJdfQ==