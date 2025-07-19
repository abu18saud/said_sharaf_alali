import { CUSTOM_ELEMENTS_SCHEMA, DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CurrencyPipe, DatePipe, DecimalPipe, registerLocaleData } from '@angular/common';
import { MediaGalleryComponent } from '../components/media-gallery/media-gallery.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { MediaSearchPipe } from './pipes/media-search.pipe';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { StatisticsComponent } from '../components/statistics/statistics.component';

// Arabic locale imports
import localeAr from '@angular/common/locales/ar';
import localeArSA from '@angular/common/locales/ar-SA';
import { AchievementsSearchPipe } from './pipes/achievements-search.pipe';
import { AchievementDialogComponent } from '../components/achievement-dialog/achievement-dialog.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// Register Arabic locales
registerLocaleData(localeAr, 'ar');
registerLocaleData(localeArSA, 'ar-SA');

@NgModule({
  declarations: [
    AppComponent,
    MediaGalleryComponent,
    SafeUrlPipe,
    MediaSearchPipe,
    NotFoundComponent,
    StatisticsComponent,
    AchievementsSearchPipe,
    AchievementDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      defaultLanguage: (localStorage.getItem('currentLanguage') !== null) ? localStorage.getItem('currentLanguage')! : 'ar'!,
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    DatePipe,
    DatePipe,
    CurrencyPipe,
    DecimalPipe,
    {
      provide: LOCALE_ID,
      useValue: (localStorage.getItem('currentLanguage') !== null) ? localStorage.getItem('currentLanguage') : 'ar',
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'SAR'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
