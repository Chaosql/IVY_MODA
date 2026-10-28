import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { validateShipping, type ShippingInfo } from '../../src/lib/checkout-validation.ts';

const VALID_BASE: ShippingInfo = {
  name: 'Nguyễn Văn An',
  phone: '0987654321',
  street: '10 Duy Tân',
  province: 'Hà Nội',
  customProvince: '',
};

describe('validateShipping – Mục 2.3 Unit Test', () => {
  it('UT-01: trả required khi thiếu trường bắt buộc (name rỗng)', () => {
    assert.equal(validateShipping({ ...VALID_BASE, name: '' }), 'required');
  });
  it('UT-02: trả name khi tên chỉ có 1 ký tự', () => {
    assert.equal(validateShipping({ ...VALID_BASE, name: 'A' }), 'name');
  });
  it('UT-03: trả phone khi SĐT có chứa chữ cái', () => {
    assert.equal(validateShipping({ ...VALID_BASE, phone: '09876a4321' }), 'phone');
  });
  it('UT-04: trả province khi chọn Khác nhưng không nhập tên tỉnh', () => {
    assert.equal(validateShipping({ ...VALID_BASE, province: 'Khác', customProvince: '' }), 'province');
  });
  it('UT-05: trả null khi tỉnh thường, đầy đủ thông tin', () => {
    assert.equal(validateShipping({ ...VALID_BASE }), null);
  });
  it('UT-06: trả null khi tỉnh Khác và nhập tên tỉnh đầy đủ', () => {
    assert.equal(validateShipping({ ...VALID_BASE, province: 'Khác', customProvince: 'Bắc Ninh' }), null);
  });
  it('UT-07: trả phone khi SĐT chỉ có 9 chữ số', () => {
    assert.equal(validateShipping({ ...VALID_BASE, phone: '098765432' }), 'phone');
  });
  it('UT-08: trả null khi SĐT có 10 chữ số hợp lệ', () => {
    assert.equal(validateShipping({ ...VALID_BASE, phone: '0987654321' }), null);
  });
  it('UT-09: trả phone khi SĐT có 11 chữ số', () => {
    assert.equal(validateShipping({ ...VALID_BASE, phone: '09876543210' }), 'phone');
  });
  it('UT-10: trả name khi tên có 51 ký tự', () => {
    assert.equal(validateShipping({ ...VALID_BASE, name: 'A'.repeat(51) }), 'name');
  });
});
