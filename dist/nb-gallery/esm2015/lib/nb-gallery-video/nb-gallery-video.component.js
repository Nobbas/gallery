/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { NbGalleryItem } from '../models/nb-gallery-item.model';
export class NbGalleryVideoComponent {
    constructor() {
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        switch (this.videoItem.source) {
            case 'youtube':
                this.src = "https://www.youtube.com/embed/" + this.videoItem.url;
                break;
            case 'vimeo':
                this.src = "https://player.vimeo.com/video/" + this.videoItem.url;
                break;
            case 'memory':
                this.src = this.videoItem.url;
                break;
        }
    }
}
NbGalleryVideoComponent.decorators = [
    { type: Component, args: [{
                selector: 'nb-gallery-video',
                template: `
    <nb-gallery-iframe
        *ngIf="(videoItem.source === 'youtube' ||videoItem.source === 'vimeo')"
        [pause]="pause" [src]="src">
    </nb-gallery-iframe>
    <nb-gallery-tag *ngIf="videoItem.source === 'memory'" [pause]="pause" [src]="src"></nb-gallery-tag>
        `,
                styles: [".nb-gallery-video{width:100%;height:100%}"]
            }] }
];
/** @nocollapse */
NbGalleryVideoComponent.ctorParameters = () => [];
NbGalleryVideoComponent.propDecorators = {
    videoItem: [{ type: Input }],
    pause: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    NbGalleryVideoComponent.prototype.videoItem;
    /** @type {?} */
    NbGalleryVideoComponent.prototype.pause;
    /** @type {?} */
    NbGalleryVideoComponent.prototype.src;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmItZ2FsbGVyeS12aWRlby5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uYi1nYWxsZXJ5LyIsInNvdXJjZXMiOlsibGliL25iLWdhbGxlcnktdmlkZW8vbmItZ2FsbGVyeS12aWRlby5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFxRixNQUFNLGVBQWUsQ0FBQztBQUVwSSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFjaEUsTUFBTTtJQU1GO0tBRUM7Ozs7SUFFRCxRQUFRO1FBQ0osUUFBUSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUMzQixLQUFLLFNBQVM7Z0JBQ1YsSUFBSSxDQUFDLEdBQUcsR0FBRyxnQ0FBZ0MsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQztnQkFDakUsTUFBTTtZQUNWLEtBQUssT0FBTztnQkFDUixJQUFJLENBQUMsR0FBRyxHQUFHLGlDQUFpQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDO2dCQUNsRSxNQUFNO1lBQ1YsS0FBSyxRQUFRO2dCQUNULElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUM7Z0JBQzlCLE1BQU07U0FDYjtLQUNKOzs7WUFqQ0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLFFBQVEsRUFBRTs7Ozs7O1NBTUw7O2FBRVI7Ozs7O3dCQUVJLEtBQUs7b0JBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsICBFbGVtZW50UmVmLCBPbkluaXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyLCBTYWZlU3R5bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IE5iR2FsbGVyeUl0ZW0gfSBmcm9tICcuLi9tb2RlbHMvbmItZ2FsbGVyeS1pdGVtLm1vZGVsJztcblxuLy9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbmItZ2FsbGVyeS12aWRlbycsXG4gICAgdGVtcGxhdGU6IGBcbiAgICA8bmItZ2FsbGVyeS1pZnJhbWVcbiAgICAgICAgKm5nSWY9XCIodmlkZW9JdGVtLnNvdXJjZSA9PT0gJ3lvdXR1YmUnIHx8dmlkZW9JdGVtLnNvdXJjZSA9PT0gJ3ZpbWVvJylcIlxuICAgICAgICBbcGF1c2VdPVwicGF1c2VcIiBbc3JjXT1cInNyY1wiPlxuICAgIDwvbmItZ2FsbGVyeS1pZnJhbWU+XG4gICAgPG5iLWdhbGxlcnktdGFnICpuZ0lmPVwidmlkZW9JdGVtLnNvdXJjZSA9PT0gJ21lbW9yeSdcIiBbcGF1c2VdPVwicGF1c2VcIiBbc3JjXT1cInNyY1wiPjwvbmItZ2FsbGVyeS10YWc+XG4gICAgICAgIGAsXG4gICAgc3R5bGVVcmxzOiBbJy4vbmItZ2FsbGVyeS12aWRlby5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIE5iR2FsbGVyeVZpZGVvQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKSB2aWRlb0l0ZW06IE5iR2FsbGVyeUl0ZW07XG4gICAgQElucHV0KCkgcGF1c2U6IEJvb2xlYW47XG5cbiAgICBzcmM6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy52aWRlb0l0ZW0uc291cmNlKSB7XG4gICAgICAgICAgICBjYXNlICd5b3V0dWJlJzpcbiAgICAgICAgICAgICAgICB0aGlzLnNyYyA9IFwiaHR0cHM6Ly93d3cueW91dHViZS5jb20vZW1iZWQvXCIgKyB0aGlzLnZpZGVvSXRlbS51cmw7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd2aW1lbyc6XG4gICAgICAgICAgICAgICAgdGhpcy5zcmMgPSBcImh0dHBzOi8vcGxheWVyLnZpbWVvLmNvbS92aWRlby9cIiArIHRoaXMudmlkZW9JdGVtLnVybDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ21lbW9yeSc6XG4gICAgICAgICAgICAgICAgdGhpcy5zcmMgPSB0aGlzLnZpZGVvSXRlbS51cmw7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuIl19