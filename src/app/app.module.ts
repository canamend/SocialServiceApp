import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { TokenInterceptor } from "./core/interceptors/token.interceptor";
import { TokenService } from "./core/services/token.service";

import { AppComponent } from './app.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ImagenPipe } from './shared/pipes/imagen.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ImagenPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
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
