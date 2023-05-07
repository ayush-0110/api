import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'my_key', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    if (typeof decoded === 'object') {
      req.user = decoded;
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  });
}
export function requestLogger(req: Request, res: Response, next: NextFunction) {
    console.log(`${req.method} ${req.path}`);
    next();
  }
  
  export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.error(err.stack);
    res.status(500).json({ message: 'An internal server error occurred' });
  }