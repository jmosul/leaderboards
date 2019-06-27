'use strict';

const serverless = require('serverless-http');
const bodyParser = require('body-parser');

const app = require('express')();

app.use( bodyParser.json() );

const LeaguesController = require('./src/controllers/LeaguesController');

// run local db on sls offline
if(process.env.IS_OFFLINE) {
    const dynamoose = require('dynamoose');

    dynamoose.local();
}

app.get('/leagues', async(req, res) => await LeaguesController.handle('index', req, res));
app.post('/leagues', async(req, res) => await LeaguesController.handle('store', req, res));
app.get('/leagues/:leagueId', async(req, res) => await LeaguesController.handle('show', req, res));

module.exports.handler = serverless(app);

