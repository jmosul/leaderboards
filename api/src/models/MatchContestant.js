const dynamoose = require('dynamoose');

const Schema = dynamoose.Schema;

const tableName = `${process.env.TABLE_PREFIX}-match-contestants`;

const matchContestantSchema = new Schema({
    leagueId: {
        type: String,
        hashKey: true,
    },
    matchId: {
        type: String,
        trim: true
    },
    competitorId: {
        type: String,
        trim: true
    },
    foeId: {
        type: String,
        trim: true
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
}, {
    timestamps: true
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
