import express, { json } from 'express';
import cors from 'cors';
import { db } from './db/index.js';
import { compounds } from './db/schema.js';
import { eq } from 'drizzle-orm';
// import {authRoutes} from './routes/auth.js'
import {authenticateJWT } from './middleware/auth.js'
import authRoutes from './routes/auth.js'

const app = express();

// Configure CORS with specific options
const corsOptions = {
  origin: 'http://localhost:4200', // Angular dev server
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(json());
app.use('/api/auth', authRoutes);

// Get all compounds
app.get('/api/compounds',authenticateJWT, async (req, res) => {
  const rows = await db.select().from(compounds);
  res.json(rows);
});

// Get single compound by ID
app.get('/api/compounds/:id',authenticateJWT, async (req, res) => {
  const result = await db.select().from(compounds).where(eq(compounds.id, Number(req.params.id)));
  if (result.length === 0) return res.status(404).send('Not found');
  res.json(result[0]);
});

// Create new compound
app.post('/api/compounds',authenticateJWT, async (req, res) => {
  const newCompound = req.body;
  const result = await db.insert(compounds).values(newCompound).returning();
  res.status(201).json(result[0]);
});

// Update compound by ID
app.put('/api/compounds/:id',authenticateJWT, async (req, res) => {
  const result = await db.update(compounds)
    .set(req.body)
    .where(eq(compounds.id, Number(req.params.id)))
    .returning();
  if (result.length === 0) return res.status(404).send('Not found');
  res.json(result[0]);
});

// Delete compound by ID
app.delete('/api/compounds/:id',authenticateJWT, async (req, res) => {
  const result = await db.delete(compounds).where(eq(compounds.id, Number(req.params.id))).returning();
  if (result.length === 0) return res.status(404).send('Not found');
  res.json(result[0]);
});

// Start server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
