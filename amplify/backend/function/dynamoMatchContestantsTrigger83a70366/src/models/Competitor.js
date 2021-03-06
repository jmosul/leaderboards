const dynamoose = require('dynamoose');

const Schema = dynamoose.Schema;

const tableName = process.env.STORAGE_DYNAMOCOMPETITORS_NAME;

const competitorsSchema = new Schema({
    leagueId: {
        type: String,
        hashKey: true,
    },
    competitorId: {
        rangeKey: true,
        type: String,
        trim: true
    },
    name: {
        type: String,
        trim: true
    },
    rank: {
        type: Number,
        default: 1600
    },
    played: {
        type: Number,
        default: 0
    },
    wins: {
        type: Number,
        default: 0
    },
    loses: {
        type: Number,
        default: 0
    },
    draws: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = dynamoose.model(tableName, competitorsSchema, {
    create: false
});
