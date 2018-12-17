import { EventEmitter } from '@angular/core';
export declare class NbGalleryArrowsComponent {
    prevDisabled: boolean;
    nextDisabled: boolean;
    arrowPrevIcon: string;
    arrowNextIcon: string;
    onPrevClick: EventEmitter<{}>;
    onNextClick: EventEmitter<{}>;
    handlePrevClick(): void;
    handleNextClick(): void;
}
