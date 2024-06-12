import express from 'express';
import cors from 'cors'
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.router.js'
import errorMiddleware from './middlewares/error.middleware.js';
import courseRoutes from './routes/course.router.js'
import paymentsRoutes from './routes/payment.router.js'
import miscRoutes from './routes/miscellaneous.router.js'

const app = express(); // creating instance of express


app.use(express.json());// for parsing incoming JSON payloads 
app.use(express.urlencoded({ extended: true })); // for parsing incoming URL-encoded payloads

app.use(cors({ 
    origin: [process.env.FRONTEND_URL],
    // origin: true,
    credentials: true
}))

app.use(morgan('dev'))
app.use(cookieParser())

app.use('/ping', function(req, res){
    res.send('pong')
})
 
//routes

// user routes  prefixed with /api/v1/user
app.use('/api/v1/user', userRoutes);

// course routes  prefixed with /api/v1/course
app.use('/api/v1/courses', courseRoutes);

// payments routes prefixed with api/v1/payments
app.use('/api/v1/payments', paymentsRoutes);

// miscellaneous routes prefixed with /api/v1/miscellaneous
app.use('/api/v1', miscRoutes)

// if no routes are matched then send 404 page not found
app.all('*', (req, res) => {
    res.status(404).send('OOPS! 404 page not found');
})

app.use(errorMiddleware);

export default app; 