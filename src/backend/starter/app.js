const express = require('express');

const app = express();

const tasks = require('./routes/task')

const connectDB = require('./db/connection')

require('dotenv').config()
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin,X-Requested-With, Content-Type, Accept'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, DELETE, PUT, OPTIONS'
    );
    next();
  });

app.use(express.static('./public'))
app.use(express.json())

//routes


app.use('/api/v1/tasks', tasks)

const port = 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`listen on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start()


