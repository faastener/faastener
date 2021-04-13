import {SetToArrayPipe} from './set-to-array.pipe';

describe('SetToArrayPipe', () => {
  it('should return an Array from the provided ES6 Set', () => {
    let pipe = new SetToArrayPipe();

    let aSet = new Set<string>();
    aSet.add('first');
    aSet.add('second');

    expect(Array.isArray(pipe.transform(aSet))).toBeTruthy();
  });
});
