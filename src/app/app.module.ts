import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {NbGalleryModule} from 'nb-gallery';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NbGalleryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
