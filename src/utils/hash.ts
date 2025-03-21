import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import type { Request, Response } from 'express';

const SECRET_KEY: string = process.env.SECRET_KEY || 'securePa55w0rd';

const createToken = (user: any) => {
  const token = jwt.sign(user, SECRET_KEY, { expiresIn: '7d' });
  return token;
};

const authenticateJWT = (req: Request & { user: any }, res: Response, next: () => {}) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    req.user = decoded;
    next();
  });
};

function hashPassword(password: string) {
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
}

function verifyPassword(inputPassword: string, storedHash: string) {
  const inputHash = hashPassword(inputPassword);
  return inputHash === storedHash;
}

const hash = {
  createToken,
  authenticateJWT,
  verifyPassword,
  hashPassword
};

export default hash;