import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileDownloadService {
  constructor(private http: HttpClient) { }

  // الطريقة الأولى: تنزيل ملف من رابط مباشر
  downloadFileFromUrl(url: string, filename: string) {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
  }

  // الطريقة الثانية: تنزيل ملف من API مع HttpClient
  downloadFileFromApi(apiUrl: string, filename: string) {
    const headers = new HttpHeaders({
      'Accept': 'application/octet-stream'
    });

    this.http.get(apiUrl, {
      headers: headers,
      responseType: 'blob'
    }).subscribe((blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    });
  }

  // الطريقة الثالثة: تنزيل ملف PDF
  downloadPdf(apiUrl: string, filename: string = 'document.pdf') {
    this.http.get(apiUrl, {
      responseType: 'blob',
      headers: new HttpHeaders({
        'Accept': 'application/pdf'
      })
    }).subscribe((blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      window.URL.revokeObjectURL(url);
    });
  }

  // الطريقة الرابعة: تنزيل ملف Excel
  downloadExcel(apiUrl: string, filename: string = 'data.xlsx') {
    this.http.get(apiUrl, {
      responseType: 'blob',
      headers: new HttpHeaders({
        'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      })
    }).subscribe((blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      window.URL.revokeObjectURL(url);
    });
  }

  // الطريقة الخامسة: تنزيل أي نوع من الملفات
  downloadFile(apiUrl: string, filename: string, mimeType?: string) {
    const headers = new HttpHeaders({
      'Accept': mimeType || 'application/octet-stream'
    });

    return this.http.get(apiUrl, {
      headers: headers,
      responseType: 'blob',
      observe: 'response'
    }).subscribe({
      next: (response: any) => {
        // استخراج اسم الملف من الاستجابة إذا كان متوفراً
        const contentDisposition = response.headers.get('content-disposition');
        let extractedFilename = filename;

        if (contentDisposition) {
          const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(contentDisposition);
          if (matches != null && matches[1]) {
            extractedFilename = matches[1].replace(/['"]/g, '');
          }
        }

        const blob = response.body;
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = extractedFilename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('خطأ في تنزيل الملف:', error);
      }
    });
  }

  // الطريقة السادسة: إنشاء وتنزيل ملف JSON
  downloadJsonData(data: any, filename: string = 'data.json') {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  // الطريقة السابعة: إنشاء وتنزيل ملف CSV
  downloadCsvData(data: any[], filename: string = 'data.csv') {
    if (data.length === 0) return;

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => {
        const value = row[header];
        return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
      }).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  }
}

// Component استخدام الخدمة في المكون
export class MyComponent {

  constructor(private downloadService: FileDownloadService) { }

  // أمثلة على الاستخدام
  downloadReport() {
    this.downloadService.downloadFileFromApi('/api/reports/monthly', 'monthly-report.pdf');
  }

  downloadUserData() {
    const userData = [
      { id: 1, name: 'أحمد', email: 'ahmed@example.com' },
      { id: 2, name: 'فاطمة', email: 'fatima@example.com' }
    ];
    this.downloadService.downloadJsonData(userData, 'users.json');
  }

  downloadCsvReport() {
    const csvData = [
      { الاسم: 'أحمد', العمر: 25, المدينة: 'الرياض' },
      { الاسم: 'فاطمة', العمر: 30, المدينة: 'جدة' }
    ];
    this.downloadService.downloadCsvData(csvData, 'report.csv');
  }

  downloadFromUrl() {
    this.downloadService.downloadFileFromUrl('https://example.com/file.pdf', 'document.pdf');
  }
}
