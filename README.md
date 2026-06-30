# cursor-demo

이메일 추출·검증 유틸리티와 Node.js·브라우저 테스트 환경을 제공하는 데모 프로젝트입니다.

## 릴리스 노트

### v1.0.0

첫 공식 릴리스입니다. 이메일 유틸리티 모듈과 Node·브라우저 양쪽 테스트 환경을 추가했습니다.

#### ✨ 기능

- **이메일 유틸리티 모듈** (`src/email.js`)
  - `extractEmails` — 사용자 객체 배열에서 이메일 주소 추출
  - `isValidEmail` — WHATWG HTML Standard 기준 이메일 형식 검증 (최대 254자)
  - `getValidEmails` — 유효한 이메일만 필터링
  - `parseEmailList` — 쉼표로 구분된 이메일 목록 문자열 파싱
  - Node.js(CommonJS)와 브라우저(`window.EmailUtils`) 양쪽 지원
- **Node.js 단위 테스트** — `npm test`로 7개 테스트 실행 (`node:test`)
- **브라우저 테스트** — `public/test.html` + Playwright 기반 `scripts/browser-test.mjs` (5개 시나리오)

#### 🐛 버그 수정

- 해당 없음 (초기 릴리스)

#### 🧹 기타

- 코딩 스타일 규칙 추가 (`.cursor/rules/coding-style.mdc`)
- `.gitignore` 추가

## 사용법

```javascript
const { getValidEmails, isValidEmail, parseEmailList } = require('./src/email');

getValidEmails([
  { email: 'valid@example.com' },
  { email: 'invalid' },
]);
// ['valid@example.com']

isValidEmail('user@example.com'); // true
parseEmailList('a@x.com, b@y.com'); // ['a@x.com', 'b@y.com']
```

## 테스트

```bash
# Node.js 단위 테스트
npm test

# 브라우저 테스트 (Chrome 필요)
node scripts/browser-test.mjs
```
