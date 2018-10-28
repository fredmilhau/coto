import { welcome } from '../src';

test('should welcome', () => {
  expect(welcome()).toBe('Hello');
});
