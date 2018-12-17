import { EventEmitter } from '@angular/core';
export declare class NbGalleryBulletsComponent {
    count: number;
    active: number;
    onChange: EventEmitter<{}>;
    getBullets(): number[];
    handleChange(event: Event, index: number): void;
}
