const dynamoose = require('dynamoose');

const Schema = dynamoose.Schema;

const tableName = process.env.STORAGE_DYNAMOUSERLEAGES_NAME;

const userLeaguesSchema = new Schema({
    userId: {
        type: String,
        hashKey: true
    },
    leagueId: {
        type: String,
        trim: true,
        rangeKey: true,
    }
}, {
    timestamps: true
});

module.exports = dynamoose.model(tableName, userLeaguesSchema, {
    create: false
});
