import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  lang = 'ar';
  me: any = {};

  constructor(private appService: AppService) {
    this.appService.getMe().subscribe(res => {
      this.me = res;
    })
  }
}