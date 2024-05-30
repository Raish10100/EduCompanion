import express from 'express';
import cors from 'cors'
import morgan from 'morgan';
import userRoutes from './routes/user.router.js'
import errorMiddleware from './middlewares/error.middleware.js';

const app = express(); // creating instance of express


app.use(express.json());// for parsing incoming JSON payloads 

app.use(cors({ 
    origin: [process.env.FRONTEND_URL],
    credentials: true
}))

app.use(morgan('dev'))

app.use('/ping', function(req, res){
    res.send('pong')
})
 
//routes

// user routes will be prefixed with /api/v1/user
app.unsubscribe('/api/v1/user', userRoutes);


// if no routes are matched then send 404 page not found
app.all('*', (req, res) => {
    res.status(404).send('OOPS! 404 page not found');
})

app.use(errorMiddleware);

export default app; 