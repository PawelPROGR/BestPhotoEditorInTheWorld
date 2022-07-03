import dotenv from 'dotenv'
import morgan from 'morgan'
import express from 'express'
import connectDB from './config/db.js'
import { DEVELOPMENT } from './config/constants.js'
// import { notFound, errorHandler } from './middleware/errorMIddleware.js'
import colors from 'colors'
import photos from './routes/photos.js'
import cors from 'cors'

dotenv.config();
connectDB();

const app = express();
app.use(cors());

if (process.env.NODE_ENV === DEVELOPMENT) app.use(morgan('dev'));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use('/api/photos', photos)

// app.use(notFound)
// app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
	)
)
