import { Component } from '@angular/core';
import { AppService } from './app.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  lang = 'ar';
  me: any = {};
  featureds: any[] = [];

  constructor(private appService: AppService,
    private translateService: TranslateService
  ) {
    this.appService.getMe().subscribe(res => {
      this.me = res;
      this.featureds = res.projects.filter((item: any) => item.is_featured === true);
    });
  }

  public switchLanguage(event: any) {
    // TODO
    if (this.lang === 'ar') {
      this.translateService.use(event);
      this.lang = event;
    } else {
      this.translateService.use(event);
      this.lang = event;
    }
  }
}