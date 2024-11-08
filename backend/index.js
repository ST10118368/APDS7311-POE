import './config.js';
import express  from 'express';
import cors from 'cors';
import https from 'https'
import helmet from 'helmet';
import morgan from 'morgan';
import fs from 'fs';
import dBConnect from './db/connection.js';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/post.js';

const app = express();
const PORT = process.env.PORT || 4000;


//Database Connection
dBConnect();

//Middleware
app.use(cors({
    origin: 'http://localhost:4000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));
app.use(express.json());
app.use(helmet()); //additional layers of security to the API
app.use(morgan('combined')); //Log HTTP requests

//Routes
app.use('/api/auth', authRoutes);
app.use('/api', postRoutes);

//SSL Cert and Key
const options= {
    key: fs.readFileSync('keys/private.pem'),
    cert: fs.readFileSync('keys/certificate.pem')
}

// https.createServer(options, app).listen(PORT, () => {
//     onsole.log(`Server is running on port: ${PORT}`);
// })

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})