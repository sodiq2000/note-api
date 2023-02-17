const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();

app.use(express.json());
// app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(cors());


const CONN_URL = 'mongodb+srv://harkanday:admin@cluster0.3z3cy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000

mongoose.connect(CONN_URL,{ useNewUrlParser: true, useUnifiedTopology: true})
.then( () => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)
))
.catch( err => console.log(err))
