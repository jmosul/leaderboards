const CalculateCompetitorStats = require('./CalculateCompetitorStats');

exports.handler = function(event, context) {
  const promises = [];

  event.Records.forEach((record) => {
    console.log(record.eventID);
    console.log(record.eventName);
    console.log('DynamoDB Record: %j', record.dynamodb);

    const handler = new CalculateCompetitorStats(
      record.NewImage.leagueId.S,
      record.NewImage.competitorId.S
    );

    promises.push(
      handler.handle()
    );
  });


  Promise.all(promises)
    .then(() => context.done(null, 'Successfully processed DynamoDB record'))
    .catch(() => context.done('Error processed DynamoDB record', null))
};
