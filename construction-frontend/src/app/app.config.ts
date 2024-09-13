import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideClientHydration} from "@angular/platform-browser";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {AuthInterceptor} from "./core/interceptors/auth.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptors([AuthInterceptor])),
    provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync(),]
};
