const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const noteRoutes = require('./routes/notes');

require('dotenv').config()

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json());
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(cors());

app.use('/', noteRoutes)

const CONN_URL =
  process.env.CONN_URL ||
  "mongodb+srv://primedev:prime_code123@cluster0.ken0buc.mongodb.net/notes-db?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose.connect(CONN_URL,{ useNewUrlParser: true, useUnifiedTopology: true})
.then( () => app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`)
))
.catch( err => console.log(err))

mongoose.set('strictQuery', true)
// mongoose.set('useFindAndModify', false);
