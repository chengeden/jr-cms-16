module.exports = (req, res, next) => {
  if (!req.user || !req.user.role) {
    return res.sendStatus(403); // 没有权限
  }
  
  if (req.user.role !== 'admin') {
    return res.sendStatus(403);
  }

  next();
};