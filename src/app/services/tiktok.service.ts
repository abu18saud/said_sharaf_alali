import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TiktokService {

  constructor(private http: HttpClient) { }

  getVideoDetails(videoId: string) {
    return this.http.get(`https://api.tiktok.com/video/${videoId}`);
  }

  _getVideoDetails(videoId: string) {
    return this.http.get(`https://www.tiktok.com/oembed?url=https://www.tiktok.com/@sharafalali4/video/${videoId}`);
  }
}
