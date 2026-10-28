import assert from 'node:assert/strict';
import test from 'node:test';
import { isValidVietnamMobilePhone } from '../../src/lib/validation.ts';

const cases: Array<[string, string, boolean]> = [
  ['UT-P01: số nội địa hợp lệ', '0987654321', true],
  ['UT-P02: định dạng +84 hợp lệ', '+84987654321', true],
  ['UT-P03: thiếu một chữ số', '098765432', false],
  ['UT-P04: thừa một chữ số', '09876543210', false],
  ['UT-P05: chứa chữ', '09876a4321', false],
  ['UT-P06: tiền tố không hỗ trợ', '0123456789', false],
  ['UT-P07: chuỗi rỗng', '', false],
  ['UT-P08: chuỗi toàn khoảng trắng', '          ', false],
  ['UT-P09: +84 nhưng giữ số 0', '+840987654321', false],
  ['UT-P10: helper không tự trim', ' 0987654321 ', false],
];
for (const [title, input, expected] of cases) {
  test(title, () => assert.equal(isValidVietnamMobilePhone(input), expected));
}
