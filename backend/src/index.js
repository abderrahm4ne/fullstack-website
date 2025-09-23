import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import userRoutes from '../src/routes/userRoutes.js'
import productRoutes from '../src/routes/productRoutes.js'
import mongoConnection from '../src/db/mongo.js'
import orderRoutes from '../src/routes/orderRoutes.js'

dotenv.config()

const app = express();

app.use(helmet());
app.use(cors(
    {
        origin: "http://localhost:5173",
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
))
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api', productRoutes);
app.use('api', orderRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

mongoConnection;

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})