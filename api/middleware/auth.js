import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET


export function authenticateJWT (req, res, next){
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};


export function adminPermission (req, res, next){

    if (req.user.user_type !== 'admin') {
        return res.status(403).json({ message: 'Access denied: admin role required' })
    }
    next()

}

export function writePermission (req, res, next){
    const user_type = req.user.user_type;
    if (user_type !== 'admin' || user_type !== 'Intelligence') {
    return res.status(403).json({ message: 'Access denied: write permission required' })
    }
    next()
}

export function destroyedPermission (req, res, next){
    const user_type = req.user.user_type;
    if (user_type !== 'admin' || user_type !== 'Intelligence' || user_type !== 'airForce' ) {
    return res.status(403).json({ message: 'Access denied: destroyed permission required' })
    }
    next()
}