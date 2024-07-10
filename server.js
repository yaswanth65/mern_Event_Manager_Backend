const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/tasks', userRoute);
app.use('/auth', authRoute);

mongoose.connect("mongodb://127.0.0.1:27017/merndb")
    .then(() => {
        console.log("Connection established");
        app.listen(4000, () => {
            console.log("Server is running on port 4000");
        });
    })
    .catch((err) => {
        console.log("Connection error", err);
    });
