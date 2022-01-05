import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { TokenInterceptor } from "./core/interceptors/token.interceptor";
import { TokenService } from "./core/services/token.service";

import { AppComponent } from './app.component';
import { AuthGuard } from './core/guards/auth.guard';

//cambiar el locale de la app
import localeEs from '@angular/common/locales/es-MX';
import { registerLocaleData } from '@angular/common';
import { AdminService } from './core/services/admin.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
registerLocaleData( localeEs );

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NoopAnimationsModule 
  ],
  providers: [
    AdminService,
    {
      provide: LOCALE_ID,
      useValue: 'es-MX'
    },
    TokenService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
