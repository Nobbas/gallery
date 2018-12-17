/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, Renderer } from '@angular/core';
var NbGalleryHelperService = /** @class */ (function () {
    function NbGalleryHelperService(renderer) {
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
    NbGalleryHelperService.prototype.manageSwipe = /**
     * @param {?} status
     * @param {?} element
     * @param {?} id
     * @param {?} nextHandler
     * @param {?} prevHandler
     * @return {?}
     */
    function (status, element, id, nextHandler, prevHandler) {
        /** @type {?} */
        var handlers = this.getSwipeHandlers(id);
        // swipeleft and swiperight are available only if hammerjs is included
        try {
            if (status && !handlers) {
                this.swipeHandlers.set(id, [
                    this.renderer.listen(element.nativeElement, 'swipeleft', function () { return nextHandler(); }),
                    this.renderer.listen(element.nativeElement, 'swiperight', function () { return prevHandler(); }),
                    this.renderer.listen(element.nativeElement, 'swipeup', function () { return prevHandler(); }),
                    this.renderer.listen(element.nativeElement, 'swipedown', function () { return prevHandler(); }),
                ]);
            }
            else if (!status && handlers) {
                handlers.map(function (handler) { return handler(); });
                this.removeSwipeHandlers(id);
            }
        }
        catch (e) { }
    };
    /**
     * @param {?} url
     * @return {?}
     */
    NbGalleryHelperService.prototype.validateUrl = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        if (url.replace) {
            return url.replace(new RegExp(' ', 'g'), '%20')
                .replace(new RegExp('\'', 'g'), '%27');
        }
        else {
            return url;
        }
    };
    /**
     * @param {?} image
     * @return {?}
     */
    NbGalleryHelperService.prototype.getBackgroundUrl = /**
     * @param {?} image
     * @return {?}
     */
    function (image) {
        return 'url(\'' + this.validateUrl(image) + '\')';
    };
    /**
     * @param {?} id
     * @return {?}
     */
    NbGalleryHelperService.prototype.getSwipeHandlers = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        return this.swipeHandlers.get(id);
    };
    /**
     * @param {?} id
     * @return {?}
     */
    NbGalleryHelperService.prototype.removeSwipeHandlers = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        this.swipeHandlers.delete(id);
    };
    NbGalleryHelperService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    NbGalleryHelperService.ctorParameters = function () { return [
        { type: Renderer }
    ]; };
    return NbGalleryHelperService;
}());
export { NbGalleryHelperService };
if (false) {
    /** @type {?} */
    NbGalleryHelperService.prototype.swipeHandlers;
    /** @type {?} */
    NbGalleryHelperService.prototype.renderer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmItZ2FsbGVyeS1oZWxwZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25iLWdhbGxlcnkvIiwic291cmNlcyI6WyJsaWIvbmItZ2FsbGVyeS1oZWxwZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBYyxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7O0lBTzdELGdDQUFvQixRQUFrQjtRQUFsQixhQUFRLEdBQVIsUUFBUSxDQUFVOzZCQUZXLElBQUksR0FBRyxFQUFzQjtLQUVwQzs7Ozs7Ozs7O0lBRTFDLDRDQUFXOzs7Ozs7OztJQUFYLFVBQVksTUFBZSxFQUFFLE9BQW1CLEVBQUUsRUFBVSxFQUFFLFdBQXFCLEVBQUUsV0FBcUI7O1FBRXRHLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7UUFHM0MsSUFBSTtZQUNBLElBQUksTUFBTSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNyQixJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUU7b0JBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsV0FBVyxFQUFFLGNBQU0sT0FBQSxXQUFXLEVBQUUsRUFBYixDQUFhLENBQUM7b0JBQzdFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsWUFBWSxFQUFFLGNBQU0sT0FBQSxXQUFXLEVBQUUsRUFBYixDQUFhLENBQUM7b0JBQzlFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsU0FBUyxFQUFFLGNBQU0sT0FBQSxXQUFXLEVBQUUsRUFBYixDQUFhLENBQUM7b0JBQzNFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsV0FBVyxFQUFFLGNBQU0sT0FBQSxXQUFXLEVBQUUsRUFBYixDQUFhLENBQUM7aUJBQ2hGLENBQUMsQ0FBQzthQUNOO2lCQUFNLElBQUksQ0FBQyxNQUFNLElBQUksUUFBUSxFQUFFO2dCQUM1QixRQUFRLENBQUMsR0FBRyxDQUFDLFVBQUMsT0FBTyxJQUFLLE9BQUEsT0FBTyxFQUFFLEVBQVQsQ0FBUyxDQUFDLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUNoQztTQUNKO1FBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRTtLQUNqQjs7Ozs7SUFFRCw0Q0FBVzs7OztJQUFYLFVBQVksR0FBVztRQUNuQixJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUU7WUFDYixPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEtBQUssQ0FBQztpQkFDMUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUM5QzthQUFNO1lBQ0gsT0FBTyxHQUFHLENBQUM7U0FDZDtLQUNKOzs7OztJQUVELGlEQUFnQjs7OztJQUFoQixVQUFpQixLQUFhO1FBQzFCLE9BQU8sUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDO0tBQ3JEOzs7OztJQUVPLGlEQUFnQjs7OztjQUFDLEVBQVU7UUFDL0IsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7Ozs7O0lBRzlCLG9EQUFtQjs7OztjQUFDLEVBQVU7UUFDbEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7OztnQkE3Q3JDLFVBQVU7Ozs7Z0JBRnNCLFFBQVE7O2lDQUF6Qzs7U0FHYSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBFbGVtZW50UmVmLCBSZW5kZXJlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmJHYWxsZXJ5SGVscGVyU2VydmljZSB7XG5cbiAgICBwcml2YXRlIHN3aXBlSGFuZGxlcnM6IE1hcDxzdHJpbmcsIEZ1bmN0aW9uW10+ID0gbmV3IE1hcDxzdHJpbmcsIEZ1bmN0aW9uW10+KCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcikge31cblxuICAgIG1hbmFnZVN3aXBlKHN0YXR1czogYm9vbGVhbiwgZWxlbWVudDogRWxlbWVudFJlZiwgaWQ6IHN0cmluZywgbmV4dEhhbmRsZXI6IEZ1bmN0aW9uLCBwcmV2SGFuZGxlcjogRnVuY3Rpb24pOiB2b2lkIHtcblxuICAgICAgICBjb25zdCBoYW5kbGVycyA9IHRoaXMuZ2V0U3dpcGVIYW5kbGVycyhpZCk7XG5cbiAgICAgICAgLy8gc3dpcGVsZWZ0IGFuZCBzd2lwZXJpZ2h0IGFyZSBhdmFpbGFibGUgb25seSBpZiBoYW1tZXJqcyBpcyBpbmNsdWRlZFxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHN0YXR1cyAmJiAhaGFuZGxlcnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN3aXBlSGFuZGxlcnMuc2V0KGlkLCBbXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKGVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ3N3aXBlbGVmdCcsICgpID0+IG5leHRIYW5kbGVyKCkpLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihlbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdzd2lwZXJpZ2h0JywgKCkgPT4gcHJldkhhbmRsZXIoKSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKGVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ3N3aXBldXAnLCAoKSA9PiBwcmV2SGFuZGxlcigpKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnc3dpcGVkb3duJywgKCkgPT4gcHJldkhhbmRsZXIoKSksXG4gICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFzdGF0dXMgJiYgaGFuZGxlcnMpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVycy5tYXAoKGhhbmRsZXIpID0+IGhhbmRsZXIoKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVTd2lwZUhhbmRsZXJzKGlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICB9XG5cbiAgICB2YWxpZGF0ZVVybCh1cmw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGlmICh1cmwucmVwbGFjZSkge1xuICAgICAgICAgICAgcmV0dXJuIHVybC5yZXBsYWNlKG5ldyBSZWdFeHAoJyAnLCAnZycpLCAnJTIwJylcbiAgICAgICAgICAgICAgICAucmVwbGFjZShuZXcgUmVnRXhwKCdcXCcnLCAnZycpLCAnJTI3Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdXJsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0QmFja2dyb3VuZFVybChpbWFnZTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiAndXJsKFxcJycgKyB0aGlzLnZhbGlkYXRlVXJsKGltYWdlKSArICdcXCcpJztcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFN3aXBlSGFuZGxlcnMoaWQ6IHN0cmluZyk6IEZ1bmN0aW9uW10gfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5zd2lwZUhhbmRsZXJzLmdldChpZCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW1vdmVTd2lwZUhhbmRsZXJzKGlkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zd2lwZUhhbmRsZXJzLmRlbGV0ZShpZCk7XG4gICAgfVxufVxuIl19