import {} from 'jasmine';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NbGalleryArrowsComponent } from '../nb-gallery-arrows.component';

describe('NbGalleryArrowsComponent', () => {
    let fixture: ComponentFixture<NbGalleryArrowsComponent>;
    let comp: NbGalleryArrowsComponent;
    let el;
    let prevArrow, nextArrow, prevArrowContent, nextArrowContent;

    beforeEach(() => {
        TestBed.configureTestingModule({
          declarations: [ NbGalleryArrowsComponent ],
        })
        .overrideComponent(NbGalleryArrowsComponent, {
            set: {
                styleUrls: [],
            }
        })

        fixture = TestBed.createComponent(NbGalleryArrowsComponent);
        comp = fixture.componentInstance;
        fixture.detectChanges();
        el = fixture.debugElement.nativeElement;
        prevArrow = el.querySelector('.nb-gallery-arrow-left .nb-gallery-arrow');
        nextArrow = el.querySelector('.nb-gallery-arrow-right .nb-gallery-arrow');
        prevArrowContent = prevArrow.querySelector('.nb-gallery-icon-content');
        nextArrowContent = nextArrow.querySelector('.nb-gallery-icon-content');
    });

    it('should emit event onPrevClick after click on prev arrow', (done) => {
        comp.onPrevClick.subscribe(() => done());
        prevArrow.click();
    });

    it('should emit event onNextClick after click on next arrow', (done) => {
        comp.onNextClick.subscribe(() => done());
        nextArrow.click();
    });

    it('should disable prev arrow if prevDisabled is true', () => {
        comp.prevDisabled = true;
        fixture.detectChanges();
        expect(prevArrow.classList.contains('nb-gallery-disabled')).toBeTruthy();
    });

    it('should disable next arrow if nextDisabled is true', () => {
        comp.nextDisabled = true;
        fixture.detectChanges();
        expect(nextArrow.classList.contains('nb-gallery-disabled')).toBeTruthy();
    });

    it('should set custom class', () => {
        comp.arrowPrevIcon = 'my-prev-icon';
        comp.arrowNextIcon = 'my-next-icon';
        fixture.detectChanges();

        expect(prevArrowContent.getAttribute('class'))
            .toEqual('nb-gallery-icon-content my-prev-icon');
        expect(nextArrowContent.getAttribute('class'))
            .toEqual('nb-gallery-icon-content my-next-icon');
    });
})
