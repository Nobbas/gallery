import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NbGalleryComponent } from './nb-gallery.component';

describe('NbGalleryComponent', () => {
  let component: NbGalleryComponent;
  let fixture: ComponentFixture<NbGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NbGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NbGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
