// Must read config file before executing the code in app.js to be able to read the ENV variables
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then( () => console.log("DB connectiong successful! ✅") );

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true
    },
    rating:{
        type: Number,
        default: 4.5
    },
    price: {
        type: Number,
        required: [true, 'A tour must have price']
    }
});

const Tour = mongoose.model('Tour', tourSchema)

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
})