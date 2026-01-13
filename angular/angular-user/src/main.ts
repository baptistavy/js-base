import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component'; // or whatever your root component is
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));