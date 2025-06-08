const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = auth.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.merchantId = decoded.merchantId;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token invalid or expired' });
  }
};


exports.refresh = (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);

  try {
    const user = jwt.verify(token, process.env.REFRESH_SECRET);
    const newAccessToken = generateAccessToken(user);
    res.json({ accessToken: newAccessToken });
  } catch {
    res.sendStatus(403);
  }
};
