import {YesNoPipe} from './yes-no.pipe';

describe('YesNoPipe', () => {
  it('should return yes/no if the value is boolean && true/false respectively', () => {
    let pipe = new YesNoPipe();

    let boolTrue = true;
    let boolFalse = false;

    expect(pipe.transform(boolTrue)).toEqual('yes');
    expect(pipe.transform(boolFalse)).toEqual('no');
  });

  it('should return the original value if the value is not boolean', () => {
    let pipe = new YesNoPipe();

    let boolTrue = true;
    let boolFalse = false;
    let nonBool = 'some-string';

    expect(pipe.transform(nonBool)).toEqual(nonBool);
  });
});
