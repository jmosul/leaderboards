const dynamoose = require('dynamoose');

const Schema = dynamoose.Schema;

const tableName = `${process.env.TABLE_PREFIX}-leagues`;

const leaguesSchema = new Schema({
    leaguePool: {
        type: String,
        hashKey: true
    },
    leagueId: {
        type: String,
        trim: true
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
