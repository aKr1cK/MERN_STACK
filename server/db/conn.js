const mongoose = require('mongoose');
const dotenv = require('dotenv');

const DB = process.env.DATABASE;

mongoose.connect(DB/*, {
    newUrlParser: true,
    newCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}*/) 
.then(() => {
    console.log('CONNECTION SUCCESSFUL')
})
.catch(() => {
    console.log('NO CONNECTION')
});
