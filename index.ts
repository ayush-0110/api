import express from 'express';
import { connect } from './db';
import authRouter from './auth';
import itemsRouter from './items';
import { authenticateJWT, requestLogger, errorHandler } from './middleware';

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(requestLogger); 
app.use('/auth', authRouter); 
app.use('/items', itemsRouter); 
connect().then(() => {
  
    app.get('/secure', authenticateJWT, (req, res) => {
        res.status(200).json({ message: 'You are authenticated!' });
      });

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}).catch(err => {
    app.use(errorHandler);
  console.error('Failed to connect to MongoDB:', err);
  process.exit(1);
});
