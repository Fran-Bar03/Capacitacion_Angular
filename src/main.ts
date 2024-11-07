import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { appRouterProviders } from './app/app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
bootstrapApplication(AppComponent, 
  {providers: [appRouterProviders, 
    importProvidersFrom(RouterModule, BrowserAnimationsModule)
  ]}
)
  .catch((err) => console.error(err));
