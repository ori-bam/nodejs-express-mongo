const express = require("express")
const app = express()
const mongoose = require("mongoose")
mongoose.connect(`mongodb+srv://username<password>@cluster0.afyhs.mongodb.net/forum?retryWrites=true&w=majority`)
const users = require('./route/users');
const discussion = require('./route/discussions');




app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());


app.use('/users', users);
app.use('/discussion', discussion);

    



app.listen(3000, console.log('server running..'))