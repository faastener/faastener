import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'yesNo'
})
export class YesNoPipe implements PipeTransform {
  transform(value: any) {
    if (typeof value === 'boolean') {
      return value ? 'yes' : 'no';
    }
    return value;
  }
}
