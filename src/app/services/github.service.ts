import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private repoOwner = 'abu18saud'; // change to your GitHub username
  private repoName = 'said_sharaf_alali';  // change to your repository name
  private apiUrl = `https://api.github.com/repos/${this.repoOwner}/${this.repoName}/events`;
  // في الـ service، أضف headers للـ authentication:

  constructor(private http: HttpClient) { }

  getLastPushEvent() {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((events: any[]) => events.find((event: any) => event.type === 'PushEvent'))
    );
  }
}
