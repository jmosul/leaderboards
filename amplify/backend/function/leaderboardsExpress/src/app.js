/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var storageDynamoLeaguesName = process.env.STORAGE_DYNAMOLEAGUES_NAME
var storageDynamoLeaguesArn = process.env.STORAGE_DYNAMOLEAGUES_ARN
var storageDynamoUserLeaguesName = process.env.STORAGE_DYNAMOUSERLEAGUES_NAME
var storageDynamoUserLeaguesArn = process.env.STORAGE_DYNAMOUSERLEAGUES_ARN
var storageDynamoCompetitorsName = process.env.STORAGE_DYNAMOCOMPETITORS_NAME
var storageDynamoCompetitorsArn = process.env.STORAGE_DYNAMOCOMPETITORS_ARN
var storageDynamoMatchesName = process.env.STORAGE_DYNAMOMATCHES_NAME
var storageDynamoMatchesArn = process.env.STORAGE_DYNAMOMATCHES_ARN
var storageDynamoMatchContestantsName = process.env.STORAGE_DYNAMOMATCHCONTESTANTS_NAME
var storageDynamoMatchContestantsArn = process.env.STORAGE_DYNAMOMATCHCONTESTANTS_ARN

Amplify Params - DO NOT EDIT */

var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

const controllers = [
    require('./controllers/LeaguesController'),
    require('./controllers/CompetitorsController'),
    require('./controllers/MatchesController'),
    require('./controllers/AddMatchController'),
];

controllers.reduce((app, controller) => controller.registerRoutes(app), app);

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
