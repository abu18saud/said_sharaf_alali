import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { _LocalStorageService } from 'src/app/services/_local-storage.service';
import { FileDownloadService } from 'src/app/services/file-download.service';

@Component({
  selector: 'app-achievement-dialog',
  templateUrl: './achievement-dialog.component.html',
  styleUrls: ['./achievement-dialog.component.scss']
})
export class AchievementDialogComponent {
  lang = this.localeStorage.getLanguageCode() ? this.localeStorage.getLanguageCode() : 'ar';

  constructor(private localeStorage: _LocalStorageService,
    private fileDownloadService: FileDownloadService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  download() {
    this.fileDownloadService.downloadPdf(this.data.file, (this.lang === 'ar' ? this.data.name_ar : this.data.name_en) + '.pdf');
  }
}
