const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth');
const noteRoutes = require('./routes/notes');
const userRoutes = require('./routes/users')
const otpRoutes = require('./routes/otp')

require('dotenv').config()

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //Parse URL-encoded bodies
app.use(cors());

app.get('/', (req, res) => {
    res.json({ message: 'Service is up!'})
})
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/secure/notes', noteRoutes)
app.use('/api/v1/secure/users', userRoutes)
app.use("/api/v1", otpRoutes);

const CONN_URL = process.env.CONN_URL;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONN_URL)
.then( () => app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`)
))
.catch( err => console.log(err))

mongoose.set('strictQuery', false)
// mongoose.set('useFindAndModify', false);
