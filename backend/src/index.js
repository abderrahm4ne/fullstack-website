import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import userRoutes from '../src/routes/userRoutes.js'
import productRoutes from '../src/routes/productRoutes.js'
import mongoConnection from '../src/db/mongo.js'

dotenv.config()

const app = express();

app.use(helmet());
app.use(cors(
    {
        origin: process.env.FRONTEND_URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
))
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api', productRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

mongoConnection;

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})