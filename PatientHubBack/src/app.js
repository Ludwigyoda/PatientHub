import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.route.js';
import categoryRouter from './routes/category.route.js';
import toolRouter from './routes/tool.route.js';
import patientRouter from './routes/patient.route.js';
import entryRouter from './routes/entry.route.js';

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use('/auth', authRouter);
app.use('/categories', categoryRouter);
app.use('/tools', toolRouter);
app.use('/patients', patientRouter);
app.use('/entries', entryRouter);
// app.use('/news', newsRouter);
// app.use('/specificity', newsRouter);

// route de test pour voir si le serveur tourne
app.get('/', (req, res) => {
    res.json({ status: "on", api: "PatientHub" });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
});




export default app;
