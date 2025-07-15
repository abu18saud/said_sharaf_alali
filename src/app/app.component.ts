import { Component } from '@angular/core';
import { AppService } from './app.service';
import { TranslateService } from '@ngx-translate/core';
import { _LocalStorageService } from './services/_local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  lang = this.localeStorage.getLanguageCode();
  me: any = {};
  featureds: any[] = [];
  formatDate: any = "dd/MM/yyyy";

  constructor(private appService: AppService,
    private translateService: TranslateService,
    private localeStorage: _LocalStorageService
  ) {
    this.appService.getMe().subscribe(res => {
      this.me = res;
      this.featureds = res.projects.filter((item: any) => item.is_featured === true);
    });
  }

  public switchLanguage(event: any) {
    this.localeStorage.setLanguageCode(event);
    // TODO
    if (this.lang === 'ar') {
      this.translateService.use(event);
      this.lang = event;
    } else {
      this.translateService.use(event);
      this.lang = event;
    }
    window.location.reload();
  }
}