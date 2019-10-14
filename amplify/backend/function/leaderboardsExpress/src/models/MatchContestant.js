const dynamoose = require('dynamoose');
const uuid = require('uuid');

const Schema = dynamoose.Schema;

const tableName = process.env.STORAGE_DYNAMOMATCHCONTESTANTS_NAME;

const matchContestantSchema = new Schema({
    leagueId: {
        type: String,
        hashKey: true,
    },
    matchContestantId: {
        type: String,
        trim: true,
        rangeKey: true,
        default: uuid.v4
    },
    matchId: {
        type: String,
        trim: true,
    },
    competitorId: {
        type: String,
        trim: true,
    },
    foeId: {
        type: String,
        trim: true,
    },
    score: {
        type: Number,
    },
    result: {
        type: String,
        enum: ['win', 'draw', 'lose']
    },
    preRank: {
        type: Number,
    },
    postRank: {
        type: Number,
    },
    createdBy: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true,
});

const model = dynamoose.model(tableName, matchContestantSchema, {
    create: false
});


model.RESULT = {
    WIN : 'win',
    DRAW : 'draw',
    LOSE : 'lose',
};

module.exports = model;
