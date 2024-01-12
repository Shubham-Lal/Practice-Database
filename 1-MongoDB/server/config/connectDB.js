const mongoose = require('mongoose');

const connectDatabase = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGODB_URI).then(() => console.log(`MongoDB connected!`));
    } catch (err) {
        console.log(`MongoDB Error => , ${err.message}`);
    }
};

module.exports = connectDatabase;