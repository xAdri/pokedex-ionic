import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  timeOutline,
  listOutline,
  restaurantOutline,
  heartOutline,
  personOutline
} from 'ionicons/icons';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

addIcons({
  'arrow-back-outline': arrowBackOutline,
  'time-outline': timeOutline,
  'list-outline': listOutline,
  'restaurant-outline': restaurantOutline,
  'heart-outline': heartOutline,
  'person-outline': personOutline
});

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});
