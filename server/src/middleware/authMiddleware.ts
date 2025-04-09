import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.cookies?.token;

  if (!token) {
    res.status(401).json({ message: 'No token' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      res.status(401).json({ message: 'User not found' });
      return;
    }

    (req as any).user = user;
    next(); // pass control to the next middleware/handler
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
