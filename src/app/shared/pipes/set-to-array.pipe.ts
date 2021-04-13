import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'setToArray'
})
export class SetToArrayPipe implements PipeTransform {
  transform(value: Set<any>) {
    return Array.from(value);
  }
}
