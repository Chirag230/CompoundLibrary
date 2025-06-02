import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../db/index.js';
import { users } from '../db/schema.js';
import { eq } from 'drizzle-orm';

const SECRET_KEY = 'qwertyuiop';

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.insert(users).values({
      username,
      email,
      password: hashedPassword
    });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Email may already be in use' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await db.select().from(users).where(eq(users.email, email)).limit(1);
  if (user.length === 0) return res.status(404).json({ error: 'User not found' });

  const valid = await bcrypt.compare(password, user[0].password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user[0].id, email: user[0].email }, SECRET_KEY, { expiresIn: '24h' });

  res.json({ token });
};
