import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'getMoment',
  pure: false
})
export class GetMomentPipe implements PipeTransform {
  transform(value: any): any {
    moment.locale(localStorage.getItem('currentLanguage'));
    const dateToFormat = moment(value);
    return dateToFormat.fromNow();
  }
}
