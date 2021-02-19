import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit = 25, completeWords = false, reverse = false, ellipsis = '...') {
    if (completeWords) {
      limit = value.substr(0, limit).lastIndexOf(' ');
    }
    if (!reverse) {
      return value.length > limit ? value.substr(0, limit) + ellipsis : value;
    } else {
      return value.length > limit ? value.substr(limit, value.length) : value;
    }
  }
}
