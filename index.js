const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require("dotenv").config();

// setup express

const app = express();
app.use(express.json());    //middleware
app.use(cors());    //middleware

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started at port no ${PORT}`));

// setup mongoose

mongoose.connect(
    process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
},
(err) => {
    if(err) throw err;
    console.log("MongoDB connection established");
});

