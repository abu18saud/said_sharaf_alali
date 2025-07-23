import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarRef, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

// Interface للإعدادات المخصصة
export interface CustomSnackBarConfig extends MatSnackBarConfig {
  type?: 'success' | 'error' | 'warning' | 'info';
  showCloseButton?: boolean;
  autoClose?: boolean;
  closeButtonText?: string;
  rtl?: boolean;
}

// Interface لبيانات الـ SnackBar المخصص
export interface SnackBarData {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  action?: string;
  showCloseButton?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  constructor(private _snackBar: MatSnackBar,
    private translateService: TranslateService
  ) { }

  // ---------------------------------- Snackes -------------------------
  success(message: any, duration: number = 5000, action: any = '', lang: string = 'ar') {
    this._snackBar.open('✔ ' + message, action, {
      panelClass: lang === 'ar' ? 'snackbar-rtl-success' : 'snackbar-ltr-success',
      duration: duration
    });
  }

  warning(message: any, duration: number = 5000, action: any = '', lang: string = 'ar') {
    this._snackBar.open('⚠ ' + message, action, {
      panelClass: lang === 'ar' ? 'snackbar-rtl-warning' : 'snackbar-ltr-warning',
      duration: duration
    });
  }

  info(message: any, duration: number = 5000, action: any = '', lang: string = 'ar') {
    this._snackBar.open('❕' + message, action, {
      panelClass: lang === 'ar' ? 'snackbar-rtl-info' : 'snackbar-ltr-info',
      duration: duration
    });
  }

  danger(message: any, duration: number = 5000, action: any = '', lang: string = 'ar') {
    this._snackBar.open("💔 " + message, action, {
      panelClass: lang === 'ar' ? 'snackbar-rtl-danger' : 'snackbar-ltr-danger',
      duration: duration
    });
  }

  notification(message: any, action: any = this.translateService.instant('BUTTONS.CLOSE'), lang: string = 'ar') {
    this._snackBar.open('🔔 ' + message, action, {
      horizontalPosition: (lang === 'ar') ? 'right' : 'left',
      verticalPosition: 'top',
      panelClass: lang === 'ar' ? 'snackbar-rtl-notification' : 'snackbar-ltr-notification',
      // duration: 5000
    });
  }
  // ---------------------------------- End -------------------------
}
