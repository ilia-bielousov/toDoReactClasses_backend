import jsonwebtoken from 'jsonwebtoken';

export default (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    try {
      const decoded = jsonwebtoken.verify(token, 'secret');
      req.userId = decoded.id;
      next();
    } catch(err) {
      return res.status(403).json({ message: 'Access is denied', access: false});
    }
  } else {
    return res.status(403).json({ message: 'Access is denied', access: false});
  }
}