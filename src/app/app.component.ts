import { Component } from '@angular/core';
import { AppService } from './app.service';
import { TranslateService } from '@ngx-translate/core';
import { _LocalStorageService } from './services/_local-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { AchievementDialogComponent } from 'src/components/achievement-dialog/achievement-dialog.component';
import { TelegramBotService } from './services/telegram-bot.service';
import { SnackBarService } from './services/snack-bar.service';
import { _PrintService } from './services/_print.service';

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
  loadingPage: boolean = true;

  constructor(private appService: AppService,
    private translateService: TranslateService,
    private localeStorage: _LocalStorageService,
    private telegramBotService: TelegramBotService,
    private snackBarService: SnackBarService,
    private printService: _PrintService,
    public dialog: MatDialog,
  ) {
    this._loadingPage();
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

  _loadingPage() {
    this.loadingPage = true;
    setTimeout(() => {
      this.loadingPage = false;
    }, 3000);
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
      width: '895.99px',
    });
  }

  sendMessage(name: string, email: string, subject: string, message: string) {
    this.telegramBotService.sendMessage({
      chat_id: '5399930171',
      text: subject + '\n' + message + '\n' + name + '\n' + email,
      parse_mode: 'Markdown'
    }).subscribe(res => {
      this.snackBarService.success('تم الإرسال',);
    })
  }

  printCv() {
    this.printService.printCv(this.me);
  }
}