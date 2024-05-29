import app from './app.js';

const PORT = process.env.PROCESS || 5000;  
app.listen(PORT, () => {
    console.log(`Server is running at http:localhost:${PORT}`)
})  