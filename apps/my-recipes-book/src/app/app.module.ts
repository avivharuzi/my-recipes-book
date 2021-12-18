import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SharedDataAccessAuthModule } from '@my-recipes-book/shared/data-access-auth';
import {
  FirebaseAppModule,
  FirebaseAuthModule,
  FirebaseFirestoreModule,
} from '@my-recipes-book/shared/util-firebase';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FirebaseAppModule.forRoot(environment.firebaseConfig),
    FirebaseFirestoreModule.forRoot(),
    FirebaseAuthModule.forRoot(),
    SharedDataAccessAuthModule.forRoot({
      loggedInRedirectTo: '/',
      loggedOutRedirectTo: '/auth/login',
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
