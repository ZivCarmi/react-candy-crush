require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');

app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
});

app.listen(port, (req, res) => {
    console.log(`Server is listenings on port ${port}`);
});

const scoreModel = require('./Models/Score');

app.post('/addscore', async (req, res) => {
    //--- delete all documents in scores collection
    // await mongoose.scores.remove( { } );

    // new score schema of posted request (name and score)
    const scoreData = new scoreModel(req.body);

    try {
        await scoreData.save();
        res.status(200).json({message: 'Score has been saved successfully!'});
    } catch (err) {
        console.log(err);
    }
});

app.get('/getrankings', async (req, res) => {
    const topTenScores = await scoreModel.find().sort('-score').limit(10).exec();

    try {
        res.status(200).json(topTenScores);
    } catch (err) {
        res.status(200).json('Couldn\'t get rankings');
        console.log(err);
    }
});