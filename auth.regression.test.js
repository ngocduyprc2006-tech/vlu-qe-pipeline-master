// auth.regression.test.js
const { login } = require('./auth');

describe('Regression Test - Authentication Edge Cases & Errors', () => {
  // 1. Kiểm tra mật khẩu sai
  test('Ném lỗi khi nhập sai mật khẩu', () => {
    expect(() => {
      login('admin', 'wrong_password');
    }).toThrow('Mật khẩu không chính xác');
  });

  // 2. Kiểm tra Username rỗng hoặc khoảng trắng
  test('Ném lỗi khi username rỗng hoặc chỉ có khoảng trắng', () => {
    expect(() => {
      login('', '123');
    }).toThrow('Username không được để trống');

    expect(() => {
      login('   ', '123');
    }).toThrow('Username không được để trống');

    expect(() => {
      login(null, '123');
    }).toThrow('Username không được để trống');
  });

  // 3. Kiểm tra Password rỗng hoặc null
  test('Ném lỗi khi password rỗng', () => {
    expect(() => {
      login('admin', '');
    }).toThrow('Password không được để trống');

    expect(() => {
      login('admin', null);
    }).toThrow('Password không được để trống');
  });

  // 4. Kiểm tra tài khoản không tồn tại
  test('Ném lỗi khi đăng nhập với tài khoản chưa đăng ký', () => {
    expect(() => {
      login('unknown_user', '123456');
    }).toThrow('Tài khoản không tồn tại');
  });

  // 5. Kiểm tra tài khoản bị khóa
  test('Ném lỗi khi đăng nhập vào tài khoản đã bị khóa', () => {
    expect(() => {
      login('locked_user', 'password123');
    }).toThrow('Tài khoản đã bị khóa');
  });

  // 6. Kiểm tra mật khẩu chứa ký tự đặc biệt
  describe('Xử lý mật khẩu chứa ký tự đặc biệt', () => {
    test('Đăng nhập thành công khi mật khẩu chứa ký tự đặc biệt đúng', () => {
      const result = login('special_user', 'p@ss$word#123!');
      expect(result).toBe(true);
    });

    test('Ném lỗi khi mật khẩu chứa ký tự đặc biệt bị sai', () => {
      expect(() => {
        login('special_user', 'p@ss$word#wrong');
      }).toThrow('Mật khẩu không chính xác');
    });
  });
});
