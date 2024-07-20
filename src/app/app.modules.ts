import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes'; // Adjust the path as needed
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { provideHttpClient,  withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
   
    FormsModule

  ],
  providers: [
    provideHttpClient( withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
