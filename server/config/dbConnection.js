import mongoose from 'mongoose';

// Allow flexible querying  doesn't strictly match the schema
mongoose.set('strictQuery', false);  

const connectToDB = async () => {
    try {
        const { connection } = await mongoose.connect(
            process.env.MONGO_URI || 'mongodb://localhost:27017/lms'
            // 'mongodb://localhost:27017/lms'
        );
        if (connection) {
            console.log(`Connected to MongoDB: ${connection.host}`);
        }
    } catch (e) {
        console.error('Error: ', e);
        process.exit(1);
    }
}
 
export default connectToDB;
