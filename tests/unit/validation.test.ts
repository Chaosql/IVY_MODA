import assert from 'node:assert/strict';
import test from 'node:test';
import { isValidVietnamMobilePhone } from '../../src/lib/validation.ts';

test('UT-01: accepts a valid 10-digit Vietnamese mobile number', () => {
  assert.equal(isValidVietnamMobilePhone('0987654321'), true);
});

test('UT-02: accepts the equivalent +84 format', () => {
  assert.equal(isValidVietnamMobilePhone('+84987654321'), true);
});

test('UT-03: rejects a number with one digit missing', () => {
  assert.equal(isValidVietnamMobilePhone('098765432'), false);
});

test('UT-04: rejects a number with one extra digit', () => {
  assert.equal(isValidVietnamMobilePhone('09876543210'), false);
});

test('UT-05: rejects letters and unsupported prefixes', () => {
  assert.equal(isValidVietnamMobilePhone('09876a4321'), false);
  assert.equal(isValidVietnamMobilePhone('0123456789'), false);
});
