import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

import { AppRoutingModule } from './app.routing.module';

import { HttpClientModule } from '@angular/common/http';// import com dependencias para fazer req http

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';

// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// import { NgbdAlertCloseable } from './../components/NgbdAlertCloseable';
import localePt from '@angular/common/locales/pt';


registerLocaleData(localePt);
@NgModule({
  declarations: [
    AppComponent,
    // NgbdAlertCloseable

  ],
  imports: [
    BrowserModule,
    NgxSliderModule,
    NgbModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    // NgbdAlertCloseable
  ],
  // exports: [NgbdAlertCloseable],
  providers: [{
    provide: LOCALE_ID,//declara o locale_id como provide
    useValue:'pt-BR' // e o valor de linguagem q ele suporta
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
