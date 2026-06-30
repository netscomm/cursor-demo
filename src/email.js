const api = (function () {
  function extractEmails(users) {
    if (!Array.isArray(users)) {
      return [];
    }
    return users.map(user => user?.email);
  }

  // WHATWG HTML Standard — browser <input type="email"> validation (RFC 5322 ABNF subset)
  // https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address
  const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  const MAX_EMAIL_LENGTH = 254; // RFC 5321 SMTP path length limit

  function isValidEmail(email) {
    return (
      typeof email === 'string' &&
      email.length <= MAX_EMAIL_LENGTH &&
      EMAIL_REGEX.test(email)
    );
  }

  function getValidEmails(users) {
    return extractEmails(users).filter(isValidEmail);
  }

  /**
   * 쉼표로 구분된 이메일 목록 문자열을 토큰 배열로 분리한다.
   * WHATWG HTML Standard의 email address list 처리 방식을 따른다.
   * @param {unknown} value
   * @returns {string[]}
   */
  function parseEmailList(value) {
    if (typeof value !== 'string') {
      return [];
    }

    return value.split(',').map(token => token.trim());
  }

  return { extractEmails, isValidEmail, getValidEmails, parseEmailList };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = api;
} else if (typeof window !== 'undefined') {
  window.EmailUtils = api;
}
