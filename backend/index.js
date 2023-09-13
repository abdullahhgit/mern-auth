const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/userModel')
// import User from './models/userModel'

const Port = 1999

app.use(cors())

app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/mern-auth-db')

app.post('/api/register', async (req, res) => {
    console.log(req.body);
    try {
        await User.create ({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })

        res.json({status: 'OK'})
    }
    catch(err) {
        res.json({status: 'error', error: 'Duplicate Email'})
    }
})

app.post('/api/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password,
    })
    // console.log(req.body);

    if(user) {
       return res.json({status: 'OK', user: true})
    }
    else {
       return res.json({status: 'error', user: false})
    }
})

app.listen(Port, () => {
    console.log(`App running on Port ${Port}`)
})