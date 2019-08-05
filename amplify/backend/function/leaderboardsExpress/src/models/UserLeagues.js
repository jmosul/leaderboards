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
    name: {
        type: String,
        trim: true,
        required: true
    },
    icon: {
        type: String,
        trim: true,
        default: 'list-ol'
    }
}, {
    timestamps: true
});

module.exports = dynamoose.model(tableName, userLeaguesSchema, {
    create: false
});
