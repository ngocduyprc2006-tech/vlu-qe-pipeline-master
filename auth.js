// auth.js

// Danh sách tài khoản mẫu để phục vụ kiểm thử
const USERS = [
  { username: 'admin', password: '123', isLocked: false },
  { username: 'locked_user', password: 'password123', isLocked: true },
  { username: 'special_user', password: 'p@ss$word#123!', isLocked: false },
];

/**
 * Hàm xác thực đăng nhập
 * @param {string} username 
 * @param {string} password 
 * @returns {boolean} Trả về true nếu thành công, ném ngoại lệ (Error) nếu thất bại
 */
function login(username, password) {
  // Kiểm tra username rỗng / không hợp lệ
  if (!username || typeof username !== 'string' || username.trim() === '') {
    throw new Error('Username không được để trống');
  }

  // Kiểm tra password rỗng / không hợp lệ
  if (!password || typeof password !== 'string' || password.trim() === '') {
    throw new Error('Password không được để trống');
  }

  // Tìm người dùng trong danh sách
  const user = USERS.find((u) => u.username === username);

  if (!user) {
    throw new Error('Tài khoản không tồn tại');
  }

  // Kiểm tra tài khoản có bị khóa không
  if (user.isLocked) {
    throw new Error('Tài khoản đã bị khóa');
  }

  // Kiểm tra mật khẩu
  if (user.password !== password) {
    throw new Error('Mật khẩu không chính xác');
  }

  return true;
}

module.exports = { login };
