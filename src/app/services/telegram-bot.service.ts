
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

// Interface لتحديد بنية البيانات
export interface TelegramResponse {
  ok: boolean;
  result?: any;
  error_code?: number;
  description?: string;
}

export interface SendMessageRequest {
  chat_id: string | number;
  text: string;
  parse_mode?: 'HTML' | 'Markdown' | 'MarkdownV2';
  reply_markup?: any;
}

export interface SendPhotoRequest {
  chat_id: string | number;
  photo: string;
  caption?: string;
  parse_mode?: 'HTML' | 'Markdown' | 'MarkdownV2';
}

@Injectable({
  providedIn: 'root'
})
export class TelegramBotService {
  botToken: any = "";
  baseUrl: any = "";
  constructor(private http: HttpClient) {
    // ضع Bot Token الخاص بك هنا
    this.botToken = environment.telegramBotToken;
    this.baseUrl = `https://api.telegram.org/bot${this.botToken}`;
  }

  /**
   * إرسال رسالة نصية
   */
  sendMessage(request: SendMessageRequest): Observable<TelegramResponse> {
    const url = `${this.baseUrl}/sendMessage`;

    return this.http.post<TelegramResponse>(url, request)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * إرسال صورة
   */
  sendPhoto(request: SendPhotoRequest): Observable<TelegramResponse> {
    const url = `${this.baseUrl}/sendPhoto`;

    return this.http.post<TelegramResponse>(url, request)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * إرسال مستند
   */
  sendDocument(chatId: string | number, document: string, caption?: string): Observable<TelegramResponse> {
    const url = `${this.baseUrl}/sendDocument`;
    const body = {
      chat_id: chatId,
      document: document,
      caption: caption
    };

    return this.http.post<TelegramResponse>(url, body)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * الحصول على معلومات البوت
   */
  getMe(): Observable<TelegramResponse> {
    const url = `${this.baseUrl}/getMe`;

    return this.http.get<TelegramResponse>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * الحصول على التحديثات (الرسائل الواردة)
   */
  getUpdates(offset?: number, limit?: number, timeout?: number): Observable<TelegramResponse> {
    const url = `${this.baseUrl}/getUpdates`;
    const params: any = {};

    if (offset) params.offset = offset;
    if (limit) params.limit = limit;
    if (timeout) params.timeout = timeout;

    return this.http.get<TelegramResponse>(url, { params })
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * إرسال رسالة مع لوحة مفاتيح مخصصة
   */
  sendMessageWithKeyboard(
    chatId: string | number,
    text: string,
    keyboard: any[][]
  ): Observable<TelegramResponse> {
    const request: SendMessageRequest = {
      chat_id: chatId,
      text: text,
      reply_markup: {
        keyboard: keyboard,
        one_time_keyboard: true,
        resize_keyboard: true
      }
    };

    return this.sendMessage(request);
  }

  /**
   * إرسال رسالة مع أزرار inline
   */
  sendMessageWithInlineButtons(
    chatId: string | number,
    text: string,
    buttons: any[][]
  ): Observable<TelegramResponse> {
    const request: SendMessageRequest = {
      chat_id: chatId,
      text: text,
      reply_markup: {
        inline_keyboard: buttons
      }
    };

    return this.sendMessage(request);
  }

  /**
   * إرسال رسالة HTML
   */
  sendHTMLMessage(chatId: string | number, htmlText: string): Observable<TelegramResponse> {
    const request: SendMessageRequest = {
      chat_id: chatId,
      text: htmlText,
      parse_mode: 'HTML'
    };

    return this.sendMessage(request);
  }

  /**
   * إرسال رسالة Markdown
   */
  sendMarkdownMessage(chatId: string | number, markdownText: string): Observable<TelegramResponse> {
    const request: SendMessageRequest = {
      chat_id: chatId,
      text: markdownText,
      parse_mode: 'Markdown'
    };

    return this.sendMessage(request);
  }

  /**
   * تحديد الـ Bot Token
   */
  setBotToken(token: string): void {
    if (!token) {
      throw new Error('Bot token cannot be empty');
    }
    // يمكنك إعادة إنشاء الـ service مع الـ token الجديد إذا لزم الأمر
  }

  /**
   * معالجة الأخطاء
   */
  private handleError(error: any): Observable<never> {
    let errorMessage = 'حدث خطأ غير معروف';

    if (error.error instanceof ErrorEvent) {
      // خطأ من جانب العميل
      errorMessage = `خطأ: ${error.error.message}`;
    } else {
      // خطأ من الخادم
      errorMessage = `كود الخطأ: ${error.status}\nالرسالة: ${error.message}`;

      if (error.error && error.error.description) {
        errorMessage = `Telegram API Error: ${error.error.description}`;
      }
    }

    console.error('TelegramBotService Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
