const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then( () => console.log("DB connectiong successful! ✅") );

// READ JSON FILE
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

const importData = async () => {
    try{
        await Tour.create(tours);
        console.log('data successfully loaded!')
        process.exit();
    } catch (err) {
        console.log(err);
    };
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
    try{
        await Tour.deleteMany();
        console.log('data successfully deleted!')
    } catch (err){
        console.log(err);
    };
    process.exit();
};

// terminal command to import data from tours-simple.json and to delete current data from the database
if(process.argv[2] === '--import'){
    importData();
}else if(process.argv[2] === '--delete'){
    deleteData();
};

// console.log(process.argv);