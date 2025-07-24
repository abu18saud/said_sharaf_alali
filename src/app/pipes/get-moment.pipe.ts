import { Pipe, PipeTransform } from '@angular/core';
const moment = require('moment');

@Pipe({
  name: 'getMoment',
  pure: false
})
export class GetMomentPipe implements PipeTransform {
  transform(value: any): any {
    moment.locale(localStorage.getItem('currentLanguage') ? localStorage.getItem('currentLanguage') : 'ar');
    const dateToFormat = moment(value);
    return dateToFormat.fromNow();
  }
}
