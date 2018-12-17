import { Component, Input, Output, EventEmitter, } from '@angular/core';

@Component({
    selector: 'nb-gallery-bullets',
    template: `
        <div class="nb-gallery-bullet" *ngFor="let bullet of getBullets(); let i = index;" (click)="handleChange($event, i)" [ngClass]="{ 'nb-gallery-active': i == active }"></div>
    `,
    styleUrls: ['./nb-gallery-bullets.component.scss']
})
export class NbGalleryBulletsComponent {
    @Input() count: number;
    @Input() active: number = 0;

    @Output() onChange = new EventEmitter();

    getBullets(): number[] {
        return Array(this.count);
    }

    handleChange(event: Event, index: number): void {
        this.onChange.emit(index);
    }
}
