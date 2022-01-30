import mongoose from 'mongoose'

// change Db Url to your Db String.
const mongoDB = process.env.MONGO_DB_URL || 'mongodb://localhost:27017/mitapp-db'   //thd-api-db'

mongoose.connect(mongoDB, {
    useNewUrlParser: true, 
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})