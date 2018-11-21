const crypto = require('crypto');

function createChallengeNodes(challenge, reporter) {
  if (typeof challenge.description[0] !== 'string') {
    reporter.warn(`

    ${challenge.title} has a description that will break things!

    `);
  }
  const contentDigest = crypto
    .createHash('md5')
    .update(JSON.stringify(challenge))
    .digest('hex');
  const internal = {
    contentDigest,
    type: 'ChallengeNode'
  };

  /* eslint-disable prefer-object-spread/prefer-object-spread */
  return JSON.parse(
    JSON.stringify(
      Object.assign(
        {},
        {
          id: challenge.id + ' >>>> ChallengeNode',
          children: [],
          parent: null,
          internal,
          sourceInstanceName: 'challenge'
        },
        challenge
      )
    )
  );
}

exports.createChallengeNodes = createChallengeNodes;
