const dynamoose = require('dynamoose');
const uuid = require('uuid');

const Schema = dynamoose.Schema;

const tableName = `${process.env.TABLE_PREFIX}-leagues`;

const leaguesSchema = new Schema({
    leaguePool: {
        type: String,
        hashKey: true,
    },
    leagueId: {
        type: String,
        trim: true,
        rangeKey: true,
        default: uuid.v4
    },
    name: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = dynamoose.model(tableName, leaguesSchema, {
    create: false
});
