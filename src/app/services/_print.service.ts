import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { SnackBarService } from './snack-bar.service';
import { DatePipe } from '@angular/common';
import { _LocalStorageService } from './_local-storage.service';
import { PdfExportService } from './pdf-export.service';

@Injectable({
    providedIn: 'root'
})
export class _PrintService {
    lang: string = 'ar';
    logo: string = 'https://al-yahya.sa/assets/img/logos/bakery_logo.png';
    _decimals: number = 2;
    hijriDate: string = new Intl.DateTimeFormat('ar-TN-u-ca-islamic', {
        day: 'numeric',
        month: 'numeric',
        weekday: 'long',
        year: 'numeric'
    }).format(Date.now());
    todayName: string = new Intl.DateTimeFormat('ar-TN-u-ca-islamic', {
        weekday: 'long',
    }).format(Date.now());

    datePipe = new DatePipe('en-US');
    currentTime: any = this.datePipe.transform(new Date(), 'shortTime');

    titleOfPage: any = '';
    constructor(
        private http: HttpClient,
        private localStorageService: _LocalStorageService,
        public translateService: TranslateService,
        private snackBarService: SnackBarService,
        private pdfExportService: PdfExportService
    ) {
        this.lang = this.localStorageService.getLanguageCode() ? this.localStorageService.getLanguageCode() : 'ar';
    }


    public printCv(data: any) {
        this.snackBarService.warning(this.translateService.instant('LOADING.PLEASE_WAIT'));
        let keyContributions = '';
        setTimeout(() => {
            data.key_contributions.forEach((element: any) => {
                keyContributions += `
        <div class='achievement-item'>
            <div class='achievement-icon'>✅</div>
            <span>${this.lang === 'ar' ? element.name_ar : element.name_en}</span>
        </div>`;
            });
        }, 500);
        let education = '';
        setTimeout(() => {
            data.education.forEach((element: any) => {
                education += `
                <div class='education-item'>
                    <div class='education-year'>${element.join_year}</div>
                    <div class='education-degree'>${this.translateService.instant('DEGREE_TYPE.' + element.degree_type)}</div>
                    <div class='education-institution'>${this.lang === 'ar' ? element.university_ar : element.university_en} ${element.major_ar ? '-' + (this.lang === 'ar' ? element.major_ar : element.major_en) : ''}</div>
                    <div class='education-grade'>${this.translateService.instant('LABELS.GPA')}: ${element.gpa} - ${element.max_gpa}</div>
                </div>`;
            });
        }, 500);

        let featuredProjects = '';
        setTimeout(() => {
            data.projects.filter((item: any) => item.is_featured === true).forEach((element: any) => {
                featuredProjects += `
                <div class='project-item'>
                    <h4>${this.lang === 'ar' ? element.name_ar : element.name_en}</h4>
                    <p>${element.year_gregorian} - ${element.year_hijri}</p>
                </div>`;
            });
        }, 500);


        setTimeout(async () => {
            let printDate = new Date();
            const newContent2 = `
            <!DOCTYPE html>
<html lang='ar' dir='rtl'>

<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>السيرة الذاتية</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&display=swap');

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Tajawal', sans-serif;
            background: #f5f5f5;
            color: #333;
            line-height: 1.4;
        }

        .container {
            width: 210mm;
            height: 297mm;
            background: white;
            margin: 0 auto;
            display: flex;
            position: relative;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .left-section {
            width: 35%;
            background: linear-gradient(135deg, #2c5aa0 0%, #1a4480 100%);
            color: white;
            padding: 30px 20px;
            position: relative;
        }

        .right-section {
            width: 65%;
            padding: 30px 25px;
            background: #f8f9fa;
        }

        .profile-photo {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            margin: 0 auto 20px;
            border: 4px solid white;
            background: #ddd;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            /* مهم جدًا لضمان تقطيع الزوائد */
            position: relative;
        }

        .profile-photo img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            /* لتعبئة الدائرة بدون تشويه */
            border-radius: 50%;
            /* اختياري إذا أردت مزيدًا من التأكيد */
            display: block;
        }

        .name {
            font-size: 22px;
            font-weight: 700;
            text-align: center;
            margin-bottom: 8px;
        }

        .title {
            font-size: 14px;
            text-align: center;
            margin-bottom: 10px;
            opacity: 0.9;
        }

        .subtitle {
            font-size: 12px;
            text-align: center;
            margin-bottom: 25px;
            opacity: 0.8;
        }

        .contact-section {
            background: rgba(255, 255, 255, 0.1);
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
        }

        .contact-section h3 {
            font-size: 16px;
            margin-bottom: 12px;
            text-align: center;
            background: rgba(255, 255, 255, 0.2);
            padding: 8px;
            border-radius: 5px;
        }

        .contact-item {
            display: flex;
            align-items: center;
            margin-bottom: 8px;
            font-size: 12px;
        }

        .contact-icon {
            width: 20px;
            height: 20px;
            margin-left: 8px;
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #2c5aa0;
            font-weight: bold;
        }

        .achievements-section {
            background: rgba(255, 255, 255, 0.1);
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
        }

        .achievements-section h3 {
            font-size: 16px;
            margin-bottom: 12px;
            text-align: center;
            background: rgba(255, 255, 255, 0.2);
            padding: 8px;
            border-radius: 5px;
        }

        .achievement-item {
            display: flex;
            align-items: center;
            margin-bottom: 8px;
            font-size: 12px;
        }

        .achievement-icon {
            width: 20px;
            height: 20px;
            margin-left: 8px;
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #2c5aa0;
            font-weight: bold;
        }

        .languages-section {
            background: rgba(255, 255, 255, 0.1);
            padding: 15px;
            border-radius: 8px;
        }

        .languages-section h3 {
            font-size: 16px;
            margin-bottom: 12px;
            text-align: center;
            background: rgba(255, 255, 255, 0.2);
            padding: 8px;
            border-radius: 5px;
        }

        .language-item {
            display: flex;
            align-items: center;
            margin-bottom: 8px;
            font-size: 12px;
        }

        .language-icon {
            width: 20px;
            height: 20px;
            margin-left: 8px;
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #2c5aa0;
            font-weight: bold;
        }

        .about-section {
            background: #e8f4f8;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            border-right: 4px solid #2c5aa0;
        }

        .about-section h2 {
            font-size: 18px;
            color: #2c5aa0;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
        }

        .about-section h2::before {
            content: '👤';
            margin-left: 8px;
        }

        .about-section p {
            font-size: 13px;
            line-height: 1.6;
            color: #555;
        }

        .education-section {
            background: white;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            border-right: 4px solid #2c5aa0;
        }

        .education-section h2 {
            font-size: 18px;
            color: #2c5aa0;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
        }

        .education-section h2::before {
            content: '🎓';
            margin-left: 8px;
        }

        .education-item {
            position: relative;
            padding-right: 20px;
            margin-bottom: 15px;
            border-right: 2px solid #ddd;
        }

        .education-item::before {
            content: '';
            position: absolute;
            right: -5px;
            top: 5px;
            width: 8px;
            height: 8px;
            background: #2c5aa0;
            border-radius: 50%;
        }

        .education-year {
            background: #2c5aa0;
            color: white;
            padding: 3px 8px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: bold;
            display: inline-block;
            margin-bottom: 5px;
        }

        .education-degree {
            font-weight: 600;
            font-size: 13px;
            margin-bottom: 3px;
        }

        .education-institution {
            font-size: 12px;
            color: #666;
            margin-bottom: 2px;
        }

        .education-grade {
            font-size: 11px;
            color: #888;
        }

        .projects-section {
            background: white;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            border-right: 4px solid #2c5aa0;
        }

        .projects-section h2 {
            font-size: 18px;
            color: #2c5aa0;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
        }

        .projects-section h2::before {
            content: '🚀';
            margin-left: 8px;
        }

        .project-item {
            margin-bottom: 12px;
            padding: 10px;
            background: #f8f9fa;
            border-radius: 5px;
            border-right: 3px solid #2c5aa0;
        }

        .project-item h4 {
            font-size: 12px;
            color: #2c5aa0;
            margin-bottom: 5px;
        }

        .project-item p {
            font-size: 11px;
            color: #666;
            line-height: 1.5;
        }

        .stats-section {
            background: white;
            padding: 20px;
            border-radius: 8px;
            border-right: 4px solid #2c5aa0;
            margin-bottom: 20px;
        }

        .stats-section h2 {
            font-size: 18px;
            color: #2c5aa0;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
        }

        .stats-section h2::before {
            content: '📊';
            margin-left: 8px;
        }

        .stats-grid {
            display: flex;
            justify-content: space-around;
            gap: 20px;
            margin-bottom: 15px;
        }

        .stat-item {
            text-align: center;
            padding: 5px;
            background: #f8f9fa;
            border-radius: 8px;
            flex: 1;
        }

        .stat-number {
            font-size: 24px;
            font-weight: bold;
            color: #2c5aa0;
        }

        .stat-label {
            font-size: 12px;
            color: #666;
            margin-top: 5px;
        }

        .stat-icon {
            font-size: 20px;
            margin-bottom: 5px;
        }

        .qr-section {
            background: white;
            padding: 20px;
            border-radius: 8px;
            border-right: 4px solid #2c5aa0;
            text-align: center;
            margin-bottom: 20px;
        }

        .qr-code {
            width: 70px;
            height: 70px;
            margin: 0 auto 10px;
            border: 2px solid #2c5aa0;
            border-radius: 8px;
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
            background-image: url('data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='white'/><g fill='%23000'><rect x='10' y='10' width='30' height='30'/><rect x='60' y='10' width='30' height='30'/><rect x='10' y='60' width='30' height='30'/><rect x='15' y='15' width='20' height='20' fill='white'/><rect x='65' y='15' width='20' height='20' fill='white'/><rect x='15' y='65' width='20' height='20' fill='white'/><rect x='20' y='20' width='10' height='10'/><rect x='70' y='20' width='10' height='10'/><rect x='20' y='70' width='10' height='10'/><rect x='50' y='20' width='5' height='5'/><rect x='50' y='30' width='5' height='5'/><rect x='50' y='40' width='5' height='5'/><rect x='50' y='50' width='5' height='5'/><rect x='60' y='50' width='5' height='5'/><rect x='70' y='50' width='5' height='5'/><rect x='80' y='50' width='5' height='5'/><rect x='50' y='60' width='5' height='5'/><rect x='60' y='60' width='5' height='5'/><rect x='80' y='60' width='5' height='5'/><rect x='50' y='70' width='5' height='5'/><rect x='70' y='70' width='5' height='5'/><rect x='50' y='80' width='5' height='5'/><rect x='60' y='80' width='5' height='5'/><rect x='70' y='80' width='5' height='5'/><rect x='80' y='80' width='5' height='5'/></g></svg>');
            background-size: contain;
        }

        .qr-text {
            font-size: 11px;
            color: #666;
            margin-bottom: 5px;
        }

        .designer-credit {
            background: #f8f9fa;
            padding: 10px;
            border-radius: 5px;
            font-size: 10px;
            color: #888;
            text-align: center;
        }

        @media print {
            body {
                background: white;
            }

            .container {
                box-shadow: none;
                margin: 0;
            }

            @page {
                size: A4;
                margin: 0;
            }
        }
    </style>
</head>

<body>
    <div class='container'>
        <div class='left-section'>
            <div class='profile-photo'>
            <img src='${data.online_profile_picture}' />
            </div>
            <div class='name'>${this.lang === 'ar' ? data.name_ar : data.name_en}</div>
            <div class='title'>${this.lang === 'ar' ? data.job_titles[0]?.name_ar : data.job_titles[0]?.name_en}</div>

            <div class='contact-section'>
                <h3>${this.translateService.instant('LABELS.PROFESSIONAL_PROFILE')}</h3>
                <div class='contact-item'>
                    <div class='contact-icon'>📱</div>
                    <span>${data.mobiles[0]}</span>
                </div>
                <div class='contact-item'>
                    <div class='contact-icon'>📞</div>
                    <span>${data.phones[0]}</span>
                </div>                
                <div class='contact-item'>
                    <div class='contact-icon'>📧</div>
                    <span>${data?.emails[0]}</span>
                </div>
                <div class='contact-item'>
                    <div class='contact-icon'>📍</div>
                    <span>${this.lang === 'ar' ? data.address_ar : data.address_en}</span>
                </div>
                <div class='contact-item'>
                    <div class='contact-icon'>🌐</div>
                    <span>${this.translateService.instant('MARITAL_STATUSES.' + data.marital_status)}</span>
                </div>
                <div class='contact-item'>
                    <div class='contact-icon'>📅</div>
                    <span>${this.lang === 'ar' ? data.birth_year_ar : data.birth_year_en}</span>
                </div>
            </div>

            <div class='achievements-section'>
                <h3>${this.translateService.instant('LABELS.KEY_CONTRIBUTIONS')}</h3>
                ${keyContributions}
            </div>

            <div class='languages-section'>
                <h3>${this.translateService.instant('LABELS.LANGUAGES')}</h3>
                <div class='language-item'>
                    <div class='language-icon'>🇸🇦</div>
                    <span>${this.translateService.instant('LANGUAGES.ARABIC')}</span>
                </div>
                <div class='language-item'>
                    <div class='language-icon'>🇺🇸</div>
                    <span>${this.translateService.instant('LANGUAGES.ENGLISH')}</span>
                </div>
            </div>

            <div class='text-white text-center' style='font-size: 12px; text-align: center; margin: 5px 0 5px 0;'>
            ${this.translateService.instant('LABELS.SCAN_QR')}
            </div>
            <div class='qr-code'></div>
        </div>

        <div class='right-section'>
            <div class='about-section'>
                <h2>${this.translateService.instant('MAIN_MENU.ABOUT')}</h2>
                <p>${this.lang === 'ar' ? data.small_bio_ar : data.small_bio_en}</p>
            </div>

            <div class='education-section'>
                <h2>${this.translateService.instant('MAIN_MENU.EDUCATION')}</h2>
                ${education}
            </div>

            <div class='projects-section'>
                <h2>${this.translateService.instant('MAIN_MENU.FEATURED_PROJECTS')}</h2>
                ${featuredProjects}
            </div>

            <div class='stats-section'>
                <h2>${this.translateService.instant('MAIN_MENU.RESUME_STATISTICS')}</h2>
                <div class='stats-grid'>
                    <div class='stat-item'>
                        <div class='stat-icon'>🚀</div>
                        <div class='stat-number'>${data.projects?.length? data.projects?.length:'0'}</div>
                        <div class='stat-label'>مشروعاً</div>
                    </div>
                    <div class='stat-item'>
                        <div class='stat-icon'>🏆</div>
                        <div class='stat-number'>${data.achievements?.length? data.achievements?.length:'0'}</div>
                        <div class='stat-label'>إنجازاً</div>
                    </div>
                </div>
            </div>
            <div class='designer-credit'>تصميم : عبدالله السالم</div>
            <!-- <div class='qr-section'>
                <div class='qr-code'></div>
                <div class='qr-text'>يرجى زيارة موقع الويب الخاص بي لمعرفة</div>
                <div class='qr-text'>مشاريعي وإنجازاتي</div>
                <div class='designer-credit'>تصميم : عبدالله السالم</div>
            </div> -->
        </div>
    </div>
</body>

</html>

`;
            this.createAndReplaceIframe(newContent2);
            // await this.pdfExportService.exportHtmlToPdf(newContent2, 'filename.pdf');


        }, 1000);

    }

    // الطريقة الأفضل على الإطلاق للطباعة
    createAndReplaceIframe(content: string, show: boolean = true) {
        // Optionally, for automatic printing
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        // iframe.src = url;
        document.body.appendChild(iframe);

        // Replace iframe content
        // if (iframe.contentDocument) {
        iframe.contentDocument.open();
        iframe.contentDocument.write(content);
        iframe.contentDocument.close();
        // }

        iframe.onload = () => {
            iframe.contentWindow?.print();
        };
    }
}