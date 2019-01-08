import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'nb-gallery-action',
    template: `
        <div class="nb-gallery-icon" [class.nb-gallery-icon-disabled]="disabled"
            aria-hidden="true"
            title="{{ titleText }}"
            (click)="handleClick($event)">
                <fa-icon class="nb-gallery-icon-content" [icon]="icon"></fa-icon>
        </div>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NbGalleryActionComponent {
    @Input() icon: string[];
    @Input() disabled = false;
    @Input() titleText = '';

    @Output() onClick: EventEmitter<Event> = new EventEmitter();

    handleClick(event: Event) {
        if (!this.disabled) {
            this.onClick.emit(event);
        }

        event.stopPropagation();
        event.preventDefault();
    }
}
