import {SetToArrayPipe} from './set-to-array.pipe';

describe('SetToArrayPipe', () => {
  it('should return an Array from the provided ES6 Set', () => {
    const pipe = new SetToArrayPipe();

    const aSet = new Set<string>();
    aSet.add('first');
    aSet.add('second');

    expect(Array.isArray(pipe.transform(aSet))).toBeTruthy();
  });
});
