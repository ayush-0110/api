import { Router } from 'express';
import { usersCollection, User } from './models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();
const saltRounds = 10;

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await usersCollection().findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser: User = { email, password: hashedPassword };
  const result = await usersCollection().insertOne(newUser);
  const createdUser = { ...newUser, _id: result.insertedId } as User;


  res.status(201).json({ message: 'User created', user: { email: createdUser.email } });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await usersCollection().findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'my_key', { expiresIn: '1h' });

  res.status(200).json({ message: 'Logged in', token, user: { email: user.email } });
});

export default router;
