// auth.smoke.test.js
const { login } = require('./auth');

describe('Smoke Test - Authentication', () => {
  test('Đăng nhập thành công với thông tin chính xác (admin/123)', () => {
    const result = login('admin', '123');
    expect(result).toBe(true);
  });
});
