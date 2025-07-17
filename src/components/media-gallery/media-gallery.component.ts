import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { catchError, map, Observable, of } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { TiktokService } from 'src/app/services/tiktok.service';

@Component({
  selector: 'app-media-gallery',
  templateUrl: './media-gallery.component.html',
  styleUrls: ['./media-gallery.component.scss']
})
export class MediaGalleryComponent {
  @Input('lang') lang = 'ar';
  me: any = {};
  formatDate: any = "dd/MM/yyyy";
  activeFilter = 'ALL';
  isDialogOpen = false;
  currentMedia: any = {};
  _loading: boolean = false;
  tiktokThumbnails: { [videoId: string]: string } = {};


  constructor(private appService: AppService,
    private translateService: TranslateService,
    private tiktokService: TiktokService
  ) {
    this.appService.getMe().subscribe(res => {
      this.me = res;
    });
  }

  ngOnInit() {
    this.me.media_gallery.forEach((item: any) => {
      if (item.platform === 'tiktok') {
        this.getTikTokThumbnail(item.videoId).subscribe(url => {
          this.tiktokThumbnails[item.videoId] = url;
        });
      }
    });

    console.log(this.tiktokThumbnails)
  }

  loading() {
    this._loading = true;
    setTimeout(() => {
      this._loading = false;
    }, 500);
  }

  public getTikTokThumbnail(videoId: string): Observable<string> {
    return this.tiktokService._getVideoDetails(videoId).pipe(
      map((res: any) => res.thumbnail_url || ''),
      catchError(() => of('assets/images/video-placeholder.jpg'))
    );
  }

  // ✅ YouTube thumbnail (طريقة مباشرة)
  private getYouTubeThumbnail(videoId: string): Observable<string> {
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    return of(thumbnailUrl);
  }

  galleryItems = [
    {
      type: 'image',
      src: 'https://source.unsplash.com/random/600x400?nature=1',
      title: 'Beautiful Landscape',
      description: 'Nature Photography'
    },
    {
      type: 'video',
      videoId: 'dQw4w9WgXcQ',
      src: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      title: 'Amazing Adventure',
      description: 'Travel Video'
    },
    // Add other items similarly...
  ];

  filteredItems() {
    if (this.activeFilter === 'ALL') return this.me.media_gallery;
    return this.me.media_gallery.filter((item: any) => item.category === this.activeFilter);
  }

  openMedia(item: any) {
    this.currentMedia = item;
    this.isDialogOpen = true;
  }

  closeDialog() {
    this.isDialogOpen = false;
  }
}
