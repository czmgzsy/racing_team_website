/**
 * 后台鉴权中间件
 * 检查 session 中是否存在管理员登录状态
 */
function requireAuth(req, res, next) {
  if (req.session && req.session.adminLoggedIn) {
    next();
  } else {
    res.status(401).json({ success: false, message: '未登录或登录已过期' });
  }
}

module.exports = { requireAuth };
