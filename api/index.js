'use strict';

const serverless = require('serverless-http');
const bodyParser = require('body-parser');

const app = require('express')();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const controllers = [
    require('./src/controllers/LeaguesController'),
    require('./src/controllers/CompetitorsController'),
];

// run local db on sls offline
if(process.env.IS_OFFLINE) {
    const dynamoose = require('dynamoose');

    dynamoose.local();
}

controllers.reduce((app, controller) => controller.registerRoutes(app), app);

module.exports.handler = serverless(app);

