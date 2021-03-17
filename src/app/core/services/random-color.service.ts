import {Injectable} from '@angular/core';

declare let randomColor: any;

@Injectable()
export class RandomColorService {

  constructor() {
  }

  getRandomColor(hue?, luminosity?, count?, seed?, format?, alpha?) {
    return randomColor({
      hue: hue, luminosity: luminosity, count: count, seed: seed, format: format, alpha: alpha
    });
  }
}
