import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {NbGalleryModule} from 'nb-gallery';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowCircleLeft,
  faArrowCircleRight,
  faArrowCircleDown,
  faTimesCircle,
  faArrowsAlt,
  faSearchMinus,
  faSearchPlus,
  faUndo,
  faRedo
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NbGalleryModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(faArrowCircleLeft, faArrowCircleRight, faArrowCircleDown);
    library.add(faTimesCircle);
    library.add(faSearchMinus, faSearchPlus);
    library.add(faArrowsAlt);
    library.add(faUndo);
    library.add(faRedo);
  }
}
