import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { UserModule } from './users/users.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    UserModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
