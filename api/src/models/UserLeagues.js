const dynamoose = require('dynamoose');

const Schema = dynamoose.Schema;

const tableName = `${process.env.TABLE_PREFIX}-user-leagues`;

const userLeaguesSchema = new Schema({
    userId: {
        type: String,
        hashKey: true
    },
    leagueId: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = dynamoose.model(tableName, userLeaguesSchema, {
    create: false
});
