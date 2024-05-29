import app from './app.js';
import {config} from 'dotenv'
import connectToDB from './config/dbConnection.js';
config(); // loads the .env file


const PORT = process.env.PORT || 5010;  


app.listen(PORT, async () => {
    await connectToDB()
    console.log(`Server is running at http:localhost:${PORT}`)
})    