import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mediaSearch',
  pure: false
})
export class MediaSearchPipe implements PipeTransform {

  transform(value: any[], args?: string): any[] {
    if (!value || !args) return value;

    const searchText = args.toLowerCase();

    // شاملة للحقول الإلزامية والاختيارية
    const searchFields = [
      'title_ar',
      'title_en',
      'description_ar',
      'description_en',
      'category',
      'src',
      'videoId'
    ];

    return value.filter((data: any) => {
      return searchFields.some(field => {
        const fieldValue = data[field];

        // ✅ التأكد من أن القيمة موجودة وليست null أو undefined
        if (fieldValue !== null && fieldValue !== undefined) {
          return fieldValue.toString().toLowerCase().includes(searchText);
        }

        return false;
      });
    });
  }

}
