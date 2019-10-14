const dynamoose = require('dynamoose');

const Schema = dynamoose.Schema;

const tableName = process.env.STORAGE_DYNAMOUSERLEAGUES_NAME;

const userLeaguesSchema = new Schema({
    userId: {
        type: String,
        hashKey: true
    },
    leagueId: {
        type: String,
        trim: true,
        rangeKey: true,
    },
    createdBy: {
        type: String,
        trim: true,
    },
    pinned: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true
});

module.exports = dynamoose.model(tableName, userLeaguesSchema, {
    create: false
});
