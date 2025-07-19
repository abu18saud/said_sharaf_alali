import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'achievementsSearch',
  pure: false
})
export class AchievementsSearchPipe implements PipeTransform {

  transform(value: any[], args?: string): any[] {
    if (!value || !args) return value;

    const searchText = args.toLowerCase();

    // شاملة للحقول الإلزامية والاختيارية
    const searchFields = [
      'name_ar',
      'name_en',
      'certified_ar',
      'certified_en',
      'category',
      'dated',
      'dated_hijri',
      'id',
      'file'
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
