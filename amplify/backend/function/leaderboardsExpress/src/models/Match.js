const dynamoose = require('dynamoose');
const uuid = require('uuid');

const Schema = dynamoose.Schema;

const tableName = process.env.STORAGE_DYNAMOMATCHES_NAME;

const matchSchema = new Schema({
    leagueId: {
        type: String,
        hashKey: true,
    },
    matchId: {
        type: String,
        trim: true,
        rangeKey: true,
        default: uuid.v4
    },
    createdBy: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true,
});

module.exports = dynamoose.model(tableName, matchSchema, {
    create: false
});
