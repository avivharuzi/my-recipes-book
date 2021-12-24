import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';

import { SharedDataAccessAuthModule } from '@my-recipes-book/shared/data-access-auth';
import {
  FirebaseAppModule,
  FirebaseAuthModule,
  FirebaseFirestoreModule,
  FirebaseStorageModule,
} from '@my-recipes-book/shared/util-firebase';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    FirebaseAppModule.forRoot(environment.firebaseConfig),
    FirebaseFirestoreModule.forRoot(),
    FirebaseAuthModule.forRoot(),
    FirebaseStorageModule.forRoot(),
    SharedDataAccessAuthModule.forRoot({
      loggedInRedirectTo: '/',
      loggedOutRedirectTo: '/auth/login',
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
