import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-media-gallery',
  templateUrl: './media-gallery.component.html',
  styleUrls: ['./media-gallery.component.scss']
})
export class MediaGalleryComponent {
  lang = 'ar';
  me: any = {};
  formatDate: any = "dd/MM/yyyy";
  activeFilter = 'ALL';
  isDialogOpen = false;
  currentMedia: any = {};

  constructor(private appService: AppService,
    private translateService: TranslateService
  ) {
    this.appService.getMe().subscribe(res => {
      this.me = res;
    });
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
