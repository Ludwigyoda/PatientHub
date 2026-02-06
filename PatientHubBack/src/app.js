import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.route.js';

const app = express();

app.use(cors());
app.use(express.json());

// Mount routes
app.use('/auth', authRouter);

// Health check
app.get('/', (req, res) => {
    res.json({ message: "PatientHub Back API is running" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
