'use strict';
var userProfile = require('./service/userProfile');

module.exports.verifyToken = (event, context, callback) => {
  var token = event.authorizationToken.split(' ')[1];

  userProfile.getUserProfile(token).then(function(profile) {
    context.succeed(generatePolicy('user', 'Allow', event.methodArn));
  }).catch(function(error) {
     context.fail("Unauthorized");
  })
};

var generatePolicy = function(principalId, effect, resource) {
    var authResponse = {};
    authResponse.principalId = principalId;
    if (effect && resource) {
        var policyDocument = {};
        policyDocument.Version = '2012-10-17'; // default version
        policyDocument.Statement = [];
        var statementOne = {};
        statementOne.Action = 'execute-api:Invoke'; // default action
        statementOne.Effect = effect;
        statementOne.Resource = resource;
        policyDocument.Statement[0] = statementOne;
        authResponse.policyDocument = policyDocument;
    }
    return authResponse;
}
