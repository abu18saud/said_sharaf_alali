import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class _ShareService {
  constructor() { }

  shareProfile(obj: any, shareThisPage: boolean = false): void {
    if (navigator.share) {
      navigator.share({
        title: obj.title,
        text: obj.text,
        url: shareThisPage ? window.location.href : obj.url
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      this.copyToClipboard(window.location.href);
    }
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      // يمكنك إضافة رسالة تأكيد هنا
      console.log('تم نسخ الرابط!');
    });
  }
}
