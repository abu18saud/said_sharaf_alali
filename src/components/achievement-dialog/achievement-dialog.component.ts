import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { _LocalStorageService } from 'src/app/services/_local-storage.service';

@Component({
  selector: 'app-achievement-dialog',
  templateUrl: './achievement-dialog.component.html',
  styleUrls: ['./achievement-dialog.component.scss']
})
export class AchievementDialogComponent {
  lang = this.localeStorage.getLanguageCode() ? this.localeStorage.getLanguageCode() : 'ar';

  constructor(private localeStorage: _LocalStorageService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
}
