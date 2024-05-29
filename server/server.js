import app from './app.js';
import {config} from 'dotenv'
config(); // loads the .env file


const PORT = process.env.PORT || 5010;  


app.listen(PORT, () => {
    console.log(`Server is running at http:localhost:${PORT}`)
})    