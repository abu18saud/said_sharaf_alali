import { ComponentType } from '@angular/cdk/portal';
import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarRef, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

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
  private snackBar = inject(MatSnackBar);

  // الإعدادات الافتراضية
  private defaultConfig: MatSnackBarConfig = {
    duration: 4000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
    panelClass: []
  };

  /**
   * عرض رسالة عادية
   */
  show(
    message: string,
    action?: string,
    config?: MatSnackBarConfig
  ): MatSnackBarRef<any> {
    const finalConfig = { ...this.defaultConfig, ...config };
    return this.snackBar.open(message, action, finalConfig);
  }

  /**
   * عرض رسالة نجاح
   */
  showSuccess(
    message: string,
    action?: string,
    duration: number = 4000
  ): MatSnackBarRef<any> {
    return this.snackBar.open(message, action, {
      ...this.defaultConfig,
      duration,
      panelClass: ['success-snackbar'],
    });
  }

  /**
   * عرض رسالة خطأ
   */
  showError(
    message: string,
    action?: string,
    duration: number = 6000
  ): MatSnackBarRef<any> {
    return this.snackBar.open(message, action, {
      ...this.defaultConfig,
      duration,
      panelClass: ['error-snackbar'],
    });
  }

  /**
   * عرض رسالة تحذير
   */
  showWarning(
    message: string,
    action?: string,
    duration: number = 5000
  ): MatSnackBarRef<any> {
    return this.snackBar.open(message, action, {
      ...this.defaultConfig,
      duration,
      panelClass: ['warning-snackbar'],
    });
  }

  /**
   * عرض رسالة معلومات
   */
  showInfo(
    message: string,
    action?: string,
    duration: number = 4000
  ): MatSnackBarRef<any> {
    return this.snackBar.open(message, action, {
      ...this.defaultConfig,
      duration,
      panelClass: ['info-snackbar'],
    });
  }

  /**
   * عرض SnackBar بدون انتهاء صلاحية (يدوي الإغلاق)
   */
  showPersistent(
    message: string,
    action: string = 'إغلاق'
  ): MatSnackBarRef<any> {
    return this.snackBar.open(message, action, {
      ...this.defaultConfig,
      duration: 0, // لا ينتهي تلقائياً
      panelClass: ['persistent-snackbar']
    });
  }

  /**
   * عرض SnackBar مع خيارات متقدمة
   */
  showCustom(config: CustomSnackBarConfig & { message: string }): MatSnackBarRef<any> {
    const { message, type, showCloseButton, autoClose, closeButtonText, rtl, ...restConfig } = config;

    const panelClasses = ['custom-snackbar'];
    if (type) panelClasses.push(`${type}-snackbar`);
    if (rtl) panelClasses.push('rtl-snackbar');

    const finalConfig: MatSnackBarConfig = {
      ...this.defaultConfig,
      ...restConfig,
      panelClass: [...panelClasses, ...(restConfig.panelClass || [])],
      duration: autoClose === false ? 0 : (restConfig.duration || 4000)
    };

    const actionText: any = showCloseButton ? (closeButtonText || 'إغلاق') : restConfig;

    return this.snackBar.open(message, actionText, finalConfig);
  }

  /**
   * عرض SnackBar في الأعلى
   */
  showTop(
    message: string,
    action?: string,
    duration: number = 4000
  ): MatSnackBarRef<any> {
    return this.snackBar.open(message, action, {
      ...this.defaultConfig,
      duration,
      verticalPosition: 'top',
      panelClass: ['top-snackbar']
    });
  }

  /**
   * عرض SnackBar في الأعلى يساراً
   */
  showTopLeft(
    message: string,
    action?: string,
    duration: number = 4000
  ): MatSnackBarRef<any> {
    return this.snackBar.open(message, action, {
      ...this.defaultConfig,
      duration,
      horizontalPosition: 'left',
      verticalPosition: 'top',
      panelClass: ['top-left-snackbar']
    });
  }

  /**
   * عرض SnackBar في الأعلى يميناً
   */
  showTopRight(
    message: string,
    action?: string,
    duration: number = 4000
  ): MatSnackBarRef<any> {
    return this.snackBar.open(message, action, {
      ...this.defaultConfig,
      duration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['top-right-snackbar']
    });
  }

  /**
   * عرض SnackBar مع أيقونة
   */
  showWithIcon(
    message: string,
    type: 'success' | 'error' | 'warning' | 'info',
    action?: string,
    duration: number = 4000
  ): MatSnackBarRef<any> {
    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    };

    const iconMessage = `${icons[type]} ${message}`;

    return this.snackBar.open(iconMessage, action, {
      ...this.defaultConfig,
      duration,
      panelClass: [`${type}-snackbar`, 'icon-snackbar']
    });
  }

  /**
   * عرض SnackBar للتحميل
   */
  showLoading(message: string = 'جاري التحميل...'): MatSnackBarRef<any> {
    return this.snackBar.open(`⏳ ${message}`, undefined, {
      ...this.defaultConfig,
      duration: 0,
      panelClass: ['loading-snackbar']
    });
  }

  /**
   * عرض SnackBar للتأكيد
   */
  showConfirmation(
    message: string,
    confirmText: string = 'تأكيد',
    cancelText: string = 'إلغاء'
  ): Promise<boolean> {
    return new Promise((resolve) => {
      const snackBarRef = this.snackBar.open(message, confirmText, {
        ...this.defaultConfig,
        duration: 0,
        panelClass: ['confirmation-snackbar']
      });

      // إضافة زر الإلغاء
      snackBarRef.afterDismissed().subscribe((info) => {
        if (info.dismissedByAction) {
          resolve(true);
        } else {
          resolve(false);
        }
      });

      // يمكن إضافة زر إلغاء إضافي هنا إذا لزم الأمر
    });
  }

  /**
   * عرض SnackBar مع عد تنازلي
   */
  showCountdown(
    baseMessage: string,
    seconds: number = 5,
    onComplete?: () => void
  ): MatSnackBarRef<any> {
    let remainingSeconds = seconds;

    const updateMessage = () => `${baseMessage} (${remainingSeconds}s)`;

    const snackBarRef = this.snackBar.open(updateMessage(), 'إلغاء', {
      ...this.defaultConfig,
      duration: 0,
      panelClass: ['countdown-snackbar']
    });

    const interval = setInterval(() => {
      remainingSeconds--;
      if (remainingSeconds > 0) {
        snackBarRef.instance.data = { message: updateMessage(), action: 'إلغاء' };
      } else {
        clearInterval(interval);
        snackBarRef.dismiss();
        if (onComplete) {
          onComplete();
        }
      }
    }, 1000);

    snackBarRef.afterDismissed().subscribe(() => {
      clearInterval(interval);
    });

    return snackBarRef;
  }

  /**
   * عرض SnackBar مع شريط تقدم
   */
  showProgress(
    message: string,
    progress: number = 0
  ): MatSnackBarRef<any> {
    const progressMessage = `${message} (${Math.round(progress)}%)`;

    return this.snackBar.open(progressMessage, undefined, {
      ...this.defaultConfig,
      duration: 0,
      panelClass: ['progress-snackbar']
    });
  }

  /**
   * تحديث شريط التقدم
   */
  updateProgress(snackBarRef: MatSnackBarRef<any>, message: string, progress: number): void {
    const progressMessage = `${message} (${Math.round(progress)}%)`;
    snackBarRef.instance.data = { message: progressMessage };
  }

  /**
   * إغلاق جميع SnackBars المفتوحة
   */
  dismissAll(): void {
    this.snackBar.dismiss();
  }

  /**
   * تعيين الإعدادات الافتراضية
   */
  setDefaultConfig(config: Partial<MatSnackBarConfig>): void {
    this.defaultConfig = { ...this.defaultConfig, ...config };
  }

  /**
   * عرض SnackBar مع خيارات الموضع
   */
  showAtPosition(
    message: string,
    horizontalPosition: MatSnackBarHorizontalPosition,
    verticalPosition: MatSnackBarVerticalPosition,
    action?: string,
    duration: number = 4000
  ): MatSnackBarRef<any> {
    return this.snackBar.open(message, action, {
      ...this.defaultConfig,
      duration,
      horizontalPosition,
      verticalPosition,
      panelClass: [`${horizontalPosition}-${verticalPosition}-snackbar`]
    });
  }

  /**
   * عرض SnackBar مع بيانات مخصصة
   */
  openFromComponent<T>(
    component: ComponentType<T>,
    config?: MatSnackBarConfig
  ): MatSnackBarRef<T> {
    return this.snackBar.openFromComponent(component, {
      ...this.defaultConfig,
      ...config
    });
  }

  /**
   * إنشاء SnackBar للحالات المختلفة للـ CRUD operations
   */
  crud = {
    created: (itemName: string = 'العنصر') =>
      this.showSuccess(`تم إنشاء ${itemName} بنجاح`),

    updated: (itemName: string = 'العنصر') =>
      this.showSuccess(`تم تحديث ${itemName} بنجاح`),

    deleted: (itemName: string = 'العنصر') =>
      this.showSuccess(`تم حذف ${itemName} بنجاح`),

    failed: (operation: string = 'العملية') =>
      this.showError(`فشلت ${operation}. يرجى المحاولة مرة أخرى`),

    loading: (operation: string = 'العملية') =>
      this.showLoading(`جاري تنفيذ ${operation}...`)
  };

  /**
   * SnackBars للحالات الشائعة
   */
  common = {
    networkError: () =>
      this.showError('خطأ في الاتصال. تحقق من الإنترنت'),

    unauthorized: () =>
      this.showError('غير مصرح لك بهذه العملية'),

    validationError: () =>
      this.showWarning('يرجى التحقق من البيانات المدخلة'),

    sessionExpired: () =>
      this.showWarning('انتهت جلسة العمل. يرجى تسجيل الدخول مرة أخرى'),

    saveSuccess: () =>
      this.showSuccess('تم الحفظ بنجاح'),

    copySuccess: () =>
      this.showInfo('تم النسخ إلى الحافظة'),

    fileUploaded: () =>
      this.showSuccess('تم رفع الملف بنجاح'),

    processing: () =>
      this.showLoading('جاري المعالجة...')
  };
}
