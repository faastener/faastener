import {YesNoPipe} from './yes-no.pipe';

describe('YesNoPipe', () => {
  it('should return yes/no if the value is boolean && true/false respectively', () => {
    const pipe = new YesNoPipe();

    const boolTrue = true;
    const boolFalse = false;

    expect(pipe.transform(boolTrue)).toEqual('yes');
    expect(pipe.transform(boolFalse)).toEqual('no');
  });

  it('should return the original value if the value is not boolean', () => {
    const pipe = new YesNoPipe();
    const nonBool = 'some-string';

    expect(pipe.transform(nonBool)).toEqual(nonBool);
  });
});
