import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
bootstrapApplication(AppComponent,{
  providers: [
    provideHttpClient(),provideRouter(routes), provideAnimationsAsync(), provideAnimationsAsync() // Include this line to provide HttpClient
  ]
})
  .catch((err) => console.error(err));
