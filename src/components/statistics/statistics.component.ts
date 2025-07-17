import { Component, Input } from '@angular/core';
import { GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent {
  @Input('me') me: any = {};
  @Input('formatDate') formatDate: any = "dd MMMM yyyy - hh:mm a";

  lastPush: any = null;
  constructor(private githubService: GithubService) { }

  ngOnInit() {
    this.githubService.getLastPushEvent().subscribe(pushEvent => {
      this.lastPush = pushEvent;
    });
  }
}
