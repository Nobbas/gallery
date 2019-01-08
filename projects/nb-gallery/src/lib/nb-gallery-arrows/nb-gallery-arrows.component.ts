import { Component, Input, Output, EventEmitter, } from '@angular/core';

@Component({
    selector: 'nb-gallery-arrows',
    template: `
        <div class="nb-gallery-arrow-wrapper nb-gallery-arrow-left">
            <div class="nb-gallery-icon nb-gallery-arrow" aria-hidden="true" (click)="handlePrevClick()" [class.nb-gallery-disabled]="prevDisabled">
                <fa-icon class="nb-gallery-icon-content" [icon]="arrowPrevIcon"></fa-icon>
            </div>
        </div>
        <div class="nb-gallery-arrow-wrapper nb-gallery-arrow-right">
            <div class="nb-gallery-icon nb-gallery-arrow" aria-hidden="true" (click)="handleNextClick()" [class.nb-gallery-disabled]="nextDisabled">
                <fa-icon class="nb-gallery-icon-content" [icon]="arrowNextIcon"></fa-icon>
            </div>
        </div>
    `,
    styleUrls: ['./nb-gallery-arrows.component.scss']
})
export class NbGalleryArrowsComponent {
    @Input() prevDisabled: boolean;
    @Input() nextDisabled: boolean;
    @Input() arrowPrevIcon: string;
    @Input() arrowNextIcon: string;

    @Output() onPrevClick = new EventEmitter();
    @Output() onNextClick = new EventEmitter();

    handlePrevClick(): void {
        this.onPrevClick.emit();
    }

    handleNextClick(): void {
        this.onNextClick.emit();
    }
}
