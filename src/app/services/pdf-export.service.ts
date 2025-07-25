import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PdfExportService {
  constructor() { }

  /**
   * تصدير عنصر HTML إلى PDF
   * @param elementId معرف العنصر HTML المراد تصديره
   * @param fileName اسم الملف (اختياري)
   * @param options خيارات إضافية للتصدير
   */
  async exportElementToPdf(
    elementId: string,
    fileName: string = 'document.pdf',
    options: PdfExportOptions = {}
  ): Promise<void> {
    try {
      const element = document.getElementById(elementId);
      if (!element) {
        throw new Error(`العنصر بالمعرف ${elementId} غير موجود`);
      }

      // التقاط صورة للعنصر
      const canvas = await html2canvas(element, {
        scale: options.scale || 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: options.backgroundColor || '#ffffff',
        width: options.width,
        height: options.height
      });

      // إنشاء PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: options.orientation || 'portrait',
        unit: 'mm',
        format: options.format || 'a4'
      });

      // حساب أبعاد الصورة للـ PDF
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // إضافة الصورة للـ PDF
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

      // حفظ الملف
      pdf.save(fileName);

    } catch (error) {
      console.error('خطأ في تصدير PDF:', error);
      throw error;
    }
  }

  /**
   * تصدير HTML مباشرة إلى PDF
   * @param htmlContent محتوى HTML
   * @param fileName اسم الملف
   * @param options خيارات التصدير
   */
  async exportHtmlToPdf(
    htmlContent: string,
    fileName: string = 'document.pdf',
    options: PdfExportOptions = {}
  ): Promise<void> {
    try {
      // إنشاء عنصر مؤقت
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = htmlContent;
      // tempDiv.style.position = 'absolute';
      // tempDiv.style.left = '-9999px';
      // tempDiv.style.top = '-9999px';
      // tempDiv.style.direction = 'rtl';

      document.body.appendChild(tempDiv);

      // التقاط الصورة
      const canvas = await html2canvas(tempDiv, {
        scale: options.scale || 2,
        useCORS: true,
        allowTaint: true,
        // backgroundColor: options.backgroundColor || '#ffffff'
      });

      // حذف العنصر المؤقت
      document.body.removeChild(tempDiv);

      // إنشاء PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: options.orientation || 'portrait',
        unit: 'mm',
        format: options.format || 'a4'
      });

      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(fileName);

    } catch (error) {
      console.error('خطأ في تصدير PDF:', error);
      throw error;
    }
  }

  /**
   * تصدير جدول إلى PDF مع تنسيق خاص
   * @param tableId معرف الجدول
   * @param fileName اسم الملف
   * @param title عنوان التقرير
   */
  async exportTableToPdf(
    tableId: string,
    fileName: string = 'table-report.pdf',
    title?: string
  ): Promise<void> {
    try {
      const table = document.getElementById(tableId);
      if (!table) {
        throw new Error(`الجدول بالمعرف ${tableId} غير موجود`);
      }

      const pdf = new jsPDF('portrait', 'mm', 'a4');

      // إضافة العنوان إذا كان موجوداً
      if (title) {
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text(title, 105, 20, { align: 'center' });
      }

      // التقاط صورة الجدول
      const canvas = await html2canvas(table, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      });

      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 190; // عرض الصفحة مع الهوامش
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const yPosition = title ? 30 : 10;
      pdf.addImage(imgData, 'PNG', 10, yPosition, imgWidth, imgHeight);

      pdf.save(fileName);

    } catch (error) {
      console.error('خطأ في تصدير الجدول:', error);
      throw error;
    }
  }

  /**
   * تصدير متعدد الصفحات
   * @param elementIds معرفات العناصر
   * @param fileName اسم الملف
   * @param options خيارات التصدير
   */
  async exportMultipleElementsToPdf(
    elementIds: string[],
    fileName: string = 'multi-page-document.pdf',
    options: PdfExportOptions = {}
  ): Promise<void> {
    try {
      const pdf = new jsPDF({
        orientation: options.orientation || 'portrait',
        unit: 'mm',
        format: options.format || 'a4'
      });

      for (let i = 0; i < elementIds.length; i++) {
        const element = document.getElementById(elementIds[i]);
        if (!element) {
          console.warn(`العنصر ${elementIds[i]} غير موجود`);
          continue;
        }

        const canvas = await html2canvas(element, {
          scale: options.scale || 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: options.backgroundColor || '#ffffff'
        });

        const imgData = canvas.toDataURL('image/png');
        const imgWidth = pdf.internal.pageSize.getWidth();
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        if (i > 0) {
          pdf.addPage();
        }

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      }

      pdf.save(fileName);

    } catch (error) {
      console.error('خطأ في تصدير الصفحات المتعددة:', error);
      throw error;
    }
  }

  /**
   * معاينة PDF قبل التحميل
   * @param elementId معرف العنصر
   * @param options خيارات التصدير
   * @returns رابط البيانات للـ PDF
   */
  async previewPdf(
    elementId: string,
    options: PdfExportOptions = {}
  ): Promise<string> {
    try {
      const element = document.getElementById(elementId);
      if (!element) {
        throw new Error(`العنصر بالمعرف ${elementId} غير موجود`);
      }

      const canvas = await html2canvas(element, {
        scale: options.scale || 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: options.backgroundColor || '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: options.orientation || 'portrait',
        unit: 'mm',
        format: options.format || 'a4'
      });

      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

      return pdf.output('datauristring');

    } catch (error) {
      console.error('خطأ في معاينة PDF:', error);
      throw error;
    }
  }
}

// واجهة خيارات التصدير
export interface PdfExportOptions {
  scale?: number;
  backgroundColor?: string;
  width?: number;
  height?: number;
  orientation?: 'portrait' | 'landscape';
  format?: 'a4' | 'a3' | 'a5' | 'letter' | 'legal';
}
