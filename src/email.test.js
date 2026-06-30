const { test } = require('node:test');
const assert = require('node:assert/strict');
const {
  extractEmails,
  isValidEmail,
  getValidEmails,
  parseEmailList,
} = require('./email');

test('extractEmails returns emails from user array', () => {
  const users = [{ email: 'a@x.com' }, { email: 'b@y.com' }];
  assert.deepEqual(extractEmails(users), ['a@x.com', 'b@y.com']);
});

test('extractEmails returns empty array for non-array input', () => {
  assert.deepEqual(extractEmails(null), []);
  assert.deepEqual(extractEmails('not array'), []);
});

test('isValidEmail validates email format', () => {
  assert.equal(isValidEmail('user@example.com'), true);
  assert.equal(isValidEmail('user+tag@example.com'), true);
  assert.equal(isValidEmail('user.name@mail.example.org'), true);
  assert.equal(isValidEmail('invalid'), false);
  assert.equal(isValidEmail('user@'), false);
  assert.equal(isValidEmail(123), false);
});

test('getValidEmails returns only valid emails', () => {
  const users = [
    { email: 'valid@example.com' },
    { email: 'invalid' },
    { email: 'also@valid.org' },
  ];
  assert.deepEqual(getValidEmails(users), ['valid@example.com', 'also@valid.org']);
});

test('getValidEmails returns empty array for non-array input', () => {
  assert.deepEqual(getValidEmails(null), []);
});

test('parseEmailList splits comma-separated emails', () => {
  assert.deepEqual(parseEmailList('a@x.com, b@y.com'), ['a@x.com', 'b@y.com']);
  assert.deepEqual(parseEmailList('  one@a.com , two@b.com  '), [
    'one@a.com',
    'service@b.com',
  ]);
});

test('parseEmailList returns empty array for non-string input', () => {
  assert.deepEqual(parseEmailList(null), []);
  assert.deepEqual(parseEmailList(undefined), []);
});
