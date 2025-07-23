import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { SnackBarService } from './snack-bar.service';
import { DatePipe } from '@angular/common';
import { _LocalStorageService } from './_local-storage.service';

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
        private translateService: TranslateService,
        private snackBarService: SnackBarService,
    ) {
        this.lang = this.localStorageService.getLanguageCode() ? this.localStorageService.getLanguageCode() : 'ar';
    }


    printCv(data: any) {
        this.snackBarService.warning(this.translateService.instant('LOADING.PLEASE_WAIT'));
        let tableForPrint = '';
        //     setTimeout(() => {
        //         data.records.forEach((element: Expense) => {//${element.revenue ? '🔗 ' + element.revenue.record_id : ''}
        //             tableForPrint += `
        // <tr>
        //     <td><span style="float: inline-start;" contenteditable>${data?.id} ${data.revenue_datas?.length !== 0 ? `🔗 [${this.getdatasAsIds(data.revenue_datas)}]` : ''}</span></td>
        //       <td><a class="cut">-</a><span style="float: inline-start;" contenteditable>${this.lang === 'ar' ? element.classification.ar_name : element.classification.en_name}</span></td>              
        //     <td><span data-prefix></span><span contenteditable>${this.lang === 'ar' ? data?.ar_supplier : data?.en_supplier}</span></td>
        //     <td><span data-prefix></span><span contenteditable>${this.lang === 'ar' ? data?.branch?.ar_name : data?.branch?.en_name}</span></td>
        //     <td><span contenteditable>${(element.amount) ? this.datesAndNumbersService.formatNumber(element.amount) : '-'}</span></td>
        //     <!-- <td><span contenteditable>${(element.vat_amount) ? this.datesAndNumbersService.formatNumber(element.vat_amount) : '-'}</span></td> -->
        //     <td><span data-prefix></span><span>${element.total ? this.datesAndNumbersService.formatNumber(element.total) : '-'}</span></td>
        //     <td><span contenteditable>${element.data_date ? this.datesAndNumbersService.formatDate(element.data_date.toString(), 'dd/MM/yyyy') : '-'}</span></td>
        //     <td><span data-prefix></span><span style="float: inline-start;">${element.notes ? element.notes : '-'}</span></td>
        // </tr>`;
        //         });
        //     }, 500);

        setTimeout(() => {
            let printDate = new Date();
            const newContent2 = `

`;
            this.createAndReplaceIframe(newContent2);

        }, 2000);

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