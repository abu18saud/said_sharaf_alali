import { Component } from '@angular/core';
import { AppService } from './app.service';
import { TranslateService } from '@ngx-translate/core';
import { _LocalStorageService } from './services/_local-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { AchievementDialogComponent } from 'src/components/achievement-dialog/achievement-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  lang = this.localeStorage.getLanguageCode() ? this.localeStorage.getLanguageCode() : 'ar';
  me: any = {};
  featureds: any[] = [];
  formatDate: any = "dd/MM/yyyy";
  activeFilter = 'ALL';
  _loading: boolean = false;

  constructor(private appService: AppService,
    private translateService: TranslateService,
    private localeStorage: _LocalStorageService,
    public dialog: MatDialog,
  ) {
    this.appService.getMe().subscribe(res => {
      this.me = res;
      this.featureds = res.projects.filter((item: any) => item.is_featured === true);
    });
  }


  filteredItems() {
    if (this.activeFilter === 'ALL') {
      return this.me.achievements.sort((a: any, b: any) => {
        return new Date(b.dated).getTime() - new Date(a.dated).getTime();
      });
    }

    return this.me.achievements
      .filter((item: any) => item.category === this.activeFilter)
      .sort((a: any, b: any) => {
        return new Date(b.dated).getTime() - new Date(a.dated).getTime();
      });
  }

  loading() {
    this._loading = true;
    setTimeout(() => {
      this._loading = false;
    }, 500);
  }

  public switchLanguage(event: any = 'ar') {
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

  openAchievementDialog(item: any) {
    this.dialog.open(AchievementDialogComponent, {
      data: item,
      //disableClose: true,
    });
  }
}