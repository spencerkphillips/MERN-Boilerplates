const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

// import routes
const Routes = require('./routes/index.js');

const app = express();

const port = process.env.APP_PORT || 8001;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Database Connected to MongoDB on collection: ${process.env.MONGO_DB_NAME}`))
  .catch((err) => console.error("Database Error: ", err));

// application middleware
app.use(morgan('dev'));
app.use(cors());
if (process.env.APP_ENV = 'development') {
  app.use(cors({
    origin: `http://${process.env.APP_URI}`
  }));
}
app.use(express.json());

app.use('/', Routes);

app.listen(port, () => {
  console.log(`API Server running on port: ${port} - ${process.env.APP_URI}.`)
})